import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import SearchModal from '../public/SearchModal';

export default function DashboardLayout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main Workspace with pl-72 matching stitch layout */}
      <div className="pl-72 flex flex-col min-h-screen">
        {/* Fixed Header */}
        <Header onOpenSearch={() => setIsSearchOpen(true)} />

        {/* Dynamic nested dashboard views */}
        <main className="relative pt-16 bg-surface flex-1 w-full px-6 py-6">
          <Outlet />
        </main>
      </div>

      {/* Search Overlay */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
