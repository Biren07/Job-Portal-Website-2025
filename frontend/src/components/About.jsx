import { Linkedin, UserCircle } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "./shared/Navbar";

const developers = [
  {
    name: "Birendra Singh Dhami",
    role: "MERN Stack Developer",
    photo: "/Birendra Dhami.png",
    linkedin: "https://www.linkedin.com/in/birendra-c-ingh-dhami-6264b7279/",
  },
  {
    name: "Ramesh Saud",
    role: "Web Designer",
    photo: "/WhatsApp Image 2025-09-13 at 13.23.30_a6b0fde0.jpg",
    linkedin: "https://linkedin.com/in/bobsmith",
  },
];

const About = () => {
  return (
    <>
      <Navbar />
      <section className="max-w-300 mx-auto px-10 bg-white dark:bg-gray-900 rounded-2xl shadow-md my-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          About Dream Dock
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          Dream Dock is your ultimate job portal designed to bridge the gap
          between talented job seekers and top employers. Whether you're a
          student preparing for your first job, a professional looking for new
          opportunities, or a recruiter searching for the best candidates, Dream
          Dock provides a seamless, intuitive platform tailored to your needs.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-10">
          Our mission is to empower both candidates and recruiters by offering
          tools like job listings, company profiles, mock interviews, and
          application tracking — all in one place. At Dream Dock, we believe
          everyone deserves a chance to land their dream job and build a
          rewarding career.
        </p>

        <h3 className="text-2xl text-center font-semibold mb-4 text-gray-900 dark:text-white">
          Meet the Developers
        </h3>
        <div className="flex flex-wrap gap-8 justify-center">
          {developers.map(({ name, role, photo, linkedin }, idx) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="w-52 flex flex-col items-center text-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {photo ? (
                <img
                  src={photo}
                  alt={name}
                  className="w-40 h-40 rounded-full object-cover mb-3 border-2 border-gray-300 dark:border-gray-600"
                />
              ) : (
                <UserCircle className="w-24 h-24 text-gray-400 mb-3" />
              )}
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                {name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-1">
                <UserCircle />
                {role}
              </p>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#0A66C2] hover:underline text-sm"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default About;
