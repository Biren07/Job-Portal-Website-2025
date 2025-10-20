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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let filtered = companies;

    if (searchCompanyByText) {
      const query = searchCompanyByText.toLowerCase();
      filtered = companies.filter((company) =>
        company?.name?.toLowerCase().includes(query)
      );
    }

    filtered = filtered
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setFilterCompany(filtered);
  }, [companies, searchCompanyByText]);

  return (
    <div className="w-full">
      
      <div className="hidden sm:block overflow-x-auto rounded-xl border shadow-sm">
        <Table className="min-w-[500px]">
          <TableCaption className="text-muted-foreground mt-2">
            A list of your recent registered companies
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="text-sm text-gray-600 font-semibold">Logo</TableHead>
              <TableHead className="text-sm text-gray-600 font-semibold">Name</TableHead>
              <TableHead className="text-sm text-gray-600 font-semibold">Date</TableHead>
              <TableHead className="text-right text-sm text-gray-600 font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterCompany.length > 0 ? (
              filterCompany.map((company) => (
                <TableRow
                  key={company._id}
                  className="transition-colors hover:bg-muted/60 cursor-pointer"
                >
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={company.logo || ""} alt={company.name} />
                      <AvatarFallback>{company.name?.charAt(0).toUpperCase() || "?"}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.createdAt?.split("T")[0] || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger className="hover:text-primary">
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32 p-2">
                        <div
                          onClick={() => navigate(`/admin/companies/${company._id}`)}
                          className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded cursor-pointer"
                        >
                          <Edit2 className="w-4" /> <span>Edit</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                  No companies found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

  
      <div className="sm:hidden flex flex-col gap-4">
        {filterCompany.length > 0 ? (
          filterCompany.map((company) => (
            <div
              key={company._id}
              className="bg-white rounded-lg shadow p-4 flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={company.logo || ""} alt={company.name} />
                  <AvatarFallback>{company.name?.charAt(0).toUpperCase() || "?"}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{company.name}</span>
              </div>
              <p><strong>Date:</strong> {company.createdAt?.split("T")[0] || "N/A"}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => navigate(`/admin/companies/${company._id}`)}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm"
                >
                  <Edit2 className="w-4" /> Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-4">No companies found.</p>
        )}
      </div>
    </div>
  );
};

export default CompaniesTable;
