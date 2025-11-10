import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Briefcase, Calendar, Zap, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

const QuestionItemCard = ({ question }) => {
  const router = useRouter();
  
  const onStart = () => {
    router.push("/dashboard/pyq/" + question?.mockId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getExperienceColor = (experience) => {
    const exp = parseInt(experience);
    if (exp >= 5) return "bg-red-100 text-red-700 border-red-200";
    if (exp >= 3) return "bg-orange-100 text-orange-700 border-orange-200";
    if (exp >= 1) return "bg-yellow-100 text-yellow-700 border-yellow-200";
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
                {question?.jobPosition}
              </CardTitle>
            </div>
            <Badge 
              variant="outline" 
              className={`${getExperienceColor(question?.jobExperience)} text-xs font-medium`}
            >
              {question?.jobExperience} YOE
            </Badge>
          </div>
          <CardDescription className="flex items-center gap-1 text-sm">
            <Calendar className="w-3 h-3" />
            Created {formatDate(question.createdAt)}
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-3">
          <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
            <Zap className="w-3 h-3 text-yellow-500" />
            <span>AI-powered practice questions</span>
          </div>
          
          {/* Quick Stats */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1 text-gray-500">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span>Customized</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center gap-1 text-gray-500">
              <span>Personalized</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-2">
          <Button 
            onClick={onStart}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md group-hover:shadow-lg transition-all duration-300 gap-2"
            size="sm"
          >
            <Zap className="w-4 h-4" />
            Start Practice
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default QuestionItemCard;