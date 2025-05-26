import React, { useContext, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MainContext } from "../../Context";

const Store = () => {
  const {
    getCategory,
    API_BASH_URL,
    Categories,
    getColors,
    colors,
    product,
    getProduct,
  } = useContext(MainContext);

  useEffect(() => {
    getCategory();
    getColors();
    getProduct();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Category</h3>
          <ul className="space-y-2">
            {Categories.map((category) => (
              <li
                key={category._id}
                className="cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-600 px-2 py-1 rounded transition duration-300 ease-in-out"
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Colors */}
        <div>
          <h3 className="text-lg font-medium mb-2">Color</h3>
          <ul className="space-y-2">
            {colors.map((color) => (
              <li
                key={color._id}
                className="cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-600 px-2 py-1 rounded transition duration-300 ease-in-out"
              >
                {color.name}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Product Cards */}
      <main className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {product.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
          >
            <img
              src={`${API_BASH_URL}images/product/${product.thumbnail}`}
              alt={product.name}
              className="w-full h-100 object-cover rounded-lg"
            />
            <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </p>
            <p className="text-xl font-bold text-green-600">
              ${product.finalPrice}
            </p>
            <button className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition duration-300">
              <FaShoppingCart />
              Add to Cart
            </button>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Store;
