"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { useState } from "react";
import { CustomUser } from '@/libs/auth';

const AdminSeite = () => {

      const [users, setUsers] = useState<CustomUser[]>([]);

      // Function to fetch users
      const handleUserAbfrage = async () => {
        try {
          const response = await fetch('/api/dbRequests');
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          const data: CustomUser[] = await response.json();
          setUsers(data); // Update state with fetched users
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

    return (
    <>
      <Breadcrumb pageTitle="Admin Seite" />

      <section className="pb-20 pt-17.5 lg:pb-25 lg:pt-22.5 xl:pb-30 xl:pt-27.5 2xl:pb-[150px]">
        <div className="wow fadeInUp mx-auto w-full max-w-[597px] px-4 text-center sm:px-8 lg:px-0">
          <h2 className="mb-5 text-heading-3 font-bold text-white">Willkommen Admin!</h2>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleUserAbfrage}
            className="hero-button-gradient rounded-lg px-7 py-3 font-medium text-white duration-300 ease-in hover:opacity-80"
          >
            Show Users
          </button>
        </div>

        {/* Display users below the button */}
        <div className="mt-8">
          {users.length > 0 ? (
            <table className="w-full max-w-2xl mx-auto bg-white text-black rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Access</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="px-4 py-2">{user.id}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.access}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-white">No users found.</p>
          )}
        </div>
      </section>
    </>
  );
};



export default AdminSeite;