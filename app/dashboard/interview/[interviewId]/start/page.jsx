"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useState, useEffect, useContext } from "react";
import useProctoring from "./hooks/useProctoring";
import { WebCamContext } from "./../../../../dashboard/layout";
import { AlertTriangle } from "lucide-react";

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

  // pop-up state
  const [showWarning, setShowWarning] = useState(false);
  const [warningLevel, setWarningLevel] = useState(0);

  // webcam stream
  const { stream } = useContext(WebCamContext);

  // Proctoring Hook
  const { violations } = useProctoring(params.interviewId, {
    reuseStream: stream,
    requireFaceCheck: true,
    violationLimit: 3,
  });

  useEffect(() => {
    // Listen for popup events
    const handler = (e) => {
      const count = e.detail;
      if (count === 1 || count === 2) {
        setWarningLevel(count);
        setShowWarning(true);
      }
    };

    window.addEventListener("proctor-warning", handler);
    return () => window.removeEventListener("proctor-warning", handler);
  }, []);

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
      <div className="min-h-screen flex items-center justify-center p-8">
        <Card className="border-0 shadow-xl max-w-md w-full text-center">
          <CardContent className="p-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
            <p className="mt-3 text-gray-600">Preparing your interview...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!mockInterviewQuestion || !interviewData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <Card className="shadow-xl max-w-md w-full text-center">
          <CardContent className="p-8">
            <Flag className="w-10 h-10 text-red-600 mx-auto mb-3" />
            <p>Interview not found.</p>
            <Link href="/dashboard"><Button className="mt-4 w-full">Back</Button></Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto">

        {/* 🔥 Proctoring Warning Popup */}
        {showWarning && warningLevel < 3 && (
          <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full text-center animate-in fade-in zoom-in duration-300">
              <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-3" />

              <h2 className="text-xl font-bold mb-2">
                {warningLevel === 1 ? "⚠️ Warning!" : "🚨 Last Warning!"}
              </h2>

              <p className="text-gray-700 mb-4">
                {warningLevel === 1
  ? "Unethical activity detected. Stay focused on the interview."
  : "Repeated unethical activity detected. One more violation will end the interview."}

              </p>

              <button
                onClick={() => setShowWarning(false)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                I Understand
              </button>
            </div>
          </div>
        )}

        {/* 🔐 Violation Counter */}
        <div className="flex justify-center mb-4">
          <Badge className={`px-4 py-2 flex items-center gap-2 
            ${violations > 0 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
          >
            <AlertTriangle className="w-4 h-4" />
            Violations: {violations} / 3
          </Badge>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Video className="text-blue-600 w-6 h-6" />
            <h1 className="text-3xl font-bold">Live Interview</h1>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="shadow-xl bg-white/70">
            <CardContent>
              <QuestionSection
                mockInterviewQuestion={mockInterviewQuestion}
                activeQuestionIndex={activeQuestionIndex}
              />
            </CardContent>
          </Card>

          <Card className="shadow-xl bg-white/70">
            <CardContent>
              <RecordAnswerSection
                mockInterviewQuestion={mockInterviewQuestion}
                activeQuestionIndex={activeQuestionIndex}
                interviewData={interviewData}
              />
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <Card className="shadow-xl bg-white/70">
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <Badge>{activeQuestionIndex + 1} / {mockInterviewQuestion.length}</Badge>
              </div>

              <div className="flex gap-3">
                {activeQuestionIndex > 0 && (
                  <Button variant="outline" onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
                    <ChevronLeft /> Previous
                  </Button>
                )}

                {activeQuestionIndex < mockInterviewQuestion.length - 1 && (
                  <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
                    Next <ChevronRight />
                  </Button>
                )}

                {activeQuestionIndex === mockInterviewQuestion.length - 1 && (
                  <Link href={`/dashboard/interview/${interviewData.mockId}/feedback`}>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Flag /> End Interview
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default StartInterview;
