"use client";
import Head from "next/head";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, MessageCircle, Star, Zap, Target, Award, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      id: "item-1",
      step: "01",
      title: "Prepare for the Interview",
      description: "Get ready by selecting the type of interview and providing details about the job position.",
      icon: <Target className="w-6 h-6" />,
      features: ["Choose job role & experience level", "Select interview type", "Customize question set"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "item-2",
      step: "02",
      title: "Start the AI Interview",
      description: "Our AI will ask you a series of questions and evaluate your responses in real-time.",
      icon: <MessageCircle className="w-6 h-6" />,
      features: ["Real-time voice recording", "Webcam integration", "AI-powered questioning"],
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "item-3",
      step: "03",
      title: "Receive Detailed Feedback",
      description: "Get comprehensive feedback on your performance, including strengths and areas for improvement.",
      icon: <Star className="w-6 h-6" />,
      features: ["Performance ratings", "Personalized suggestions", "Answer comparisons"],
      color: "from-green-500 to-emerald-500"
    }
  ];

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered",
      description: "Advanced AI analyzes your responses in real-time"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Personalized",
      description: "Customized questions based on your target role"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Professional",
      description: "Industry-standard interview questions and evaluation"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Instant Results",
      description: "Get feedback immediately after your interview"
    }
  ];

  return (
    <>
      <Head>
        <title>How It Works - AI Mock Interview</title>
        <meta
          name="description"
          content="Learn how our AI Mock Interview platform works to help you ace your next job interview."
        />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                How It Works
              </h1>
            </div>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-6">
              Master your interview skills with our AI-powered platform. Here's how you can prepare and succeed.
            </p>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-1">
              Simple • Effective • Powerful
            </Badge>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm h-full hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Steps Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800">
                  Your Journey to Interview Success
                </CardTitle>
                <CardDescription className="text-lg">
                  Three simple steps to transform your interview skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-4">
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <AccordionItem
                        value={step.id}
                        className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors duration-200 data-[state=open]:border-blue-500 data-[state=open]:shadow-lg"
                      >
                        <AccordionTrigger className="px-6 py-6 hover:no-underline hover:bg-blue-50/50 transition-colors duration-200 group">
                          <div className="flex items-center gap-6 text-left w-full">
                            <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                              {step.step}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-gray-600">
                                  {step.icon}
                                </div>
                                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                                  {step.title}
                                </h3>
                              </div>
                              <p className="text-gray-600 text-left text-lg">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-4 bg-gray-50/50">
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {step.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200">
                                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  </div>
                                  <span className="text-gray-700 text-sm font-medium">{feature}</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-blue-600">
                              <Sparkles className="w-4 h-4" />
                              <span>Get started with this step to begin your interview preparation</span>
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

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl">
              <CardContent className="p-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Award className="w-8 h-8" />
                  <h2 className="text-3xl font-bold">Ready to Ace Your Interview?</h2>
                </div>
                <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
                  Join thousands of successful candidates who transformed their interview skills with our AI-powered platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                    🚀 No credit card required
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                    ⭐ Start with free trial
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default HowItWorks;