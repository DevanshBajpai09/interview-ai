"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, Camera, Rocket, Briefcase, FileText, Award, ArrowRight } from "lucide-react";
import Webcam from "react-webcam";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useContext } from 'react';
import { WebCamContext } from "../../layout";
import { motion } from "framer-motion";

const Interview = ({ params }) => {
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const [interviewData, setInterviewData] = useState();
  
  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
      
    setInterviewData(result[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              Interview Setup
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Review your interview details and configure your setup before starting
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Interview Details */}
          <div className="space-y-6">
            {/* Job Details Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    Interview Details
                  </CardTitle>
                  <CardDescription>
                    Position information and requirements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-50/50 border border-blue-100">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-1">Job Position</h3>
                      <p className="text-gray-900 text-lg">{interviewData?.jobPosition}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-purple-50/50 border border-purple-100">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-1">Job Description & Tech Stack</h3>
                      <p className="text-gray-900">{interviewData?.jobDesc}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-green-50/50 border border-green-100">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-1">Experience Required</h3>
                      <p className="text-gray-900 text-lg">{interviewData?.jobExperience} years</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Information Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-50 to-orange-50/50 border-amber-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-amber-800">
                    <Lightbulb className="w-5 h-5 text-amber-600" />
                    Important Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-amber-700 leading-relaxed">
                      {process.env.NEXT_PUBLIC_INFORMATION}
                    </p>
                    <div className="flex items-center gap-2 text-amber-600 text-sm">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      Ensure stable internet connection
                    </div>
                    <div className="flex items-center gap-2 text-amber-600 text-sm">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      Use a quiet environment for best results
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Webcam Setup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm h-full">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
                  <Camera className="w-5 h-5 text-blue-600" />
                  Camera Setup
                </CardTitle>
                <CardDescription>
                  Configure your camera for the interview session
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-6">
                {/* Webcam Preview */}
                <div className="relative w-full max-w-md">
                  <div className={`rounded-2xl overflow-hidden border-2 ${
                    webCamEnabled 
                      ? "border-green-500 shadow-lg shadow-green-500/20" 
                      : "border-gray-300"
                  } transition-all duration-300`}>
                    {webCamEnabled ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full bg-black"
                      >
                        <Webcam
                          onUserMedia={() => setWebCamEnabled(true)}
                          height={320}
                          width={480}
                          mirrored={true}
                          className="w-full h-80 object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-green-500 text-white animate-pulse">
                            LIVE
                          </Badge>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center p-12 bg-gray-100 h-80"
                      >
                        <Camera className="w-16 h-16 text-gray-400 mb-4" />
                        <p className="text-gray-500 font-medium text-center mb-2">
                          Camera Disabled
                        </p>
                        <p className="text-gray-400 text-sm text-center">
                          Enable camera for realistic interview practice
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Camera Toggle Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full max-w-md"
                >
                  <Button
                    onClick={() => setWebCamEnabled((prev) => !prev)}
                    variant={webCamEnabled ? "outline" : "default"}
                    className="w-full h-12 text-base font-medium gap-3"
                  >
                    {webCamEnabled ? (
                      <>
                        <Camera className="w-5 h-5" />
                        Disable Camera
                      </>
                    ) : (
                      <>
                        <Camera className="w-5 h-5" />
                        Enable Camera
                      </>
                    )}
                  </Button>
                </motion.div>

                {/* Status Indicator */}
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge 
                    variant="outline" 
                    className={`gap-2 ${
                      webCamEnabled 
                        ? "text-green-600 border-green-200 bg-green-50" 
                        : "text-gray-600"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      webCamEnabled ? "bg-green-600" : "bg-gray-400"
                    }`} />
                    Camera {webCamEnabled ? "Active" : "Ready"}
                  </Badge>
                  <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    Audio Ready
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Start Interview Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <Link href={"/dashboard/interview/" + params.interviewId + "/start"} className="w-full max-w-md">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl gap-3">
                <Rocket className="w-5 h-5" />
                Start Interview Session
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Interview;