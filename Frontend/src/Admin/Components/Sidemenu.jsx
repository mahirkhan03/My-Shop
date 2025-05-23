import { FaChartPie, FaThLarge, FaLayerGroup, FaUserShield, FaFileAlt, FaRocket, FaCube, FaCubes } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { BiCategory } from "react-icons/bi";
import { RiProductHuntFill } from "react-icons/ri";
import { IoIosColorPalette } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAdmin } from '../../redux/slice/adminSlices';


const Sidemenu = () => {
  const navigator = useNavigate();
  const dispatcher = useDispatch()

  const admin = useSelector((state) => state.admin?.data)

  useEffect(
    () => {
      if (admin === null) {
        navigator('/admin/login')
      } else {
        navigator('/admin')
      }
    },
    [admin]
  )

  useEffect(
    () => {
      const admin = localStorage.getItem("admin")
      const Lsadmin = JSON.parse(admin)
      dispatcher(setAdmin(
          {
            admin:Lsadmin
          }
        ))
    },
    []
  )
  return (
    <aside className="w-full h-screen bg-[#1E1E2D] text-white p-4 space-y-8">
      <div className="text-center text-2xl font-bold tracking-wide">
        <span className="text-white">ADMIN</span>
        <span className="text-yellow-400"> PANEL</span>
      </div>

      <div className="space-y-4">
        {/* Menu Section */}
        <div>
          <p className="text-xs text-gray-400 uppercase mb-2">Menu</p>
          <Link to='/admin'>
            <NavItem icon={<FaChartPie />} label="Dashboards" />
          </Link>
          <NavItem icon={<FaThLarge />} label="Apps" />
          <NavItem icon={<FaLayerGroup />} label="Layouts" badge="Hot" />
        </div>

        {/* Pages Section */}
        <div>
          <p className="text-xs text-gray-400 uppercase mb-2">Pages</p>
          <Link to='/admin/category'>
            <NavItem icon={<BiCategory />} label="Category" />
          </Link>

          <Link to="/admin/color">
            <NavItem icon={<IoIosColorPalette />} label="Color" />
          </Link>

          <Link to="/admin/product">
            <NavItem icon={<RiProductHuntFill />} label="Product" />
          </Link>

        </div>

        {/* Components Section */}
        <div>
          <p className="text-xs text-gray-400 uppercase mb-2">Components</p>
          <NavItem icon={<FaCube />} label="Base UI" />
          <NavItem icon={<FaCubes />} label="Advance UI" />
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, badge }) {
  return (
    <div className="flex items-center justify-between hover:bg-[#2a2a3e] p-2 rounded-md cursor-pointer transition duration-200">
      <div className="flex items-center space-x-3">
        <span className="text-lg">{icon}</span>
        <span className="text-sm">{label}</span>
      </div>
      <div className="flex items-center space-x-1">
        {badge && (
          <span className="bg-red-500 text-xs text-white px-2 py-0.5 rounded-full">{badge}</span>
        )}
        <IoIosArrowForward className="text-gray-400 text-xs" />
      </div>
    </div>
  );
}

export default Sidemenu;
