"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React, { useContext, useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic';
import { Mic, MicOff, Camera, CameraOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { WebCamContext } from "@/app/dashboard/layout";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Use dynamic import for Webcam to avoid SSR issues
const Webcam = dynamic(
  () => import('react-webcam'),
  { ssr: false }
);

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { webCamEnabled, setWebCamEnabled, stream, setStream } = useContext(WebCamContext);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateUserAnswer();
    }
  }, [userAnswer]);

  const enableCamera = async () => {
  try {
    const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    setStream(s);           // save stream to context
    setWebCamEnabled(true); // camera enabled
    toast.success("Camera enabled successfully!");
  } catch (err) {
    toast.error("Camera permission denied.");
    console.error(err);
  }
};

const disableCamera = () => {
  try {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
  } catch (e) {}
  setWebCamEnabled(false);
  toast.info("Camera disabled");
};


  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      toast.success("Recording started... Speak now!");
    } catch (error) {
      console.error("Error starting recording:", error);
      toast.error("Error starting recording. Please check your microphone permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.info("Processing your answer...");
    }
  };

  const transcribeAudio = async (audioBlob) => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result.split(',')[1];
        
        const result = await model.generateContent([
          "Transcribe the following audio:",
          { inlineData: { data: base64Audio, mimeType: "audio/webm" } },
        ]);

        const transcription = result.response.text();
        setUserAnswer((prevAnswer) => prevAnswer + " " + transcription);
        setLoading(false);
      };
    } catch (error) {
      console.error("Error transcribing audio:", error);
      toast.error("Error transcribing audio. Please try again.");
      setLoading(false);
    }
  };

  const updateUserAnswer = async () => {
    try {
      setLoading(true);
      const feedbackPrompt =
        "Question:" +
        mockInterviewQuestion[activeQuestionIndex]?.Question +
        ", User Answer:" +
        userAnswer +
        " , Depends on question and user answer for given interview question" +
        " please give us rating for answer and feedback as area of improvement if any " +
        "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

      const result = await chatSession.sendMessage(feedbackPrompt);

      let MockJsonResp = result.response.text();
      console.log(MockJsonResp);

      MockJsonResp = MockJsonResp.replace("```json", "").replace("```", "");

      let jsonFeedbackResp;
      try {
        jsonFeedbackResp = JSON.parse(MockJsonResp);
      } catch (e) {
        throw new Error("Invalid JSON response: " + MockJsonResp);
      }

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.Question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.Answer,
        userAns: userAnswer,
        feedback: jsonFeedbackResp?.feedback,
        rating: jsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("YYYY-MM-DD"),
      });

      if (resp) {
        toast.success("Answer recorded successfully! 🎉");
      }
      setUserAnswer("");
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while recording the user answer");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Webcam Section */}
      <Card className={`border-0 shadow-xl bg-white/70 backdrop-blur-sm 
  ${!webCamEnabled ? "opacity-60 pointer-events-none" : ""}`}>

        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Camera className="w-5 h-5 text-blue-600" />
            Camera Preview
          </CardTitle>
          <CardDescription>
            {webCamEnabled ? "Camera is active - Maintain professional presence" : "Camera is off - Focus on your answer"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="relative rounded-2xl overflow-hidden border-2 border-blue-200 bg-black w-full max-w-md">
            {webCamEnabled ? (
              <div className="w-full">
                <Webcam
  videoConstraints={{ facingMode: "user" }}
  mirrored={true}
  height={280}
  width={480}
  className="w-full h-80 object-cover"
  audio={false}
  ref={(webcamRef) => {
    // Attach stream to webcam element manually
    if (webcamRef && stream) {
      webcamRef.video.srcObject = stream;
    }
  }}
/>

                <div className="absolute top-3 right-3">
                  <Badge className="bg-green-500 text-white animate-pulse">
                    LIVE
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 bg-gray-100 h-80">
                <CameraOff className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-gray-500 font-medium text-center mb-2">
                  Camera Disabled
                </p>
                <p className="text-gray-400 text-sm text-center">
                  Enable camera for realistic interview practice
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Controls Section */}
      <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Mic className="w-5 h-5 text-green-600" />
            Recording Controls
          </CardTitle>
          <CardDescription>
            Record your answer using the microphone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Webcam Toggle */}
            <Button
  onClick={webCamEnabled ? disableCamera : enableCamera}




              variant={webCamEnabled ? "default" : "outline"}
              className="w-full h-12 text-base font-medium gap-3"
              disabled={loading}
            >
              {webCamEnabled ? (
                <>
                  <CameraOff className="w-5 h-5" />
                  Disable Camera
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5" />
                  Enable Camera
                </>
              )}
            </Button>

            {/* Recording Button */}
            {/* Recording Button */}
<Button
  onClick={isRecording ? stopRecording : startRecording}
  disabled={loading || !webCamEnabled}   // ⬅ ADD THIS
  variant={isRecording ? "destructive" : "default"}
  className={`w-full h-12 text-base font-medium gap-3 relative overflow-hidden 
    ${!webCamEnabled ? "opacity-50 cursor-not-allowed" : ""}`} // ⬅ visual disabled state
>
  {loading ? (
    <>
      <Loader2 className="w-5 h-5 animate-spin" />
      Processing...
    </>
  ) : isRecording ? (
    <>
      <div className="absolute inset-0 bg-red-600 animate-pulse"></div>
      <MicOff className="w-5 h-5 relative z-10" />
      <span className="relative z-10">Stop Recording</span>
    </>
  ) : (
    <>
      <Mic className="w-5 h-5" />
      Start Recording
    </>
  )}
</Button>

          </div>

          {/* Status Indicators */}
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            <Badge 
              variant="outline" 
              className={`gap-2 ${isRecording ? "text-red-600 border-red-200 bg-red-50" : "text-gray-600"}`}
            >
              <div className={`w-2 h-2 rounded-full ${isRecording ? "bg-red-600 animate-pulse" : "bg-gray-400"}`} />
              {isRecording ? "Recording Audio" : "Audio Ready"}
            </Badge>
            
            <Badge 
              variant="outline" 
              className={`gap-2 ${webCamEnabled ? "text-green-600 border-green-200 bg-green-50" : "text-gray-600"}`}
            >
              <div className={`w-2 h-2 rounded-full ${webCamEnabled ? "bg-green-600" : "bg-gray-400"}`} />
              {webCamEnabled ? "Camera Active" : "Camera Off"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecordAnswerSection;