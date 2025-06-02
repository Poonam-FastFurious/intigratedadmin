/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1) return null; // Hide pagination if only one page

  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-between items-center flex-wrap mx-8">
      <p className="mb-0 text-tiny">
        Showing {itemsPerPage} items of {totalItems}
      </p>
      <div className="pagination py-3 flex justify-end items-center mx-8">
        {/* Previous Button */}
        <Link
          to="#"
          onClick={() => handleClick(currentPage - 1)}
          className={`inline-block rounded-md w-10 h-10 text-center leading-[33px] border border-gray mr-2 last:mr-0 
            ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-theme hover:text-white hover:border-theme"}`}
        >
          &lt;
        </Link>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i + 1}
            to="#"
            onClick={() => handleClick(i + 1)}
            className={`inline-block rounded-md w-10 h-10 text-center leading-[33px] border mr-2 last:mr-0 
              ${currentPage === i + 1 ? "text-white bg-theme border-theme" : "border-gray hover:bg-theme hover:text-white hover:border-theme"}`}
          >
            {i + 1}
          </Link>
        ))}

        {/* Next Button */}
        <Link
          to="#"
          onClick={() => handleClick(currentPage + 1)}
          className={`inline-block rounded-md w-10 h-10 text-center leading-[33px] border border-gray mr-2 last:mr-0 
            ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-theme hover:text-white hover:border-theme"}`}
        >
          &gt;
        </Link>
      </div>
    </div>
  );
}

export default Pagination;
