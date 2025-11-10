"use client";
import { Lightbulb, Volume2, HelpCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // 🧠 Stop speech when user changes question
  useEffect(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [activeQuestionIndex]);

  const textToSpeech = (text) => {
    if (!("speechSynthesis" in window)) {
      alert("Sorry, your browser does not support text to speech.");
      return;
    }

    const synth = window.speechSynthesis;

    // 🛑 Stop if already speaking
    if (synth.speaking || synth.paused) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    // 🗣️ Otherwise, start speaking
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.lang = "en-US";

    speech.onstart = () => setIsSpeaking(true);
    speech.onend = () => setIsSpeaking(false);
    speech.onerror = () => setIsSpeaking(false);

    synth.speak(speech);
  };

  if (!mockInterviewQuestion) {
    return (
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardContent className="p-8 text-center">
          <HelpCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <p className="text-gray-600">Loading questions...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Question Navigation */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Question Navigation
          </CardTitle>
          <CardDescription>
            Click on any question to navigate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {mockInterviewQuestion.map((question, index) => (
              <Badge
                key={index}
                variant={activeQuestionIndex === index ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-200 ${
                  activeQuestionIndex === index
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-50 hover:scale-105"
                } px-4 py-2 rounded-full font-medium`}
              >
                Q{index + 1}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Question */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {activeQuestionIndex + 1}
              </div>
              <span className="bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                Current Question
              </span>
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.Question)}
              className={`gap-2 border-blue-200 transition-all ${
                isSpeaking ? "bg-blue-100" : "hover:bg-blue-50"
              }`}
            >
              <Volume2 className="w-4 h-4 text-blue-600" />
              {isSpeaking ? "Stop" : "Listen"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <p className="text-lg text-gray-800 leading-relaxed">
              {mockInterviewQuestion[activeQuestionIndex]?.Question}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Note Section */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50/50 border-amber-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-amber-800 text-lg">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            Important Note
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-amber-700 leading-relaxed text-sm">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE ||
              "Take your time to think before answering. Structure your response clearly and provide specific examples from your experience."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionSection;
