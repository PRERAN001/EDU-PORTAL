import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SubjectContext } from "../context/Subjectcontext";
import toast, { Toaster } from 'react-hot-toast';

const UserRegister = () => {
    const navigate = useNavigate();
    const {setCurrentuser} = useContext(SubjectContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
      });
    const senddata = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_backend_url}/user/userreg`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Successfully registered');
                setCurrentuser(formData);
                navigate('/userpage');
            } else {
                if (data.errors) {
                    data.errors.forEach(err => toast.error(err.msg));
                } else if (data.error) {
                    toast.error(data.error);
                }
            }
        } catch (error) {
            toast.error('Error: ' + error.message);
        }
    }
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 font-sans text-black">
      <Toaster />
      <div className="w-full max-w-[400px] bg-white border border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-2xl font-black uppercase tracking-tighter mb-1">Student Signup</h1>
        <p className="text-sm text-gray-500 mb-8">Create your account to access resources.</p>

        <form className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest">Full Name</label>
            <input type="text" placeholder="e.g. Ram" className="w-full border-b border-black py-2 focus:outline-none focus:border-gray-400 transition-colors" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />  
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest">Email Address</label>
            <input type="email" placeholder="student@bms.edu" className="w-full border-b border-black py-2 focus:outline-none focus:border-gray-400 transition-colors" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest">Password</label>
            <input type="password" placeholder="••••••••" className="w-full border-b border-black py-2 focus:outline-none focus:border-gray-400 transition-colors" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          </div>
          <button onClick={senddata} className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest text-xs mt-4 hover:bg-gray-800 transition-all active:scale-[0.98]">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;