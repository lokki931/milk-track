interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="mt-4 flex justify-center items-center gap-1 flex-wrap">
      {/* Prev Button */}
      <button
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="px-3 py-1 rounded-lg text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        ←
      </button>

      {/* Page numbers (responsive) */}
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter((n) => {
          if (window.innerWidth < 640) {
            // Mobile: show only prev, current, next
            return Math.abs(n - currentPage) <= 1;
          } else {
            // Desktop: show first 7 pages (or all)
            return (
              totalPages <= 7 ||
              Math.abs(n - currentPage) <= 2 ||
              n === 1 ||
              n === totalPages
            );
          }
        })
        .map((n) => (
          <button
            key={n}
            onClick={() => handlePageChange(n)}
            className={`px-3 py-1 rounded-lg text-sm ${
              n === currentPage
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {n}
          </button>
        ))}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="px-3 py-1 rounded-lg text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        →
      </button>
    </div>
  );
};

export default Pagination;
