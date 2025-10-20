import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="w-full">
     
      <div className="hidden sm:block overflow-x-auto">
        <Table className="min-w-[700px]">
          <TableCaption>A list of your recent applied users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants?.applications?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    "NA"
                  )}
                </TableCell>
                <TableCell>
                  {item?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          key={index}
                          onClick={() => statusHandler(status, item._id)}
                          className="flex w-fit items-center my-2 cursor-pointer"
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="sm:hidden flex flex-col gap-4">
        {applicants?.applications?.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-lg shadow flex flex-col gap-2"
          >
            <p>
              <strong>Name:</strong> {item?.applicant?.fullname}
            </p>
            <p>
              <strong>Email:</strong> {item?.applicant?.email}
            </p>
            <p>
              <strong>Contact:</strong> {item?.applicant?.phoneNumber}
            </p>
            <p>
              <strong>Resume:</strong>{" "}
              {item?.applicant?.profile?.resume ? (
                <a
                  href={item?.applicant?.profile?.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  {item?.applicant?.profile?.resumeOriginalName}
                </a>
              ) : (
                "NA"
              )}
            </p>
            <p>
              <strong>Date:</strong> {item?.applicant?.createdAt.split("T")[0]}
            </p>
            <div className="flex gap-2 mt-2">
              {shortlistingStatus.map((status) => (
                <button
                  key={status}
                  onClick={() => statusHandler(status, item._id)}
                  className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm"
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicantsTable;
