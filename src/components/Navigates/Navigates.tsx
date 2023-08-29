import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Login";
import Home from "../Home/Home";
import { routes } from "./NavigateAccess";
import Dashboard from "../Dashboard";
import PrivateNavigates from "./PrivateNavigates";
import { getUser } from "../../localStorage";
import { useSelector } from "react-redux";
import ForgetPassword from "../Login/ForgetPassword";
import VerifyOtp from "../Login/VerifyOtp";
import ChangePassword from "../Login/ChangePassword";
const Navigates = () => {
  // const jindalReducerState = useSelector(
  //   (state: any) => state.jindalReducer
  // );
  // const {isOtpVerified} = jindalReducerState

  const isOTPVerified = useSelector((state: any) => state.isOtpVerified);
  console.log(isOTPVerified, "this is from navigates");
  const user = getUser();
  const haveAccess = (screen: any) => {
    if (screen === "/home") {
      if (user?.roleId === 1) {
        return routes?.includes(screen);
      } else {
        return false;
      }
    } else {
      return routes?.includes(screen);
    }
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route
            path="/forget-password"
            element={<ForgetPassword></ForgetPassword>}
          ></Route>
          {isOTPVerified && (
            <Route path="/verify-otp" element={<VerifyOtp></VerifyOtp>}></Route>
          )}
          <Route path="/dashboard" element={  <PrivateNavigates><Dashboard></Dashboard></PrivateNavigates>}></Route>
          <Route
            path="/changepassword"
            element={<ChangePassword></ChangePassword>}
          ></Route>
          <Route
            path="/home"
            element={
              <PrivateNavigates>
                {haveAccess("/home") === true ? (
                  <Home></Home>
                ) : (
                  <p>Access Denied</p>
                )}
              </PrivateNavigates>
            }
          ></Route>
          <Route
            path="/dashboard"
            element={
              <PrivateNavigates>
                {haveAccess("/dashboard") === true ? (
                  <Dashboard></Dashboard>
                ) : (
                  <p>Access Denied</p>
                )}
              </PrivateNavigates>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Navigates;
