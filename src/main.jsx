import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router";
import App from './App.jsx'
import PaymentForm from './pages/PaymentForm.jsx';
import SmsNotification from './pages/SmsNotification.jsx';
import 'primeicons/primeicons.css';
import 'primeflex/themes/primeone-light.css';
import './styles/lara-light-blue.css'
import CancelPayment from './pages/CancelPayment.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    index: true,
  },
  {
    path: "/payment",
    Component: PaymentForm,
  },
  {
    path: "/sms-notification",
    Component: SmsNotification,
  },
  {
    path: "/cancel-payment",
    Component: CancelPayment,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
