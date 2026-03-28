import { Search, Bell, Plus } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import Button from '../ui/Button';

export default function Topbar({ onAddProduct }) {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-4 sm:px-6 bg-surface-950/80 backdrop-blur-md border-b border-surface-800">
      
      {/* Search Input (Mocking global search trigger) */}
      <div className="flex-1 max-w-md hidden sm:block">
        <div 
          className="relative group cursor-text" 
          onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
        >
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500 group-hover:text-surface-300 transition-colors pointer-events-none" />
          <div className="h-9 w-full rounded-lg border border-surface-800 bg-surface-900/50 px-9 py-1.5 text-sm text-surface-400 flex items-center justify-between group-hover:border-surface-600 transition-all cursor-text">
            <span>Search operations...</span>
            <kbd className="hidden lg:inline-flex items-center gap-1 rounded border border-surface-700 bg-surface-800 px-1.5 font-mono text-[10px] font-medium text-surface-400">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        <Button size="sm" onClick={onAddProduct}>
          <Plus size={16} className="mr-1" />
          Add Product
        </Button>

        <div className="hidden sm:block h-6 w-px bg-surface-800" />

        <button className="relative p-2 text-surface-400 hover:text-surface-100 hover:bg-surface-800 rounded-lg transition-colors">
          <Bell size={18} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary-500 rounded-full ring-2 ring-surface-950" />
        </button>

        <div className="flex items-center gap-2 pl-1 sm:pl-2">
          <div className="w-8 h-8 rounded-full bg-surface-800 border border-surface-700 flex items-center justify-center text-surface-100 text-sm font-bold shadow-inner">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
        </div>
      </div>
    </header>
  );
}
