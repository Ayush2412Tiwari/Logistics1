import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import ActivityPanel from './ActivityPanel';
import CommandPalette from './CommandPalette';
import { Toaster } from 'react-hot-toast';

export default function DashboardLayout() {
  const location = useLocation();

  // If we are on /add-product, we might not want the Activity Panel to show up, or maybe we do.
  const showRightPanel = location.pathname === '/';

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col lg:flex-row">
      {/* Toast provider styled globally here or in App if needed, but it helps to have it top level. 
          Assuming it's in App.jsx but CommandPalette operates here. */}
      <CommandPalette />

      {/* 
        Layout Architecture:
        1. Left: Sidebar (Fixed in desktop, Drawer in mobile) 
        2. Middle: Main Panel (Dynamic width)
        3. Right: Activity Panel (Fixed in desktop wide screens)
      */}
      
      {/* Sidebar handles its own fixed positioning and responsive behavior internally */}
      <Sidebar />

      {/* Main Container Layer */}
      <div className="flex-1 flex lg:ml-[72px] xl:ml-64 transition-all duration-300">
        
        {/* Main Operational Panel */}
        <main className="flex-1 min-w-0 flex flex-col pt-16 lg:pt-0 min-h-screen">
          <Outlet />
        </main>

        {/* Right Activity Panel */}
        {showRightPanel && (
          <ActivityPanel />
        )}
      </div>
    </div>
  );
}
