
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DESTINATIONS } from '../constants';
import { Category } from '../types';

const Destinations: React.FC = () => {
  const [filter, setFilter] = useState<Category | 'All'>('All');

  const categories = ['All', ...Object.values(Category)];

  const filteredDestinations = filter === 'All' 
    ? DESTINATIONS 
    : DESTINATIONS.filter(d => d.category === filter);

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Discover Destinations</h1>
          <p className="text-gray-600 max-w-2xl text-lg">
            Explore the diverse landscapes and rich history of Ethiopia. Select a category below to narrow your search.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-6 py-2 rounded-full font-semibold transition-all shadow-sm ${
                filter === cat 
                  ? 'bg-ethiopia-green text-white shadow-lg' 
                  : 'bg-white text-slate-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <div key={dest.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={dest.mainImage} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt={dest.name} 
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-slate-800 shadow-sm">{dest.category}</span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-3 text-slate-900">{dest.name}</h3>
                <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {dest.description}
                </p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-slate-400 text-xs font-medium">Est. Cost: <span className="text-slate-700">{dest.costEstimate.split('-')[0]}</span></span>
                  <Link 
                    to={`/destination/${dest.id}`} 
                    className="text-ethiopia-green font-bold text-sm hover:underline flex items-center"
                  >
                    View Details <i className="fas fa-chevron-right ml-2 text-[10px]"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl shadow-inner">
            <i className="fas fa-map-marked-alt text-5xl text-gray-200 mb-4"></i>
            <h3 className="text-xl font-bold text-gray-400">No destinations found in this category.</h3>
            <p className="text-gray-400 mt-2">Try selecting another filter or searching for something else.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;
