
import React, { useState } from 'react';
import { ITINERARIES } from '../constants';
import { Link } from 'react-router-dom';

const Itineraries: React.FC = () => {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (id: string) => {
    setDownloading(id);
    setTimeout(() => {
      setDownloading(null);
      // In a real app this would use a library like jspdf or generate a server-side PDF
      const link = document.createElement('a');
      link.href = 'javascript:void(0)';
      alert(`Success! "${id}" itinerary is being prepared. In a full production environment, this would initiate a PDF generation of your 10-day trip details.`);
    }, 1200);
  };

  return (
    <div className="bg-white min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-ethiopia-green font-bold uppercase tracking-widest text-sm mb-4 block">Plan Your Adventure</span>
          <h1 className="text-5xl font-bold text-slate-900 mb-6">Expertly Crafted Itineraries</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Don't know where to start? We've designed comprehensive routes that capture the soul of Ethiopia in efficient, unforgettable journeys.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {ITINERARIES.map(itinerary => (
            <div key={itinerary.id} className="bg-slate-50 rounded-3xl border border-gray-100 p-10 flex flex-col hover:shadow-xl transition-all">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">{itinerary.name}</h3>
                  <p className="text-ethiopia-green font-bold">{itinerary.durationDays} Days of Discovery</p>
                </div>
                <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Total Est. Cost</p>
                    <p className="text-lg font-bold text-slate-800">{itinerary.totalCost}</p>
                </div>
              </div>

              <div className="space-y-10 relative flex-grow">
                <div className="absolute left-[20px] top-4 bottom-4 w-0.5 bg-gray-200"></div>
                {itinerary.days.map((day, idx) => (
                  <div key={idx} className="relative pl-14">
                    <div className="absolute left-0 top-0 w-10 h-10 bg-white border-2 border-ethiopia-green rounded-full flex items-center justify-center z-10 font-black text-ethiopia-green shadow-sm">
                      {day.day}
                    </div>
                    <h4 className="font-bold text-xl mb-3">{day.title}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Key Activities</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                                {day.activities.map((a, i) => <li key={i}>&bull; {a}</li>)}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Lodging</p>
                                <p className="text-sm font-semibold">{day.lodging}</p>
                            </div>
                            <div>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Local Taste</p>
                                <p className="text-sm font-semibold">{day.food}</p>
                            </div>
                        </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-10 border-t border-gray-200 flex flex-col md:flex-row gap-4">
                <button 
                  onClick={() => handleDownload(itinerary.name)}
                  disabled={downloading === itinerary.name}
                  className="flex-grow bg-ethiopia-green text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center"
                >
                  {downloading === itinerary.name ? <i className="fas fa-circle-notch fa-spin mr-2"></i> : <i className="fas fa-file-pdf mr-2"></i>}
                  Download PDF
                </button>
                <Link 
                  to="/business"
                  className="flex-grow bg-white text-slate-900 py-4 rounded-xl font-bold border border-gray-200 hover:bg-gray-50 transition-all text-center"
                >
                  Request Changes
                </Link>
              </div>
            </div>
          ))}
          
          <Link to="/business" className="bg-slate-900 rounded-[40px] p-12 flex flex-col items-center justify-center text-center text-white relative overflow-hidden group cursor-pointer border border-transparent hover:border-ethiopia-green transition-all shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-ethiopia-green/30 to-transparent opacity-50"></div>
            <div className="relative z-10">
                <i className="fas fa-magic text-6xl text-ethiopia-yellow mb-8 block transform group-hover:scale-125 transition-transform"></i>
                <h3 className="text-4xl font-bold mb-6">Need a Custom Route?</h3>
                <p className="text-gray-400 mb-10 max-w-sm mx-auto leading-relaxed text-lg">
                  Work with our professional planners to build a bespoke journey. Tailored to your interests, budget, and time.
                </p>
                <div className="inline-block bg-ethiopia-green text-white px-12 py-5 rounded-2xl font-bold group-hover:bg-opacity-90 transition-all shadow-xl">
                    Build My Itinerary
                </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Itineraries;
