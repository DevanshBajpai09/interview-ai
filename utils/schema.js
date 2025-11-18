import { serial, text, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
  id: serial('id').primaryKey(),
  jsonMockResp: text('jsonmockresp').notNull(),
  jobPosition: varchar('jobposition').notNull(),
  jobDesc: varchar('jobdesc').notNull(),
  jobExperience: varchar('jobexperience').notNull(),
  createdBy: varchar('createdby').notNull(),
  createdAt: varchar('createdat'),
  mockId: varchar('mockid').notNull(),

  // NEW FIELDS
  completed: varchar("completed"),  
  completedReason: text("completed_reason"),
});



export const Question = pgTable("question", {
  id: serial("id").primaryKey(),
  MockQuestionJsonResp: text("mockquestionjsonresp").notNull(),
  jobPosition: varchar("jobposition").notNull(),
  jobDesc: varchar("jobdesc").notNull(),
  jobExperience: varchar("jobexperience").notNull(),
  typeQuestion: varchar("typequestion").notNull(),
  company: varchar("company").notNull(),
  createdBy: varchar("createdby").notNull(),
  createdAt: varchar("createdat"),
  mockId: varchar("mockid").notNull(),
});



export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockidref").notNull(),
  question: varchar("question").notNull(),
  correctAns: text("correctans"),
  userAns: text("userans"),
  feedback: text("feedback"),
  rating: varchar("rating"),
  userEmail: varchar("useremail"),
  createdAt: varchar("createdat"),
});

export const Newsletter = pgTable("newsletter", {
  id: serial("id").primaryKey(),
  newName: varchar("newname"),
  newEmail: varchar("newemail"),
  newMessage: text("newmessage"),
  createdAt: varchar("createdat"),
});

export const ProctorLog = pgTable("proctor_log", {
  id: serial("id").primaryKey(),
  interviewId: varchar("interview_id").notNull(),
  reason: text("reason").notNull(),
  meta: text("meta"),
  timestamp: varchar("timestamp").notNull(),
});


export const Heartbeat = pgTable("proctor_heartbeat", {
  id: serial("id").primaryKey(),
  interviewId: varchar("interview_id").notNull(),
  timestamp: varchar("timestamp").notNull(),
});

