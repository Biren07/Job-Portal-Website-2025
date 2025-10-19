import React from "react";

export default function InterviewResults({ questions }) {
  if (!questions) return null;

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-semibold mb-2 text-center">
        Generated Interview Questions:
      </h2>
      <pre className="whitespace-pre-wrap ">{questions}</pre>
    </div>
  );
}
