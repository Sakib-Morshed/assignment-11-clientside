// src/components/Footer.jsx

import { Mail, Phone, MapPin, Clock } from "lucide-react";
import {
  TbBrandFacebook,
  TbBrandInstagram,
  TbBrandTwitter,
} from "react-icons/tb";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Contact Details */}
        <div>
          <h2 className="text-xl font-bold text-white mb-5">Contact Us</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-yellow-500" />
              <span>3 E 19th St, Dhaka, NY 10160, Bangladesh</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-yellow-500" />
              <span>+1 234 567 890</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-yellow-500" />
              <span>hello@localchef.com</span>
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div>
          <h2 className="text-xl font-bold text-white mb-5">Working Hours</h2>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-yellow-500 mt-0.5" />
              <div>
                <p className="font-medium text-white">Sun – Wed</p>
                <p className="text-gray-400">9:00 AM – 10:30 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-yellow-500 mt-0.5" />
              <div>
                <p className="font-medium text-white">Thu – Sat</p>
                <p className="text-gray-400">9:00 AM – 12:30 AM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-5">Follow Us</h2>
          <div className="flex gap-4 justify-center">
            <a
              href="#"
              className="p-2 bg-gray-900 rounded-full hover:bg-yellow-500 hover:text-black transition"
            >
              <TbBrandFacebook size={20} />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-900 rounded-full hover:bg-yellow-500 hover:text-black transition"
            >
              <TbBrandInstagram size={20} />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-900 rounded-full hover:bg-yellow-500 hover:text-black transition"
            >
              <TbBrandTwitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        © 2025 LocalChef. All rights reserved.
      </div>
    </footer>
  );
}
