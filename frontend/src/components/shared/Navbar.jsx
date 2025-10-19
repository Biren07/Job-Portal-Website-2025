import React, { useState, useRef, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const links = user
    ? user.role === "recruiter"
      ? [
          { name: "Companies", to: "/admin/companies" },
          { name: "Jobs", to: "/admin/jobs" },
          { name: "Applications", to: "/admin/jobs/:id/applicants" },
        ]
      : [
          { name: "Home", to: "/" },
          { name: "Jobs", to: "/jobs" },
          { name: "Browse", to: "/browse" },
          { name: "Mock Interview", to: "/mock-interview" },
          { name: "About us", to: "/about" },
        ]
    : [
        { name: "Home", to: "/" },
        { name: "Jobs", to: "/jobs" },
        { name: "Browse", to: "/browse" },
      ];


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-blue-300 to-yellow-500 px-4 sm:px-6 lg:px-8 sticky top-0 z-50 shadow-sm rounded-lg">
      <div className="max-w-full sm:max-w-4xl mx-auto flex items-center justify-between h-16 text-gray-800 dark:text-gray-100">
       
        <Link
          to="/"
          className="text-2xl font-bold hover:opacity-80 transition duration-200"
        >
          Dream<span className="text-[#F83002]">Dock</span>
        </Link>

    
        <ul className="hidden md:flex items-center gap-6 font-medium">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.to}
                className="hover:text-[#F83002] dark:hover:text-[#FF6F61] transition"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

      
        <div className="flex items-center gap-4">
          {/* Avatar / User Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <div className="cursor-pointer hover:ring-2 hover:ring-gray-200 dark:hover:ring-gray-700 transition p-1 rounded-full">
                {!user ? (
                  <User2 className="w-8 h-8 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Avatar>
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="Profile"
                    />
                  </Avatar>
                )}
              </div>
            </PopoverTrigger>

            <PopoverContent className="max-w-full sm:w-80 dark:bg-gray-800 dark:text-white">
              {!user ? (
                <div className="flex flex-col gap-2">
                  <Link to="/login">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] w-full">
                      Signup
                    </Button>
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="flex gap-3 items-center mb-2">
                    <Avatar>
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="Profile"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 text-gray-600 dark:text-gray-300">
                    {user.role === "student" && (
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm"
                      >
                        <User2 size={16} />
                        View Profile
                      </Link>
                    )}

                    <button
                      onClick={logoutHandler}
                      className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm text-left w-full"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>

          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

   
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 z-50
        ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <ul className="flex flex-col gap-3 mt-16 px-4">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.to}
                className="block w-full py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
