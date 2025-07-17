'use client';


import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';


export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const { data, error } = await supabase.from('contacts').insert([
      {
        name: form.name,
        email: form.email,
        message: form.message,
      },
    ]);
  
    if (error) {
      console.error('Error submitting form:', error.message);
      setLoading(false);
      return;
    }
  
    setSuccess(true);
    setForm({ name: '', email: '', message: '' });
    setLoading(false);
  };
  

  return (
    <main className="bg-gradient-to-br from-white via-gray-100 to-blue-100 min-h-screen text-gray-900 pb-20 mt-20">
      <section className="py-20 px-4 flex flex-col items-center">
        <div className="max-w-3xl text-center mb-12">
          <h1 className="text-5xl font-extrabold text-blue-700 mb-4 drop-shadow-xl tracking-tight">Contact Us</h1>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">We&apos;d love to hear from you! Reach out for quotes, support, or partnership opportunities.</p>
        </div>
        <div className="max-w-3xl w-full mx-auto bg-white rounded-3xl shadow-2xl border border-blue-200 p-10 md:p-16 backdrop-blur-md">
          {success && (
            <div className="mb-8 p-4 rounded-lg bg-green-100 text-green-800 text-center font-semibold animate-fade-in">Thank you for contacting us! We&apos;ll get back to you soon.</div>
          )}
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <input
              className="bg-gray-100 border border-gray-300 rounded-lg px-5 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg"
              placeholder="Your Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              className="bg-gray-100 border border-gray-300 rounded-lg px-5 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg"
              placeholder="Your Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              className="bg-gray-100 border border-gray-300 rounded-lg px-5 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg"
              placeholder="Your Message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 mt-2 text-lg shadow-lg disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          <div className="mt-12 border-t border-blue-200 pt-8">
            <h2 className="text-2xl font-bold text-violet-700 mb-2">Company Info</h2>
            <p className="text-gray-700 text-lg">SunSolar Company<br/>123 Solar Street<br/>Energy City, 123456</p>
            <p className="text-gray-700 mt-2 text-lg">Phone: <span className="text-blue-700">+91 98765 43210</span></p>
            <p className="text-gray-700 text-lg">Email: <span className="text-blue-700">info@sunsolar.com</span></p>
          </div>
        </div>
      </section>
    </main>
  );
} 