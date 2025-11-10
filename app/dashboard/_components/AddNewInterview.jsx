"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import {
  LoaderCircle,
  Plus,
  Briefcase,
  FileText,
  Award,
  Rocket,
} from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  // ✅ Helper to clean up JSON safely
  const sanitizeJSON = (text) => {
    if (!text) return "";
    return text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/\r/g, "")
      .replace(/\t/g, " ")
      .replace(/[\u0000-\u001F]+/g, "") // removes control characters
      .replace(/\n(?=[^"]*":)/g, "\\n") // escape line breaks inside quotes
      .trim();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Input Data:", jobPosition, jobDesc, jobExperience);

      const InputPrompt = `
      Job Position: ${jobPosition},
      Job Description: ${jobDesc},
      Years of Experience: ${jobExperience}.
      Based on this information, provide exactly 5 interview questions with answers in valid JSON format.
      Ensure the response is a JSON array like this:
      [
        { "Question": "...", "Answer": "..." },
        ...
      ]
      No explanations or extra text. JSON only.
      `;

      // 🧠 Get Gemini response
      const result = await chatSession.sendMessage(InputPrompt);
      let MockJsonResp = result.response.text();

      // 🧹 Sanitize JSON
      MockJsonResp = sanitizeJSON(MockJsonResp);

      // ✅ Validate and parse
      let parsedJson;
      try {
        parsedJson = JSON.parse(MockJsonResp);
        console.log("✅ Clean Parsed JSON:", parsedJson);
      } catch (err) {
        console.error("❌ JSON Parse Failed:", err);
        console.log("🔍 Raw Gemini Output:", MockJsonResp);
        alert(
          "The AI returned malformed JSON. Please try again or refine your input."
        );
        setLoading(false);
        return;
      }

      // 🧭 Insert into DB
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("YYYY-MM-DD"),
        })
        .returning({ mockId: MockInterview.mockId });

      console.log("🧾 Inserted Mock ID:", resp);

      if (resp && resp[0]?.mockId) {
        setOpenDialog(false);
        router.push("/dashboard/interview/" + resp[0].mockId);
      }
    } catch (error) {
      console.error("🔥 Error generating interview:", error);
      alert("Something went wrong while generating the interview.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="h-full"
      >
        <Card
          className="h-full border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer group"
          onClick={() => setOpenDialog(true)}
        >
          <CardContent className="p-8 flex flex-col items-center justify-center h-full min-h-[200px]">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <Plus className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
              New Mock Interview
            </h3>
            <p className="text-gray-600 text-center text-sm">
              Create a personalized AI-powered interview session
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Dialog for New Interview */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
              <Rocket className="w-6 h-6" />
              Create New Interview
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-base">
              Tell us about the position you're interviewing for to generate
              personalized questions
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="space-y-6 mt-4">
            <div className="space-y-6">
              {/* Job Position */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Briefcase className="w-4 h-4" />
                  Job Position *
                </label>
                <Input
                  placeholder="e.g. Full Stack Developer, Data Scientist, Product Manager"
                  required
                  onChange={(e) => setJobPosition(e.target.value)}
                  className="h-12 text-base border-gray-300 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Job Description */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FileText className="w-4 h-4" />
                  Job Description & Tech Stack *
                </label>
                <Textarea
                  placeholder="Describe the role, required technologies, and key responsibilities...
e.g. React, Node.js, PostgreSQL, AWS, microservices architecture, team leadership"
                  required
                  onChange={(e) => setJobDesc(e.target.value)}
                  className="min-h-[120px] resize-y text-base border-gray-300 focus:border-blue-500 transition-colors"
                />
                <p className="text-xs text-gray-500">
                  Be specific about technologies and responsibilities for better
                  questions
                </p>
              </div>

              {/* Experience */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Award className="w-4 h-4" />
                  Years of Experience *
                </label>
                <Input
                  placeholder="e.g. 3"
                  max="50"
                  type="number"
                  required
                  onChange={(e) => setJobExperience(e.target.value)}
                  className="h-12 text-base border-gray-300 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenDialog(false)}
                className="px-6 border-gray-300 hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                    <span>Generating AI Questions...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Rocket className="w-4 h-4" />
                    <span>Start Interview</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
