import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import PrivateRoute from "./components/PrivateRoute.jsx";
import QRCodeLogin from "./pages/Auth/QRCodeLogin.jsx";
import QRScanner from "./pages/Auth/QRScanner.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
       <Route path="/scan-qr" element={<QRScanner />} />
       <Route path="/generate-qr" element={<QRCodeLogin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Protected Route */}
      <Route path="" element={<PrivateRoute />}>
      <Route index={true} path="/" element={<Home />} />
     
   
        {/* <Route path="/profile" element={<ProfileScreem />} /> */}
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
 <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
  </Provider>
 
);
