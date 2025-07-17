import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

export async function generateMetadata({ params }) {
  const { slug } = params;

  const { data: blog } = await supabase
    .from('blog_data')
    .select('title')
    .eq('slug', slug)
    .single();

  return {
    title: blog?.title || 'Blog Post',
    description: 'Read full article on solar insights from SunSolar.',
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = params;

  const { data: blog, error } = await supabase
    .from('blog_data')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!blog || error) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center px-4">
        <div className="text-center p-6 border border-red-400 rounded-lg bg-red-50">
          <h1 className="text-2xl font-bold text-red-600 mb-1">404 - Blog Not Found</h1>
          <p className="text-gray-700 text-base">Sorry, we couldn't find the blog you're looking for.</p>
        </div>
      </main>
    );
  }

  // Pick a random image from the assets
  const images = [
    '/assets/1.jpg',
    '/assets/2.jpg',
    '/assets/4.jpg',
    '/assets/5.jpg',
  ];
  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <main className="min-h-screen py-10 px-1 flex items-center justify-center bg-white text-black">
      <div className="max-w-6xl w-full rounded-xl shadow-lg border flex flex-col md:flex-row overflow-hidden bg-white border-gray-200">
        {/* Image Section */}
        <div className="md:w-1/2 w-full h-56 sm:h-64 md:h-[500px] relative border-b md:border-b-0 md:border-r border-gray-200">
          <Image
            src={randomImage}
            alt={blog.title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            priority
          />
        </div>
        {/* Content Section */}
        <div className="md:w-1/2 w-full p-4 sm:p-6 md:p-10 flex flex-col">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 sm:mb-4 text-black">{blog.title}</h1>
          <div className="flex flex-wrap items-center text-xs sm:text-sm mb-3 sm:mb-4 space-x-2 text-gray-700">
            <span className="px-2 sm:px-3 py-1">By {blog.author}</span>
            <span className="hidden sm:inline">•</span>
            <span className="px-2 sm:px-3 py-1">{blog.posted_on}</span>
          </div>
          {/* Tags Section */}
          {Array.isArray(blog.tags) && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
              {blog.tags.map((tag) => (
                <span key={tag} className="inline-block px-2 py-1 rounded text-xs font-medium border bg-blue-100 text-blue-700 border-blue-300">#{tag}</span>
              ))}
            </div>
          )}
          <article className="prose max-w-none prose-headings:text-blue-700 prose-a:text-blue-600 prose-img:rounded prose-pre:bg-gray-100 prose-sm sm:prose-base md:prose-lg text-black">
            {blog.content}
          </article>
        </div>
      </div>
    </main>
  );
}
