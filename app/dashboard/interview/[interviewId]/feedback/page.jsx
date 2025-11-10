"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { ChevronDown, Star, Trophy, Target, ArrowLeft, Sparkles, CheckCircle, Lightbulb, MessageCircle } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const Feedback = ({ params }) => {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id);

      console.log(result);
      setFeedbackList(result);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  const overallRating = useMemo(() => {
    if (feedbackList && feedbackList.length > 0) {
      const totalRating = feedbackList.reduce(
        (sum, item) => sum + Number(item.rating),
        0
      );
      return (totalRating / feedbackList.length).toFixed(1);
    }
    return 0;
  }, [feedbackList]);

  const getRatingColor = (rating) => {
    if (rating >= 8) return "text-green-600";
    if (rating >= 6) return "text-yellow-600";
    if (rating >= 4) return "text-orange-600";
    return "text-red-600";
  };

  const getRatingBadgeVariant = (rating) => {
    if (rating >= 8) return "default";
    if (rating >= 6) return "secondary";
    if (rating >= 4) return "outline";
    return "destructive";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50/30 flex items-center justify-center p-8">
        <Card className="border-0 shadow-xl max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Feedback</h3>
            <p className="text-gray-600">Analyzing your interview performance...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50/30 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {feedbackList?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardContent className="p-12">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  No Feedback Available Yet
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Complete an interview session to receive detailed feedback and performance analysis.
                </p>
                <Button 
                  onClick={() => router.replace("/dashboard")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Start an Interview
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <>
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-green-900 bg-clip-text text-transparent">
                  Interview Results
                </h1>
              </div>
              <p className="text-gray-600 text-lg">
                Detailed analysis of your performance and areas for improvement
              </p>
            </motion.div>

            {/* Overall Performance Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-green-50/50">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl font-bold text-white">{overallRating}</span>
                      </div>
                      <p className="text-gray-600 font-medium">Overall Score</p>
                      <Badge variant="outline" className="mt-2 bg-green-50 text-green-700">
                        out of 10
                      </Badge>
                    </div>
                    
                    <div className="md:col-span-2">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-500" />
                        Performance Summary
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Questions Answered</span>
                          <Badge variant="secondary">{feedbackList.length}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Average Rating</span>
                          <Badge className={getRatingColor(overallRating)}>
                            {overallRating}/10
                          </Badge>
                        </div>
                        <Progress 
                          value={(overallRating / 10) * 100} 
                          className="h-2 bg-gray-200"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Performance Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <Card className={`border-0 shadow-lg ${
                overallRating >= 8 
                  ? "bg-gradient-to-br from-green-50 to-emerald-50/50 border-green-200" 
                  : overallRating >= 6 
                  ? "bg-gradient-to-br from-yellow-50 to-amber-50/50 border-yellow-200"
                  : "bg-gradient-to-br from-orange-50 to-red-50/50 border-orange-200"
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${
                      overallRating >= 8 
                        ? "bg-green-100 text-green-600" 
                        : overallRating >= 6 
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-orange-100 text-orange-600"
                    }`}>
                      {overallRating >= 8 ? (
                        <Trophy className="w-6 h-6" />
                      ) : overallRating >= 6 ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Lightbulb className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {overallRating >= 8 
                          ? "Excellent Performance! 🎉" 
                          : overallRating >= 6 
                          ? "Good Job! 👍"
                          : "Keep Practicing! 💪"
                        }
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {overallRating >= 8 
                          ? "You demonstrated strong interview skills. Continue practicing to maintain this level of excellence."
                          : overallRating >= 6 
                          ? "You're on the right track! Focus on the areas below to improve your performance further."
                          : "Practice makes perfect! Review the feedback below to identify key areas for improvement."
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Questions & Feedback */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-blue-600" />
                Detailed Feedback
              </h2>
              <p className="text-gray-600 mb-6">
                Expand each question to see your answer, the correct response, and personalized feedback.
              </p>

              {feedbackList.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Collapsible className="w-full">
                    <CollapsibleTrigger className="w-full">
                      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-start gap-4 flex-1">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600 font-semibold">{index + 1}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-800 text-left line-clamp-2">
                                  {item.question}
                                </h3>
                                <div className="flex items-center gap-3 mt-2">
                                  <Badge 
                                    variant={getRatingBadgeVariant(item.rating)}
                                    className="gap-1"
                                  >
                                    <Star className="w-3 h-3 fill-current" />
                                    {item.rating}/10
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0 transition-transform duration-200" />
                          </div>
                        </CardContent>
                      </Card>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <Card className="border-0 shadow-lg mt-2 bg-white/90 backdrop-blur-sm">
                        <CardContent className="p-6 space-y-4">
                          {/* Rating */}
                          <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-red-50 to-orange-50 border border-red-100">
                            <Star className="w-5 h-5 text-red-500" />
                            <div>
                              <h4 className="font-semibold text-red-700">Performance Rating</h4>
                              <p className="text-red-600">Score: <strong>{item.rating}/10</strong></p>
                            </div>
                          </div>

                          {/* Your Answer */}
                          <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                            <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                              <Target className="w-4 h-4" />
                              Your Answer
                            </h4>
                            <p className="text-blue-800 leading-relaxed">{item.userAns}</p>
                          </div>

                          {/* Correct Answer */}
                          <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                            <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              Suggested Answer
                            </h4>
                            <p className="text-green-800 leading-relaxed">{item.correctAns}</p>
                          </div>

                          {/* Feedback */}
                          <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                            <h4 className="font-semibold text-purple-700 mb-2 flex items-center gap-2">
                              <Lightbulb className="w-4 h-4" />
                              AI Feedback & Improvement Tips
                            </h4>
                            <p className="text-purple-800 leading-relaxed">{item.feedback}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </CollapsibleContent>
                  </Collapsible>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
            >
              <Button 
                onClick={() => router.replace("/dashboard")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
                size="lg"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.reload()}
                className="gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Review Again
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Feedback;