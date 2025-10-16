import React, { useState } from "react";
import InterviewForm from "./ui/Interviewform";
import InterviewResults from "./ui/InterviewResult";
import { getInterviewQuestions } from "../utils/interviewApi.js";
import Navbar from "./shared/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export default function InterviewPage() {
  const [questions, setQuestions] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (formData) => {
    setLoading(true);
    setQuestions("");

    const toastId = toast.loading(
      <span className="flex items-center gap-2">
        <Loader2 className="animate-spin w-5 h-5 text-blue-500" />
        Generating questions...
      </span>
    );

    try {
      const result = await getInterviewQuestions(formData);
      setQuestions(result);

      toast.success(
        <span className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Questions generated successfully!
        </span>,
        { id: toastId }
      );
    } catch (err) {
      console.error(err);

      toast.error(
        <span className="flex items-center gap-2">
          <XCircle className="w-5 h-5 text-red-500" />
          Failed to generate questions. Please try again.
        </span>,
        { id: toastId }
      );
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-10 m-10">
        <h1 className="text-2xl font-bold mb-4 text-center">
          AI Mock Interview Preparation
        </h1>

        {!questions && <InterviewForm onSubmit={handleGenerate} />}

        {questions && <InterviewResults questions={questions} />}
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}
