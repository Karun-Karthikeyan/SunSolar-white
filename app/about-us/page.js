import { metadata } from './page';

export default function AboutPage() {
  return (
    <main className=" min-h-screen text-gray-500 pb-20 mt-10">
      <section className="relative py-20 px-4 flex flex-col items-center mt-15">
        <div className="max-w-3xl text-center mb-12">
          <h1 className="text-5xl font-extrabold  mb-4 drop-shadow-xl tracking-tight">About GetSolar</h1>
          <p className="text-xl text-gray-500 mb-8 leading-relaxed">Empowering a brighter, cleaner future through solar innovation and customer-first service.</p>
        </div>
        <div className="max-w-3xl w-full mx-auto rounded-3xl shadow-2xl border border-blue-900 p-10 md:p-16 backdrop-blur-md">
          <h2 className="text-3xl font-bold text-violet-400 mb-6">Our Mission</h2>
          <p className="mb-8 text-lg text-gray-500 leading-relaxed">To make clean, renewable energy accessible and affordable for everyone, while delivering exceptional customer service and driving the transition to a sustainable future.</p>
          <h2 className="text-3xl font-bold text-violet-400 mb-6">Our Values</h2>
          <ul className="list-disc pl-8 mb-8 text-lg text-gray-500 space-y-3">
            <li><span className="font-semibold text-blue-400">Integrity:</span> We act with honesty and transparency in all we do.</li>
            <li><span className="font-semibold text-blue-400">Innovation:</span> We embrace new ideas and technologies to deliver the best solutions.</li>
            <li><span className="font-semibold text-blue-400">Customer Focus:</span> We put our customers at the heart of every decision.</li>
            <li><span className="font-semibold text-blue-400">Sustainability:</span> We are committed to protecting the planet for future generations.</li>
          </ul>
          <h2 className="text-3xl font-bold text-violet-400 mb-6">Our Team</h2>
          <p className="text-lg text-gray-500 leading-relaxed">GetSolar is powered by a passionate team of solar experts, engineers, and customer advocates dedicated to making solar energy simple, affordable, and accessible for all. We believe in a future where clean energy is the norm, and we work every day to make that vision a reality for our customers and communities.</p>
        </div>
      </section>
    </main>
  );
} 