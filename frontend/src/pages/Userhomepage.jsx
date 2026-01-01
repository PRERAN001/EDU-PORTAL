import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubjectContext } from '../context/Subjectcontext';
import toast, { Toaster } from 'react-hot-toast';
import { 
  Settings, 
  X, 
  LogOut, 
  ArrowRight, 
  User, 
  Users, 
  Cpu, 
  Globe, 
  Database, 
  ShieldCheck, 
  BookOpen, 
  Archive,
  GraduationCap
} from 'lucide-react';

const Userhomepage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setDepartmentscontext,currentuser,setCurrentuser } = useContext(SubjectContext);  
  const navigate = useNavigate();


 const departments = [
    
    { id: 2, name: 'Edge_computing',actualname:"Edge computing and Tropical Ml", icon: <Globe size={24} /> },
    { id: 3, name: 'Genome_Sequence',actualname:"Genome Sequence and Automata Theory -1", icon: <Database size={24} /> },
    { id: 4, name: 'Geometry_Analysis',actualname:"Gemetry and Analysis of minimal surface for beginers ", icon: <ShieldCheck size={24} /> },
    { id: 5, name: 'minist',actualname:"MINIST" ,icon: <Users size={24} /> },
    { id: 6, name: 'Picturing_Quantum_Process',actualname:"Picturing Quantum Process" ,icon: <BookOpen size={24} /> },
    { id: 7, name: 'Tropical_Machine_Learning',actualname:"Tropicl Machine learning", icon: <BookOpen size={24} /> },
  ];

  const handleDeptClick = (deptId) => {
    setDepartmentscontext(deptId);
    navigate('/userplayground');
  };
  const handleLogout = () => {
    
    const url=`${import.meta.env.VITE_backend_url}/user/userlogout`;
    fetch(url,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      
    }).then(() => {
      toast.success('Logged out successfully');
      setTimeout(() => {
        navigate("/");
      }, 2000);
    });
  };
  
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-black overflow-x-hidden">
      <Toaster/>
      
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-black bg-white sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="bg-black p-1">
            <GraduationCap className="text-white" size={20} />
          </div>
          <span className="text-2xl font-black uppercase tracking-tighter">
            Edu<span className="bg-black text-white px-1 ml-1">Portal</span>
          </span>
        </div>

        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
        >
          <Settings size={24} />
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <main className="p-8 max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tighter">Student Hub</h1>
          <p className="text-gray-500 uppercase text-xs font-bold tracking-[0.2em] mt-2 italic underline decoration-2 decoration-black">
            Select your department to access study materials
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept) => (
            <div
              key={dept.id}
              onClick={() => handleDeptClick(dept.name)}
              className="group bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-black text-white">
                    {dept.icon}
                  </div>
                  <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-1">{dept.actualname}</h3>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <Users size={12} />
                  <span>{dept.students} Peers Enrolled</span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-black group-hover:underline">Enter Classroom &rarr;</span>
                <span className="text-[10px] font-bold text-gray-300">SEC_01</span>
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
          
          <div className="flex justify-end mb-8">
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all">
              <X size={24} />
            </button>
          </div>

          {/* Student Profile */}
          <div className="flex items-center gap-4 mb-10 pb-10 border-b border-black">
            <div className="w-16 h-16 bg-black flex items-center justify-center text-white">
              <User size={32} />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tighter leading-none">{currentuser.name}</h2>
              <p className="text-xs text-gray-500 font-bold tracking-widest mt-1">{currentuser.email}</p>
              <span className="inline-block mt-2 text-[10px] bg-black text-white px-2 py-0.5 font-bold uppercase tracking-tighter">Verified Learner</span>
            </div>
          </div>

          {/* Student Stats */}
          <div className="flex-1 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 italic">Course Activity</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-black p-4">
                <p className="text-[10px] font-bold uppercase mb-1 opacity-50">Saved</p>
                <p className="text-3xl font-black">12</p>
              </div>
              <div className="border-2 border-black p-4">
                <p className="text-[10px] font-bold uppercase mb-1 opacity-50">Watched</p>
                <p className="text-3xl font-black italic">45h</p>
              </div>
            </div>

            <div className="border-2 border-black p-6 space-y-4 bg-gray-50 flex flex-col items-center text-center">
                <Archive size={32} strokeWidth={1.5} />
                <p className="text-[10px] font-black uppercase tracking-widest leading-tight">Your digital library is synchronized.</p>
            </div>
          </div>

          <button 
            className="w-full mt-auto flex items-center justify-center gap-2 bg-black text-white py-4 font-black uppercase tracking-widest text-xs hover:bg-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
            onClick={() => handleLogout()}
          >
            <LogOut size={18} /> Exit Student Portal
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Userhomepage;