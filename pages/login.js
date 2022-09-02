import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/')
    }
  }, [])
  

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, password };

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let response = await res.json();
    console.log(response);
    setEmail("");
    setPassword("");
    if(response.success){
      localStorage.setItem('token', response.token)
      toast.success("Logged-in successfully", {
        position: "bottom-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push(`${process.env.NEXT_PUBLIC_HOST}`)
      }, 1000);
    }
    else{
      toast.error(response.error, {
        position: "bottom-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={false}
      />
      <section class="bg-gradient-to-r from-indigo-300 via-blue-400 to-purple-500">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gradient-to-b from-pink-800 via-pink-700 to-pink-500 dark:border-gray-700 shadow-lg shadow-pink-900">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Log in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    onChange={handleChange}
                    value={email}
                    type="email"
                    name="email"
                    id="email"
                    class="bg-zinc-900 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-neutral-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 border-neutral-500 shadow-md shadow-pink-900"
                    placeholder="Enter Email"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    onChange={handleChange}
                    value={password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    class="bg-zinc-900 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-neutral-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md shadow-pink-900"
                    required=""
                  />
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 "
                        required=""
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="remember"
                        class="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link href={"/forgot"}>
                    <a
                      href="#"
                      class="text-sm font-medium text-primary-600 hover:underline dark:text-white"
                    >
                      Forgot password?
                    </a>
                  </Link>
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-800 dark:hover:bg-pink-900 dark:focus:ring-primary-800 shadow-sm shadow-stone-900 hover:shadow-stone-900"
                >
                  Login
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-300">
                  Don’t have an account yet?{" "}
                  <Link href={"/signup"}>
                    <a
                      href="#"
                      class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign Up
                    </a>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
