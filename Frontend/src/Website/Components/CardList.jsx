import { FaCheckCircle } from 'react-icons/fa';
import { FiMinus, FiPlus } from 'react-icons/fi';

function CartList() {
  return (
    <div className="w-full bg-gray-50 min-h-screen p-6">
      <div className="w-full bg-white mt-5 px-6 py-3 rounded-full shadow-sm mb-6">
        <nav className="text-sm text-gray-500 font-medium space-x-1">
          <span className="text-gray-400">Home</span>
          <span>/</span>
          <span className="text-gray-400">pages</span>
          <span>/</span>
          <span className="text-black font-semibold">Cart List</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Item 1 */}
          <div className="flex items-start bg-white p-4 rounded-xl shadow">
            <div className="relative">
              <img
                src="https://via.placeholder.com/100x150"
                alt="Phone"
                className="w-24 h-32 object-cover rounded"
              />
              <span className="absolute top-0 left-0 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                Save 199.00
              </span>
            </div>
            <div className="ml-4 flex-1">
              <h4 className="text-sm font-bold">SROK Smart Phone 128GB, Oled Retina</h4>
              <p className="text-red-600 font-semibold mt-1">$579.00</p>
              <div className="flex items-center mt-2 space-x-2">
                <button className="p-1 border rounded"><FiMinus /></button>
                <span>1</span>
                <button className="p-1 border rounded"><FiPlus /></button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">FREE SHIPPING</span>
                <span className="flex items-center text-xs text-green-600"><FaCheckCircle className="mr-1" />In stock</span>
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-start bg-white p-4 rounded-xl shadow">
            <div className="relative">
              <img
                src="https://via.placeholder.com/100x150"
                alt="Tablet"
                className="w-24 h-32 object-cover rounded"
              />
              <span className="absolute top-0 left-0 bg-black text-white text-xs px-2 py-1 rounded-full">
                NEW
              </span>
            </div>
            <div className="ml-4 flex-1">
              <h4 className="text-sm font-bold">aPod Pro Tablet 2023 LTE + Wifi, GPS Cellular 12.9 Inch, 512GB</h4>
              <p className="text-black font-semibold mt-1">$979.00</p>
              <div className="flex items-center mt-2 space-x-2">
                <button className="p-1 border rounded"><FiMinus /></button>
                <span>1</span>
                <button className="p-1 border rounded"><FiPlus /></button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">$2.98 SHIPPING</span>
                <span className="flex items-center text-xs text-green-600"><FaCheckCircle className="mr-1" />In stock</span>
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-start bg-white p-4 rounded-xl shadow">
            <div className="relative">
              <img
                src="https://via.placeholder.com/100x150"
                alt="Samsung"
                className="w-24 h-32 object-cover rounded"
              />
              <span className="absolute top-0 left-0 bg-black text-white text-xs px-2 py-1 rounded-full">
                NEW
              </span>
            </div>
            <div className="ml-4 flex-1">
              <h4 className="text-sm font-bold">Samsung Galaxy X6 Ultra LTE 4G/128 Gb, Black Smartphone</h4>
              <p className="text-black font-semibold mt-1">$659.00</p>
              <div className="flex items-center mt-2 space-x-2">
                <button className="p-1 border rounded"><FiMinus /></button>
                <span>1</span>
                <button className="p-1 border rounded"><FiPlus /></button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">FREE SHIPPING</span>
                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">FREE GIFT</span>
                <span className="flex items-center text-xs text-green-600"><FaCheckCircle className="mr-1" />In stock</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow p-6 h-fit border border-green-400">
          <h4 className="font-semibold mb-4">Order Summary</h4>
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Sub Total:</span>
              <span className="font-semibold">$1,000.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping estimate:</span>
              <span className="font-semibold">$600.00</span>
            </div>
            <div className="flex justify-between">
              <span>Tax estimate:</span>
              <span className="font-semibold">$137.00</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>ORDER TOTAL:</span>
              <span>$1,737.00</span>
            </div>
          </div>
          <button className="mt-6 w-full bg-teal-600 text-white py-2 rounded-full font-semibold hover:bg-teal-700 transition">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartList;