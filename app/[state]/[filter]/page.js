'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import StateCompanyLayout from '../../components/StateCompanyLayout';

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
        console.error('Error fetching districts:', stateError);
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
          console.error('Error fetching companies by district:', error);
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
          console.error('Error fetching companies by category:', error);
          setLoading(false);
          return;
        }

        filteredCompanies = data;
      }

      setCompanies(filteredCompanies);
      setLoading(false);
    };

    fetchData();
  }, [params.state, params.filter]); // ✅ Key fix

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
