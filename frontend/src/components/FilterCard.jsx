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

  // Map "7+ years" to a numeric range for filtering
  const normalizeExperience = (exp) => {
    if (!exp) return "";
    if (exp === "7+ years") return "7-50"; // assume 50 years max
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
    dispatch(
      setSearchedQuery({ location: "", technology: "", experience: "" })
    );
  };

  useEffect(() => {
    dispatch(
      setSearchedQuery({
        location: manualLocation || filters.location,
        technology: manualTechnology || filters.technology,
        experience: normalizeExperience(filters.experience),
      })
    );
  }, [filters, manualLocation, manualTechnology]);

  return (
    <div className="w-30 bg-white rounded-md px-4 shadow-lg border-2">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3 border-2" />

      <div className="mt-6">
        <button
          onClick={resetFilters}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Reset Filters
        </button>
      </div>

      {filterData.map((data, index) => {
        const typeKey = data.filterType.toLowerCase();
        return (
          <div key={index} className="mt-4">
            <h2 className="font-bold text-lg">{data.filterType}</h2>
            <RadioGroup
              value={filters[typeKey]}
              onValueChange={(value) =>
                handleRadioChange(data.filterType, value)
              }
            >
              {data.array.map((item, idx) => {
                const itemId = `radio-${typeKey}-${idx}`;
                return (
                  <div
                    key={itemId}
                    className="flex items-center space-x-2 my-2"
                  >
                    <RadioGroupItem value={item} id={itemId} />
                    <label htmlFor={itemId}>{item}</label>
                  </div>
                );
              })}
            </RadioGroup>

            {typeKey === "location" && (
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Enter custom location"
                  className="border-2 border-gray-300 rounded px-3 py-1 w-full"
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
                  className="border-2 border-gray-300 rounded px-3 py-1 w-full"
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
