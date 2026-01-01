import React, { useContext, useEffect, useState } from 'react';
import { SubjectContext } from '../context/Subjectcontext';

const Giveadminaccess = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const { currentadmin } = useContext(SubjectContext);

  const findUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_backend_url}/access/user`, {
        credentials: 'include',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const findAdmins = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_backend_url}/access/admin`, {
        method: 'GET',
        credentials: 'include',
        
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      setAdmins(data);
    } catch (err) {
      console.error(err);
    }
  };

  const giveAccess = async (user) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${import.meta.env.VITE_backend_url}/access/give`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ email: user.email }),
    });

    const data = await res.json();
    if (data.msg === 'admin access given') {
      findUsers();
      findAdmins();
    }
  };

  const removeAccess = async (admin) => {
    if (admin.email === 'naman@gmail.com') {
      alert('This admin cannot be removed.');
      return;
    }
    const token = localStorage.getItem('token');
    const res = await fetch(`${import.meta.env.VITE_backend_url}/access/remove`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ email: admin.email }),
    });

    const data = await res.json();
    if (data.msg === 'admin access removed') {
      findUsers();
      findAdmins();
    }
  };

  useEffect(() => {
    findUsers();
    findAdmins();
  }, []);

  if (!currentadmin || currentadmin.email !== 'naman@gmail.com') {
    return (
      <div className="min-h-screen bg-[#fafafa] font-sans text-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-black uppercase tracking-tighter">Not Authorized</h1>
          <p className="text-gray-500 uppercase text-xs font-bold tracking-[0.2em] mt-2">
            You do not have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-black overflow-x-hidden">
      <nav className="flex items-center justify-between px-8 py-6 border-b border-black bg-white">
        <div className="text-2xl font-black uppercase tracking-tighter">
          Admin<span className="bg-black text-white px-1 ml-1">Panel</span>
        </div>
      </nav>

      <main className="p-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tighter">Give Admin Access</h1>
          <p className="text-gray-500 uppercase text-xs font-bold tracking-[0.2em] mt-2">Manage user permissions</p>
        </div>

        {/* Users Table */}
        <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12">
          <h2 className="p-4 text-2xl font-black uppercase tracking-tighter">Users</h2>
          <table className="w-full text-left">
            <thead className="border-b-2 border-black">
              <tr>
                <th className="p-4 uppercase text-xs font-black tracking-widest">User</th>
                <th className="p-4 uppercase text-xs font-black tracking-widest">Email</th>
                <th className="p-4 uppercase text-xs font-black tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-100">
                  <td className="p-4 font-bold">{user.name}</td>
                  <td className="p-4 text-gray-500">{user.email}</td>
                  <td className="p-4 text-right">
                    <button
                      className="bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-800"
                      onClick={() => giveAccess(user)}
                    >
                      Give Access
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Admins Table */}
        <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="p-4 text-2xl font-black uppercase tracking-tighter">Admins</h2>
          <table className="w-full text-left">
            <thead className="border-b-2 border-black">
              <tr>
                <th className="p-4 uppercase text-xs font-black tracking-widest">Admin</th>
                <th className="p-4 uppercase text-xs font-black tracking-widest">Email</th>
                <th className="p-4 uppercase text-xs font-black tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin._id} className="border-b border-gray-100">
                  <td className="p-4 font-bold">{admin.name}</td>
                  <td className="p-4 text-gray-500">{admin.email}</td>
                  <td className="p-4 text-right">
                    <button
                      className="bg-red-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-red-700"
                      onClick={() => removeAccess(admin)}
                    >
                      Remove Access
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Giveadminaccess;