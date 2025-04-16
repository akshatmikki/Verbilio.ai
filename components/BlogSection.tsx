"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type Blog = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  image_url: string; // 👈 added image_url
};

const BlogSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("id, title, slug, summary, image_url") 
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) console.error("Error fetching blogs:", error);
      else setBlogs(data || []);

      setLoading(false);
    };

    fetchBlogs();
  }, []);

  return (
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-center mb-16">
              Latest From Our Blog
            </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blogs/${blog.slug}`}
                  className="block border rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={blog.image_url}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                    <p className="text-sm text-gray-600">{blog.summary}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/blogs">
                <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
                  View All Blogs
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
