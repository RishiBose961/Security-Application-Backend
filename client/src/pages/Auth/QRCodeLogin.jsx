/* eslint-disable no-unused-vars */
// QRCodeLogin.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const QRCodeLogin = () => {
  const [qrCode, setQrCode] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);

  // Fetch QR Code on component mount
  useEffect(() => {
    const fetchQRCode = async () => {
      if (!userInfo?._id) {
        console.error("User information not found.");
        return;
      }

      try {
        const response = await axios.get(`/api/auth/generate-qr/${userInfo._id}`);
        setQrCode(response.data.qrCode);
      } catch (error) {
        console.error('Error fetching QR code:', error);
      }
    };

    fetchQRCode();
  }, [userInfo?._id]); // Add userInfo?._id as a dependency

//   const handleQRCodeScan = async (sessionToken) => {
//     try {
//       const response = await axios.post('http://localhost:3000/qr-login', { sessionToken });
//       console.log(response.data);

//       setAuthToken(response.data.authToken); // Save the auth token
//       alert("Login Successful!");
//     } catch (error) {
//       console.error('QR code login failed:', error);
//       alert("Login Failed. Invalid or expired QR code.");
//     }
//   };

  return (
    <div>
      <h2>Scan QR Code to Login</h2>

      {qrCode ? (
        <img src={qrCode} alt="QR Code for Login" />
      ) : (
        <p>Loading QR Code...</p>
      )}
    </div>
  );
};

export default QRCodeLogin;
