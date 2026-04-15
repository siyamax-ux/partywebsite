import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, Menu, X, BarChart3 } from 'lucide-react';
import ManageRegistrations from '../components/ManageRegistrations';
import DashboardOverview from '../components/DashboardOverview';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const navItems = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Registrations', path: '/dashboard/registrations', icon: Users },
  ];

  return (
    <div className="flex min-h-screen bg-[#0f101a]">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 glass border-r border-white/10 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">AdminPanel</span>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-6 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 glass-card rounded-none sticky top-0 z-40 backdrop-blur-xl">
          <button className="md:hidden text-white" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
          <div className="hidden md:block">
            <h2 className="text-xl font-semibold text-white">
              {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-white">Administrator</span>
              <span className="text-xs text-slate-400">Online</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-700 border border-white/10 flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        <div className="p-8 pb-12 flex-1">
          <Routes>
            <Route index element={<DashboardOverview />} />
            <Route path="registrations" element={<ManageRegistrations />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
