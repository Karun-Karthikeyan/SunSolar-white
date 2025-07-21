'use client';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StateCompanyLayout from '../components/StateCompanyLayout';

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
  const router = useRouter();
  const state = decodeURIComponent(params.state); // eg. tamil-nadu → Tamil Nadu
  // Support optional district param
  const districtFromUrl = params.district ? decodeURIComponent(params.district) : '';
  const stateName = state
    .split('-')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' '); // Convert slug to Proper Case

  const [companies, setCompanies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(districtFromUrl);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  // Sync selectedDistrict with URL param
  useEffect(() => {
    setSelectedDistrict(districtFromUrl);
  }, [districtFromUrl]);

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

  // Handle district change: update URL
  const handleDistrictChange = (district) => {
    if (district) {
      // Slugify district for URL
      const districtSlug = district.replace(/\s+/g, '-').toLowerCase();
      router.push(`/${params.state}/${districtSlug}`);
    } else {
      router.push(`/${params.state}`);
    }
  };

  return (
    <StateCompanyLayout
      companies={companies}
      districts={districts}
      selectedDistrict={selectedDistrict}
      selectedCategory={selectedCategory}
      setSelectedDistrict={setSelectedDistrict}
      setSelectedCategory={setSelectedCategory}
      loading={loading}
      stateName={stateName}
      handleDistrictChange={handleDistrictChange}
      handleClearFilters={() => handleDistrictChange('')}
      filteredCompanies={filteredCompanies}
    />
  );
}
