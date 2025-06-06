import React from "react";

export default function Pagination({
  page,
  totalPages,
  studentsLength,
  count,
  next,
  setPage,
  alwaysShow = false,
  pageSize = 7,
}) {
  if (!alwaysShow && totalPages <= 1) return null;

  // Calculate start and end item numbers for the current page
  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, count);

  // Generate page numbers for up to 5 pages around the current page
  let startPage = Math.max(1, page - 2);
  let endPage = Math.min(totalPages, page + 2);
  if (endPage - startPage < 4) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + 4);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, endPage - 4);
    }
  }
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="w-full flex flex-col items-center fixed left-0 bottom-0 pb-4 bg-gradient-to-t from-white/90 to-transparent z-40">
      <div className="flex items-center gap-2">
        <button
          className="flex items-center justify-center w-8 h-8 rounded-full text-gray-600 hover:bg-blue-100 disabled:text-gray-300 disabled:bg-transparent transition"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          aria-label="Previous Page"
        >
          &#60;
        </button>
        {pageNumbers.map((num) => (
          <button
            key={num}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition ${
              num === page
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-100"
            }`}
            onClick={() => setPage(num)}
            aria-current={num === page ? "page" : undefined}
          >
            {num}
          </button>
        ))}
        <button
          className="flex items-center justify-center w-8 h-8 rounded-full text-gray-600 hover:bg-blue-100 disabled:text-gray-300 disabled:bg-transparent transition"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || !next}
          aria-label="Next Page"
        >
          &#62;
        </button>
      </div>
      <span className="text-xs text-gray-500 mt-2">
        {startItem}-{endItem} of {count} items
      </span>
    </div>
  );
}
