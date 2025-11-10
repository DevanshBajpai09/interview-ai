"use client";
import React from "react";
import PricingPlan from "../_components/PricingPlan";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, Star, Shield, Users, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Upgrade = () => {
  const { user } = useUser();

  const features = [
    { icon: <Zap className="w-4 h-4" />, text: "Unlimited AI Mock Interviews" },
    { icon: <Users className="w-4 h-4" />, text: "Priority Support" },
    { icon: <Shield className="w-4 h-4" />, text: "Advanced Analytics" },
    { icon: <Star className="w-4 h-4" />, text: "Custom Question Sets" },
    { icon: <Clock className="w-4 h-4" />, text: "24/7 Access" },
    { icon: <Sparkles className="w-4 h-4" />, text: "Real-time Feedback" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent">
              Upgrade Your Experience
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            Unlock premium features and take your interview preparation to the next level
          </p>
          
          {/* Testing Mode Badge */}
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 px-4 py-1 text-sm">
            Testing Mode - Special Launch Pricing
          </Badge>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="flex flex-col items-center text-center p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-200/50"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-purple-600 mb-2">
                {feature.icon}
              </div>
              <span className="text-xs font-medium text-gray-700 leading-tight">
                {feature.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {PricingPlan.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className={`border-0 shadow-xl h-full transition-all duration-300 ${
                plan.duration === 'Yearly' 
                  ? 'bg-gradient-to-br from-purple-50 to-pink-50/50 ring-2 ring-purple-200 scale-105' 
                  : 'bg-white/70 backdrop-blur-sm'
              }`}>
                <CardHeader className="text-center pb-4">
                  {plan.duration === 'Yearly' && (
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white mb-2 mx-auto">
                      🎉 Best Value
                    </Badge>
                  )}
                  <CardTitle className="flex items-center justify-center gap-2 text-2xl text-gray-800">
                    {plan.duration === 'Yearly' && <Crown className="w-5 h-5 text-yellow-500" />}
                    {plan.duration} Plan
                    {plan.duration === 'Yearly' && <Crown className="w-5 h-5 text-yellow-500" />}
                  </CardTitle>
                  <CardDescription>
                    Perfect for {plan.duration === 'Monthly' ? 'getting started' : 'serious preparation'}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Price */}
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ${plan.price}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {plan.duration === 'Monthly' ? '/month' : '/year'}
                      </span>
                    </div>
                    {plan.duration === 'Yearly' && (
                      <p className="text-green-600 text-sm font-medium mt-1">
                        Save ${(7.99 * 12 - 49).toFixed(2)} annually
                      </p>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">{feature.text}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Additional Perks */}
                  {plan.duration === 'Yearly' && (
                    <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-amber-50/50 border border-yellow-200">
                      <div className="flex items-center gap-2 text-amber-700 text-sm">
                        <Sparkles className="w-4 h-4" />
                        <span className="font-medium">Bonus: Free 14-day trial included</span>
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter>
                  <a
                    href={plan.link + "?prefilled_email=" + user?.primaryEmailAddress?.emailAddress}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button 
                      className={`w-full gap-2 ${
                        plan.duration === 'Yearly'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg'
                          : 'bg-white text-purple-600 border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300'
                      }`}
                      size="lg"
                    >
                      <Crown className="w-4 h-4" />
                      Get Started
                      {plan.duration === 'Yearly' && <Sparkles className="w-4 h-4" />}
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Guarantee Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-cyan-50/50 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-800">30-Day Money-Back Guarantee</h3>
                  <p className="text-gray-600 text-sm">
                    Not satisfied? Get a full refund within 30 days. No questions asked.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Upgrade;