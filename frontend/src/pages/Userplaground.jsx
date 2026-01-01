import React, { useContext, useState, useEffect } from "react";
import {
  PlayCircle,
  Download,
  FileText,
  ArrowLeft,
  MoreHorizontal,
  Clock,
  Layout,
  ChevronRight,
  FileArchive,
  FileCode,
  FileImage,
  ShieldCheck,
  Video
} from "lucide-react";
import { SubjectContext } from "../context/Subjectcontext";
import { useNavigate } from "react-router-dom";

const Userplayground = () => {
  const { departmentscontext, videoFiles, setVideoFiles } = useContext(SubjectContext);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [resourceFiles, setResourceFiles] = useState([]);
  const navigate = useNavigate();

  // Monochrome icon helper
  const getFileIcon = (filename) => {
    const ext = filename.split(".").pop().toLowerCase();
    if (["zip", "rar", "7z"].includes(ext)) return <FileArchive size={20} />;
    if (["jpg", "png", "svg"].includes(ext)) return <FileImage size={20} />;
    if (["js", "py", "cpp", "html"].includes(ext)) return <FileCode size={20} />;
    return <FileText size={20} />;
  };

  const getvideo = async () => {
    if (!departmentscontext) return;
    try {
      const url = `${import.meta.env.VITE_backend_url}/list/${encodeURIComponent(departmentscontext)}`;
      const res = await fetch(url);
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data.files)) {
        setVideoFiles(data.files);
        setCurrentVideo(data.files[0]);
      }
    } catch (err) { console.error(err); }
  };

  const getresourse = async () => {
    if (!departmentscontext) return;
    try {
      const url = `${import.meta.env.VITE_backend_url}/user/list/resources/${encodeURIComponent(departmentscontext)}`;
      const res = await fetch(url);
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data.files)) {
        setResourceFiles(data.files);
      }
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    getvideo();
    getresourse();
  }, [departmentscontext]);

  return (
    <div className="h-screen flex flex-col bg-[#fafafa] text-black font-sans overflow-hidden">
      
      {/* HEADER */}
      <header className="h-20 border-b-2 border-black px-8 flex items-center justify-between bg-white z-50">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter leading-none">
              {departmentscontext} <span className="italic opacity-30">/ Workspace</span>
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-black animate-pulse"></div>
              <p className="text-[10px] font-black uppercase tracking-widest">Live Session</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden lg:block text-right">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-gray-400">Completion</p>
            <div className="flex items-center gap-3">
              <div className="w-48 h-3 border-2 border-black bg-white overflow-hidden p-0.5">
                <div className="h-full bg-black" style={{ width: '72%' }} />
              </div>
              <span className="text-xs font-black italic">72%</span>
            </div>
          </div>
          <button className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* VIDEO CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-12 custom-scrollbar">
          <div className="max-w-5xl mx-auto">
            
            {/* Brutalist Video Container */}
            <div className="bg-white border-2 border-black p-2 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-12">
              <div className="aspect-video bg-black flex items-center justify-center relative">
                {currentVideo ? (
                  <video
                    key={currentVideo}
                    controls
                    className="w-full h-full object-contain"
                    src={`${import.meta.env.VITE_backend_url}/stream/${encodeURIComponent(departmentscontext)}/videos/${encodeURIComponent(currentVideo)}`}
                  />
                ) : (
                  <div className="text-white flex flex-col items-center gap-4">
                     <Video size={48} strokeWidth={1} />
                     <p className="font-black uppercase tracking-widest text-xs">Waiting for signal...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Info Section */}
            <div className="mb-16 border-l-4 border-black pl-8 py-2">
              <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 italic">
                {currentVideo ? currentVideo.replace(/\.[^/.]+$/, "").replace(/_/g, " ") : 'Null Content'}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mb-6">
                Technical deep-dive into the core principles of {departmentscontext}. 
                This session covers architectural constraints and implementation strategies.
              </p>
              <div className="inline-flex items-center gap-2 border-2 border-black px-4 py-2 bg-white font-black text-[10px] uppercase tracking-widest">
                <ShieldCheck size={14} /> Academic Verified
              </div>
            </div>

            {/* Resources Grid */}
            <section className="mb-20">
              <div className="flex items-baseline gap-4 mb-8">
                <h2 className="text-3xl font-black uppercase tracking-tighter italic">Resources</h2>
                <div className="h-px flex-1 bg-black opacity-10"></div>
                <span className="text-[10px] font-black border border-black px-2 py-1">
                  {resourceFiles.length} TOTAL
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {resourceFiles.map((res, i) => (
                  <a
                    key={i}
                    href={`${import.meta.env.VITE_backend_url}/uploads/${encodeURIComponent(departmentscontext)}/resources/${encodeURIComponent(res)}`}
                    target="_blank"
                    download
                    className="group flex items-center gap-5 p-6 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                  >
                    <div className="p-3 bg-black text-white group-hover:bg-white group-hover:text-black border border-black transition-colors">
                      {getFileIcon(res)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-sm uppercase truncate italic">{res}</p>
                      <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest italic">Download PDF</p>
                    </div>
                    <Download className="text-black opacity-20 group-hover:opacity-100 transition-opacity" size={18} />
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* SIDEBAR PLAYLIST */}
        <aside className="w-full lg:w-[400px] bg-white border-l-2 border-black flex flex-col h-full">
          <div className="p-8 border-b-2 border-black bg-[#fafafa]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-2xl uppercase tracking-tighter italic">Syllabus</h3>
              <Layout size={20} />
            </div>
            <div className="bg-black text-white text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] inline-block">
              Module List
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {videoFiles.map((video, index) => {
              const isActive = currentVideo === video;
              return (
                <div
                  key={video}
                  onClick={() => setCurrentVideo(video)}
                  className={`relative flex items-center gap-4 p-5 cursor-pointer transition-all border-2 ${
                    isActive
                      ? "bg-black text-white border-black shadow-[6px_6px_0px_0px_rgba(150,150,150,0.5)]"
                      : "bg-white text-black border-black hover:bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                  }`}
                >
                  <div className={`w-8 h-8 flex items-center justify-center font-black text-xs border-2 ${isActive ? 'bg-white text-black border-white' : 'bg-black text-white border-black'}`}>
                    {index + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black uppercase tracking-tight truncate leading-tight italic">
                      {video.replace(/\.[^/.]+$/, "").replace(/_/g, " ")}
                    </p>
                    <div className="flex items-center gap-3 mt-1 opacity-50">
                      <span className="text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
                        <Clock size={10} /> 12:45 MIN
                      </span>
                    </div>
                  </div>

                  {isActive ? (
                    <div className="w-2 h-2 bg-white animate-pulse"></div>
                  ) : (
                    <ChevronRight size={16} className="opacity-30" />
                  )}
                </div>
              );
            })}
          </div>
        </aside>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #fff; border-left: 1px solid #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #000; }
      `}} />
    </div>
  );
};

export default Userplayground;