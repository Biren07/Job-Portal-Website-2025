import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm px-10 py-8 mt-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-28 w-28 border-2 border-gray-200">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto ||
                  "https://via.placeholder.com/150"
                }
                alt={user?.fullname || "profile"}
              />
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold">{user?.fullname}</h1>
              <p className="text-gray-600 mt-1">
                {user?.profile?.bio || "No bio added yet."}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="gap-2"
            >
              <Pen size={16} /> Edit Profile
            </Button>
            <Button
              onClick={() => navigate("/saved-jobs")}
              variant="secondary"
              className="gap-2"
            >
              <Bookmark size={16} /> Saved Jobs
            </Button>
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="text-gray-500" size={18} />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="text-gray-500" size={18} />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length > 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-3 py-1 text-sm"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">No skills added.</span>
            )}
          </div>
        </div>

        <div className="mt-8">
          <Label className="text-md font-semibold">Resume</Label>
          {user?.profile?.resume ? (
            <a
              target="_blank"
              rel="noreferrer"
              href={user?.profile?.resume}
              className="block mt-1 text-blue-600 hover:underline"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <p className="text-gray-500">No resume uploaded.</p>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm mt-8 p-6">
        <h2 className="text-xl font-bold mb-4">Applied Jobs</h2>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
