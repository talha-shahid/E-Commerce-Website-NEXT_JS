import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from 'next/router'

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/')
    }
  }, [])

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, email, password };

    let res = await fetch(`${process.env.HOST}/api/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let response = await res.json();
    console.log(response);
    setName("");
    setEmail("");
    setPassword("");
    toast.success('Account created successfully', {
      position: "bottom-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  };

  return (
    <>      <ToastContainer
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
              Sign up
            </h1>
            <form onSubmit={handleSubmit} class="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="name"
                  class="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                >
                  Name
                </label>
                <input
                  value={name}
                  onChange={handleChange}
                  type="text"
                  name="name"
                  id="name"
                  class="bg-zinc-900 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-neutral-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md shadow-pink-900"
                  placeholder="Enter Name"
                  required=""
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  class="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                >
                  Your email
                </label>
                <input
                  value={email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  class="bg-zinc-900 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-neutral-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md shadow-pink-900"
                  placeholder="Enter Email"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={handleChange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  class="bg-zinc-900 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-neutral-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md shadow-pink-900"
                  required=""
                />
              </div>

              <button
                type="submit"
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-800 dark:hover:bg-pink-900 dark:focus:ring-primary-800 shadow-sm shadow-stone-900 hover:shadow-stone-900"
              >
                Sign up
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-300">
                Already have an account?{" "}
                <Link href={"/login"}>
                  <a
                    href="#"
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login
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

export default Signup;
