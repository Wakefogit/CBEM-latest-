import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Form, Input, Button, message} from "antd";
const ForgetPassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loginemail, setloginemail] = useState({
    email: "",
  });
  const otpHandler = () => {
    const apiUrl = "http://192.168.0.104:8080/forgotpassword";
    axios
      .post(
        apiUrl,
        {
          email: loginemail?.email,
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
            const email = encodeURIComponent(loginemail.email);
            message.success(data.message)      
            navigate(`/verify-otp?email=${email}`);
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
                Forgot Password
              </h1>

              <Form className="space-y-4 md:space-y-6" form={form}>
                <div className="-mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray myfont">
                    Email
                  </label>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Enter Email Id" },
                      {
                        validator: (_, value) => {
                          if (value && value?.includes(" ")) {
                            return Promise.reject("Enter valid email id");
                          } else {
                            return Promise.resolve();
                          }
                        },
                      },
                    ]}
                  >
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="off"
                      onChange={(e) => setloginemail({ email: e.target.value })}
                      className="bg-gray-50 border  border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black  dark:focus:ring-blue-500 dark:focus:border-blue-500 subtitle"
                      placeholder="Srini@Wakeflo.com"
                    />
                  </Form.Item>
                </div>

                <button
                  type="submit"
                  onClick={otpHandler}
                  className="w-full bg-purple-700 py-2 text-white rounded subtitle hover:bg-purple-900"
                >
                  Send OTP
                </button>
                <p className=" font-light text-gray-500 dark:text-gray-400 subtitle text-sm">
                  Do you want to login ?{" "}
                  <Link
                    to="/"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500 "
                  >
                    <span className="font-bold text-gray-500 hover:text-violet-600 hover:underline">
                      Click here
                    </span>
                  </Link>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgetPassword;
