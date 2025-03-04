import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
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
            About the company
          </h3>
          <p className="text-gray-400 dark:text-gray-400  text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            euismod convallis velit, eu auctor lacus vehicula sit amet.
          </p>

          {/* Social Media Links */}
          <div className="flex gap-4 mt-4">
            <Link to="#" className="bg-gray-700 p-2 rounded hover:bg-gray-500">
              <FaFacebookF />
            </Link>
            <Link to="#" className="bg-gray-700 p-2 rounded hover:bg-gray-500">
              <FaTwitter />
            </Link>
            <Link to="#" className="bg-gray-700 p-2 rounded hover:bg-gray-500">
              <FaLinkedinIn />
            </Link>
            <Link to="#" className="bg-gray-700 p-2 rounded hover:bg-gray-500">
              <FaGithub />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
