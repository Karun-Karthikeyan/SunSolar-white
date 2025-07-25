'use client';

import { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CompanyDetailPage({ params }) {
  const { state, district, company } = use(params);
  const stateLc = state?.toLowerCase();
  const districtLc = district?.toLowerCase();
  const companyLc = company?.toLowerCase();
  // Title case for display
  const name = companyLc.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const [showContactForm, setShowContactForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  // Mock data for demonstration
  const companyData = {
    name,
    image: '/assets/2.jpg',
    rating: 4.5,
    location: `${capitalizeFirstLetter(districtLc)}, ${capitalizeFirstLetter(stateLc)}`,
    about: `${name} is a leading provider of solar energy solutions, offering residential, commercial, and industrial solar panel installations. Our mission is to make clean energy accessible and affordable for everyone.`,
    timings: 'Mon-Sat: 9:00 AM - 6:00 PM, Sun: Closed',
    categories: ['Residential', 'Commercial', 'On-Grid'],
  };
  console.log('Company Location:', companyData.location);

  return (
    <div className="bg-white min-h-screen py-8 px-2 md:px-0 mt-20 relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500"></div>
        </div>
      )}
      {/* Page Header and Intro Paragraph */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-3">Solar Company Details</h1>
        <p className="text-gray-600 text-base md:text-lg">Explore detailed information about this solar company, including services, ratings, and how to get in touch for a personalized quote. Find the best solar solutions for your needs!</p>
      </div>

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
      {/* Responsive two-column layout for desktop/laptop */}
      <div className="flex flex-col lg:flex-row gap-y-8 lg:gap-x-8 max-w-7xl mx-auto px-2 md:px-6 lg:px-4 py-4 ">
        {/* Left side: Existing company detail card */}
        <div className="w-full lg:w-10/12 xl:w-11/12 2xl:[width:calc(100%-420px)] min-w-0">
          <div className="rounded-2xl shadow-xl p-5 md:p-6 border border-gray-300 relative  md:pb-0 min-h-[700px] w-[100%]">
            <div className="flex flex-col items-center">
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex justify-center mb-5 ">
                  <Image src={companyData.image} alt={companyData.name} width={800} height={100} className="object-contain rounded" />
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
                  {companyData.categories.map((cat) => {
                    const catLc = typeof cat === 'string' ? cat.trim().toLowerCase() : '';
                    const displayCat = typeof cat === 'string' ? cat.replace(/\b\w/g, c => c.toUpperCase()) : '';
                    let badgeClass = '';
                    if (catLc === 'residential') badgeClass = 'bg-green-100 text-green-800 border-green-300';
                    else if (catLc === 'commercial') badgeClass = 'bg-blue-100 text-blue-800 border-blue-300';
                    else if (catLc === 'on-grid') badgeClass = 'bg-yellow-100 text-yellow-800 border-yellow-300';
                    else badgeClass = 'bg-pink-100 text-pink-700 border-pink-200';
                    return (
                      <Link
                        key={cat}
                        href={`/${stateLc}/${catLc}`}
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${badgeClass} hover:underline`}
                      >
                        {displayCat}
                      </Link>
                    );
                  })}
                </div>
                <div className="w-full flex justify-start">
                  <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mt-2">Solar company in {companyData.location}</span>
                </div>
              </div>
            </div>
            <hr className="my-6 border-gray-300" />
            <div className="pb-8">
              <h2 className="text-xl font-bold mb-2 text-black">About {companyData.name}</h2>
              <p className="text-gray-700 mb-4">{companyData.about}</p>
              <h2 className="text-xl font-bold mb-2 text-black">{companyData.name} Timings</h2>
              <p className="text-gray-700">{companyData.timings}</p>
            </div>
            {/* Detailed Company Content - now always aligned with left card */}
            <div className="w-full mt-10 px-2 md:px-4 lg:px-1 text-gray-700 text-base leading-relaxed">
              <h2 className="text-2xl font-bold mb-4 text-blue-700">{companyData.name}, {capitalizeFirstLetter(districtLc)}, {capitalizeFirstLetter(stateLc)}</h2>
              <p className="mb-4">{companyData.name} is one of the best in the field of Solar Companies in {capitalizeFirstLetter(districtLc)}, {capitalizeFirstLetter(stateLc)}.</p>
              <h3 className="text-xl font-semibold mt-6 mb-2 text-violet-700">Location, Overview and Description:</h3>
              <p className="mb-4 pb-5">{companyData.name},{companyData.location},  was established in the year 2017. {companyData.name} , one of the best in the field of Solar Companies in {capitalizeFirstLetter(districtLc)}. This well established firm has become popular for its excellent service and customer orientation. With this excellent customer service, they succeeded in getting a huge base of customers, which is increasing day by day.  The dedicated employees of the firm who are committed to their roles and customers, are always ready to extend their service to the customers, to achieve the vision and the larger goals of the company. The company aspires to extend their service to a larger clientele in the coming days. Located at one of the prime locations in the city, is yet aher advantage. As there are various mode of transport available to reach this location, there is absolutely no difficulty in reaching here. The prominent landmark is Near Planetarium.</p>
            </div>
          </div>
        </div>
        {/* Right side: Consult card, only on desktop/laptop */}
        <div className="w-full lg:w-2/5 xl:w-1/3 2xl:w-[400px] min-w-0 flex flex-col items-end justify-center h-full self-stretch align-right">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 w-full text-center border border-gray-200 h-full flex flex-col justify-between 2xl:w-[400px] 2xl:h-[400px]">
            <h2 className="text-2xl font-bold mb-2 text-black mt-1">Alternative Energy Concepts Quote</h2>
            <p className="text-gray-700 mb-2">Are you looking for a {companyData.location} Solar company?</p>
            <p className="text-gray-700 mb-2">We made it easier to get quote from best Solar companies near you. Get personalised quotes from atleast 5 best Solar energy professionals for free.</p>
            <button
              className="mt-6 w-full bg-[#FF106E] hover:bg-pink-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 text-lg shadow transition-all duration-200"
              onClick={() => setShowContactForm(true)}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A2 2 0 0020 6.382V5a2 2 0 00-2-2H6a2 2 0 00-2 2v1.382a2 2 0 00.447 1.342L9 10m6 0v10m0 0a2 2 0 01-2 2h-2a2 2 0 01-2-2V10m6 10H9" />
              </svg>
              <span className="font-bold">Consult Now</span>
            </button>
            {/* FAQ Accordion Section */}
            <div className="mt-30 text-left w-full md:mt-30 sm:mt-15">
              <h4 className="text-lg font-bold text-pink-700 mb-3">FAQ</h4>
              <details className="mb-2 rounded-lg border border-pink-100 bg-pink-50 px-4 py-2">
                <summary className="cursor-pointer font-semibold text-gray-800">How long does installation take?</summary>
                <p className="mt-2 text-gray-600 text-sm">Most residential solar installations are completed within 2-4 days, depending on the project size and weather conditions.</p>
              </details>
              <details className="mb-2 rounded-lg border border-pink-100 bg-pink-50 px-4 py-2">
                <summary className="cursor-pointer font-semibold text-gray-800">Do you offer maintenance services?</summary>
                <p className="mt-2 text-gray-600 text-sm">Yes, we provide ongoing maintenance and support to ensure your solar system runs efficiently for years to come.</p>
              </details>
              <details className="mb-2 rounded-lg border border-pink-100 bg-pink-50 px-4 py-2">
                <summary className="cursor-pointer font-semibold text-gray-800">Is financing available?</summary>
                <p className="mt-2 text-gray-600 text-sm">We offer flexible financing options to make solar affordable for everyone. Contact us for more details.</p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
