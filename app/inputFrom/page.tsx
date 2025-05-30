"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

const InputFormPage = () => {
  type UserData = {
    name: string;
    age: number;
    email: string;
  };

  const [userData, setUserData] = useState<UserData>({
    name: "",
    age: 0,
    email: "",
  });

  const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      const PostUser = async () => {
      try {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          const data = await response.json();
          toast.success("User data submitted successfully!");
          console.log(data);
        } else if (response.status === 409) {
          toast.error("Email already exists. Please use a different one.");
        } else {
          toast.error("Failed to submit user data.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong.");
      }
    };
    setUserData({
      name: "",
      age: 0,
      email: "",
    });
    PostUser();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4">
      <div className="bg-white text-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4">Input Form</h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Please fill out the form below
        </p>
        <form className="space-y-4" onSubmit={submitHandle}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={userData.name}
              onChange={changeHandle}
              required
            />
          </div>

          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              id="age"
              type="number"
              name="age"
              placeholder="Enter your age"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={userData.age}
              onChange={changeHandle}
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={userData.email}
              onChange={changeHandle}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition duration-300 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputFormPage;
