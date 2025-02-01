/* eslint-disable no-unused-vars */

import { Toaster } from 'sonner'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import  AdminLogin  from './pages/admin/AdminLogin'
import  Home  from './pages/Home'
import  Products  from './pages/Products'
import  Signin  from './pages/auth/Signin'
import  Signup  from './pages/auth/Signup'

import { Provider } from 'react-redux'
import store from './store/store.js'
import Profile from './pages/user/Profile.jsx'
import Update from './pages/user/Update.jsx'
import ProtectedRoute from './pages/ProctedRoute.jsx'
import Test from './pages/Test.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import AdminProtectedRoute from './pages/AdminProtectedRoute.jsx'
import Analytics from './pages/admin/Analytics.jsx'
import AdminHome from './pages/admin/AdminHome.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import ProductManagement from './pages/admin/ProductManagement.jsx'
import OrderManagement from './pages/admin/OrderManagement.jsx'
import ContentManagement from './pages/admin/ContentManagement.jsx'


const router=createBrowserRouter([


  {
    path:'/',
    element:<App />,
    children:[
      {
        path:"",
        element:<Home />
      },



      {
        path:'/product-details',
        element:<Products />
      },
      {
        path:'profile',
        element:(
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path:'/profile/update',
        element:<Update/>
      },
      {
        path:'/test',
        element:(
          <ProtectedRoute>
            <Test />
          </ProtectedRoute>
        )
      }
      


    ]
  },

  {
    path:'sign-in',
    element:<Signin />
  },

  {
    path:'sign-up',
    element:<Signup />
  },
  {
    path:'admin/sign-in',
    element:<AdminLogin />
  },
  {
    path:'admin/dashboard/',
    element:<Dashboard/>,
    children:[
      {
        index:true,
        element:<AdminHome />
      },
      {
        path:'analytics',
        element:<Analytics />
      },
      {
        path:'product-management',
        element:<ProductManagement />
      },
      {
        path:'order-management',
        element:<OrderManagement />
      },
      {
        path:'content-management',
        element:<ContentManagement />
      },
    ]
  },
  {
    path:'*',
    element:<ErrorPage />
  }
  
 
  




])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >

    <Toaster position='top-right' richColors />
    <RouterProvider router={router} />

    </Provider>
  </StrictMode>,
)
