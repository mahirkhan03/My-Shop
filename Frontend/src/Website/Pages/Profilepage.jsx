import { FiArrowRight } from 'react-icons/fi';

 function Profilepage() {
  return (
     <>
         <div className="w-full bg-white mt-5 px-6 py-3 rounded-full shadow-sm mb-6">
      <nav className="text-sm text-gray-500 font-medium space-x-1">
        <span className="text-gray-400">Home</span>
        <span>/</span>
        <span className="text-gray-400">pages</span>
        <span>/</span>
        <span className="text-black font-semibold">Profile</span>
      </nav>
    </div>
    <div className="min-h-screen bg-gray-50 p-6 flex">
      {/* Sidebar */}
      <div className="w-72 bg-white rounded-xl p-4 shadow">
        <div className="flex flex-col items-center text-center mb-6">
          <img
            src="/public/IMG_E5134.JPG" // Replace with real avatar if needed
            alt="Profile"
            className="rounded-lg w-32 h-32 object-cover mb-4"
          />
          <h2 className="text-lg font-bold">Mahir</h2>
          <p className="text-sm text-gray-500">mahir@gmail.com</p>
        </div>

        {/* Sidebar Links */}
        <div className="space-y-3">
          <SidebarButton text="Account info" active />
          <SidebarButton text="My order" />
          <SidebarButton text="My address" />
          <SidebarButton text="Change password" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-xl shadow p-8 ml-6">
        <h1 className="text-2xl font-semibold mb-6">Account Info</h1>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="First Name" required defaultValue="Mahir" />
            <InputField label="Last Name" required defaultValue="Khan" />
          </div>
          <InputField
            label="Email Address"
            type="email"
            required
            defaultValue="mahir@gmail.com"
          />
          <InputField
            label="Phone Number"
            type="tel"
            defaultValue="+1 0231 4554 452"
            optional
          />
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            SAVE
          </button>
        </form>
      </div>
    </div>
 </>
  );
}
// Reusable Sidebar Button
function SidebarButton({ text, active }) {
  return (
    <button
      className={`w-full flex justify-between items-center px-4 py-3 rounded-md text-sm font-medium transition ${
        active
          ? 'bg-teal-600 text-white'
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
      }`}
    >
      {text}
      <FiArrowRight className="ml-2" />
    </button>
  );
}

// Reusable Input Field
function InputField({ label, type = 'text', required, optional, defaultValue }) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
        {optional && <span className="text-gray-400 text-xs ml-1">(Optional)</span>}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        required={required}
      />
    </div>
 
  );
}

export default Profilepage;