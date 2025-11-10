"use client";

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Head from 'next/head'
import Contect from './_components/Contect'
import Link from 'next/link'
import { FaGithub, FaStar, FaRocket, FaChartLine, FaUsers, FaAward, FaQuoteLeft } from "react-icons/fa"
import { motion } from 'framer-motion'
import { SiNextdotjs, SiTailwindcss, SiOpenai } from "react-icons/si"

const page = () => {
  const features = [
    {
      icon: <FaRocket className="w-8 h-8" />,
      title: "AI Mock Interviews",
      description: "Experience realistic interview scenarios with our advanced AI technology."
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Instant Feedback",
      description: "Get immediate, personalized feedback to improve your performance."
    },
    {
      icon: <FaAward className="w-8 h-8" />,
      title: "Comprehensive Reports",
      description: "Receive detailed analysis highlighting your strengths and areas for improvement."
    }
  ]

  const testimonials = [
    {
      quote: "The AI mock interviews were incredibly helpful. I felt much more confident going into my real interview and ultimately got the job!",
      name: "Alex Johnson",
      role: "Software Engineer"
    },
    {
      quote: "The feedback was spot on and helped me improve my answers significantly. Highly recommend this service!",
      name: "Sarah Williams",
      role: "Product Manager"
    },
    {
      quote: "As someone who gets nervous in interviews, this platform was a game-changer. The practice made me so much more comfortable.",
      name: "Michael Chen",
      role: "Data Scientist"
    }
  ]

  const stats = [
    { number: "10,000+", label: "Interviews Conducted" },
    { number: "95%", label: "User Satisfaction" },
    { number: "3x", label: "More Confidence" },
    { number: "87%", label: "Success Rate" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Head>
        <title>AI Mock Interview | Ace Your Next Interview</title>
        <meta name="description" content="Ace your next interview with AI-powered mock interviews and personalized feedback" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        {/* Header Section */}
        <header className="w-full py-6 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Mock Interview
              </h1>
            </motion.div>
            
            <nav className="flex items-center space-x-4 mt-4 md:mt-0">
              

              

              <div className="hidden md:flex items-center space-x-6">
                {['Features', 'Testimonials', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge className="mb-4 px-4 py-1 bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200">
                🚀 Powered by Advanced AI
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
                Ace Your Next Interview
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Practice with <span className="font-semibold text-blue-600">AI-powered mock interviews</span> and get 
                personalized feedback to land your dream job
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/dashboard">
                    <Button className="px-8 py-3 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                      Start Free Practice
                    </Button>
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a href="#features">
                    <Button variant="outline" className="px-8 py-3 text-lg border-2">
                      See How It Works
                    </Button>
                  </a>
                </motion.div>
              </div>

              {/* Tech Stack */}
              <div className="flex items-center justify-center space-x-8 text-gray-500">
                <div className="flex items-center space-x-2">
                  <SiNextdotjs className="w-5 h-5" />
                  <span className="text-sm">Next.js</span>
                </div>
                <div className="flex items-center space-x-2">
                  <SiTailwindcss className="w-5 h-5 text-blue-500" />
                  <span className="text-sm">Tailwind</span>
                </div>
                <div className="flex items-center space-x-2">
                  <SiOpenai className="w-5 h-5" />
                  <span className="text-sm">OpenAI</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white border-y border-gray-200">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-4">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to prepare for your next interview and stand out from the competition
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm">
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                          {feature.icon}
                        </div>
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-800">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 text-center text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent mb-4">
                Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Hear from our users who transformed their interview skills and landed their dream jobs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
                    <CardContent className="p-6">
                      <div className="flex items-start mb-4">
                        <FaQuoteLeft className="w-6 h-6 text-blue-500 mr-2 flex-shrink-0 mt-1" />
                        <p className="text-gray-700 italic text-lg">
                          {testimonial.quote}
                        </p>
                      </div>
                      <div className="mt-6">
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-gray-600 text-sm">{testimonial.role}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Ace Your Interview?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of successful candidates who transformed their interview skills with AI-powered practice
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/dashboard">
                  <Button className="px-8 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100 font-semibold shadow-2xl">
                    Start Your Journey Now
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <Contect />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded"></div>
                <span className="text-xl font-bold">AI Mock Interview</span>
              </div>
              <p className="text-gray-400">Empowering candidates worldwide</p>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 AI Mock Interview. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default page