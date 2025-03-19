import { MapPin, Phone, Mail } from "lucide-react";
import {
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="dark:bg-zinc-900 text-white border-t py-10 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start">
        {/* Contact Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <MapPin className="text-gray-500" />
            <div>
              <p className="text-gray-500">Rohini Sector - 22</p>
              <p className="text-gray-400 dark:text-white font-bold">
                Delhi, India
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="text-gray-500" />
            <p className="text-gray-400 dark:text-white font-bold">
              +91 8700736093
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Mail className="text-gray-500" />
            <Link to="aman.it360@gmail.com" className="text-blue-400 font-bold">
              aman.it360@gmail.com
            </Link>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8 md:mt-0 md:w-1/2">
          <h3 className=" text-gray-500 dark:text-white font-bold text-xl mb-2">
            About Me
          </h3>
          <p className="text-gray-400 dark:text-gray-400  text-sm">
            Passionate developer, tech enthusiast, problem solver, and creative
            thinker, always eager to learn and innovate.
          </p>

          {/* Social Media Links */}
          <div className="flex gap-4 mt-4">
            <Link
              to="https://www.instagram.com/jaanirajput_0/"
              className="bg-gray-700 p-2 rounded hover:bg-gray-500"
            >
              <FaInstagram />
            </Link>
            <Link
              to="https://api.whatsapp.com/qr/FUX77H6MPEU4O1?autoload=1&app_absent=0"
              className="bg-gray-700 p-2 rounded hover:bg-gray-500"
            >
              <FaWhatsapp />
            </Link>
            <Link
              to="https://www.linkedin.com/in/aman-kumar-910843327/"
              className="bg-gray-700 p-2 rounded hover:bg-gray-500"
            >
              <FaLinkedinIn />
            </Link>
            <Link
              to="https://github.com/iamAmanrajput"
              className="bg-gray-700 p-2 rounded hover:bg-gray-500"
            >
              <FaGithub />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
