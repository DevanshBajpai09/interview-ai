"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { chatSession } from "@/utils/GeminiAIModal";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { Question } from "@/utils/schema";
import { useRouter } from "next/navigation";

const AddQuestions = () => {
  const [openDailog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [typeQuestion, setTypeQuestion] = useState("");
  const [company, setCompany] = useState("");
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [questionJsonResponse, setQuestionJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();
  const handleInputChange = (setState) => (e) => {
    setState(e.target.value);
  };

  const onSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    console.log(
      "Data",
      jobPosition,
      jobDesc,
      typeQuestion,
      company,
      jobExperience
    );

    const InputPrompt = `
      Job Position: ${jobPosition},
      Job Description: ${jobDesc},
      Years of Experience: ${jobExperience},
      Type of Questions: ${typeQuestion},
      Target Company: ${company},
      Based on this information, please provide exactly 5 interview questions with answers.
      ⚠️ Respond ONLY in pure JSON array format:
      [
        { "Question": "Your question here", "Answer": "Your answer here" },
        ...
      ]
      Do NOT include any text, markdown, or comments outside the JSON.
    `;

    console.log("InputPrompt:", InputPrompt);

    // 🧠 Get response from Gemini
    const result = await chatSession.sendMessage(InputPrompt);

    // 🧹 Clean response text
    let MockQuestionJsonResp = result.response
      .text()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/[\u0000-\u001F]+/g, "")
      .trim();

    // 🧪 Try to parse and re-stringify to confirm validity
    let parsedJSON;
    try {
      parsedJSON = JSON.parse(MockQuestionJsonResp);
    } catch (error) {
      console.warn("Gemini returned invalid JSON. Trying auto-fix...");

      // Auto-fix attempt if response was truncated
      if (MockQuestionJsonResp.startsWith("[") && !MockQuestionJsonResp.endsWith("]")) {
        MockQuestionJsonResp += "]";
      }

      // Try again
      try {
        parsedJSON = JSON.parse(MockQuestionJsonResp);
      } catch (finalError) {
        console.error("❌ Still invalid JSON after cleanup:", finalError);
        alert("AI returned invalid data. Please try again.");
        setLoading(false);
        return;
      }
    }

    // ✅ JSON is valid now, re-stringify cleanly
    const cleanJson = JSON.stringify(parsedJSON, null, 2);

    // Insert into database
    const resp = await db
      .insert(Question)
      .values({
        mockId: uuidv4(),
        MockQuestionJsonResp: cleanJson,
        jobPosition: jobPosition,
        jobDesc: jobDesc,
        jobExperience: jobExperience,
        typeQuestion: typeQuestion,
        company: company,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("YYYY-MM-DD"),
      })
      .returning({ mockId: Question.mockId });

    console.log("Inserted ID:", resp);

    if (resp) {
      setOpenDialog(false);
      router.push("/dashboard/pyq/" + resp[0]?.mockId);
    }
  } catch (error) {
    console.error("Failed to save questions:", error);
    alert("There was an error processing the data. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <div
        className="p-10 rounded-lg border bg-secondary hover:scale-105 hover:shadow-sm transition-all cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className=" text-lg text-center">+ Add New Questions</h2>
      </div>

      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>What model questions are you seeking</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div className="my-3">
                  <h2>
                    Add Details about your job position, job descritpion and
                    years of experience
                  </h2>

                  <div className="mt-7 my-3">
                    <label className="text-black">Job Role/job Position</label>
                    <Input
                      className="mt-1"
                      value={jobPosition}
                      placeholder="Ex. Full stack Developer"
                      required
                      onChange={handleInputChange(setJobPosition)}
                    />
                  </div>
                  <div className="my-4">
                    <label className="text-black">
                      Job Description/ Tech stack (In Short)
                    </label>
                    <Textarea
                      className="placeholder-opacity-50"
                      value={jobDesc}
                      placeholder="Ex. React, Angular, Nodejs, Mysql, Nosql, Python"
                      required
                      onChange={handleInputChange(setJobDesc)}
                    />
                  </div>
                  <div className="my-4">
                    <label className="text-black">
                      Type of Questions (In Short)
                    </label>
                    <Input
                      className="placeholder-opacity-50"
                      value={typeQuestion}
                      placeholder="Ex. CPP, Leetcode, Domain based"
                      required
                      onChange={handleInputChange(setTypeQuestion)}
                    />
                  </div>
                  <div className="my-4">
                    <label className="text-black">
                      Company are you seeking
                    </label>
                    <Input
                      className="mt-1"
                      value={company}
                      placeholder="Ex. Microsoft, Apple, Google, Mercedes"
                      required
                      onChange={handleInputChange(setCompany)}
                    />
                  </div>
                  <div className="my-4">
                    <label className="text-black">Years of Experience</label>
                    <Input
                      className="mt-1"
                      placeholder="Ex. 5"
                      value={jobExperience}
                      max="50"
                      type="number"
                      required
                      onChange={handleInputChange(setJobExperience)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="goast"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating From AI
                      </>
                    ) : (
                      "Prep. Questions"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddQuestions;
