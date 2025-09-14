import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
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

  return (
    <div className="bg-gradient-to-r from-blue-500 via-blue-300 to-yellow-500  max-w-300  px-2 mx-auto sm:max-w-4xl sticky top-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-800 shadow-sm transition rounded-lg ">
      <div className="flex items-center justify-between  h-16  text-gray-800 dark:text-gray-100">
        <div>
          <Link
            to="/"
            className="text-2xl font-bold hover:opacity-80 transition duration-200"
          >
            Dream<span className="text-[#F83002]">Dock</span>
          </Link>
        </div>

        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user ? (
              user.role === "recruiter" ? (
                <>
                  <li>
                    <Link
                      className="hover:text-[#F83002] dark:hover:text-[#FF6F61] transition"
                      to="/admin/companies"
                    >
                      Companies
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:text-[#F83002] dark:hover:text-[#FF6F61] transition"
                      to="/admin/jobs"
                    >
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:text-[#F83002] dark:hover:text-[#FF6F61] transition"
                      to="/admin/jobs/:id/applicants"
                    >
                      Applications
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      className="hover:text-[#F83002] dark:hover:text-[#FF6F61] transition"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:text-[#F83002] dark:hover:text-[#FF6F61] transition"
                      to="/jobs"
                    >
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:text-[#F83002] dark:hover:text-[#FF6F61] transition"
                      to="/browse"
                    >
                      Browse
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:text-[#F83002] dark:hover:text-[#FF6F61] transition"
                      to="/mock-interview"
                    >
                      Mock Interview
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:text-[#F83002] dark:hover:text-[#FF6F61] transition"
                      to="/about"
                    >
                      About us
                    </Link>
                  </li>
                </>
              )
            ) : (
              <>
                <li>
                  <Link
                    className="hover:text-[#F83002] dark:hover:text-[#FF6F61] transition"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-[#F83002] dark:hover:text-[#FF6F61] transition"
                    to="/jobs"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-[#F83002] dark:hover:text-[#FF6F61] transition"
                    to="/browse"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

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

            <PopoverContent className="w-80 dark:bg-gray-800 dark:text-white">
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
