import React from "react";
import { FaPhoneAlt, FaFacebookF, FaInstagram, FaYoutube, FaPinterestP } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 px-6 py-10 border-t text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Contact Info */}
        <div>
          <h3 className="font-bold text-base mb-2">SWOO - 1ST NYC TECH ONLINE MARKET</h3>
          <p className="text-xs text-gray-500 mb-2">HOTLINE 24/7</p>
          <p className="text-red-500 font-bold text-lg">(025) 3686 25 16</p>
          <p className="mt-2">257 Thatcher Road St, Brooklyn, Manhattan, NY 10092</p>
          <p>contact@swootechmart.com</p>

          <div className="flex gap-3 mt-4">
            <a href="#" className="p-2 bg-gray-200 rounded-full"><FaXTwitter /></a>
            <a href="#" className="p-2 bg-gray-200 rounded-full"><FaFacebookF /></a>
            <a href="#" className="p-2 bg-gray-200 rounded-full"><FaInstagram /></a>
            <a href="#" className="p-2 bg-gray-200 rounded-full"><FaYoutube /></a>
            <a href="#" className="p-2 bg-gray-200 rounded-full"><FaPinterestP /></a>
          </div>

          <div className="flex gap-3 mt-4">
            <div className="border px-4 py-2 rounded text-xs flex items-center gap-1">
              USD <MdKeyboardArrowDown />
            </div>
            <div className="border px-4 py-2 rounded text-xs flex items-center gap-1">
              <span className="w-5"><img src="./Button → eng.png.svg" alt="" /></span>
              Eng <MdKeyboardArrowDown />
            </div>
          </div>
        </div>

        {/* Top Categories */}
        <div>
          <h4 className="font-bold mb-2">TOP CATEGORIES</h4>
          <ul className="space-y-1">
            <li>Laptops</li>
            <li>PC & Computers</li>
            <li>Cell Phones</li>
            <li>Tablets</li>
            <li>Gaming & VR</li>
            <li>Networks</li>
            <li>Cameras</li>
            <li>Sounds</li>
            <li>Office</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-bold mb-2">COMPANY</h4>
          <ul className="space-y-1">
            <li>About Swoo</li>
            <li>Contact</li>
            <li>Career</li>
            <li>Blog</li>
            <li>Sitemap</li>
            <li>Store Locations</li>
          </ul>
        </div>

        {/* Help Center */}
        <div>
          <h4 className="font-bold mb-2">HELP CENTER</h4>
          <ul className="space-y-1">
            <li>Customer Service</li>
            <li>Policy</li>
            <li>Terms & Conditions</li>
            <li>Track Order</li>
            <li>FAQs</li>
            <li>My Account</li>
            <li>Product Support</li>
          </ul>
        </div>

        {/* Partner */}
        <div>
          <h4 className="font-bold mb-2">PARTNER</h4>
          <ul className="space-y-1">
            <li>Become Seller</li>
            <li>Affiliate</li>
            <li>Advertise</li>
            <li>Partnership</li>
          </ul>
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="max-w-4xl mx-auto text-center mt-10">
        <h4 className="font-semibold">SUBSCRIBE & GET <span className="text-red-500 font-bold">10% OFF</span> FOR YOUR FIRST ORDER</h4>
        <div className="flex justify-center mt-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="border px-4 py-2 rounded-l-md w-80"
          />
          <button className="bg-red-500 text-white px-4 py-2 rounded-r-md text-sm font-semibold">SUBSCRIBE</button>
        </div>
        <p className="text-xs text-gray-500 italic mt-2">
          By subscribing, you're accepted the our <a href="#" className="underline">Policy</a>
        </p>
      </div>

      {/* Footer Bottom */}
      <div className="border-t mt-10 pt-4 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <p>
          © 2024 <span className="font-bold text-black">Shawonetc3</span> . All Rights Reserved
        </p>
        <div className="flex items-center gap-3 mt-2 md:mt-0">
          <img src="./pay1.png.svg" alt="PayPal" className="h-5" />
          <img src="./pay2.png.svg" alt="MasterCard" className="h-5" />
          <img src="./pay3.png.svg" alt="Visa" className="h-5" />
          <img src="./pay4.png.svg" alt="Stripe" className="h-5" />
          <img src="./pay5.png.svg" alt="Klarna" className="h-5" />
        </div>
        <a href="#" className=" mt-2 md:mt-0 text-blue-400 ">Mobile Site</a>
      </div>
    </footer>
  );
}