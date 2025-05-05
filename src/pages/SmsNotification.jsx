import { useEffect, useState } from "react";
import { redirect, useNavigate, useLocation } from "react-router";
import axios from 'axios';

import { ProgressSpinner } from 'primereact/progressspinner';

function SmsNotification() {
  const sheetsURL = import.meta.env.VITE_GOOGLE_SHEET_URL;
  const mnotifyKey = import.meta.env.VITE_MNOTIFY_API_KEY;

  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const transactionRef = queryParams.get('reference');

  const userInfo = localStorage.getItem('customerMetaData');
  if (!userInfo) redirect('/');

  const {
    firstName,
    lastName,
    email,
    address,
    contact,
    network,
    reference,
    other_ref,
    cast,
    totalCost,
    ticketNumber,
  } = JSON.parse(decodeURI(userInfo));

  const eventDate = new Date('2025-05-28T19:00:00');

  const [ticketCode, setTicketCode] = useState('');
  const [hasPosted, setHasPosted] = useState(false);
  const [smsSent, setSmsSent] = useState(false);

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    if (cast.length > 1) {
      result = cast;
      for (let i = 0; i < 2; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    } else {
      for (let i = 0; i < 4; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }
    return result;
  };

  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const generateTicketCode = () => {
    const prefix = 'ANV-DA';
    const datePart = getFormattedDate(eventDate);
    const randomPart = generateRandomCode();
    return `${prefix}-${datePart}-${randomPart}`;
  };

  const requiredFieldsPresent = () =>
    firstName && lastName && email && contact && network && reference && totalCost && ticketNumber && transactionRef;

  const sendToGoogleSheet = async (data) => {
    try {
      const response = await axios.post(sheetsURL, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        console.log('Data sent to Google Sheets successfully!');
        setHasPosted(true);
      }
    } catch (error) {
      console.error('Error sending to Google Sheets:', error);
    }
  };

  const sendSms = async () => {
    const smsData = {
      recipient: [contact],
      sender: 'AnvilProd', // Sender ID
      message: `Hello ${firstName}, your ticket code for Dedei Ashikishan is ${ticketCode}. Please present this code at the gate. Thank you for your purchase!`,
      is_schedule: 'false',
      schedule_date: ''
    };

    try {
      const response = await axios.post(`https://api.mnotify.com/api/sms/quick?key=${mnotifyKey}`, smsData, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.data && response.data.Status === "success") {
        console.log('SMS sent successfully');
        setSmsSent(true);
        localStorage.removeItem('customerMetaData'); // Clear user info after sending SMS
      } else {
        console.warn('SMS may not have been sent successfully', response.data);
        setSmsSent(true); // still continue UI flow
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      setSmsSent(true); // continue UI flow despite error
    }
  };

  useEffect(() => {
    if (!ticketCode) {
      const code = generateTicketCode();
      setTicketCode(code);
    }
  }, []);

  useEffect(() => {
    if (ticketCode && requiredFieldsPresent() && !hasPosted) {
      const ticketData = {
        firstName,
        lastName,
        email,
        address,
        contact,
        network,
        reference,
        other_ref,
        cast,
        totalCost,
        ticketCode,
        ticketNumber,
        paymentDate: new Date().toUTCString(),
        transactionRef
      };

      sendToGoogleSheet(ticketData).then(() => {
        sendSms();
      });
    }
  }, [ticketCode]);

  const isProcessing = !hasPosted && !smsSent;

  if (isProcessing) {
    return (
      <div className="flex flex-column align-items-center justify-center min-h-screen bg-bluegray-100 text-black justify-content-center" style={{ fontFamily: "Roboto Condensed, sans-serif" }}>
        <ProgressSpinner />
        <div className="text-lg font-medium mt-3">Processing...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-column align-items-center justify-content-center min-h-screen p-4 surface-0 text-center h-full" style={{ fontFamily: "Roboto Condensed, sans-serif" }}>
      <div className="flex flex-column align-items-center mb-4">
        <i className="pi pi-check-circle" style={{ fontSize: '3rem', color: '#4CAF50' }}></i>
      </div>
      <h1 className="text-3xl font-bold mb-2">Thank you {firstName} {lastName}</h1>
      <p className="text-lg mb-4">Your order was completed successfully.</p>

      <div className="flex align-items-start mb-6 align-content-center">
        <i className="pi pi-envelope text-3xl mr-3" />
        <div className="text-left align-self-center">
          Your order has been successfully processed. An SMS notification has been sent to {contact} with details of the play. Please keep it and provide it at the gate.
        </div>
      </div>

      <div className="flex justify-content-center mb-8">
        <button className="p-button p-component p-button-outlined p-button-primary cursor-pointer hover:bg-orange-100"
          style={{ borderColor: "#8F5A26", color: "#8F5A26" }} onClick={() => navigate('/')}>
          <strong>Return to Home</strong>
        </button>
        <button className="p-button p-component p-button-primary cursor-pointer bg-green-500 hover:bg-green-300 border-green-500"
          style={{ marginLeft: '10px', color: 'white' }} onClick={() => navigate('/payment')}>
          <strong>Buy More Tickets</strong>
        </button>
      </div>

      <footer className="mt-8 p-4 text-center text-gray-400 bg-black">
        © 2025 Anvil Productions. All rights reserved.
        <br />
        Powered by Effesus Software Solutions
      </footer>
    </div>
  );
}

export default SmsNotification;
