'use client';

import { use, useState } from 'react';
import Image from 'next/image';

export default function CompanyDetailPage({ params }) {
  const { state, district, company } = use(params);
  const name = company.replace('-', ' ').toUpperCase();
  const [showContactForm, setShowContactForm] = useState(false);

  // Mock data for demonstration
  const companyData = {
    name,
    image: '/assets/2.jpg',
    rating: 4.5,
    location: `${district}, ${state}`,
    about: `${name} is a leading provider of solar energy solutions, offering residential, commercial, and industrial solar panel installations. Our mission is to make clean energy accessible and affordable for everyone.`,
    timings: 'Mon-Sat: 9:00 AM - 6:00 PM, Sun: Closed',
    categories: ['Residential', 'Commercial', 'On-Grid'],
  };

  return (
    <div className="bg-white min-h-screen py-8 px-2 md:px-0 mt-20">
      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
            <button onClick={() => setShowContactForm(false)} className="absolute top-3 right-3 text-gray-500 hover:text-pink-400 text-2xl font-bold">&times;</button>
            <h2 className="text-2xl font-bold text-black mb-4">Contact {companyData.name}</h2>
            <form className="flex flex-col gap-4">
              <input type="text" placeholder="Your Name" className="px-4 py-2 rounded bg-gray-100 text-black border border-gray-300 focus:ring-2 focus:ring-pink-400" />
              <input type="email" placeholder="Your Email" className="px-4 py-2 rounded bg-gray-100 text-black border border-gray-300 focus:ring-2 focus:ring-pink-400" />
              <textarea placeholder="Your Message" rows={4} className="px-4 py-2 rounded bg-gray-100 text-black border border-gray-300 focus:ring-2 focus:ring-pink-400" />
              <button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all duration-200 mt-2">Send Message</button>
            </form>
          </div>
        </div>
      )}
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <div className="flex-1 bg-gradient-to-br from-white via-gray-100 to-white rounded-2xl shadow-2xl p-12 border border-gray-300 relative">
          <div className="flex flex-col items-center">
            <div className="w-full flex flex-col items-center">
              <div className="w-full flex justify-center mb-4">
                <Image src={companyData.image} alt={companyData.name} width={600} height={100} className="object-contain rounded" />
              </div>
              <div className="flex items-center gap-4 w-full justify-between">
                <h1 className="text-2xl font-bold text-black">{companyData.name}</h1>
                <div className="flex items-center gap-1">
                  <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded text-sm font-semibold">{companyData.rating}</span>
                  <span className="text-gray-500 text-sm">Ratings</span>
                </div>
              </div>
              {/* Category Badges */}
              <div className="flex flex-wrap gap-2 mt-2 mb-2 w-full justify-start mt-3">
                {companyData.categories.map((cat) => (
                  <span key={cat} className="inline-block bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs font-medium border border-pink-300">
                    {cat}
                  </span>
                ))}
              </div>
              <div className="w-full flex justify-start">
                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mt-2">Solar company in {companyData.location}</span>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-300" />
          <div>
            <h2 className="text-xl font-bold mb-2 text-black">About {companyData.name}</h2>
            <p className="text-gray-700 mb-4">{companyData.about}</p>
            <h2 className="text-xl font-bold mb-2 text-black">{companyData.name} Timings</h2>
            <p className="text-gray-700">{companyData.timings}</p>
          </div>
          {/* CTA Button - bottom right */}
          <div className="absolute bottom-6 right-8">
            <button onClick={() => setShowContactForm(true)} className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all duration-200 flex items-center gap-2 text-base">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
              Contact Now
            </button>
          </div>
        </div>
      </div>
      {/* Detailed Company Content */}
      <div className="max-w-5xl mx-auto mt-10 px-2 md:px-0 text-gray-700 text-base leading-relaxed">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">{companyData.name}, {district}, {state}</h2>
        <p className="mb-4">{companyData.name} is one of the best in the field of Solar Companies in {district}, {state}.</p>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-violet-700">Location, Overview and Description:</h3>
        <p className="mb-4">{companyData.name},{companyData.location},  was established in the year 2017. {companyData.name} , one of the best in the field of Solar Companies in {district}. This well established firm has become popular for its excellent service and customer orientation. With this excellent customer service, they succeeded in getting a huge base of customers, which is increasing day by day.  The dedicated employees of the firm who are committed to their roles and customers, are always ready to extend their service to the customers, to achieve the vision and the larger goals of the company. The company aspires to extend their service to a larger clientele in the coming days. Located at one of the prime locations in the city, is yet aher advantage. As there are various mode of transport available to reach this location, there is absolutely no difficulty in reaching here. The prominent landmark is Near Planetarium.</p>
      </div>
    </div>
  );
}
