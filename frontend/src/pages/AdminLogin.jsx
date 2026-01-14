import React from "react";
import { useNavigate } from "react-router-dom";
import { useState,useEffect,useContext } from "react";
import { SubjectContext } from "../context/Subjectcontext";
import toast, { Toaster } from 'react-hot-toast';

const AdminLogin = () => {
  const navigate = useNavigate();
  const {setCurrentadmin} = useContext(SubjectContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const senddata = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_backend_url}/admin/adminlogin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Admin logged in successfully');
        localStorage.setItem('token', data.token);
        setCurrentadmin(formData);
        navigate('/adminpage');
      } else {
        if (data.errors) {
          data.errors.forEach(err => toast.error(err.msg));
        } else if (data.error) {
          toast.error(data.error);
        } else if (data.message) {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error('Error: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 font-sans text-black">
      <Toaster />
      <div className="w-full max-w-[400px] bg-white border border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
        <span className="absolute top-4 right-4 text-[10px] font-black border border-black px-2 py-0.5 uppercase">Admin Role</span>
        <h1 className="text-2xl font-black uppercase tracking-tighter mb-1">Staff Login</h1>
        <p className="text-sm text-gray-500 mb-8">Secure access for portal management.</p>

        <form className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest">Staff Email</label>
            <input type="email" className="w-full border-b border-black py-2 focus:outline-none" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest">Staff Password</label>
            <input type="password" className="w-full border-b border-black py-2 focus:outline-none" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          </div>
          <button onClick={senddata} className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest text-xs mt-4 hover:bg-gray-800 transition-all">
            Verify Identity
          </button>
          <p className="text-sm text-gray-500 mt-4">Don't have an account? <a className="text-black font-bold">ask the existing admin to approve your account</a></p>
        </form>
      </div>
      
    </div>
  );
};

export default AdminLogin;