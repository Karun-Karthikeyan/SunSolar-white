'use client';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';

// Custom Dropdown Component
function CustomDropdown({ options, value, onChange, placeholder, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative mb-8" ref={dropdownRef}>
      {label && <label className="block mb-2 text-sm font-medium text-gray-300">{label}</label>}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 px-4 border border-gray-700 rounded-lg bg-gray-800 focus:ring-2 focus:ring-pink-400 focus:border-transparent text-[16px] transition-all duration-200 hover:border-pink-300 flex items-center justify-between text-white"
      >
        <span className={value ? 'text-gray-200' : 'text-gray-400'}>
          {value || placeholder}
        </span>
        <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`
            .scrollbar-hide::-webkit-scrollbar { display: none; }
          `}</style>
          {options.map((option, index) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`px-4 py-3 cursor-pointer transition-colors duration-150 border-b border-gray-700 last:border-b-0 hover:bg-pink-600 hover:text-white ${
                value === option ? 'bg-pink-900 text-pink-200 font-semibold' : 'text-gray-200'
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StatePage() {
  const params = useParams();
  const state = decodeURIComponent(params.state); // eg. tamil-nadu → Tamil Nadu
  const stateName = state
    .split('-')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' '); // Convert slug to Proper Case

  const [companies, setCompanies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch companies and district JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Fetch companies
        const { data: companyData, error: companyError } = await supabase
          .from('solar_companies')
          .select('*')
          .eq('state-name', stateName);
  
        if (companyError) throw companyError;
        setCompanies(companyData);
  
        // 2. Fetch districts
        const { data: stateData, error: stateError } = await supabase
          .from('state_details')
          .select('districts')
          .eq('state-name', stateName)
          .single();
  
        if (stateError) throw stateError;
  
        // ✅ Flexible lookup of state key in JSONB
        const districtsObj = stateData.districts;
        const key = Object.keys(districtsObj).find(
          k => k.toLowerCase() === stateName.toLowerCase()
        );
        const districtList = key ? districtsObj[key] : [];
        setDistricts(districtList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [stateName]);
  
  

  // Filter logic
  const filteredCompanies = companies.filter(company => {
    return (
      (!selectedDistrict || company.district === selectedDistrict) &&
      (!selectedCategory || company.category === selectedCategory)
    );
  });

  return (
    loading ? (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-pink-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <span className="text-pink-500 text-lg font-semibold">Loading data...</span>
        </div>
      </div>
    ) : (
    <main className="relative bg-white min-h-screen ">
      <section className="flex flex-col lg:flex-row gap-8 max-w-[1700px] mx-auto py-20 px-2 mt-5">
        {/* Top Filter Dropdown for Districts - only on <lg screens */}
        <div className="block lg:hidden w-full mb-8 flex justify-center">
          <div className="w-full max-w-xs">
            <label htmlFor="district-select" className="block text-gray-700 font-semibold mb-2">Filter by District</label>
            <div className="relative">
              <select
                id="district-select"
                value={selectedDistrict}
                onChange={e => setSelectedDistrict(e.target.value)}
                className="block w-full px-4 py-2 pr-8 rounded-lg border border-gray-300 bg-white text-gray-800 shadow focus:outline-none focus:ring-2 focus:ring-pink-400 appearance-none"
              >
                <option value="">All Districts</option>
                {districts.map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* CONTENT */}
        <div className="w-full lg:w-2/3 pt-0 flex flex-col items-center">
          <div className="mb-6 w-full max-w-2xl flex flex-col items-center">
            <h2 className="text-4xl text-black text-center font-bold mb-2 drop-shadow">Top Solar Companies in {stateName}</h2>
            <p className="text-gray-700 mt-2 mb-4 text-center">Find the best solar companies in {stateName} for your residential and commercial needs.</p>
            <div className="flex items-center justify-center mt-4 w-full">
              <p className="text-sm text-gray-500 text-center mx-auto">
                {filteredCompanies.length} company{filteredCompanies.length !== 1 ? 'ies' : ''} found
                {selectedDistrict && (
                  <span className="ml-2 inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs ">{selectedDistrict}</span>
                )}
              </p>
              {(selectedDistrict || selectedCategory) && (
                <button
                  onClick={() => {
                    setSelectedDistrict('');
                    setSelectedCategory('');
                  }}
                  className="ml-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition-all duration-200 text-sm font-semibold"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
          {/* Companies List */}
          <div className="space-y-6 mt-8 w-full flex flex-col items-center">
            {filteredCompanies.length === 0 ? (
              <div className="text-center py-0">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-500 mb-2">No companies found</h3>
                <p className="text-gray-400">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              filteredCompanies.map((company, idx) => (
                <div
                  key={company.slug || company.id}
                  className="relative w-full sm:max-w-2xl mx-auto overflow-hidden rounded-3xl shadow-xl border border-gray-200 hover:shadow-2xl hover:border-pink-300 transition-all duration-300 mb-8 h-[240px] sm:h-[200px] lg:h-[220px] flex items-stretch"
                >
                  {/* Full card background image */}
                  <Image
                    src="/assets/banner.jpg"
                    alt="Company Background"
                    fill className="object-cover absolute inset-0 w-full h-full z-0" priority />
                  {/* Overlay for readability */}
                  <div className="absolute inset-0 bg-black/30 z-10" />
                  {/* Card content overlay */}
                  <div className="relative z-20 flex flex-col justify-between h-full w-full p-8">
                    <div className="flex justify-between items-start w-full">
                      <div>
                        <span className="font-bold text-lg sm:text-xl md:text-2xl text-white flex items-center gap-2 truncate">
                          {company['company-name'] || company.name}
                        </span>
                        <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-1 truncate mt-2">{company.district || company.location}</p>
                        <div className="flex flex-wrap items-center mt-2 gap-2">
                          <span className="px-3 py-1 bg-blue-100 bg-opacity-80 text-blue-800 text-xs rounded-full">Residential</span>
                          <span className="px-3 py-1 bg-green-100 bg-opacity-80 text-green-800 text-xs rounded-full">Commercial</span>
                          {/* Add more tags as needed */}
                        </div>
                      </div>
                      <span className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-1 align-middle ml-4">
                        <span className="flex items-center">
                          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                          </svg>
                          <span className="font-bold text-sm sm:text-base md:text-lg text-white ml-1">{company.rating || '4.0'}</span>
                        </span>
                        <span className="text-xs sm:text-xs text-gray-200 mt-1 sm:mt-0">{company.review_count ? `${company.review_count} reviews` : '100 reviews'}</span>
                      </span>
                    </div>
                    <div className="mt-8">
                      <a
                        href={`/${state}/${company.district || company.location}/${company.slug}`}
                        className="w-fit flex items-center gap-2 font-semibold px-5 py-2 text-base rounded-lg shadow transition-colors duration-200 bg-[#FF106E] text-white hover:bg-pink-700 text-center"
                      >
                        View Details
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="hidden lg:block bg-gray-200 w-[4px] h-[400px] mt-10 rounded-full shadow-md"></div>
        {/* DISTRICT LIST SIDEBAR - only on lg and up */}
        <aside className="hidden lg:flex w-full md:w-1/2 lg:w-1/3 xl:w-1/4 h-auto md:h-[550px] p-5 mt-5 p-8 mb-8 md:mb-0 flex-col gap-2">
          <h2 className="text-2xl font-bold text-black mb-6">Districts</h2>
          <div className="flex flex-wrap gap-3">
            {districts.map((district) => (
              <button
                key={district}
                onClick={() => setSelectedDistrict(district === selectedDistrict ? '' : district)}
                className={`inline-flex items-center px-4 py-1.5 rounded-full border text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm min-w-[140px] whitespace-normal
                  ${selectedDistrict === district
                    ? 'bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800 border-pink-400 shadow-lg scale-105'
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-gray-300 hover:bg-pink-100 hover:text-pink-800 hover:scale-105'}
                `}
                style={{ minWidth: '0', maxWidth: '100%' }}
              >
                <svg className="w-4 h-4 mr-1 text-pink-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <circle cx="12" cy="11" r="3" />
                </svg>
                <span>{district}</span>
              </button>
            ))}
          </div>
        </aside>
      </section>
    </main>
    )
  );
}
