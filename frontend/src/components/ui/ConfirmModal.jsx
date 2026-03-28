import { AlertTriangle } from 'lucide-react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, isLoading }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      <div className="relative w-full max-w-md glass-card p-6 animate-scale-in shadow-2xl shadow-black/40">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 p-3 rounded-xl bg-danger-600/20">
            <AlertTriangle className="text-danger-400" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-surface-100 mb-1">{title}</h3>
            <p className="text-surface-400 text-sm leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="btn-secondary text-sm"
            disabled={isLoading}
            id="confirm-modal-cancel-btn"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-danger-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm
                       hover:bg-danger-500 active:scale-[0.98] transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
            id="confirm-modal-delete-btn"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
