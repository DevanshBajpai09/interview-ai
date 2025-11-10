import React from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from 'next/navigation';
import { Calendar, Briefcase, Award, Play, BarChart3, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const InterviewItemCard = ({ interview }) => {
    const router = useRouter()
    
    const onStart = () => {
        router.push("/dashboard/interview/" + interview?.mockId)
    }
    
    const onFeedback = () => {
        router.push("/dashboard/interview/" + interview?.mockId + "/feedback")
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getExperienceColor = (experience) => {
        const exp = parseInt(experience);
        if (exp >= 8) return "bg-red-100 text-red-700 border-red-200";
        if (exp >= 5) return "bg-orange-100 text-orange-700 border-orange-200";
        if (exp >= 3) return "bg-yellow-100 text-yellow-700 border-yellow-200";
        return "bg-green-100 text-green-700 border-green-200";
    };

    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50/30 h-full group">
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <Briefcase className="w-4 h-4 text-white" />
                            </div>
                            <CardTitle className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {interview?.jobPosition}
                            </CardTitle>
                        </div>
                        <Badge 
                            variant="outline" 
                            className={`${getExperienceColor(interview?.jobExperience)} text-xs font-medium`}
                        >
                            <Award className="w-3 h-3 mr-1" />
                            {interview?.jobExperience} YOE
                        </Badge>
                    </div>
                    
                    <CardDescription className="flex items-center gap-1 text-sm">
                        <Calendar className="w-3 h-3" />
                        Created {formatDate(interview.createdAt)}
                    </CardDescription>
                </CardHeader>

                <CardContent className="pb-3">
                    {/* Quick Stats */}
                    <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>AI-Powered</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Ready</span>
                        </div>
                    </div>

                    {/* Job Description Preview */}
                    {interview?.jobDesc && (
                        <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <p className="text-xs text-gray-600 line-clamp-2">
                                {interview.jobDesc}
                            </p>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="pt-2">
                    <div className="flex gap-2 w-full">
                        <Button 
                            onClick={onFeedback}
                            variant="outline"
                            className="flex-1 gap-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                            size="sm"
                        >
                            <BarChart3 className="w-3 h-3" />
                            Results
                        </Button>
                        <Button 
                            onClick={onStart}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md group-hover:shadow-lg transition-all duration-300 gap-2"
                            size="sm"
                        >
                            <Play className="w-3 h-3" />
                            Start
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

export default InterviewItemCard