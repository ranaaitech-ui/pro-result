import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FileText, PlusCircle, LogOut, LayoutDashboard, Settings } from 'lucide-react';

export default function DashboardLayout() {
    const { logout, currentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col transition-all duration-300">
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
                        R
                    </div>
                    <h1 className="text-xl font-bold text-gray-800 font-playfair tracking-tight">ResultSync</h1>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    <button onClick={() => navigate('/dashboard/create')} className="w-full flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-medium transition-colors">
                        <PlusCircle size={20} />
                        <span>Create Result</span>
                    </button>
                    <button onClick={() => navigate('/dashboard/records')} className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors">
                        <FileText size={20} />
                        <span>Saved Records</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-xl mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                            {currentUser?.email?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 truncate">
                            <p className="text-sm font-medium text-gray-900 truncate">{currentUser?.displayName || 'Teacher'}</p>
                            <p className="text-xs text-gray-500 truncate">{currentUser?.email}</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium text-sm">
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
                    <h2 className="text-lg font-semibold text-gray-800">Dashboard Workspace</h2>
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <Settings size={20} />
                        </button>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-auto bg-gray-50/50 relative">
                    <React.Suspense fallback={<div className="p-8">Loading...</div>}>
                        {/* Where the nested routes will render */}
                        <div className="absolute inset-0">
                            <Outlet />
                        </div>
                    </React.Suspense>
                </div>
            </main>
        </div>
    );
}
