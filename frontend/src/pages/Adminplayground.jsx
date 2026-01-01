import React, { useState, useEffect, useContext } from "react";
import { SubjectContext } from "../context/Subjectcontext";
import {
  Trash2,
  Video,
  FileText,
  Upload,
  PlusCircle,
  Eye,
  ArrowLeft,
  MoreHorizontal,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Adminplayground = () => {
  const [video, setVideo] = useState(null);
  const [resource, setResource] = useState(null);
  const [department, setDepartment] = useState("");
  const [deleteFile, setDeleteFile] = useState("");
  const [uploadedContent, setUploadedContent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (department) fetchlist();
  }, [department]);

  const fetchlist = async () => {
    try {
      const [resV, resR] = await Promise.all([
        fetch(`${import.meta.env.VITE_backend_url}/user/list/${department}`),
        fetch(`${import.meta.env.VITE_backend_url}/user/list/resources/${department}`),
      ]);

      if (!resV.ok || !resR.ok) return;

      const dataV = await resV.json();
      const dataR = await resR.json();

      const videos = (dataV.files || []).map((file, index) => ({
        id: `v-${index}`,
        name: file,
        type: "video",
        dept: department,
      }));

      const resources = (dataR.files || []).map((file, index) => ({
        id: `r-${index}`,
        name: file,
        type: "resource",
        dept: department,
      }));

      setUploadedContent([...videos, ...resources]);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };
  const { admindept } = useContext(SubjectContext);
  const departments = [
    
    "Edge_computing",
    "Genome_Sequence",
    "Geometry_Analysis",
    "minist",
    "Picturing_Quantum_Process",
    "Tropical_Machine_Learning",
  ];

  useEffect(() => {
    if (admindept) setDepartment(admindept);
  }, [admindept]);

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const file = type === "video" ? video : resource;
    if (!department || !file)
      return alert(`Please select a department and ${type}`);

    const formData = new FormData();
    formData.append(type, file);
    const toastId = toast.loading("Uploading...");

    try {
      const res = await fetch(`${import.meta.env.VITE_backend_url}/admin/upload`, {
        method: "POST",
        headers: { department: department },
        body: formData,
      });
      if (res.ok) {
        toast.success(
          `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded!`,
          { id: toastId }
        );
        fetchlist();
      } else {
        toast.error("Upload failed", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed", { id: toastId });
    }
  };

  const handleDelete = (filename, type) => {
    if (!filename) return;
    if (!window.confirm("Confirm deletion of this resource?")) return;

    setDeleteFile(filename);
    const encoded = encodeURIComponent(filename);
    const deleteFileUrl = `${import.meta.env.VITE_backend_url}/user/delete/${department}/${encoded}`;
    const deleteResourceUrl = `${import.meta.env.VITE_backend_url}/user/delete/${department}/resources/${encoded}`;

    fetch(type === "video" ? deleteFileUrl : deleteResourceUrl, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.message === "File deleted successfully") {
          setUploadedContent((prev) =>
            prev.filter((item) => item.name !== filename)
          );
          setDeleteFile("");
          toast.success("File deleted successfully");
        } else {
          toast.error("Failed to delete file");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Delete request failed");
      });
  };

  const handlePreview = (filename, type) => {
    const url = `${import.meta.env.VITE_backend_url}/uploads/${department}/${
      type === "video" ? "videos" : "resources"
    }/${encodeURIComponent(filename)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="h-screen flex flex-col bg-[#fafafa] text-black font-sans overflow-hidden">
      <Toaster />
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
              Admin Playground{" "}
              <span className="italic opacity-30">/ Content Management</span>
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-red-500 animate-pulse"></div>
              <p className="text-[10px] font-black uppercase tracking-widest">
                Live
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden lg:block text-right">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-gray-400">
              Selected Dept.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs font-black italic">
                {department || "None"}
              </span>
            </div>
          </div>
          <button className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT PANEL: UPLOAD TOOLS */}
        <div className="w-full lg:w-[400px] bg-white border-r-2 border-black flex flex-col h-full">
          <div className="p-8 border-b-2 border-black bg-[#fafafa]">
            <h3 className="font-black text-2xl uppercase tracking-tighter italic">
              Upload Tools
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {/* Video Upload Form */}
            <form
              onSubmit={(e) => handleSubmit(e, "video")}
              className="p-6 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <Video size={16} className="text-blue-600" />
                <h2 className="font-black uppercase tracking-tight">
                  Upload Lecture
                </h2>
              </div>
              <label className="group flex flex-col items-center justify-center p-8 border-2 border-dashed border-black rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
                <Upload
                  className="text-gray-400 group-hover:text-blue-500 mb-2"
                  size={24}
                />
                <span className="text-xs font-medium text-gray-500 text-center">
                  {video ? video.name : "Click to browse video files"}
                </span>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideo(e.target.files[0])}
                  className="hidden"
                />
              </label>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                Publish Video
              </button>
            </form>

            {/* Resource Upload Form */}
            <form
              onSubmit={(e) => handleSubmit(e, "resource")}
              className="p-6 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <FileText size={16} className="text-emerald-600" />
                <h2 className="font-black uppercase tracking-tight">
                  Upload Material
                </h2>
              </div>
              <label className="group flex flex-col items-center justify-center p-8 border-2 border-dashed border-black rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
                <PlusCircle
                  className="text-gray-400 group-hover:text-emerald-500 mb-2"
                  size={24}
                />
                <span className="text-xs font-medium text-gray-500 text-center">
                  {resource ? resource.name : "Click to browse PDFs/Docs"}
                </span>
                <input
                  type="file"
                  onChange={(e) => setResource(e.target.files[0])}
                  className="hidden"
                />
              </label>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                Upload Resource
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT PANEL: CONTENT MANAGEMENT */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navigation Tabs */}
          <div className="flex border-b-2 border-black bg-white p-2 gap-1 overflow-x-auto custom-scrollbar">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setDepartment(dept)}
                className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all border-2 border-transparent ${
                  department === dept
                    ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Content List */}
          <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black uppercase tracking-tight italic">
                {department} Management
              </h3>
              <span className="border-2 border-black text-black text-[10px] font-bold px-2 py-1">
                {uploadedContent.filter((i) => i.dept === department).length}{" "}
                ITEMS
              </span>
            </div>

            <div className="space-y-3">
              {uploadedContent.filter((item) => item.dept === department)
                .length > 0 ? (
                uploadedContent
                  .filter((item) => item.dept === department)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="group flex items-center justify-between p-4 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-2 border-2 border-black ${
                            item.type === "video"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-emerald-100 text-emerald-600"
                          }`}
                        >
                          {item.type === "video" ? (
                            <Video size={18} />
                          ) : (
                            <FileText size={18} />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-black italic">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-gray-400 uppercase font-bold">
                            {item.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePreview(item.name, item.type)}
                          className="p-2.5 text-gray-400 hover:text-blue-500 border-2 border-transparent hover:border-black hover:bg-white transition-all"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.name, item.type)}
                          className="p-2.5 text-gray-400 hover:text-red-500 border-2 border-transparent hover:border-black hover:bg-white transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-gray-400 border-2 border-dashed border-black rounded-lg">
                  <Upload size={48} className="mb-4 opacity-50" />
                  <p className="font-medium">
                    No resources found for this subject
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #fff; border-left: 1px solid #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #000; }
      `}} />
    </div>
  );
};

export default Adminplayground;