"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useState } from "react";
import { useEffect } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Flag, Loader2, Video, Mic } from "lucide-react";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (result[0]) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        console.log(jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center p-8">
        <Card className="border-0 shadow-xl max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Video className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Interview</h3>
            <p className="text-gray-600 mb-4">Preparing your interview session...</p>
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!mockInterviewQuestion || !interviewData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center p-8">
        <Card className="border-0 shadow-xl max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flag className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Interview Not Found</h3>
            <p className="text-gray-600 mb-6">The requested interview session could not be loaded.</p>
            <Link href="/dashboard">
              <Button className="w-full">Return to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              Live Interview Session
            </h1>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Question {activeQuestionIndex + 1} of {mockInterviewQuestion.length}
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Mic className="w-3 h-3 mr-1" />
              Recording Ready
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((activeQuestionIndex + 1) / mockInterviewQuestion.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-gray-600 text-sm">
            Progress: {activeQuestionIndex + 1} of {mockInterviewQuestion.length} questions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Question Section */}
          <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">{activeQuestionIndex + 1}</span>
                </div>
                Interview Question
              </CardTitle>
              <CardDescription>
                Read the question carefully before answering
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QuestionSection
                mockInterviewQuestion={mockInterviewQuestion}
                activeQuestionIndex={activeQuestionIndex}
              />
            </CardContent>
          </Card>

          {/* Recording Section */}
          <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
                <Mic className="w-5 h-5 text-green-600" />
                Your Response
              </CardTitle>
              <CardDescription>
                Record your answer using audio and video
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecordAnswerSection
                mockInterviewQuestion={mockInterviewQuestion}
                activeQuestionIndex={activeQuestionIndex}
                interviewData={interviewData}
              />
            </CardContent>
          </Card>
        </div>

        {/* Navigation Controls */}
        <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Question Progress */}
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-gray-100">
                  {activeQuestionIndex + 1} / {mockInterviewQuestion.length}
                </Badge>
                <span className="text-gray-600 text-sm">
                  {mockInterviewQuestion.length - activeQuestionIndex - 1} questions remaining
                </span>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                {activeQuestionIndex > 0 && (
                  <Button
                    onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
                    variant="outline"
                    className="gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                )}
                
                {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
                  <Button
                    onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                    className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
                
                {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
                  <Link
                    href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
                  >
                    <Button className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                      <Flag className="w-4 h-4" />
                      End Interview
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="border-0 bg-amber-50/50 border-amber-200 mt-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-amber-600 text-sm">💡</span>
              </div>
              <div>
                <h4 className="font-medium text-amber-800 mb-1">Interview Tips</h4>
                <ul className="text-amber-700 text-sm space-y-1">
                  <li>• Speak clearly and at a moderate pace</li>
                  <li>• Structure your answer with clear points</li>
                  <li>• Take a moment to think before answering</li>
                  <li>• Maintain eye contact with the camera</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StartInterview;