import React, { createContext, useContext, useState } from 'react'
const MainContext = createContext();
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';


function Context(props) {
    const [Categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [product, setProduct] = useState([]);
    const API_BASH_URL = "http://localhost:5000/"
    const CATEGORY_URL = "category"
    const COLOR_URL = "color"
    const PRODUCT_URL = "product"
    const ADMIN_URL = "admin"

    const notify = (msg, flag) => toast(msg, { type: flag ? 'success' : 'error' });

    function getCategory(id = null) {
        let URL = API_BASH_URL + CATEGORY_URL
        if (id != null) {
            URL = URL + `/${id}`

        }
        axios.get(URL).then(
            (response) => {
                if (response.data.flag === 1) {
                    setCategories(response.data.categories)
                }
            }
        ).catch(
            (error) => {
                setCategories([]);

            }
        )
    }

    function getColors(id = null) {
        let URL = API_BASH_URL + COLOR_URL
        if (id != null) {
            URL = URL + `/${id}`
        }
        axios.get(URL).then(
            (response) => {
                if (response.data.flag === 1) {
                    setColors(response.data.colors)
                }
            }
        ).catch(
            (error) => {
                setColors([]);
            }
        )
    }

    function getProduct(id = null, limit = 0, categorySlug = null, colorslug = null) {

        let URL = API_BASH_URL + PRODUCT_URL
        if (id != null) {
            URL = URL + `/${id}`
        }
        const query = new URLSearchParams();

        query.append('limit', limit)
        if (categorySlug) {
            query.append('categorySlug', categorySlug)
        }
        if (colorslug) {
            query.append('colorslug', colorslug)
        }
        axios.get(URL + "?" + query).then(
            (response) => {
                if (response.data.flag === 1) {
                    setProduct(response.data.product)
                }
            }
        ).catch(
            (error) => {
                setProduct([]);
            }
        )
    }


    return (
        <MainContext.Provider value={{ API_BASH_URL, ADMIN_URL, CATEGORY_URL, notify, getCategory, Categories, COLOR_URL, getColors, colors, PRODUCT_URL, product, getProduct }}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {
                props.children
            }
        </MainContext.Provider>
    )
}

export default Context;

export { MainContext };