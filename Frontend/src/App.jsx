import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Website/Pages/Layout'
import Home from './Website/Pages/Home'
import AdminPanel from './Admin/Pages/AdminPanel'
import Dashboard from './Admin/Pages/Product/Dashboard'
import ViewCategory from './Admin/Pages/Category/ViewCategory'
import AddCategory from './Admin/Pages/Category/AddCategory'
import EditCategory from './Admin/Pages/Category/EditCategory'
import ViewColor from './Admin/Pages/Color/ViewColor'
import AddColor from './Admin/Pages/Color/AddColor'
import EditColor from './Admin/Pages/Color/EditColor'
import ViewProduct from './Admin/Pages/Product/ViewProduct'
import AddProduct from './Admin/Pages/Product/AddProduct'
import EditProduct from './Admin/Pages/Product/EditProduct'
import MultipleImages from './Admin/Pages/Product/MultipleImages'
import Login from './Admin/Pages/Login'
import Store from './Website/Pages/Store'
import LoginPage from './Website/Pages/Login'
import RegisterPage from './Website/Pages/Register'
import Profilepage from './Website/Pages/Profilepage'



export default function App() {

  const routers = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/store',
          element: <Store />
        },
        {
          path: '/login',
          element: <LoginPage />
        },
        {
          path: '/register',
          element: <RegisterPage />
        },
        {
          path: '/profile',
          element: <Profilepage />
        },
        {
          path: '/cart',
          element: <Profilepage />
        },


      ]
    },
    {
      path: '/admin',
      element: <AdminPanel />,
      children: [
        {
          path: '/admin',
          element: <Dashboard />
        },
        {
          path: 'category',
          element: <ViewCategory />
        },
        {
          path: 'category/add',
          element: <AddCategory />
        },
        {
          path: "category/edit/:categoryId",
          element: <EditCategory />
        },
        {
          path: "color",
          element: <ViewColor />
        },
        {
          path: "color/add",
          element: <AddColor />
        },
        {
          path: "color/edit/:id",
          element: <EditColor />
        },
        {
          path: "product",
          element: <ViewProduct />
        },
        {
          path: "product/add",
          element: <AddProduct />
        },
        {
          path: "product/edit/:productID",
          element: <EditProduct />
        },
        {
          path: "product/multiple/:productId",
          element: <MultipleImages />
        },
      ]
    },
    {
      path: "/admin/login",
      element: <Login />
    }
  ])
  return (
    <RouterProvider router={routers} />
  )
}
