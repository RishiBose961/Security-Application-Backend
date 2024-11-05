import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';

const QRScanner = () => {
  const [authToken, setAuthToken] = useState(null);

  const handleScan = async (data) => {
    if (data) {
      try {
        const response = await axios.post('/api/auth/generate-login', { sessionToken: data });
        console.log(response.data);
        
        setAuthToken(response.data);
        alert("Login Successful!");
      } catch (error) {
        console.error('QR code login failed:', error);
        alert("Login Failed. Invalid or expired QR code.");
      }
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleError = (err) => {
    // console.error(err);
  };

  return (
    <div>
      <h2>Scan QR Code to Login</h2>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '30%',height: '40%' }}
      />
      {authToken && <p>Authenticated! Token: {authToken}</p>}
    </div>
  );
};

export default QRScanner;
