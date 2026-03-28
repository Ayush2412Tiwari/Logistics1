import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, PlusCircle, LogOut, Settings, BarChart2, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../../store/authStore';
import toast from 'react-hot-toast';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/products', icon: Package, label: 'Products' },
  { to: '/add-product', icon: PlusCircle, label: 'Add Product' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full bg-surface-950 border-r border-surface-800">
      {/* Logo */}
      <div className={`flex items-center gap-3 h-16 border-b border-surface-800 px-4 ${collapsed ? 'justify-center' : ''}`}>
        <div className="flex-shrink-0 p-2 rounded-lg bg-surface-800 border border-surface-700 shadow-operational flex items-center justify-center">
          <Package size={20} className="text-primary-500" />
        </div>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden">
            <h1 className="text-base font-bold text-surface-100 whitespace-nowrap tracking-wide">LOGITRACK</h1>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-2 relative">
        {navItems.map(({ to, icon: Icon, label }) => {
          // Temporarily mock active state for demo pages that might not exist yet
          const isActive = location.pathname === to || (to === '/' && location.pathname === '/');
          
          return (
            <NavLink
              key={to}
              to={to}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 rounded-lg font-medium transition-all duration-200 group relative
               ${collapsed ? 'justify-center px-0 py-3 w-full' : 'px-3 py-2.5'}
               ${isActive
                   ? 'bg-surface-800/80 text-primary-400 shadow-[inset_2px_0_0_0_#6366f1]' 
                   : 'text-surface-400 hover:text-surface-100 hover:bg-surface-800 hover:shadow-operational'
               }`}
              onClick={(e) => {
                if(to !== '/' && to !== '/add-product') {
                  e.preventDefault();
                  toast('Demo page: functionality coming soon.', { icon: '🏗️' });
                }
              }}
            >
              <Icon size={20} className={`flex-shrink-0 transition-transform ${!isActive && 'group-hover:scale-110'}`} />
              {!collapsed && <span className="whitespace-nowrap">{label}</span>}
              
              {/* Tooltip for collapsed mode */}
              {collapsed && (
                 <div className="absolute left-full ml-4 px-2 py-1 bg-surface-800 text-surface-100 text-xs rounded-md opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-1 transition-all z-50 whitespace-nowrap shadow-operational border border-surface-700">
                   {label}
                 </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div className="p-3 border-t border-surface-800 space-y-2">
        <button
          onClick={handleLogout}
          title={collapsed ? 'Logout' : undefined}
          className={`flex items-center gap-3 w-full rounded-lg text-sm font-medium
                     text-surface-400 hover:text-danger-400 hover:bg-surface-800 transition-all duration-200 group
                     ${collapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'}`}
        >
          <LogOut size={20} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Collapse Toggle (Desktop) */}
      <div className="hidden lg:block absolute -right-3 top-20 z-50">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full bg-surface-800 border border-surface-700 text-surface-400 hover:text-surface-100 shadow-operational transition-colors"
        >
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}>
             <path d="m15 18-6-6 6-6"/>
           </svg>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-surface-950 border-b border-surface-800 z-40 flex items-center px-4 justify-between">
         <div className="flex items-center gap-3">
           <div className="p-1.5 rounded bg-surface-800 border border-surface-700">
             <Package size={18} className="text-primary-500" />
           </div>
           <h1 className="text-sm font-bold text-surface-100 tracking-wide">LOGITRACK</h1>
         </div>
         <button onClick={() => setMobileOpen(true)} className="p-2 text-surface-400 hover:text-surface-100">
           <Menu size={24} />
         </button>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block fixed left-0 top-0 h-screen z-40 transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-64'}`}
      >
        {renderSidebarContent()}
      </aside>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 z-50 shadow-operational"
            >
              {renderSidebarContent()}
              <button 
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 -right-12 p-2 bg-surface-900 border border-surface-700 rounded-full text-surface-100 shadow-operational"
              >
                <X size={20} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
