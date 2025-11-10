"use client";
import { db } from "@/utils/db";
import { Newsletter } from "@/utils/schema";
import { LoaderCircle, Send, Mail, User, MessageCircle, Phone, MapPin } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const Contect = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (setState) => (e) => {
    setState(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (name && email && message) {
      setLoading(true);
      try {
        const resp = await db.insert(Newsletter).values({
          newName: name,
          newEmail: email,
          newMessage: message,
          createdAt: moment().format("YYYY-MM-DD"),
        });

        if (resp) {
          toast.success("Message sent successfully! 🎉", {
            description: "We'll get back to you as soon as possible."
          });
          setName("");
          setEmail("");
          setMessage("");
        } else {
          toast.error("Error sending message", {
            description: "Please try again later."
          });
        }
      } catch (error) {
        console.error(error);
        toast.error("Error sending message", {
          description: "Please try again later."
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast.warning("Please fill in all fields", {
        description: "All fields are required."
      });
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Us",
      description: "support@aimockinterview.com",
      subtitle: "We'll reply within 24 hours"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Call Us",
      description: "+1 (555) 123-4567",
      subtitle: "Mon-Fri from 9am to 6pm"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Visit Us",
      description: "San Francisco, CA",
      subtitle: "Come say hello at our office"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 mb-4">
          Get In Touch
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-4">
          Let's Start a Conversation
        </h2>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
          Have questions about our AI mock interview platform? We're here to help and would love to hear from you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 space-y-6"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{info.title}</h3>
                      <p className="text-gray-900 font-medium">{info.description}</p>
                      <p className="text-gray-500 text-sm mt-1">{info.subtitle}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50/50 border-green-200">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-3">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-green-800 mb-1">Quick Response</h4>
                  <p className="text-green-700 text-sm">Average reply time: 2 hours</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
                <Send className="w-6 h-6 text-blue-600" />
                Send us a Message
              </CardTitle>
              <CardDescription className="text-lg">
                Fill out the form below and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <User className="w-4 h-4" />
                      Your Name *
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={handleInputChange(setName)}
                      className="h-12 text-base border-gray-300 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Mail className="w-4 h-4" />
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={handleInputChange(setEmail)}
                      className="h-12 text-base border-gray-300 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <MessageCircle className="w-4 h-4" />
                    Your Message *
                  </label>
                  <Textarea
                    placeholder="Tell us about your inquiry, feedback, or how we can help you..."
                    value={message}
                    onChange={handleInputChange(setMessage)}
                    className="min-h-[140px] resize-y text-base border-gray-300 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg gap-3"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <LoaderCircle className="w-5 h-5 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.div>

                <p className="text-center text-gray-500 text-sm">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center"
      >
        <Card className="border-0 bg-gradient-to-br from-amber-50 to-orange-50/50 border-amber-200 max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-amber-600">💡</span>
              </div>
              <div>
                <h4 className="font-semibold text-amber-800">Need Immediate Help?</h4>
                <p className="text-amber-700 text-sm">
                  Check out our FAQ section or documentation for quick answers to common questions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Contect;