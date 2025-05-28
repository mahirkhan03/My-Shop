import React, { useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MainContext } from "../../Context";
import { useParams, useSearchParams } from 'react-router-dom'
import { Link } from "react-router-dom";

const Store = () => {
  const { categorySlug } = useParams();
  const [limit, setlimit] = useState(0);
  const [colorslug, setColorslug] = useState(null);
  const [searchparam, setSearchparam] = useSearchParams()

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

    if (searchparam.get('limit')) {
      setlimit(searchparam.get('limit'))
    }
    if (searchparam.get('colorslug')) {
      setColorslug(searchparam.get('colorslug'))
    }

  },
    []
  );
  useEffect(() => {
    const query = {};
    if (limit) {
      query.limit = limit;
    }
    if (colorslug) {
      query.colorslug = colorslug;
    }
    setSearchparam(query);
    getProduct(null, limit, categorySlug, colorslug);
  },
    [limit, categorySlug, colorslug]
  );

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Category</h3>
          <ul className="space-y-2">
            <li className="cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-600 px-2 py-1 rounded transition duration-300 ease-in-out">
              <Link to={`/store`}>All</Link>
            </li>
            {Categories.map((category) => (
              <li
                key={category._id}
                className="cursor-pointer text-black flex justify-between hover:bg-blue-100 hover:text-blue-600 px-2 py-1 rounded transition duration-300 ease-in-out">
                <Link to={`/store/${category.slug}`}>{category.name}</Link>
                <span>({category.productCount})</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Colors */}
        <div className="mt-6">
          <h3 className=" font-semibold mb-2">Color</h3>
          <ul className="space-y-0.5 flex gap-2 ">
            {colors.map((color) => (
              <li
                onClick={() => setColorslug(color.slug)}
                key={color._id}
                className="cursor-pointer rounded-full w-8 h-8"
                style={{ background: color.hexcode }} title={color.name}
              >
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="px-4">
        <div className="text-gray-800 text-2xl font-medium mt-4 mx-10">Product</div>
        <div className="flex items-center gap-4 mt-3 px-10 ">
          <select onChange={(e) => setlimit(e.target.value)} className="border px-4 border-gray-300 rounded " name="Select" id="">
            <option value="0">All</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="6">6</option>
          </select>
        </div>
        {/* Product Cards */}
        <main className="flex-1 mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {product.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
            >
              <img
                src={`${API_BASH_URL}images/product/${product.thumbnail}`}
                alt={product.name}
                className="w-full h-100 object-center rounded-lg"
              />
              <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500 line-through">
                Price:{product.originalPrice}
              </p>
              <p className="text-xl font-bold text-green-600">
                Price: {product.finalPrice}
              </p>
              <button className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition duration-300">
                <FaShoppingCart />
                Add to Cart
              </button>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Store;
