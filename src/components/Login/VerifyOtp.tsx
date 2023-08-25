import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") ?? ""; // Provide a default empty string

  const [enteredOtp, setEnteredOtp] = useState({
    otpValue: "",
  });

  const submitHandler = (e: any) => {
    e.preventDefault();
    const apiUrl = "http://192.168.0.104:8080/otp";

    axios
      .post(
        apiUrl,
        {
          email: email,
          otp: enteredOtp?.otpValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => response.data)
      .then((data) => {
        if (data.message) {
          message.success(data.message);
          navigate(`/changepassword?email=${encodeURIComponent(email)}`);
        } else {
          message.warning(data.error);
        }
      });
  };

  return (
    <>
      <section className="bg-gray-50 bg_log bg-cover h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 drop-shadow-lg">
          <div className="w-full bg-white rounded-sm shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-r from-white-600 to-white-500 dark:border-gray-700 opacity-95">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight myfont text-gray-900 md:text-3xl dark:text-gray">
                Enter OTP
              </h1>

              <small className="text-sm text-gray-400 subtitle">
                An 6 digits code as been sent to sr*****@*****.com{" "}
              </small>

              <form className="space-y-4 md:space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray myfont">
                    OTP
                  </label>

                  <input
                    type="text"
                    name="number"
                    id="otp"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black  dark:focus:ring-blue-500 dark:focus:border-blue-500 subtitle"
                    placeholder="Please enter the OTP"
                    onChange={(e) =>
                      setEnteredOtp({ otpValue: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-700 py-2 text-white rounded subtitle hover:bg-purple-900"
                  onClick={submitHandler}
                >
                  Submit
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400 subtitle text-sm">
                  Didn't you recieve any code ?{" "}
                  {/* <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500 "
                  >
                    <span className="font-bold text-gray-500 hover:text-violet-600 hover:underline">
                      {" "}
                      Resend OTP
                    </span>
                  </a> */}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VerifyOtp;
