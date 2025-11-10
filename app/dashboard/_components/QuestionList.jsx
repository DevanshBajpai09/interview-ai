"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { Question } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import QuestionItemCard from "./QuestionItemCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileQuestion, History, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";

const QuestionList = () => {
  const { user } = useUser();
  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user && GetQuestionList();
  }, [user]);

  const GetQuestionList = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(Question)
        .where(eq(Question.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Question.id));

      console.log(result);
      setQuestionList(result);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <FileQuestion className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Your Questions</h2>
            <p className="text-gray-600">Loading your practice sessions...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="border-0 shadow-lg animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-9 bg-gray-300 rounded mt-4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <FileQuestion className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Practice Questions</h2>
            <p className="text-gray-600">
              {questionList.length} question set{questionList.length !== 1 ? 's' : ''} created
            </p>
          </div>
        </div>
        
        {questionList.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Sorted by latest</span>
          </div>
        )}
      </div>

      {/* Questions Grid */}
      {questionList.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {questionList.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <QuestionItemCard question={question} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-2 border-dashed border-gray-300 bg-gray-50/50">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileQuestion className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Questions Yet
              </h3>
              <p className="text-gray-500 max-w-sm mx-auto mb-6">
                Start creating your first set of practice questions to improve your interview skills.
              </p>
              <Badge variant="outline" className="bg-white">
                <User className="w-3 h-3 mr-1" />
                Ready when you are
              </Badge>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Stats Summary */}
      {questionList.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4 mt-8"
        >
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
            <History className="w-3 h-3 mr-1" />
            {questionList.length} total sets
          </Badge>
          <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
            <Calendar className="w-3 h-3 mr-1" />
            Latest: {questionList[0]?.createdAt}
          </Badge>
        </motion.div>
      )}
    </div>
  );
};

export default QuestionList;