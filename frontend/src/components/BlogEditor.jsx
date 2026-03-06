import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import { useParams } from "react-router-dom";

const BLOG_API_BASE = import.meta.env.VITE_blog_backend_url || "http://localhost:5000";

function BlogEditor() {
  
  const editorRef = useRef(null);
  const holderRef = useRef(null);
  const {department}=useParams()

  useEffect(() => {
    if (editorRef.current) return;

    const editor = new EditorJS({
      holder: holderRef.current,
      placeholder: "Click here to start writing...",
      inlineToolbar: true,
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
          config: { levels: [2, 3], defaultLevel: 2 },
        },

        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "blog_upload");

                const response = await fetch(
                  "https://api.cloudinary.com/v1_1/dxn29vjxu/image/upload",
                  {
                    method: "POST",
                    body: formData,
                  },
                );

                const data = await response.json();
                return {
                  success: 1,
                  file: {
                    url: data.secure_url,
                  },
                };
              },
            },
          },
        },
      },
    });

    editorRef.current = editor;

    return () => {
      if (
        editorRef.current &&
        typeof editorRef.current.destroy === "function"
      ) {
        editorRef.current.isReady
          .then(() => {
            editorRef.current.destroy();
            editorRef.current = null;
          })
          .catch(() => {});
      }
    };
  }, []);

  // --- ACTIONS ---

const handleSave = async () => {

  const output = await editorRef.current.save();

  const response = await fetch(`${BLOG_API_BASE}/saveblog/${department}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(output)
  });

  if (!response.ok) {
    throw new Error("Failed to save blog");
  }

};

  const handleClear = async () => {
    if (editorRef.current) {
      await editorRef.current.clear();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 pb-32">
      <div className="max-w-6xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm relative">
        {/* Top Header */}
        <div className="bg-slate-50 border-b border-slate-100 px-8 py-4 rounded-t-xl flex justify-between items-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Editor Mode
          </span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Department:{department}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleClear}
              className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors uppercase"
            >
              Clear Canvas
            </button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="px-8 md:px-16 py-10">
          <div
            ref={holderRef}
            className="prose prose-slate prose-lg max-w-none focus:outline-none"
          />
        </div>

        {/* Bottom Floating Save Bar */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/80 backdrop-blur-md border border-slate-200 px-6 py-3 rounded-full shadow-xl z-[1000]">
          <p className="text-sm text-slate-500 hidden sm:block">
            Ready to publish?
          </p>
          <div className="h-4 w-[1px] bg-slate-200 hidden sm:block"></div>
          <button
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-md shadow-indigo-200"
          >
            Save Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogEditor;

