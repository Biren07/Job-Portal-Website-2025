import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-3">DreamDock</h2>
            <p className="text-sm leading-relaxed mb-4">
              Your future, delivered — connecting top talent with top companies.
            </p>
            <p className="text-xs text-gray-500">
              © 2025 DreamDock Company. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-blue-400 transition">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                Bhimdatt-10 Kanchanpur
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-blue-400" />
                dhamib610@gmail.com
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-blue-400" />
                +977 9841355789
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">
              Our Location
            </h3>
            <div className="w-full h-40 md:h-48 rounded-md overflow-hidden shadow-lg ring-1 ring-gray-700">
              <iframe
                title="DreamDock Location"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d26541.60270674432!2d80.1504077347656!3d28.975440199999984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2snp!4v1754055884229!5m2!1sen!2snp"
                loading="lazy"
                allowFullScreen=""
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-6">
          <a
            href="https://facebook.com"
            className="hover:text-blue-500 transition"
            aria-label="Facebook"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.676 0H1.324C.593...z" />
            </svg>
          </a>
          <a
            href="https://twitter.com"
            className="hover:text-sky-400 transition"
            aria-label="Twitter"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557a9.835...z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            className="hover:text-blue-400 transition"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452...z" />
            </svg>
          </a>
        </div>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Designed by:{" "}
          <span className="font-medium text-white">Birendra Singh Dhami</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
