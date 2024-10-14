import React, { useState } from "react";

const UserManagement = () => {
  // Sample data for users
  const [users, setUsers] = useState([
    {
      id: 1,
      email: "john.doe@example.com",
      isAdmin: false,
    },
    {
      id: 2,
      email: "jane.smith@example.com",
      isAdmin: true,
    },
    {
      id: 3,
      email: "sam.wilson@example.com",
      isAdmin: false,
    },
  ]);

  // Delete a user
  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Make user an admin
  const handleMakeAdmin = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, isAdmin: true } : user
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {/* Users Table */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-center">Admin Status</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="border-b border-gray-300 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-center">
                  {user.isAdmin ? (
                    <span className="text-green-500 font-bold">Admin</span>
                  ) : (
                    <span className="text-red-500">User</span>
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  {!user.isAdmin && (
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 text-white py-1 px-4 rounded-lg mr-2"
                    >
                      Delete
                    </button>
                  )}
                  {!user.isAdmin && (
                    <button
                      onClick={() => handleMakeAdmin(user.id)}
                      className="bg-green-500 text-white py-1 px-4 rounded-lg"
                    >
                      Make Admin
                    </button>
                  )}
                  {user.isAdmin && (
                    <button
                      onClick={() => handleMakeAdmin(user.id)}
                      className="bg-gray-500 text-white py-1 px-4 rounded-lg"
                      disabled
                    >
                      Already Admin
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-4 text-center">
                No users available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
