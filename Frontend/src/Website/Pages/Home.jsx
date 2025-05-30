import React from "react";
import { FaLaptop, FaCamera, FaTabletAlt, FaMobileAlt, FaDesktop } from "react-icons/fa";

export default function CardList() {
  return (
        <>
         <div className="w-full bg-white mt-5 px-6 py-3 rounded-full shadow-sm mb-6">
      <nav className="text-sm text-gray-500 font-medium space-x-1">
        <span className="text-gray-400">Home</span>
        <span>/</span>
        <span className="text-gray-400">pages</span>
        <span>/</span>
        <span className="text-black font-semibold">Home</span>
      </nav>
    </div>
    <div className="bg-[#f7f9fc] min-h-screen p-4">
      {/* Category Sidebar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md w-full md:w-1/5">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Category</h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center border rounded p-2">
              <div className="flex items-center gap-2"><FaLaptop /> Laptops</div>
              <span className="bg-[#d1f5f0] px-2 rounded-full">1</span>
            </li>
            <li className="flex justify-between items-center border rounded p-2">
              <div className="flex items-center gap-2"><FaDesktop /> PC & Computers</div>
              <span className="bg-[#d1f5f0] px-2 rounded-full">2</span>
            </li>
            <li className="flex justify-between items-center border rounded p-2">
              <div className="flex items-center gap-2"><FaMobileAlt /> Cell Phones</div>
              <span className="bg-[#d1f5f0] px-2 rounded-full">3</span>
            </li>
            <li className="flex justify-between items-center border rounded p-2">
              <div className="flex items-center gap-2"><FaTabletAlt /> Tablets</div>
              <span className="bg-[#d1f5f0] px-2 rounded-full">4</span>
            </li>
            <li className="flex justify-between items-center border rounded p-2">
              <div className="flex items-center gap-2"><FaCamera /> Cameras</div>
              <span className="bg-[#d1f5f0] px-2 rounded-full">5</span>
            </li>
          </ul>
        </div>

        {/* Main Banner and Brands */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="rounded-xl overflow-hidden shadow-md">
            <div className="relative bg-cover bg-center h-120 w-full" style={{ backgroundImage: 'url("./Tabpanel.svg")' }}>
            </div>
          </div>

          {/* Featured Brands */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-bold mb-4">FEATURED BRANDS</h3>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4 items-center">
              <img src="/brands/jamv.png" alt="Jamv" className="h-8 object-contain" />
              <img src="/brands/digitek.png" alt="Digitek" className="h-8 object-contain" />
              <img src="/brands/tekreact.png" alt="tekreact" className="h-8 object-contain" />
              <img src="/brands/grafbase.png" alt="Grafbase" className="h-8 object-contain" />
              <img src="/brands/msi.png" alt="MSI" className="h-8 object-contain" />
              <img src="/brands/ohbear.png" alt="Ohbear" className="h-8 object-contain" />
              <img src="/brands/oak.png" alt="Oak" className="h-8 object-contain" />
              <img src="/brands/snyk.png" alt="Snyk" className="h-8 object-contain" />
              <img src="/brands/sonex.png" alt="Sonex" className="h-8 object-contain" />
              <img src="/brands/stropi.png" alt="Stropi" className="h-8 object-contain" />
            </div>
          </div>

          {/* Top Categories */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-bold mb-4">TOP CATEGORIES</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <FaLaptop className="text-3xl mx-auto mb-2" />
                <p>Laptops</p>
              </div>
              <div>
                <FaDesktop className="text-3xl mx-auto mb-2" />
                <p>PC Gaming</p>
              </div>
              <div>
                <img src="/icons/headphones.png" alt="Headphones" className="h-10 mx-auto mb-2" />
                <p>Headphones</p>
              </div>
              <div>
                <img src="/icons/monitor.png" alt="Monitors" className="h-10 mx-auto mb-2" />
                <p>Monitors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
