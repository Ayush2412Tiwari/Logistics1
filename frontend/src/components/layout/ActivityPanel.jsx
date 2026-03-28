import { RefreshCw, Trash2, Edit3, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_LOGS = [
  { id: 1, type: 'CREATE', message: 'Product "Router" added', time: 'Just now', icon: PlusCircle, color: 'text-success-400', bg: 'bg-success-400/10' },
  { id: 2, type: 'UPDATE', message: 'Product "Monitor" updated', time: '5m ago', icon: Edit3, color: 'text-warning-400', bg: 'bg-warning-400/10' },
  { id: 3, type: 'DELETE', message: 'Product "Keyboard" deleted', time: '1h ago', icon: Trash2, color: 'text-danger-400', bg: 'bg-danger-400/10' },
  { id: 4, type: 'SYNC', message: 'Inventory synced', time: '2h ago', icon: RefreshCw, color: 'text-primary-400', bg: 'bg-primary-400/10' },
  { id: 5, type: 'CREATE', message: 'Product "Mouse" added', time: '5h ago', icon: PlusCircle, color: 'text-success-400', bg: 'bg-success-400/10' },
];

export default function ActivityPanel() {
  return (
    <aside className="w-72 hidden xl:flex flex-col border-l border-surface-800 bg-surface-950/50 h-screen sticky top-0 shrink-0">
      <div className="p-5 border-b border-surface-800">
        <h2 className="text-sm font-semibold text-surface-100">Activity Feed</h2>
        <p className="text-xs text-surface-400 mt-1">Real-time operational logs</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
        {MOCK_LOGS.map((log, i) => {
          const Icon = log.icon;
          return (
            <motion.div 
              key={log.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-6 before:absolute before:left-[11px] before:top-6 before:bottom-[-28px] before:w-[2px] before:bg-surface-800 last:before:hidden"
            >
              <div className="absolute left-0 top-0.5">
                <div className={`p-1 rounded-full ${log.bg} ring-4 ring-surface-950`}>
                  <Icon size={12} className={log.color} />
                </div>
              </div>
              <div>
                <p className="text-sm text-surface-200">{log.message}</p>
                <p className="text-[11px] text-surface-500 mt-0.5 font-medium">{log.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </aside>
  );
}
