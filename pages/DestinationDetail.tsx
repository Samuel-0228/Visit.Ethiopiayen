
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DESTINATIONS } from '../constants';
import { UserProfile } from '../types';
import { getTravelAdvisorResponse } from '../geminiService';
import { supabase } from '../supabaseClient';

const DestinationDetail: React.FC<{ user: UserProfile | null }> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const dest = DESTINATIONS.find((d) => d.id === id);
  const [query, setQuery] = useState('');
  const [advisorResponse, setAdvisorResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Community Image State
  const [communityImages, setCommunityImages] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCommunityImages();
    }
  }, [id]);

  const fetchCommunityImages = async () => {
    try {
      const { data, error } = await supabase
        .from('community_images')
        .select('*')
        .eq('destinationId', id)
        .eq('status', 'approved');
      
      if (error) throw error;
      if (data) setCommunityImages(data);
    } catch (err) {
      console.error('Error fetching images:', err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !id) return;

    // Basic file size check for UX
    if (file.size > 5 * 1024 * 1024) {
      alert("This image is too large. Please select a file smaller than 5MB.");
      return;
    }

    setUploading(true);
    try {
      // 1. Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${id}/${Math.random()}.${fileExt}`;
      const filePath = `community-uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      // 3. Insert into community_images table
      const { error: insertError } = await supabase
        .from('community_images')
        .insert([
          {
            destinationId: id,
            url: publicUrl,
            author: user?.name || 'Fellow Traveler',
            title: 'Community Perspective',
            status: 'approved',
          },
        ]);

      if (insertError) throw insertError;

      alert('Thank you for sharing! Your photo has been added to the gallery.');
      fetchCommunityImages();
    } catch (err) {
      console.error('Upload failed:', err);
      // User-friendly error message
      alert('We could not process your upload at this time. Please try again later.');
    } finally {
      setUploading(false);
    }
  };

  if (!dest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Destination not found</h2>
          <Link to="/destinations" className="text-ethiopia-green font-bold">Back to all destinations</Link>
        </div>
      </div>
    );
  }

  const handleAskAdvisor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setAdvisorResponse(null);
    const res = await getTravelAdvisorResponse(`The user is asking about ${dest.name}, Ethiopia: ${query}`);
    setAdvisorResponse(res);
    setLoading(false);
  };

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <div className="relative h-[60vh]">
        <img src={dest.mainImage} className="w-full h-full object-cover" alt={dest.name} />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-0 left-0 w-full p-12 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <span className="bg-ethiopia-green px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">{dest.category}</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">{dest.name}</h1>
            <p className="text-xl text-gray-200 italic">"{dest.tagline}"</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-ethiopia-green inline-block">Overview</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">{dest.description}</p>
            <h3 className="text-xl font-bold mb-4 text-slate-800">Historical Context</h3>
            <p className="text-gray-600 leading-relaxed mb-6">{dest.history}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="aspect-square rounded-xl overflow-hidden shadow-md">
                <img src={dest.mainImage} className="w-full h-full object-cover" alt={`${dest.name} main`} />
              </div>
              
              {communityImages.map((img, idx) => (
                <div key={idx} className="aspect-square rounded-xl overflow-hidden shadow-md group relative">
                  <img src={img.url} className="w-full h-full object-cover" alt={`Community ${idx}`} />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <p className="text-white text-xs text-center">By {img.author}</p>
                  </div>
                </div>
              ))}

              <label className="aspect-square bg-slate-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-slate-100 transition-all">
                {uploading ? (
                  <i className="fas fa-circle-notch fa-spin text-ethiopia-green text-2xl"></i>
                ) : (
                  <>
                    <i className="fas fa-camera text-gray-400 mb-2 text-2xl"></i>
                    <span className="text-xs font-bold text-gray-500 uppercase">Share Your View</span>
                  </>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
              </label>
            </div>
          </section>

          <section className="bg-slate-50 p-8 rounded-2xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <i className="fas fa-robot text-ethiopia-green mr-3"></i>
              AI Travel Advisor
            </h2>
            <p className="text-sm text-gray-500 mb-6 italic">Ask anything about visiting {dest.name}—from local customs to transport advice.</p>
            
            <form onSubmit={handleAskAdvisor} className="flex gap-2 mb-6">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Ask about ${dest.name}...`}
                className="flex-grow px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-ethiopia-green outline-none"
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800 transition-all disabled:opacity-50"
              >
                {loading ? <i className="fas fa-circle-notch fa-spin"></i> : 'Ask'}
              </button>
            </form>

            {advisorResponse && (
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm animate-fade-in whitespace-pre-wrap text-gray-700 leading-relaxed prose prose-slate max-w-none">
                {advisorResponse}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold mb-6">Trip Planner</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <i className="far fa-calendar-alt w-8 text-ethiopia-yellow text-xl"></i>
                <div>
                  <p className="text-xs uppercase text-gray-400 font-bold tracking-widest">Best Time</p>
                  <p className="font-semibold">{dest.bestTime}</p>
                </div>
              </div>
              <div className="flex items-center">
                <i className="fas fa-dollar-sign w-8 text-ethiopia-yellow text-xl"></i>
                <div>
                  <p className="text-xs uppercase text-gray-400 font-bold tracking-widest">Est. Daily Cost</p>
                  <p className="font-semibold">{dest.costEstimate}</p>
                </div>
              </div>
              <div className="flex items-center">
                <i className="fas fa-map-marker-alt w-8 text-ethiopia-yellow text-xl"></i>
                <div>
                  <p className="text-xs uppercase text-gray-400 font-bold tracking-widest">Significance</p>
                  <p className="font-semibold">{dest.significance}</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-8 bg-ethiopia-green text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg">
              Book a Tour
            </button>
          </div>

          <div className="border border-gray-100 p-8 rounded-2xl">
            <h4 className="font-bold text-lg mb-6">Local Tips</h4>
            <ul className="space-y-4">
              {dest.tips.map((tip, i) => (
                <li key={i} className="flex items-start text-sm text-gray-600">
                  <i className="fas fa-check-circle text-ethiopia-green mt-1 mr-3"></i>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-gray-100 p-8 rounded-2xl">
            <h4 className="font-bold text-lg mb-6">Top Attractions</h4>
            <div className="space-y-3">
              {dest.attractions.map((attr, i) => (
                <div key={i} className="bg-gray-50 px-4 py-3 rounded-lg text-sm font-medium text-slate-700">
                  {attr}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
