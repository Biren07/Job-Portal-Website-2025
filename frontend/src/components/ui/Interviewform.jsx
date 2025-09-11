import React, { useState } from "react";

export default function InterviewForm({ onSubmit }) {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArray = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    onSubmit({ role, skills: skillsArray, bio });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 space-y-4 bg-white shadow-md rounded-lg border border-gray-200"
    >
      <div>
        <label className="block font-medium">Role</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g. Frontend Developer"
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block font-medium">Skills (comma separated)</label>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="e.g. React, Node.js"
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block font-medium">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself"
          className="w-full border rounded p-2"
          rows="3"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Generate Questions
      </button>
    </form>
  );
}
