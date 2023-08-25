import React from "react";
import { useLocation,useNavigate } from "react-router-dom";
const ChangePassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email"); 
  console.log(email,"Email from change password")
  const passwordHandler = () =>{
console.log(email,"########")
  }
  return (
    <div>
      <>
        <section className="bg-gray-50 bg_log bg-cover h-screen flex items-center justify-center">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 drop-shadow-lg">
            <div className="w-full bg-white rounded-sm shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-r from-white-600 to-white-500 dark:border-gray-700 opacity-95">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight myfont text-gray-900 md:text-3xl dark:text-gray">
                  Reset Password
                </h1>
                <br></br>

                <small className="text-sm  text-gray-400 subtitle">
                  Password must contain at least 1 letter,1 number, and 1
                  symbol,minimum length is 12 characters.
                </small>

                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray myfont">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="email"
                      id="new_password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black  dark:focus:ring-blue-500 dark:focus:border-blue-500 subtitle"
                      placeholder="••••••••"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray myfont">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="email"
                      id="confirm_password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black  dark:focus:ring-blue-500 dark:focus:border-blue-500 subtitle"
                      placeholder="••••••••"
                    />
                  </div>

                  <button onClick={passwordHandler}
                    type="submit"
                    className="w-full bg-purple-700 py-2 text-white rounded subtitle hover:bg-purple-900"
                  >
                    Submit
                  </button>

                  <p className="text-sm font-light text-gray-500 dark:text-gray-400 subtitle text-sm">
                    Do you want to login ?{" "}
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500 "
                    >
                      <span className="font-bold text-gray-500 hover:text-violet-600 hover:underline">
                        Click here
                      </span>
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    </div>
  );
};

export default ChangePassword;
