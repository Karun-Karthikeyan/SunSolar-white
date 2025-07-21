'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import StateCompanyLayout from '../../components/StateCompanyLayout';

export default function Page() {
  const params = useParams();
  const router = useRouter();

  const state = params?.state;
  const rawDistrict = params?.district;

  const formatSlugToTitle = (slug) => {
    return slug
      ?.split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const slugify = (text) =>
    (text ? text.toLowerCase() : '').replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');

  const districtFromURL = rawDistrict ? formatSlugToTitle(rawDistrict) : '';
  const stateName = state
    ? state.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
    : '';

  const [companies, setCompanies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(districtFromURL);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  // Sync selectedDistrict with URL param
  useEffect(() => {
    setSelectedDistrict(districtFromURL);
  }, [districtFromURL]);

  // Fetch companies and district JSON (copied from [state]/page.js)
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

        // Flexible lookup of state key in JSONB
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

  const handleDistrictClick = (district) => {
    setLoading(true);
    const districtSlug = slugify(district);
    router.push(`/${state}/${districtSlug}`);
    setSelectedDistrict(district);
  };

  const handleCategoryClick = (category) => {
    setLoading(true);
    setSelectedCategory(category);
  };

  const handleClearFilters = () => {
    setLoading(true);
    router.push(`/${state}`);
    setSelectedDistrict('');
    setSelectedCategory('');
  };

  // Filter logic (same as [state]/page.js)
  const filteredCompanies = companies.filter(company => {
    return (
      (!selectedDistrict || company.district === selectedDistrict) &&
      (!selectedCategory || company.category === selectedCategory)
    );
  });

  const uniqueDistricts = [
    ...new Set(
      companies
        .filter((c) => c.state && stateName && c.state.toLowerCase() === stateName.toLowerCase())
        .map((c) => c.district)
        .filter(Boolean)
    ),
  ];

  const uniqueCategories = [
    ...new Set(
      companies
        .filter((c) => c.state && stateName && c.state.toLowerCase() === stateName.toLowerCase())
        .map((c) => c.category)
        .filter(Boolean)
    ),
  ];

  useEffect(() => {
    setLoading(false);
  }, [filteredCompanies]);

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
      handleDistrictChange={handleDistrictClick}
      handleClearFilters={handleClearFilters}
      filteredCompanies={filteredCompanies}
    />
  );
}
