import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from './routes/Routes';
import AuthProvider from './provider/AuthProvider';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='font-poppins'>
    <React.StrictMode>
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
      <Toaster/>
    </React.StrictMode>,
  </div>
)
