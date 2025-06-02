import { useContext, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { MainContext } from '../../Context';
import { qtyHandler } from '../../redux/slice/cartSlices';
import { useNavigate } from 'react-router-dom';

function CartList() {
  const dispatcher = useDispatch();
  const navigate = useNavigate()

  function handCare(payload) {
    dispatcher(qtyHandler(payload));
  }

  const cart = useSelector((state) => state.cart);
  const { product, getProduct, API_BASH_URL } = useContext(MainContext);
  const user = useSelector((state) => state.user)

  function checkoutHandler (){
    if(user.data && user.user_token){
      navigate('/checkout')
    }
    else{
      navigate('/login')
    }
  }
 


  useEffect(() => {
    getProduct();
  }, []);


  return (
    <div className="w-full bg-gray-50 min-h-screen p-6">
      {/* Breadcrumb */}
      <div className="w-full bg-white mt-5 px-6 py-3 rounded-full shadow-sm mb-6">
        <nav className="text-sm text-gray-500 font-medium space-x-1">
          <span className="text-gray-400">Home</span>
          <span>/</span>
          <span className="text-gray-400">Pages</span>
          <span>/</span>
          <span className="text-black font-semibold">Cart List</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="col-span-2 space-y-6">
          {cart?.items.map((item, index) => {
            const currentProduct = product.find((p) => p._id === item.productId);
            if (!currentProduct) return null;

            return (
              <div key={index} className="flex items-start bg-white p-4 rounded-xl shadow">
                <div className="relative">
                  <img
                    src={`${API_BASH_URL}images/product/${currentProduct.thumbnail}`}
                    alt={currentProduct.name}
                    className="w-35 h-35 object-cover rounded"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-lg px-4 font-bold">{currentProduct.name}</h4>
                  <p className="text-red-600 text-lg px-4  font-semibold mt-1">${currentProduct.finalPrice}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center px-4 mt-2 cursor-pointer space-x-2">
                    <button
                      onClick={() =>
                        handCare({
                          productId: item.productId,
                          type: 'dec',
                          final_price: currentProduct.finalPrice,
                          original_price: currentProduct.originalPrice,
                        })
                      }
                      className="p-1 border rounded cursor-pointer"
                    >
                      <FiMinus />
                    </button>
                    <span>{item.qty}</span>

                    <button
                      onClick={() =>
                        handCare({
                          productId: item.productId,
                          type: 'inc',
                          final_price: currentProduct.finalPrice,
                          original_price: currentProduct.originalPrice,
                        })
                      }
                      className="p-1 border rounded cursor-pointer"
                    >
                      <FiPlus />
                    </button>
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center px-4 gap-2 mt-2">
                    <span className={`flex items-center text-lg ${currentProduct.stock ? 'text-green-600' : 'text-red-500'}`}>
                      <FaCheckCircle className="mr-1" />
                      {currentProduct.stock ? 'In stock' : 'Out of stock'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow p-6 h-fit border border-green-400">
          <h4 className="font-semibold mb-4">Order Summary</h4>
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Original Total:</span>
              <span className="font-semibold">{cart.original_total}</span>
            </div>
            <div className="flex justify-between">
              <span>Savings:</span>
              <span className="font-semibold">{cart.original_total - cart.final_total}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>ORDER TOTAL:</span>
              <span>{cart.final_total}</span>
            </div>
          </div>
          <button onClick={checkoutHandler} className="mt-6 w-full bg-teal-600 text-white py-2 rounded-full font-semibold hover:bg-teal-700 transition">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartList;
