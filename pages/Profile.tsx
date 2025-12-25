
import React from 'react';
import { UserProfile } from '../types';

const Profile: React.FC<{ user: UserProfile | null }> = ({ user }) => {
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to view your profile.</h2>
          <button className="bg-ethiopia-green text-white px-8 py-3 rounded-xl font-bold">Sign In</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Cover */}
          <div className="h-48 bg-gradient-to-r from-ethiopia-green to-ethiopia-yellow"></div>
          
          <div className="px-10 pb-10">
            <div className="relative -mt-20 mb-8 inline-block">
              <img src={user.avatar} className="w-32 h-32 rounded-full border-4 border-white shadow-lg" alt={user.name} />
              <div className="absolute bottom-1 right-1 bg-ethiopia-green text-white p-2 rounded-full border-2 border-white">
                <i className="fas fa-check text-xs"></i>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
                <p className="text-gray-500 flex items-center gap-2 mt-1">
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-widest text-slate-600">{user.role}</span>
                  &bull; {user.email}
                </p>
              </div>
              <div className="flex gap-3">
                <button className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold text-sm">Edit Profile</button>
                <button className="bg-slate-100 text-slate-600 px-6 py-2 rounded-xl font-bold text-sm">Settings</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-100">
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">{user.contributions}</p>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">Contributions</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">14</p>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">Saved Plans</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">2.1k</p>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">Impact Views</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-6">Recent Activity</h3>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-ethiopia-green/10 rounded-full flex items-center justify-center text-ethiopia-green">
                            <i className="fas fa-camera"></i>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Uploaded a photo to <span className="text-ethiopia-green">Lalibela</span></p>
                            <p className="text-xs text-gray-400">2 days ago &bull; Approved</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-ethiopia-yellow/10 rounded-full flex items-center justify-center text-ethiopia-yellow">
                            <i className="fas fa-star"></i>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Reviewed <span className="text-ethiopia-green">Simien Mountains</span></p>
                            <p className="text-xs text-gray-400">1 week ago &bull; Approved</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-sm overflow-hidden relative">
                <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-4">Contributor Badge</h3>
                    <p className="text-sm text-gray-400 mb-6 leading-relaxed">You are in the top 5% of contributors this month. Keep sharing to unlock Exclusive Travel Deals!</p>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                        <div className="bg-ethiopia-yellow w-3/4 h-full"></div>
                    </div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase">375 / 500 XP to next level</p>
                </div>
                <i className="fas fa-medal absolute -bottom-4 -right-4 text-8xl text-white/5 transform -rotate-12"></i>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
