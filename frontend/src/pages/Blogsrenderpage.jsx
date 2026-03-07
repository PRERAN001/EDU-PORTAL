import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BLOG_API_BASE = import.meta.env.VITE_blog_backend_url 

const normalizeBlog = (blogDoc, fallbackDepartment) => {
  const content = blogDoc?.content && typeof blogDoc.content === "object"
    ? blogDoc.content
    : blogDoc;

  return {
    _id: blogDoc?._id || blogDoc?.blog_id || null,
    department: blogDoc?.department || fallbackDepartment,
    ...content,
    blocks: Array.isArray(content?.blocks) ? content.blocks : [],
  };
};

const Blogsrenderpage = () => {
  const { department } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `${BLOG_API_BASE}/send_blogs/${department}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();
        const rawBlogs = Array.isArray(data)
          ? data
          : Array.isArray(data?.blogs)
            ? data.blogs
            : [];

        const normalizedBlogs = rawBlogs.map((blog) => normalizeBlog(blog, department));
        setBlogs(normalizedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [department]);

  const renderBlock = (block) => {
    if (!block) return null;

    switch (block.type) {
      case "header": {
        const level = Math.min(Math.max(block.data?.level || 2, 1), 6);
        const Tag = `h${level}`;
        return (
          <Tag
            key={block.id}
            className="font-bold tracking-tight mt-6 mb-2 text-gray-900"
            dangerouslySetInnerHTML={{ __html: block.data?.text }}
          />
        );
      }

      case "paragraph":
        return (
          <p
            key={block.id}
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: block.data?.text }}
          />
        );

      case "list": {
        const ListTag = block.data?.style === "ordered" ? "ol" : "ul";

        return (
          <ListTag
            key={block.id}
            className="pl-6 space-y-1 list-disc marker:text-indigo-600"
          >
            {block.data?.items?.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ListTag>
        );
      }

      case "image":
        return (
          <figure key={block.id} className="my-8">
            <img
              src={block.data?.file?.url}
              alt={block.data?.caption || "Blog image"}
              className="rounded-lg shadow-md w-full object-cover"
            />
            {block.data?.caption && (
              <figcaption className="text-center text-sm text-gray-500 mt-2">
                {block.data.caption}
              </figcaption>
            )}
          </figure>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-gray-200 pb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 capitalize italic">
            {department}{" "}
            <span className="text-indigo-600 font-normal">Insights</span>
          </h1>
          <p className="mt-2 text-gray-500 text-lg">
            Browse the latest publications from this department.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400">
              No blogs found in this department yet.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {blogs.map((blog, index) => (
              <article
                key={blog?._id || `${department}-${index}`}
                className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="prose prose-indigo prose-lg max-w-none space-y-4">
                  {blog.blocks?.map((block) => renderBlock(block))}
                </div>

                
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogsrenderpage;
