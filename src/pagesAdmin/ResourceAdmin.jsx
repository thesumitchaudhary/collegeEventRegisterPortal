import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Importing image
import herossectionImage from "../images/herossection-image.avif";

export default function ResourceAdmin() {
  return (
    <div className="relative w-full text-white min-h-screen overflow-hidden">
      <img
        src={herossectionImage}
        alt="hero section"
        className="absolute w-full h-full object-cover -z-[10]"
      />
      <div>
        <header className="max-w-[50rem] mx-auto px-8 py-10 z-10 relative">
          <h1 className="text-6xl font-semibold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            📚 Welcome to College Resources Manage Page
          </h1>
          <Link 
            to="/admin" 
            className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            🏠 Home
          </Link>
        </header>
        <main className="p-6 max-w-6xl mx-auto space-y-8 z-[10]">
          <div className="bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 border-purple-500/20 shadow-2xl rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 bg-clip-text text-transparent text-center">
              🎯 Resource Management Dashboard
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Upload Resources Card */}
              <div className="bg-gradient-to-br from-blue-800 via-indigo-900 to-purple-800 border-blue-500/20 shadow-xl rounded-lg p-6 hover:scale-105 transition-all duration-300 group">
                <div className="text-center space-y-4">
                  <div className="text-4xl mb-4">📤</div>
                  <h3 className="text-xl font-bold text-blue-300">Upload Resources</h3>
                  <p className="text-gray-300 text-sm">Add new educational materials and documents</p>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300">
                    Upload Files
                  </button>
                </div>
              </div>

              {/* Manage Categories Card */}
              <div className="bg-gradient-to-br from-green-800 via-emerald-900 to-teal-800 border-green-500/20 shadow-xl rounded-lg p-6 hover:scale-105 transition-all duration-300 group">
                <div className="text-center space-y-4">
                  <div className="text-4xl mb-4">🗂️</div>
                  <h3 className="text-xl font-bold text-green-300">Manage Categories</h3>
                  <p className="text-gray-300 text-sm">Organize resources by subjects and types</p>
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300">
                    Manage Categories
                  </button>
                </div>
              </div>

              {/* View All Resources Card */}
              <div className="bg-gradient-to-br from-orange-800 via-red-900 to-pink-800 border-orange-500/20 shadow-xl rounded-lg p-6 hover:scale-105 transition-all duration-300 group">
                <div className="text-center space-y-4">
                  <div className="text-4xl mb-4">📋</div>
                  <h3 className="text-xl font-bold text-orange-300">View Resources</h3>
                  <p className="text-gray-300 text-sm">Browse and manage existing resources</p>
                  <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300">
                    View All
                  </button>
                </div>
              </div>

              {/* Statistics Card */}
              <div className="bg-gradient-to-br from-purple-800 via-violet-900 to-indigo-800 border-purple-500/20 shadow-xl rounded-lg p-6 hover:scale-105 transition-all duration-300 group">
                <div className="text-center space-y-4">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-xl font-bold text-purple-300">Statistics</h3>
                  <p className="text-gray-300 text-sm">View download counts and usage analytics</p>
                  <button className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300">
                    View Stats
                  </button>
                </div>
              </div>

              {/* User Permissions Card */}
              <div className="bg-gradient-to-br from-cyan-800 via-teal-900 to-blue-800 border-cyan-500/20 shadow-xl rounded-lg p-6 hover:scale-105 transition-all duration-300 group">
                <div className="text-center space-y-4">
                  <div className="text-4xl mb-4">👥</div>
                  <h3 className="text-xl font-bold text-cyan-300">User Access</h3>
                  <p className="text-gray-300 text-sm">Manage user permissions and access levels</p>
                  <button className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300">
                    Manage Access
                  </button>
                </div>
              </div>

              {/* Settings Card */}
              <div className="bg-gradient-to-br from-yellow-800 via-amber-900 to-orange-800 border-yellow-500/20 shadow-xl rounded-lg p-6 hover:scale-105 transition-all duration-300 group">
                <div className="text-center space-y-4">
                  <div className="text-4xl mb-4">⚙️</div>
                  <h3 className="text-xl font-bold text-yellow-300">Settings</h3>
                  <p className="text-gray-300 text-sm">Configure resource management settings</p>
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300">
                    Settings
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions Section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-lg border border-slate-500/30">
              <h3 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                ⚡ Quick Actions
              </h3>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                  🆕 Add New Resource
                </button>
                <button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                  🔍 Search Resources
                </button>
                <button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                  📈 Generate Report
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
