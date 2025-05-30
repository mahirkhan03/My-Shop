import React, { useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MainContext } from "../../Context";
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { additems} from "../../redux/slice/cartSlices";

const Store = () => {
  const { categorySlug } = useParams();
  const [limit, setlimit] = useState(0);
  const [colorslug, setColorslug] = useState(null);
  const [searchparam, setSearchparam] = useSearchParams();
  const dispatch = useDispatch();

  
  
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

    if (searchparam.get('limit')) setlimit(searchparam.get('limit'));
    if (searchparam.get('colorslug')) setColorslug(searchparam.get('colorslug'));
  }, []);

  useEffect(() => {
    const query = {};
    if (limit) query.limit = limit;
    if (colorslug) query.colorslug = colorslug;

    setSearchparam(query);
    getProduct(null, limit, categorySlug, colorslug);
  }, [limit, categorySlug, colorslug]);
  return (
       <>
         <div className="w-full bg-white mt-5 px-6 py-3 rounded-full shadow-sm mb-6">
      <nav className="text-sm text-gray-500 font-medium space-x-1">
        <span className="text-gray-400">Home</span>
        <span>/</span>
        <span className="text-gray-400">pages</span>
        <span>/</span>
        <span className="text-black font-semibold">Store</span>
      </nav>
    </div>
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Category</h3>
          <ul className="space-y-2">
            <li className="cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-600 px-2 py-1 rounded">
              <Link to={`/store`}>All</Link>
            </li>
            {Categories.map((category) => (
              <li
                key={category._id}
                className="cursor-pointer text-black flex justify-between hover:bg-blue-100 hover:text-blue-600 px-2 py-1 rounded"
              >
                <Link to={`/store/${category.slug}`}>{category.name}</Link>
                <span>({category.productCount})</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Colors */}
        <div>
          <h3 className="font-semibold mb-2">Color</h3>
          <ul className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <li
                onClick={() => setColorslug(color.slug)}
                key={color._id}
                className="cursor-pointer rounded-full w-6 h-6 border border-gray-200 hover:scale-110 transition-transform"
                style={{ background: color.hexcode }}
                title={color.name}
              />
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
          <select
            onChange={(e) => setlimit(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded bg-white shadow-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="0">All</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="6">6</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {product.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition-all overflow-hidden"
            >
              <div className="overflow-hidden">
                <img
                  src={`${API_BASH_URL}images/product/${product.thumbnail}`}
                  alt={product.name}
                  className="w-full h-70 p-2 hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-400 line-through">Price: {product.originalPrice}</p>
                <p className="text-xl font-bold text-green-600 mb-4">Price: {product.finalPrice}</p>
                {/* <p className="text-xl font-bold text-green-600 mb-4"> {product._id}</p> */}

                
        
                <button
                  onClick={() =>
                    dispatch(
                      additems({
                        productId: product._id,
                        final_price: product.finalPrice,
                        original_Price: product.originalPrice,
                      })
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition duration-300"
                >
                  <FaShoppingCart className="text-lg" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Store;
