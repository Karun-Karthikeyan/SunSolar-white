'use client';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

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

  // Fetch companies and district JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
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
      } catch (error) {
        console.error('Error fetching data:', error);
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
    <main className="relative bg-white min-h-screen ">
      <section className="flex flex-col md:flex-row gap-8 max-w-[1700px] mx-auto py-20 px-2 mt-15">
        {/* CONTENT */}
        <div className="flex-1 pt-10">
          <div className="mb-6">
            <h2 className="text-4xl text-black text-center font-bold mb-2 drop-shadow">Top Solar Companies in {stateName}</h2>
            <p className="text-gray-700 mt-2 mb-4 text-center">Find the best solar companies in {stateName} for your residential and commercial needs.</p>
            <div className="flex items-center justify-center mt-4 w-full">
              <p className="text-sm text-gray-500 text-center mx-auto">
                {filteredCompanies.length} company{filteredCompanies.length !== 1 ? 'ies' : ''} found
                {selectedDistrict && (
                  <span className="ml-2 inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs ">{selectedDistrict}</span>
                )}
              </p>
            </div>
            {/* Companies List */}
            <div className="space-y-6 mt-8 w-[100%]">
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
                filteredCompanies.map((company) => (
                  <div key={company.slug || company.id} className='w-full lg:w-[70%] h-[220px] flex items-center bg-gradient-to-br from-white via-gray-100 to-white shadow-xl rounded-2xl border-l-8 border-pink-500 hover:scale-105 hover:shadow-2xl transition-all duration-300 mx-auto animate-fade-in'>
                    <div className='w-[25%] h-full p-7 flex items-center justify-center'>
                      <div className='w-full h-full bg-gray-200 rounded-lg flex items-center justify-center'>
                        <span className='text-gray-500 text-2xl'>
                          <svg className="w-10 h-10 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className='w-[75%] h-full p-7 flex justify-between items-center'>
                      <div className='w-[70%] h-full flex flex-col justify-center'>
                        <h5 className='text-2xl font-bold text-black mb-2 flex items-center gap-2'>
                          {company['company-name'] || company.name}
                          {company.rating && company.rating >= 4.5 && (
                            <span className="ml-2 px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full">Top Rated</span>
                          )}
                        </h5>
                        <p className='text-gray-700 text-sm mb-4 line-clamp-2'>{company.district || company.location}</p>
                        <a
                          href={`/${state}/${company.district || company.location}/${company.slug}`}
                          className='w-[200px] flex items-center gap-2 font-semibold px-4 py-2 rounded-lg shadow transition-colors duration-200 bg-[#FF106E] text-white hover:bg-pink-700 text-center justify-center'
                        >
                          View Details
                          <svg className='w-4 h-4 ml-1' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                          </svg>
                        </a>
                      </div>
                      <div className='flex flex-col items-center justify-center'>
                        <div className='flex items-center gap-1 mb-1'>
                          <svg className='w-5 h-5 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z' />
                          </svg>
                          <span className='text-lg font-bold text-black'>{company.rating || '4.0'}</span>
                        </div>
                        <span className='text-xs text-gray-500'>{company.review_count ? `${company.review_count} reviews` : '100 reviews'}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-200 w-[4px] h-[400px] mt-10 rounded-full shadow-md"></div>
        {/* DISTRICT LIST SIDEBAR */}
        <aside className="w-[50%] h-auto md:h-[550px] p-5 mt-10 md:w-1/4 p-8 mb-8 md:mb-0 flex flex-col gap-2">
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
  );
}
