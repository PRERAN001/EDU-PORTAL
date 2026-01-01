// import React from "react";
// import { useState,useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { SubjectContext } from "../context/Subjectcontext";
// import toast, { Toaster } from 'react-hot-toast';

// const AdminRegister = () => {
//     const navigate = useNavigate();
//     const {setCurrentadmin} = useContext(SubjectContext);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: ''
//       });
//       const senddata = async (e) => {
//         e.preventDefault();
//         try {
//           const response = await fetch('http://localhost:3000/admin/adminreg', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             credentials: 'include',
//             body: JSON.stringify(formData)
//           });
//           const data = await response.json();
//           if (response.ok) {
//             toast.success('Admin registered successfully');
//             setCurrentadmin(formData);
//             navigate('/adminpage');
//           } else {
//             if (data.errors) {
//               data.errors.forEach(err => toast.error(err.msg));
//             } else if (data.error) {
//               toast.error(data.error);
//             }
//           }
//         } catch (error) {
//           toast.error('Error: ' + error.message);
//         }
//       };
//   return (
//     <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 font-sans text-black">
//       <Toaster />
//       <div className="w-full max-w-[400px] bg-white border border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
//         <span className="absolute top-4 right-4 text-[10px] font-black border border-black px-2 py-0.5 uppercase">Admin Role</span>
//         <h1 className="text-2xl font-black uppercase tracking-tighter mb-1">Staff Signup</h1>
//         <p className="text-sm text-gray-500 mb-8">Register a new administrative account.</p>

//         <form className="space-y-6">
//           <div className="space-y-1">
//             <label className="text-[10px] font-bold uppercase tracking-widest">Admin Name</label>
//             <input type="text" className="w-full border-b border-black py-2 focus:outline-none" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
//           </div>
//           <div className="space-y-1">
//             <label className="text-[10px] font-bold uppercase tracking-widest">Work Email</label>
//             <input type="email" className="w-full border-b border-black py-2 focus:outline-none" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
//           </div>
//           <div className="space-y-1">
//             <label className="text-[10px] font-bold uppercase tracking-widest">Master Password</label>
//             <input type="password" className="w-full border-b border-black py-2 focus:outline-none" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
//           </div>
//           <button onClick={senddata} className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest text-xs mt-4 hover:bg-gray-800 transition-all">
//             Initialize Admin
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminRegister;