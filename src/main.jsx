import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Spinner from './components/Spinner.jsx'
import NotFound from "./pages/NotFound.jsx"
import Home from "./pages/Home.jsx"
import { lazy } from 'react'

// Lazy-load heavy route components for code-splitting and better performance
const ProductDetail=lazy(()=>import("./pages/ProductDetail.jsx"))
const Checkout=lazy(()=>import('./pages/Checkout.jsx'))
const Cart=lazy(()=>import("./pages/Cart.jsx"))

// Define the routes for the application using React Router's createBrowserRouter
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
          // Dynamic route for product details page
        path: '/product-details/:productId',
         // Wrap lazy-loaded component with Suspense to show spinner while loading
        element: <Suspense fallback={<Spinner/>}><ProductDetail /></Suspense>
      }, {
        path: '/cart',
        element:  <Suspense fallback={<Spinner/>}><Cart/></Suspense>
      }, {
        path: '/checkout',
        element: <Suspense fallback={<Spinner/>}><Checkout /></Suspense>
      }

    ],
      // Render this component for unmatched routes (404 Not Found)
       errorElement:<NotFound/>
      
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter}>
      <App />
    </RouterProvider>

  </StrictMode>,
)
