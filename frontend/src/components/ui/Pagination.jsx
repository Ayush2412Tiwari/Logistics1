import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ pagination, onPageChange }) {
  const { page, pages, total } = pagination;

  if (pages <= 1) return null;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(pages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-surface-400">
        Showing page <span className="text-surface-200 font-medium">{page}</span> of{' '}
        <span className="text-surface-200 font-medium">{pages}</span>
        {' '}({total} total)
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-700/50 
                     transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          id="pagination-prev-btn"
        >
          <ChevronLeft size={18} />
        </button>

        {getPageNumbers().map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
              num === page
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                : 'text-surface-400 hover:text-surface-200 hover:bg-surface-700/50'
            }`}
            id={`pagination-page-${num}-btn`}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === pages}
          className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-700/50 
                     transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          id="pagination-next-btn"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
