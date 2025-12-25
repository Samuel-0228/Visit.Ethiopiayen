
import React from 'react';
import { Link } from 'react-router-dom';
import { DESTINATIONS } from '../constants';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://hornreview.org/storage/2025/05/Ethiopia-map-photo-450x250.jpg" 
            className="w-full h-full object-cover" 
            alt="Ethiopian Landscape" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <span className="inline-block bg-ethiopia-green text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">The Land of Origins</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight max-w-2xl">
            Experience the <span className="text-ethiopia-yellow">Magic</span> of Ethiopia
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg leading-relaxed">
            Discover ancient rock-hewn churches, otherworldly landscapes, and a culture that dates back millennia. Your journey into history starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/destinations" className="bg-ethiopia-green text-white px-8 py-4 rounded-lg font-bold text-center hover:bg-opacity-90 transition-all shadow-xl">
              Explore Destinations
            </Link>
            <Link to="/itineraries" className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold text-center hover:bg-gray-100 transition-all shadow-xl">
              Plan Your Trip
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Must-Visit Places</h2>
              <p className="text-gray-600 max-w-2xl">Curated list of the most iconic sites across the country, from historical landmarks to natural wonders.</p>
            </div>
            <Link to="/destinations" className="hidden md:block text-ethiopia-green font-bold hover:underline">
              View all <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DESTINATIONS.slice(0, 3).map((dest) => (
              <Link to={`/destination/${dest.id}`} key={dest.id} className="group relative h-[450px] overflow-hidden rounded-2xl shadow-lg">
                <img src={dest.mainImage} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={dest.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <span className="text-xs uppercase font-bold tracking-widest text-ethiopia-yellow mb-2 block">{dest.category}</span>
                  <h3 className="text-2xl font-bold mb-2">{dest.name}</h3>
                  <p className="text-sm text-gray-300 line-clamp-2">{dest.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Culture & Food Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://th.bing.com/th/id/R.a2e36cd3150f9de6448fa2ffe0c9de22?rik=okCKgSWnjDuYNA&pid=ImgRaw&r=0" className="w-full h-full object-cover" alt="Ethiopian Food" />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl max-w-xs hidden md:block border border-gray-100">
              <h4 className="font-bold text-xl mb-2">The Coffee Ceremony</h4>
              <p className="text-sm text-gray-600">A sensory journey through Ethiopia's aromatic hills. Not just a drink, but a social heartbeat.</p>
            </div>
          </div>
          <div>
            <span className="text-ethiopia-red font-bold text-sm uppercase tracking-widest mb-4 block">Rich Traditions</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900 leading-tight">Taste the Authentic Flavors of the Highlands</h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Ethiopian cuisine is a vibrant tapestry of spices, textures, and communal dining. From the legendary Injera to the world's finest coffee, every bite tells a story of hospitality.
            </p>
            <div className="space-y-4 mb-10">
              <div className="flex items-start">
                <div className="bg-ethiopia-green/10 p-3 rounded-xl mr-4">
                  <i className="fas fa-utensils text-ethiopia-green"></i>
                </div>
                <div>
                  <h5 className="font-bold text-lg">Communal Dining</h5>
                  <p className="text-gray-600">Food is served on shared platters, bringing people together.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-ethiopia-green/10 p-3 rounded-xl mr-4">
                  <i className="fas fa-mug-hot text-ethiopia-green"></i>
                </div>
                <div>
                  <h5 className="font-bold text-lg">Ancient Coffee Rituals</h5>
                  <p className="text-gray-600">The birthplace of coffee offers the world's most unique brewing experience.</p>
                </div>
              </div>
            </div>
            <button className="border-2 border-ethiopia-green text-ethiopia-green px-8 py-3 rounded-lg font-bold hover:bg-ethiopia-green hover:text-white transition-all">
              Discover Food Guide
            </button>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="py-24 bg-ethiopia-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Business & Partnerships</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
            Are you a hotelier, tour operator, or investor? Partner with the fastest-growing tourism platform in the Horn of Africa.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/business" className="bg-white text-ethiopia-green px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-2xl">
              Partner With Us
            </Link>
            <button className="bg-transparent border border-white/30 text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 transition-all">
              Developer Portfolio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
