import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Mumbai", "Bangalore", "Remote"],
  },
  {
    filterType: "Technology",
    array: ["Frontend", "Backend", "Data Scientist", "Fullstack"],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
];

const Filter = () => {
  const dispatch = useDispatch();
  const [manualLocation, setManualLocation] = useState("");
  const [manualTechnology, setManualTechnology] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    technology: "",
    experience: "",
  });

  const normalizeExperience = (exp) => {
    if (!exp) return "";
    if (exp === "7+ years") return "7-50";
    return exp.replace(" years", "");
  };

  const handleRadioChange = (type, value) => {
    const key = type.toLowerCase();
    setFilters((prev) => ({ ...prev, [key]: value }));
    if (key === "location") setManualLocation("");
    if (key === "technology") setManualTechnology("");
  };

  const handleManualLocation = (e) => {
    setManualLocation(e.target.value);
    setFilters((prev) => ({ ...prev, location: "" }));
  };

  const handleManualTechnology = (e) => {
    setManualTechnology(e.target.value);
    setFilters((prev) => ({ ...prev, technology: "" }));
  };

  const resetFilters = () => {
    setManualLocation("");
    setManualTechnology("");
    setFilters({ location: "", technology: "", experience: "" });
    dispatch(setSearchedQuery({ location: "", technology: "", experience: "" }));
  };

  useEffect(() => {
    dispatch(
      setSearchedQuery({
        location: manualLocation || filters.location,
        technology: manualTechnology || filters.technology,
        experience: normalizeExperience(filters.experience),
      })
    );
  }, [filters, manualLocation, manualTechnology, dispatch]);

  return (
    <div className="w-full sm:w-[300px] bg-white rounded-xl p-5 shadow-lg border border-gray-200 transition-all duration-300 
                    max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:z-50 
                    max-sm:overflow-y-auto max-sm:max-h-[70vh]">
      <h1 className="font-bold text-xl text-gray-800 text-center sm:text-left">
        Filter Jobs
      </h1>
      <hr className="mt-3 border-gray-300" />

      <div className="mt-5 flex justify-center sm:justify-start">
        <button
          onClick={resetFilters}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm"
        >
          Reset Filters
        </button>
      </div>

      {filterData.map((data, index) => {
        const typeKey = data.filterType.toLowerCase();
        return (
          <div key={index} className="mt-6">
            <h2 className="font-semibold text-lg text-gray-800 mb-2">
              {data.filterType}
            </h2>

            <RadioGroup
              value={filters[typeKey]}
              onValueChange={(value) => handleRadioChange(data.filterType, value)}
              className="space-y-2"
            >
              {data.array.map((item, idx) => {
                const itemId = `radio-${typeKey}-${idx}`;
                return (
                  <div key={itemId} className="flex items-center space-x-2">
                    <RadioGroupItem value={item} id={itemId} />
                    <label htmlFor={itemId} className="text-gray-700 text-sm sm:text-base">
                      {item}
                    </label>
                  </div>
                );
              })}
            </RadioGroup>

            {typeKey === "location" && (
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Enter custom location"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={manualLocation}
                  onChange={handleManualLocation}
                />
              </div>
            )}

            {typeKey === "technology" && (
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Enter custom technology"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={manualTechnology}
                  onChange={handleManualTechnology}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Filter;
