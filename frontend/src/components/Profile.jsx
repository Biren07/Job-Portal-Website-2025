import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, Bookmark } from "lucide-react"; // Add Bookmark icon
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import navigate
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="max-w-300 mx-auto bg-white border border-gray-200 rounded-2xl px-10 py-6">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-40 w-40">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => setOpen(true)}
              className="text-right"
              variant="outline"
            >
              <Pen /> Edit
            </Button>
            {/* ✅ Saved Jobs Button */}
            <Button
              onClick={() => navigate("/saved-jobs")}
              className="text-right"
              variant="secondary"
            >
              <Bookmark className="mr-2" /> Saved Jobs
            </Button>
          </div>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              rel="noreferrer"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl mt-6 p-4">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
