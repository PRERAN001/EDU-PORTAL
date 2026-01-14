import React from "react";
import {
  ArrowRight,
  BookOpen,
  Shield,
  Laptop,
  GraduationCap,
  BrainCircuit,
  Shapes,
  Infinity,
  Sigma,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-black">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-black bg-white">
        <div className="text-2xl font-black uppercase tracking-tighter">
          Edu<span className="bg-black text-white px-1 ml-1">Portal</span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/adminlogin")}
            className="text-[10px] font-bold uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-all"
          >
            ADMIN
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="px-8 py-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
            Education <br />
            <span className="italic underline decoration-4">Redefined.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-md">
            A centralized hub for engineering students to access lectures, lab
            resources, and study materials. Built for efficiency.
          </p>
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => navigate("/userlogin")}
              className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest text-xs flex items-center gap-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              Get Started <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="bg-white border-2 border-black p-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="aspect-video bg-gray-100 border border-black flex items-center justify-center">
              <GraduationCap size={80} strokeWidth={1} />
            </div>
            <div className="mt-4 p-2 space-y-2">
              <div className="h-2 w-3/4 bg-black"></div>
              <div className="h-2 w-1/2 bg-gray-200"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SUBJECT CATEGORIES */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Our Mission
          </h2>
          <p className="mt-4 text-4xl md:text-5xl font-black tracking-tighter uppercase">
            Bridging Theory & Discovery
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
            EDU-PORTAL is a student-led initiative to engage undergraduates in
            frontier research. We provide a transparent roadmap for aspiring
            researchers by publishing our session logs and recordings.
          </p>
        </div>

        <div className="max-w-7xl mx-auto mt-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 border border-gray-200 p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
                <Shapes size={24} />
              </div>
              <h3 className="font-bold text-lg">Tropical Geometry</h3>
              <p className="text-sm text-gray-500">
                Exploring combinatorial properties of algebraic varieties.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 flex items-center justify-center rounded-full">
                <Infinity size={24} />
              </div>
              <h3 className="font-bold text-lg">Non-Standard Analysis</h3>
              <p className="text-sm text-gray-500">
                Utilizing infinitesimals to build a rigorous foundation for
                calculus.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 flex items-center justify-center rounded-full">
                <BrainCircuit size={24} />
              </div>
              <h3 className="font-bold text-lg">Minimal Surfaces</h3>
              <p className="text-sm text-gray-500">
                Investigating surfaces that locally minimize their area.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 bg-red-100 text-red-600 flex items-center justify-center rounded-full">
                <Sigma size={24} />
              </div>
              <h3 className="font-bold text-lg">Algebraic Statistics</h3>
              <p className="text-sm text-gray-500">
                Applying algebraic geometry to statistical models.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            Our current work is under peer review at the{" "}
            <span className="font-semibold text-gray-700 italic">
              Rose-Hulman Journal of Undergraduate Mathematics
            </span>
            .
          </p>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="px-8 py-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 border-2 border-black flex items-center justify-center">
              <BookOpen size={24} />
            </div>
            <h4 className="font-black uppercase tracking-tight text-xl">
              Curated Content
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Hand-picked resources uploaded directly by your department staff.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 border-2 border-black flex items-center justify-center">
              <Laptop size={24} />
            </div>
            <h4 className="font-black uppercase tracking-tight text-xl">
              Video Lectures
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              High-quality video streaming for all subjects, accessible anytime.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 border-2 border-black flex items-center justify-center">
              <Shield size={24} />
            </div>
            <h4 className="font-black uppercase tracking-tight text-xl">
              Admin Control
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Dedicated portals for staff to manage and update subject data.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 py-12 border-t border-black bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-lg font-black uppercase tracking-tighter">
            Edu<span className="bg-black text-white px-1 ml-1">Portal</span>
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
            © 2025 Bangalore Institute of Technology
          </p>
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest">
            <a href="/adminlogin" className="hover:underline">
              Admin Login
            </a>
            <a href="/userlogin" className="hover:underline">
              User Login
            </a>
            <a href="/userreg" className="hover:underline">
              User Register
            </a>
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;