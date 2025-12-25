
import React, { useState } from 'react';
import { UserProfile, CommunityImage, Review } from '../types';

const Admin: React.FC<{ user: UserProfile | null }> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'images' | 'reviews' | 'partners'>('images');

  // Mock moderation data
  const [pendingImages, setPendingImages] = useState<CommunityImage[]>([
    {
      id: 'img1',
      destinationId: 'lalibela',
      title: 'Sunrise at St. George',
      description: 'A beautiful shot taken at 6am.',
      location: 'Lalibela',
      author: 'Abebe B.',
      url: 'https://picsum.photos/seed/p1/400/300',
      dateTaken: '2023-10-12',
      status: 'pending'
    },
    {
        id: 'img2',
        destinationId: 'simien-mountains',
        title: 'Gelada Baboon Close-up',
        description: 'Nature at its best.',
        location: 'Simien Plateau',
        author: 'Sara K.',
        url: 'https://picsum.photos/seed/p2/400/300',
        dateTaken: '2023-11-05',
        status: 'pending'
      }
  ]);

  const [pendingReviews, setPendingReviews] = useState<Review[]>([
    {
        id: 'r1',
        targetId: 'lalibela',
        userName: 'TravelerJoe',
        rating: 5,
        comment: 'Absolutely magical place! A must see for everyone.',
        date: '2023-11-20',
        status: 'pending'
    }
  ]);

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center bg-white p-12 rounded-3xl shadow-xl max-w-md border border-gray-100">
          <i className="fas fa-lock text-5xl text-ethiopia-red mb-6"></i>
          <h2 className="text-3xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-500 mb-8">You do not have administrative privileges to view this section.</p>
          <button onClick={() => window.history.back()} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold">Go Back</button>
        </div>
      </div>
    );
  }

  const approveImage = (id: string) => {
    setPendingImages(prev => prev.filter(img => img.id !== id));
  };

  const rejectImage = (id: string) => {
    setPendingImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Admin Control Center</h1>
            <p className="text-gray-500">Monitor and moderate content across the Visit.Ethiopiayen platform.</p>
          </div>
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
            <button 
                onClick={() => setActiveTab('images')}
                className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'images' ? 'bg-ethiopia-green text-white shadow-md' : 'text-slate-600 hover:bg-gray-50'}`}
            >
                Images ({pendingImages.length})
            </button>
            <button 
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'reviews' ? 'bg-ethiopia-green text-white shadow-md' : 'text-slate-600 hover:bg-gray-50'}`}
            >
                Reviews ({pendingReviews.length})
            </button>
            <button 
                onClick={() => setActiveTab('partners')}
                className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'partners' ? 'bg-ethiopia-green text-white shadow-md' : 'text-slate-600 hover:bg-gray-50'}`}
            >
                Partnerships
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8">
          {activeTab === 'images' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pendingImages.map(img => (
                <div key={img.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col animate-fade-in">
                  <div className="aspect-video relative">
                    <img src={img.url} className="w-full h-full object-cover" alt={img.title} />
                    <div className="absolute top-4 right-4">
                        <span className="bg-ethiopia-yellow text-slate-900 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">Pending Review</span>
                    </div>
                  </div>
                  <div className="p-6 space-y-4 flex-grow">
                    <div>
                      <h4 className="font-bold text-lg text-slate-800">{img.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">By {img.author} &bull; {img.dateTaken}</p>
                    </div>
                    <p className="text-sm text-gray-600 italic">"{img.description}"</p>
                    <div className="pt-4 flex gap-2 border-t border-gray-50 mt-auto">
                      <button 
                        onClick={() => approveImage(img.id)}
                        className="flex-grow bg-green-500 text-white py-2 rounded-lg text-sm font-bold hover:bg-green-600 transition-all"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => rejectImage(img.id)}
                        className="flex-grow bg-red-500 text-white py-2 rounded-lg text-sm font-bold hover:bg-red-600 transition-all"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {pendingImages.length === 0 && (
                <div className="col-span-full py-24 text-center bg-white rounded-3xl border border-dashed border-gray-300">
                    <i className="fas fa-check-circle text-5xl text-green-200 mb-4"></i>
                    <h3 className="text-xl font-bold text-gray-400">Queue Clear!</h3>
                    <p className="text-gray-400">No images pending moderation at this time.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {pendingReviews.map(rev => (
                <div key={rev.id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-start justify-between animate-fade-in">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="flex text-ethiopia-yellow text-xs">
                            {[...Array(5)].map((_, i) => (
                                <i key={i} className={`fas fa-star ${i < rev.rating ? '' : 'text-gray-200'}`}></i>
                            ))}
                        </div>
                        <span className="text-xs font-bold text-slate-400">Target: {rev.targetId}</span>
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-slate-800">"{rev.comment}"</h4>
                    <p className="text-sm text-gray-500">Submitted by <strong>{rev.userName}</strong> on {rev.date}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-slate-800">Approve</button>
                    <button className="text-red-500 px-6 py-2 rounded-lg text-sm font-bold hover:bg-red-50 transition-all">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'partners' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">
                <i className="fas fa-handshake text-6xl text-gray-100 mb-6"></i>
                <h3 className="text-2xl font-bold text-slate-400">Partnership Inquiries</h3>
                <p className="text-gray-400 mt-2">Check the Business Module database for new applications.</p>
                <button className="mt-8 bg-ethiopia-green text-white px-8 py-3 rounded-xl font-bold">Export to CSV</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
