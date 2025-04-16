import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { redirect } from 'next/navigation';

type BlogPost = {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  tags: string[] | null;
  created_at: string;
};

type Props = {
  searchParams: { page?: string };
};

export default async function BlogPage({ searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1;
  const postsPerPage = 5;
  const from = (currentPage - 1) * postsPerPage;
  const to = from + postsPerPage - 1;

  const { data: posts, error, count } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact' }) 
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    return <div className="text-white">Error loading blog posts: {error.message}</div>;
  }

  const totalPages = Math.ceil((count ?? 0) / postsPerPage);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-8xl font-bold mb-6 text-white">Blog</h1>

      <div className="space-y-6">
        {posts?.map((post) => (
          <div key={post.id} className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-sm">
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-60 object-cover mb-4 rounded-md"
              />
            )}
            <h2 className="text-xl font-semibold text-white mb-2">{post.title}</h2>
            <p className="text-white/80 line-clamp-3">{post.content}</p>
            {post.tags && (
              <div className="mt-2 flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <Link
              href={`/blogs/${post.id}`}
              className="inline-block mt-4 text-blue-400 hover:underline"
            >
              Read more →
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center items-center gap-4 text-white">
          {currentPage > 1 && (
            <Link
              href={`/blogs?page=${currentPage - 1}`}
              className="px-4 py-2 border border-white/30 rounded hover:bg-white/10"
            >
              ← Previous
            </Link>
          )}

          <span className="text-sm text-white/70">
            Page {currentPage} of {totalPages}
          </span>

          {currentPage < totalPages && (
            <Link
              href={`/blogs?page=${currentPage + 1}`}
              className="px-4 py-2 border border-white/30 rounded hover:bg-white/10"
            >
              Next →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
