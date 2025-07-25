import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';

export default function StateCompanyLayout({
  companies,
  districts,
  categories, // NEW
  selectedDistrict,
  setSelectedDistrict,
  selectedCategory, // NEW
  setSelectedCategory, // NEW
  loading,
  stateName,
  handleDistrictChange,
  handleCategoryChange, // NEW
  handleClearFilters,
  filteredCompanies
}) {
  return (
    loading ? (
      <div className="flex items-center justify-center min-h-screen transition-opacity duration-300 opacity-100 animate-fadein">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-pink-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <span className="text-pink-500 text-lg font-semibold">Loading data...</span>
        </div>
      </div>
    ) : (
      <main className="relative bg-white min-h-screen transition-opacity duration-300 opacity-100 animate-fadein">
        <section className="w-full max-w-9xl mx-auto py-20 px-4 mt-5 flex flex-col items-center">
          <div className="w-full flex flex-col items-center mb-10">
            <h2 className="text-4xl text-black text-center font-bold mb-2 drop-shadow">Top Solar Companies in {stateName}</h2>
            <div className="w-full max-w-2xl mt-2 flex flex-col items-center px-2 sm:px-0">
              <p className="text-base text-gray-700 text-center mb-4">{filteredCompanies.length} compan{filteredCompanies.length !== 1 ? 'ies' : 'y'} found</p>
              {/* Responsive filter dropdown and button */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full justify-center mb-4 relative">
                {/* District Filter */}
                <div className="relative w-64 mx-auto">
                  <select
                    value={selectedDistrict || ''}
                    onChange={e => handleDistrictChange(e.target.value)}
                    className="block w-full px-2 py-2 pr-10 rounded-xl border border-gray-300 bg-white text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 appearance-none text-base font-semibold transition-all duration-200"
                    disabled={loading}
                    style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                  >
                    <option value="" className="text-gray-400">All Districts</option>
                    {districts && districts.map((district) => (
                      <option key={district} value={district} className="text-gray-700 font-medium bg-white hover:bg-pink-50">
                        {district}
                      </option>
                    ))}
                  </select>
                  {/* Downward arrow SVG */}
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
            
                {/* Only one clear filter button for both filters, placed next to filters */}
                {(selectedDistrict || (typeof window !== 'undefined' && window.location.pathname.split('/').length === 3)) && (
                  <button
                    onClick={handleClearFilters}
                    className="w-full md:w-auto px-5 py-2 rounded-full border border-pink-400 text-pink-600 bg-pink-50 font-semibold transition-all duration-200 hover:bg-pink-100 hover:text-pink-800 shadow-sm whitespace-nowrap"
                    disabled={loading}
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* Companies Grid */}
          <div className="w-full lg:w-[65%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center mx-auto min-h-[300px] px-2 gap-y-3 gap-x-2 md:gap-y-2 md:gap-x-1 lg:gap-y-[20px] lg:gap-x-[10px]">
            {loading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="w-full max-w-[350px] h-[250px] md:h-[250px] xl:h-[250px] bg-gray-100 rounded-2xl shadow-lg animate-pulse flex flex-col justify-between p-4 md:p-6 xl:h-[250px] lg:h-[280px]" style={{ height: '250px', '@media (max-width: 1280px)': { height: '280px' } }}>
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="flex gap-2 mb-2">
                    <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                    <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-12 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-300 rounded-full w-full"></div>
                </div>
              ))
            ) : (
              filteredCompanies.length === 0 ? (
                <div className="col-span-full text-center py-0 ">
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
                    className="w-full max-w-[370px] min-h-[320px] bg-white rounded-xl shadow-md flex flex-col border border-gray-100 transition-all duration-300 p-6 mb-6 transform hover:scale-100 hover:-translate-y-3 hover:border-pink-400 hover:shadow-2xl hover:z-10"
                    style={{ minWidth: '0' }}
                  >
                    <div className="flex flex-col flex-1 justify-between h-full">
                      {/* Top: Name & Rating */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-lg text-gray-900">{company['company-name'] || company.name}</span>
                        <span className="flex items-center gap-1">
                          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                          </svg>
                          <span className="font-semibold text-yellow-700 text-sm">{company.rating || '4.3'}</span>
                        </span>
                      </div>
                      {/* Location & Reviews */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">{company.district || company.location}</span>
                        <span className="text-xs text-gray-400">{company.review_count ? `${company.review_count} reviews` : '100 reviews'}</span>
                      </div>
                      <hr className="my-2 border-gray-100" />
                      {/* Description */}
                      <p className="text-sm text-gray-700 mb-4 line-clamp-3">{company.description || `${company['company-name'] || company.name} is a leading provider of solar energy solutions, offering residential, commercial, and industrial solar panel installations.`}</p>
                      {/* Tags (category badge) */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(Array.isArray(company.category) ? company.category : [company.category || 'Other']).map((label) => {
                          const labelLc = typeof label === 'string' ? label.trim().toLowerCase() : '';
                          const displayLabel = typeof label === 'string' ? label.replace(/\b\w/g, c => c.toUpperCase()) : '';
                          let badgeClass = '';
                          if (labelLc === 'residential') badgeClass = 'bg-green-100 text-green-800 border-green-300';
                          else if (labelLc === 'commercial') badgeClass = 'bg-blue-100 text-blue-800 border-blue-300';
                          else if (labelLc === 'on-grid') badgeClass = 'bg-yellow-100 text-yellow-800 border-yellow-300';
                          else badgeClass = 'bg-pink-100 text-pink-700 border-pink-200';
                          return (
                            <Link
                              key={label}
                              href={`/${stateName.replace(/\s+/g, '-').toLowerCase()}/${labelLc}`}
                              className={`px-3 py-1 text-xs rounded-full font-semibold border ${badgeClass}`}
                            >
                              {displayLabel}
                            </Link>
                          );
                        })}
                      </div>
                      {/* Button */}
                      <Link
                        href={`/${stateName.replace(/\s+/g, '-').toLowerCase()}/${(company.district || company.category)?.replace(/\s+/g, '-').toLowerCase()}/${(company.slug || '').toLowerCase()}`}
                        className="w-full group block font-semibold px-4 py-2 text-base rounded-lg shadow-sm bg-pink-600 text-white hover:bg-pink-700 text-center mt-auto transition-transform transition-shadow duration-200 transform"
                      >
                        <span className="inline-flex items-center justify-center w-full">
                          View Details
                          <svg
                            className="ml-2 w-5 h-5 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        </section>
      </main>
    )
  );
} 