import React, { useEffect, useState } from "react";
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
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let filtered = allAdminJobs;

    if (searchJobByText) {
      const query = searchJobByText.toLowerCase();
      filtered = allAdminJobs.filter(
        (job) =>
          job?.title?.toLowerCase().includes(query) ||
          job?.company?.name?.toLowerCase().includes(query)
      );
    }

    filtered = filtered
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setFilterJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="w-full">
     
      <div className="hidden sm:block overflow-x-auto rounded-xl border shadow-sm">
        <Table className="min-w-[600px]">
          <TableCaption className="text-muted-foreground mt-2">
            A list of your recently posted jobs
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="text-sm font-semibold text-gray-600">
                Company Name
              </TableHead>
              <TableHead className="text-sm font-semibold text-gray-600">
                Role
              </TableHead>
              <TableHead className="text-sm font-semibold text-gray-600">
                Date
              </TableHead>
              <TableHead className="text-right text-sm font-semibold text-gray-600">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterJobs.length > 0 ? (
              filterJobs.map((job) => (
                <TableRow
                  key={job._id}
                  className="transition hover:bg-muted cursor-pointer"
                >
                  <TableCell className="font-medium">
                    {job?.company?.name || "N/A"}
                  </TableCell>
                  <TableCell>{job?.title || "N/A"}</TableCell>
                  <TableCell>{job?.createdAt?.split("T")[0] || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger className="hover:text-primary">
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-36 p-2">
                        <div
                          onClick={() =>
                            navigate(`/admin/companies/${job._id}`)
                          }
                          className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded cursor-pointer"
                        >
                          <Edit2 className="w-4" />
                          <span>Edit</span>
                        </div>
                        <div
                          onClick={() =>
                            navigate(`/admin/jobs/${job._id}/applicants`)
                          }
                          className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded cursor-pointer"
                        >
                          <Eye className="w-4" />
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground py-4"
                >
                  No jobs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

     
      <div className="sm:hidden flex flex-col gap-4">
        {filterJobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-4 rounded-lg shadow flex flex-col gap-2"
          >
            <p>
              <strong>Company:</strong> {job?.company?.name || "N/A"}
            </p>
            <p>
              <strong>Role:</strong> {job?.title || "N/A"}
            </p>
            <p>
              <strong>Date:</strong> {job?.createdAt?.split("T")[0] || "N/A"}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => navigate(`/admin/companies/${job._id}`)}
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm flex items-center gap-1"
              >
                <Edit2 className="w-4" /> Edit
              </button>
              <button
                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm flex items-center gap-1"
              >
                <Eye className="w-4" /> Applicants
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminJobsTable;
