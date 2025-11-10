"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import InterviewItemCard from "./InterviewItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { History, Calendar, Briefcase } from "lucide-react";

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(MockInterview)
        .where(
          eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(MockInterview.id));

      console.log(result);
      setInterviewList(result);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <History className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Previous Interviews</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-3/4 bg-gray-300" />
                  <Skeleton className="h-3 w-1/2 bg-gray-300" />
                  <Skeleton className="h-3 w-2/3 bg-gray-300" />
                  <div className="flex gap-2 pt-2">
                    <Skeleton className="h-6 w-16 bg-gray-300 rounded-full" />
                    <Skeleton className="h-6 w-20 bg-gray-300 rounded-full" />
                  </div>
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
          <div className="p-2 bg-blue-100 rounded-lg">
            <History className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Interview History</h2>
            <p className="text-gray-600 text-sm">
              {interviewList.length} interview{interviewList.length !== 1 ? 's' : ''} completed
            </p>
          </div>
        </div>
        
        {interviewList.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Sorted by latest</span>
          </div>
        )}
      </div>

      {/* Interview List */}
      {interviewList.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {interviewList.map((interview, index) => (
            <motion.div
              key={interview.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <InterviewItemCard interview={interview} />
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
                <Briefcase className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Interviews Yet
              </h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                Start your first mock interview to see your practice sessions here.
                Track your progress and improve over time.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default InterviewList;