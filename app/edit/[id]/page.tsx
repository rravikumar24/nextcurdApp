'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const EditUser = () => {
  const params = useParams();
  const id = params?.id as string;
    const router = useRouter();

  const [data, setData] = useState({
    name: '',
    age: '',
    email: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok) throw new Error('Failed to fetch user');
        const user = await res.json();
        setData({
          name: user.name || '',
          age: user.age || '',
          email: user.email || '',
        });
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchData();
  }, [id]);

  const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const updateHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/users/${id}`, {
   
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Update failed');
       await res.json();
      toast.success('User updated successfully!');
      setTimeout(() => {
        router.push('/showData');
      }, 1500); 
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4">
      <div className="bg-white text-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4">Update Form</h1>

        <form className="space-y-4" onSubmit={updateHandle}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={data.name}
              onChange={changeHandle}
              required
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              id="age"
              type="number"
              name="age"
              placeholder="Enter your age"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={data.age}
              onChange={changeHandle}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={data.email}
              onChange={changeHandle}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition duration-300 cursor-pointer"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
