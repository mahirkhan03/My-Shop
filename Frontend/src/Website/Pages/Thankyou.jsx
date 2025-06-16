import { FaCheckCircle } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';

const ThankYou = () => {
  const { orderId } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50 px-4">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl max-w-md w-full text-center">
        <FaCheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Thank You!</h1>
        <p className="text-gray-600 mb-4">Your order has been placed successfully.</p>

        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <span className="text-gray-500 text-sm">Order ID</span>
          <p className="text-xl font-semibold text-gray-800 mt-1">{orderId}</p>
        </div>

        <Link
          to="/"
          className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
