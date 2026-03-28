import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import { Package, Plus, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import useProductStore from '../../store/productStore';
import useAuthStore from '../../store/authStore';
import toast from 'react-hot-toast';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { products, setSearch } = useProductStore();
  const { logout } = useAuthStore();

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm" 
        onClick={() => setOpen(false)} 
      />
      <Command 
        className="relative w-full max-w-2xl bg-surface-900 border border-surface-700 rounded-xl shadow-operational overflow-hidden"
        label="Global Command Menu"
      >
        <div className="flex items-center border-b border-surface-800 px-3" cmdk-input-wrapper="">
          <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50 text-surface-400" />
          <Command.Input 
            autoFocus 
            placeholder="Type a command or search products..." 
            className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-surface-500 text-surface-100 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 custom-scrollbar">
          <Command.Empty className="py-6 text-center text-sm text-surface-400">
            No results found.
          </Command.Empty>

          <Command.Group heading={<span className="text-xs font-medium text-surface-500 px-2 py-1.5 flex">Suggestions</span>}>
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/'))}
              className="relative flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-surface-800 aria-selected:text-surface-100 text-surface-300 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
            >
              <LayoutDashboard className="mr-2 h-4 w-4 text-surface-400" />
              Go to Dashboard
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => {
                navigate('/');
                // Small hack: emit an event that Topbar matches to trigger Add Product, or better yet DashboardPage handles it
                // We will rely on user clicking add product for now, or route to /add-product if it exists. 
                // Since this is a modal, opening it via CmdPalette would be hard without global store state for modality.
                toast('Please use the Add Product button on the Dashboard for now', { icon: 'ℹ️' });
              })}
              className="relative flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-surface-800 aria-selected:text-surface-100 text-surface-300 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
            >
              <Plus className="mr-2 h-4 w-4 text-surface-400" />
              Add Product
            </Command.Item>
          </Command.Group>

          <Command.Separator className="h-px bg-surface-800 my-2" />

          <Command.Group heading={<span className="text-xs font-medium text-surface-500 px-2 py-1.5 flex">Products</span>}>
            {products.slice(0, 5).map(p => (
              <Command.Item 
                key={p._id}
                onSelect={() => runCommand(() => {
                  setSearch(p.name);
                  navigate('/');
                })}
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-surface-800 aria-selected:text-surface-100 text-surface-300 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
              >
                <Package className="mr-2 h-4 w-4 text-surface-400" />
                {p.name}
              </Command.Item>
            ))}
          </Command.Group>
          
          <Command.Separator className="h-px bg-surface-800 my-2" />

          <Command.Group heading={<span className="text-xs font-medium text-surface-500 px-2 py-1.5 flex">System</span>}>
            <Command.Item 
              onSelect={() => runCommand(() => {
                logout();
                navigate('/login');
              })}
              className="relative flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-surface-800 aria-selected:text-surface-100 text-surface-300 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
            >
              <LogOut className="mr-2 h-4 w-4 text-surface-400" />
              Log Out
            </Command.Item>
          </Command.Group>

        </Command.List>
      </Command>
    </div>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
