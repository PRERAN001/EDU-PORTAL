import React, { useState, useContext } from 'react';
import { SubjectContext } from "../context/Subjectcontext";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { 
  Settings, 
  X, 
  LogOut, 
  ArrowRight,
  User,
  Activity,
  Cpu, 
  Globe, 
  Database, 
  ShieldCheck, 
  Users, 
  BookOpen 
} from 'lucide-react';
import Giveadminaccess from './Giveadminaccess';
const Adminhomepage = () => {
  const { setAdmindept,currentadmin,setCurrentadmin } = useContext(SubjectContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

 
  const departments = [
    
    { id: 2, name: 'Edge_computing',actualname:"Edge computing and Tropical Ml", icon: <Globe size={24} /> },
    { id: 3, name: 'Genome_Sequence',actualname:"Genome Sequence and Automata Theory -1", icon: <Database size={24} /> },
    { id: 4, name: 'Geometry_Analysis',actualname:"Gemetry and Analysis of minimal surface for beginers ", icon: <ShieldCheck size={24} /> },
    { id: 5, name: 'minist',actualname:"MINIST" ,icon: <Users size={24} /> },
    { id: 6, name: 'Picturing_Quantum_Process',actualname:"Picturing Quantum Process" ,icon: <BookOpen size={24} /> },
    { id: 7, name: 'Tropical_Machine_Learning',actualname:"Tropicl Machine learning", icon: <BookOpen size={24} /> },
  ];

  const handleDeptClick = (deptName) => {
    setAdmindept(deptName);
    navigate(`/adminplayground`);
  };
  const handleLogout = () => {
    setCurrentadmin(null);
    const url=  `${import.meta.env.backend_url}/admin/adminlogout`;
    fetch(url,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      
    }).then(() => {
      toast.success('Logged out successfully');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-black overflow-x-hidden">
      <Toaster/>
      
      {/* HEADER */}
     <nav className="relative flex items-center px-8 py-5 border-b-2 border-black bg-white shadow-[0_4px_0_0_rgba(0,0,0,1)]">

  {/* LEFT — Admin Panel */}
  <div className="text-2xl font-black uppercase tracking-tight">
    Admin
    <span className="bg-black text-white px-2 ml-1">Panel</span>
  </div>

  {/* CENTER — Welcome */}
  <div className="absolute left-1/2 -translate-x-1/2">
    <span className="text-sm font-semibold tracking-wide">
      Welcome, {currentadmin?.name || "Admin"}
    </span>
  </div>

  {/* RIGHT — Actions */}
  <div className="ml-auto flex items-center gap-4">
    
    {/* Give Access */}
    <button onClick={()=>{
      console.log("clicked")
      navigate('/giveadminaccess');
    }} className="px-4 py-2 border-2 border-black text-sm font-semibold hover:bg-black hover:text-white transition-all shadow-[3px_3px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2 px]">
      Give Access
    </button>

    {/* Settings */}
    <button
      onClick={() => setIsSidebarOpen(true)}
      className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
    >
      <Settings size={22} />
    </button>

  </div>
</nav>

      {/* MAIN CONTENT */}
      <main className="p-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tighter">Departments</h1>
          <p className="text-gray-500 uppercase text-xs font-bold tracking-[0.2em] mt-2">Select a sector to manage resources</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept) => (
            <div 
              key={dept.id}
              onClick={() => handleDeptClick(dept.name)}
              className="group bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-black text-white">
                  {dept.icon}
                </div>
                <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-2">{dept.actualname}</h3>
              <p className="text-sm text-gray-500 font-medium leading-tight">
                Manage video lectures, PDF resources, and department specific content.
              </p>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest">Access Vault</span>
                <span className="text-[10px] font-bold text-gray-400">01 — STAFF ONLY</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* SETTINGS SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SETTINGS SIDEBAR */}
      <aside className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white border-l-4 border-black z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 h-full flex flex-col">
          
          {/* Close Button */}
          <div className="flex justify-end mb-8">
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all">
              <X size={24} />
            </button>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-4 mb-10 pb-10 border-b border-black">
            <div className="w-16 h-16 bg-black flex items-center justify-center text-white">
              <User size={32} />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tighter leading-none">{currentadmin.name}</h2>
              <p className="text-xs text-gray-500 font-bold tracking-widest mt-1">{currentadmin.email}</p>
              <span className="inline-block mt-2 text-[10px] bg-black text-white px-2 py-0.5 font-bold uppercase">Super Admin</span>
            </div>
          </div>

          {/* Mini Dashboard */}
          <div className="flex-1 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 italic">Live Stats</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-black p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={16} />
                  <span className="text-[10px] font-bold uppercase">Online</span>
                </div>
                <p className="text-3xl font-black">124</p>
              </div>
              <div className="border-2 border-black p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity size={16} />
                  <span className="text-[10px] font-bold uppercase">Uptime</span>
                </div>
                <p className="text-3xl font-black italic">99%</p>
              </div>
            </div>

            <div className="border-2 border-black p-4 space-y-4 bg-gray-50">
                <p className="text-[10px] font-black uppercase tracking-widest">System Health</p>
                <div className="h-2 bg-black w-full shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]"></div>
                <p className="text-[10px] font-bold text-gray-500">All modules operational</p>
            </div>
          </div>

          {/* Logout Button */}
          <button 
            className="w-full mt-auto flex items-center justify-center gap-2 bg-black text-white py-4 font-black uppercase tracking-widest text-xs hover:bg-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
            onClick={() => {
              handleLogout();
              navigate('/adminlogin');
            }}
          >
            <LogOut size={18} /> Logout Session
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Adminhomepage;