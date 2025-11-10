"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { db } from "@/utils/db";
import { Question } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileQuestion, HelpCircle, BookOpen, Lightbulb, ArrowLeft, Copy, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Page = ({ params }) => {
  const [questionData, setQuestionData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (params?.pyqId) {
      getQuestionDetails();
    }
  }, [params?.pyqId]);

  const getQuestionDetails = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(Question)
        .where(eq(Question.mockId, params.pyqId));

      if (!result || result.length === 0) {
        setError("No questions found for this practice session.");
        return;
      }

      let raw = result[0].MockQuestionJsonResp;

      // 🧹 Clean hidden characters and code fences
      raw = raw
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .replace(/[\u0000-\u001F]+/g, "")
        .trim();

      // Debug: see the last 200 chars
      console.log("Cleaned JSON (end):", raw.slice(-200));

      // ✅ Try to safely parse JSON
      let parsed = [];
      try {
        parsed = JSON.parse(raw);
      } catch (err) {
        console.error("❌ JSON parse error:", err);
        setError("Invalid or corrupted data in database.");
        return;
      }

      setQuestionData(parsed);
    } catch (err) {
      console.error("❌ DB fetch error:", err);
      setError("Failed to fetch question details.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4 flex items-center justify-center">
        <Card className="border-0 shadow-xl max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <FileQuestion className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Questions</h3>
            <p className="text-gray-600">Preparing your practice session...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4 flex items-center justify-center">
        <Card className="border-0 shadow-xl max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Questions</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <Button 
              onClick={() => router.back()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!questionData || questionData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4 flex items-center justify-center">
        <Card className="border-0 shadow-xl max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Questions Available</h3>
            <p className="text-gray-600 mb-6">This practice session doesn't contain any questions yet.</p>
            <Button 
              onClick={() => router.back()}
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to List
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <FileQuestion className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              Practice Questions
            </h1>
          </div>
          <p className="text-gray-600 text-lg mb-6">
            Review and practice with your personalized question set
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 gap-2">
              <BookOpen className="w-3 h-3" />
              {questionData.length} Questions
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-2">
              <Lightbulb className="w-3 h-3" />
              AI-Generated
            </Badge>
          </div>
        </motion.div>

        {/* Tips Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-0 bg-gradient-to-br from-amber-50 to-orange-50/50 border-amber-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">Practice Tips</h4>
                  <ul className="text-amber-700 text-sm space-y-1">
                    <li>• Read each question carefully before checking the answer</li>
                    <li>• Try to answer out loud as if in a real interview</li>
                    <li>• Use the copy feature to save important insights</li>
                    <li>• Practice regularly to improve your responses</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Questions Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl text-gray-800">
                <BookOpen className="w-6 h-6 text-blue-600" />
                Question Bank
              </CardTitle>
              <CardDescription>
                Click on each question to reveal the suggested answer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                {questionData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <AccordionItem
                      value={`item-${index + 1}`}
                      className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors duration-200 bg-white"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-blue-50/50 transition-colors duration-200 group">
                        <div className="flex items-start gap-4 text-left">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 flex-shrink-0 mt-1">
                            Q{index + 1}
                          </Badge>
                          <span className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors text-lg">
                            {item?.Question || "Untitled Question"}?
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 pt-2 bg-gray-50/50">
                        <div className="space-y-4">
                          {/* Answer Section */}
                          <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50/50 border border-green-200">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-green-800 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                Suggested Answer
                              </h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(item?.Answer, index)}
                                className="h-8 px-2 hover:bg-green-100"
                              >
                                {copiedIndex === index ? (
                                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4 text-green-600" />
                                )}
                              </Button>
                            </div>
                            <p className="text-green-800 leading-relaxed whitespace-pre-wrap">
                              {item?.Answer || "No answer provided."}
                            </p>
                          </div>

                          {/* Practice Tip */}
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Lightbulb className="w-4 h-4 text-amber-500" />
                            <span>Try to formulate your own answer before revealing this one</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <Button 
            onClick={() => router.back()}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Questions
          </Button>
          <Button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
          >
            <FileQuestion className="w-4 h-4" />
            Review Again
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;