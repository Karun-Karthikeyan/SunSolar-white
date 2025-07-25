'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import StateCompanyLayout from '../../components/StateCompanyLayout';
import Link from 'next/link';

export default function StateFilterPage() {
  const params = useParams();
  const router = useRouter();

  const stateSlug = decodeURIComponent(params.state);
  const filter = decodeURIComponent(params.filter);

  const stateName = stateSlug
    .split('-')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');

  const [companies, setCompanies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const handleDistrictChange = (district) => {
    const districtSlug = district.replace(/\s+/g, '-').toLowerCase();

    if (params.filter !== districtSlug) {
      router.push(`/${params.state}/${districtSlug}`);
    }
  };

  const handleClearFilters = () => {
    setSelectedDistrict('');
    router.push(`/${params.state}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // 1. Get districts for the state
      const { data: stateData, error: stateError } = await supabase
        .from('state_details')
        .select('districts')
        .eq('state-name', stateName)
        .single();

      if (stateError) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const districtsObj = stateData.districts;
      const key = Object.keys(districtsObj).find(
        k => k.toLowerCase() === stateName.toLowerCase()
      );
      const districtList = key ? districtsObj[key] : [];
      setDistricts(districtList);

      // 2. Determine if filter is a district or category
      const districtMatch = districtList.find(
        d => d.toLowerCase().replace(/\s+/g, '-') === filter.toLowerCase()
      );

      let filteredCompanies = [];

      if (districtMatch) {
        setSelectedDistrict(districtMatch);

        const { data, error } = await supabase
          .from('solar_companies')
          .select('*')
          .eq('state-name', stateName)
          .eq('district', districtMatch);

        if (error) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        filteredCompanies = data;
      } else {
        const category = filter.toLowerCase();

        const { data, error } = await supabase
          .from('solar_companies')
          .select('*')
          .eq('state-name', stateName)
          .contains('category', [category]);

        if (error) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        filteredCompanies = data;
      }

      if (!filteredCompanies || filteredCompanies.length === 0) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setCompanies(filteredCompanies);
      setLoading(false);
    };

    fetchData();
  }, [params.state, params.filter]);

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">404 - Not Found</h1>
        <p className="text-gray-600 mb-8">The district or category you are looking for does not exist or the URL is incorrect.</p>
        <Link href={`/${params.state}`}
          className="px-6 py-2 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition">Back to State</Link>
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
