import React, { useState,useEffect } from "react";
import { getUser, setAuthToken, setUser } from "../localStorage";
import { Card, Form, Input, Button, message, Row, Col } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
const Login = () => {
  const [form] = Form.useForm();
  const [loginData, setLoginData] = useState(() => {
    const rememberMeFromStorage = localStorage.getItem('rememberMe') === 'true';
    const rememberMes = rememberMeFromStorage === true; // Parse the string to a boolean
    
    const userFromStorage = getUser();  
    return {
      email: rememberMes ? userFromStorage?.email : '',
      password: rememberMes ? '********' : '', 
    };
  });
  useEffect(() => {
    const rememberMeFromStorage = localStorage.getItem('rememberMe') === 'true';
    const rememberMes = rememberMeFromStorage === true; // Parse the string to a boolean
    const userFromStorage = getUser();
    console.log('rememberMeFromStorage:', rememberMeFromStorage);
    console.log('userFromStorage:', userFromStorage);
    setLoginData({
      email: rememberMes ? userFromStorage?.email : '',
      password: rememberMes ? userFromStorage?.password : '',
    });
  }, []);
  
  const [rememberMe, setRememberMe] = useState(false);

  const loginApi = () => {
    let email = loginData?.email;
    let password = loginData?.password;

    const apiUrl = "http://192.168.0.104:8080/login";
    axios
      .post(
        apiUrl,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => response.data)
      .then((data) => {
        if (data.token) {
          // Assuming setUser and setAuthToken functions are defined
          setUser(data.user);
          setAuthToken(data.token);
          if (rememberMe) {
            localStorage.setItem('rememberMe', 'true'); // Store rememberMe in local storage
          } else {
            localStorage.removeItem('rememberMe');
          }
          if (rememberMe) {
            setLoginData({ ...loginData, email: data.user.email });
          }
          if (data.user.roleId === 1) {
            window.location.href = "/home";
          } else {
            window.location.href = "/dashboard";
          }
        } else {
          message.warning(data.error);
        }
      });
  };
  return (
    <>
      <section className="bg-gray-50 bg_log bg-cover">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 drop-shadow-lg">
          <div className="w-full bg-white rounded-sm shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-r from-white-600 to-white-500 dark:border-gray-700 opacity-95">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight myfont text-center text-gray-900 md:text-2xl dark:text-gray">
                Login
              </h1>
              <Form
                className="space-y-4 md:space-y-6"
                onFinish={() => loginApi()}
                form={form}
              >
                <div>
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
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e?.target?.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black  dark:focus:ring-blue-500 dark:focus:border-blue-500 subtitle"
                      placeholder="Srini@Wakeflo.com"
                    />
                  </Form.Item>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray myfont">
                    Password
                  </label>
                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: "Enter Password" },
                      {
                        validator: (_, value) => {
                          if (value && value?.includes(" ")) {
                            return Promise.reject("Enter valid password");
                          } else {
                            return Promise.resolve();
                          }
                        },
                      },
                    ]}
                  >
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="off"
                      value={loginData.password} 
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          password: e?.target?.value,
                        })
                      }
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 subtitle"
                    />
                  </Form.Item>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-900 dark:text-gray-900 subtitle">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link
                    to="/forget-password"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 text-gray-600 subtitle"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-700 py-2 text-white rounded subtitle hover:bg-purple-900"
                >
                  Sign in
                </button>
                <p className="text-gray-500 dark:text-gray-400 text-right font-si ">
                  Powered by <span className="dark:text-gray-500">WAKEFLO</span>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
