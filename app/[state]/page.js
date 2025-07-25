'use client';
import { use, useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import StateCompanyLayout from '../components/StateCompanyLayout';
import Link from 'next/link';

export default function StatePage() {
  const params = useParams();
  const router = useRouter();

  const state = decodeURIComponent(params.state); // e.g., "tamil-nadu"
  const stateName = state
    .split('-')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');

  const [companies, setCompanies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Change district filter
  const handleDistrictChange = (district) => {
    const districtSlug = district.replace(/\s+/g, '-').toLowerCase();
    router.push(`/${params.state}/${districtSlug}`);
  };

  const handleClearFilters = () => {
    setSelectedDistrict('');
    router.push(`/${params.state}`);
  };

  // Fetch companies + districts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // 1. Check if state exists
      const { data: stateData, error: stateError } = await supabase
        .from('state_details')
        .select('districts')
        .eq('state-name', stateName)
        .single();

      if (stateError || !stateData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      // 2. Fetch companies in state
      const { data: companyData, error: companyError } = await supabase
        .from('solar_companies')
        .select('*')
        .eq('state-name', stateName);

      if (companyError) {
        console.error('Error fetching companies:', companyError);
        setLoading(false);
        return;
      }

      setCompanies(companyData);

      // 3. Fetch districts
      const districtsObj = stateData.districts;
      const key = Object.keys(districtsObj).find(
        k => k.toLowerCase() === stateName.toLowerCase()
      );
      const districtList = key ? districtsObj[key] : [];

      setDistricts(districtList);
      setLoading(false);
    };

    fetchData();
  }, [stateName]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500"></div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">404 - State Not Found</h1>
        <p className="text-gray-600 mb-8">The state you are looking for does not exist or the URL is incorrect.</p>
        <Link href="/"
          className="px-6 py-2 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition">Back to Home</Link>
      </div>
    );
  }

  return (
    <StateCompanyLayout
      companies={companies}
      filteredCompanies={companies}
      districts={districts}
      selectedDistrict={selectedDistrict}
      setSelectedDistrict={setSelectedDistrict}
      loading={loading}
      stateName={stateName}
      handleDistrictChange={handleDistrictChange}
      handleClearFilters={handleClearFilters}
    />
  );
}
