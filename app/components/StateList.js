"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const indianStates = [
  { name: "Andhra Pradesh", slug: "andhra-pradesh" },
  { name: "Arunachal Pradesh", slug: "arunachal-pradesh" },
  { name: "Assam", slug: "assam" },
  { name: "Bihar", slug: "bihar" },
  { name: "Chhattisgarh", slug: "chhattisgarh" },
  { name: "Goa", slug: "goa" },
  { name: "Gujarat", slug: "gujarat" },
  { name: "Haryana", slug: "haryana" },
  { name: "Himachal Pradesh", slug: "himachal-pradesh" },
  { name: "Jharkhand", slug: "jharkhand" },
  { name: "Karnataka", slug: "karnataka" },
  { name: "Kerala", slug: "kerala" },
  { name: "Madhya Pradesh", slug: "madhya-pradesh" },
  { name: "Maharashtra", slug: "maharashtra" },
  { name: "Manipur", slug: "manipur" },
  { name: "Meghalaya", slug: "meghalaya" },
  { name: "Mizoram", slug: "mizoram" },
  { name: "Nagaland", slug: "nagaland" },
  { name: "Odisha", slug: "odisha" },
  { name: "Punjab", slug: "punjab" },
  { name: "Rajasthan", slug: "rajasthan" },
  { name: "Sikkim", slug: "sikkim" },
  { name: "Tamil Nadu", slug: "tamil-nadu" },
  { name: "Telangana", slug: "telangana" },
  { name: "Tripura", slug: "tripura" },
  { name: "Uttar Pradesh", slug: "uttar-pradesh" },
  { name: "Uttarakhand", slug: "uttarakhand" },
  { name: "West Bengal", slug: "west-bengal" },
  { name: "Chandigarh", slug: "chandigarh" },
  { name: "Delhi", slug: "delhi" },
  { name: "Jammu and Kashmir", slug: "jammu-and-kashmir" },
  { name: "Ladakh", slug: "ladakh" },
  { name: "Lakshadweep", slug: "lakshadweep" },
  { name: "Puducherry", slug: "puducherry" }
];

export default function StatesList() {
  const router = useRouter();
  const [loadingState, setLoadingState] = useState(null);

  const handleStateClick = (slug) => {
    setLoadingState(slug);
    router.push(`/${slug}`);
    // setTimeout(() => {
    //   router.push(`/${slug}`);
    // }, 1000);  
  };

  return (
    <section className="py-15 bg-white relative">
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Find Solar Companies by State
          </h2>
          <p className="text-lg text-black max-w-2xl mx-auto">
            Discover top-rated solar companies and installers across all states of India. 
            Get quotes, compare prices, and find the best solar solutions for your location.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {indianStates.map((state) => (
            <div
              key={state.slug}
              onClick={() => !loadingState && handleStateClick(state.slug)}
              className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 text-center border border-gray-300 hover:border-pink-500 ${
                loadingState ? 'cursor-not-allowed opacity-50' : 'cursor-pointer group'
              } animated-glow`}
            >
              <h3 className="font-semibold text-black text-sm md:text-base group-hover:text-pink-400 transition-colors duration-300">
                {state.name}
              </h3>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-black text-sm">
            Click on any state to find solar companies and get free quotes
          </p>
        </div>
      </div>
    </section>
  );
}
