"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";

const ShowData = () => {
  type User = {
    _id: string;
    name: string;
    age: number;
    email: string;
  };

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await fetch(`/api/users/${id}`, {
          method: "DELETE",
        });
        setUsers(users.filter((user) => user._id !== id));
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 pb-4">
      <div className="container mx-auto mt-20">
        <h1 className="text-4xl font-bold mb-4 animate-bounce text-center mt-10">
          Show Data
        </h1>

        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : users.length === 0 ? (
          <p className="text-center text-xl font-semibold mt-10">
            🚫 No Data Present Right Now
          </p>
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Serial no</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{users.indexOf(user) + 1}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.age}</td>
                  <td className="border px-4 py-2">
                    <span className="font-bold">{user.email}</span>
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex space-x-2 items-center">
                      <Link
                        href={`/edit/${user._id}`}
                        className="bg-white p-1 rounded-4xl"
                      >
                        <MdEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                      </Link>

                      <div className="bg-white p-1 rounded-4xl">
                        <MdDelete
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                          onClick={() => handleDelete(user._id)}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ShowData;
