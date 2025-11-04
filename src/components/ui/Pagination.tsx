'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  pageSize?: number;
};

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export default function Pagination({ 
  totalPages, 
  currentPage,
  pageSize = 10 
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createPageURL = (pageNumber: number | string, size?: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    if (size) {
      params.set('size', size.toString());
    }
    return `${pathname}?${params.toString()}`;
  };

  const handlePageSizeChange = (newSize: number) => {
    const url = createPageURL(1, newSize); // Reset về trang 1 khi đổi size
    router.push(url);
  };

  // Generate page numbers to display
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 7; // Số trang tối đa hiển thị

    if (totalPages <= maxPagesToShow) {
      // Nếu tổng số trang ít, hiển thị tất cả
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Luôn hiển thị trang đầu
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Hiển thị các trang xung quanh trang hiện tại
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Luôn hiển thị trang cuối
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      {/* Mobile view */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => router.push(createPageURL(currentPage - 1, pageSize))}
          disabled={currentPage <= 1}
          className={clsx(
            'relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700',
            {
              'hover:bg-gray-50': currentPage > 1,
              'cursor-not-allowed opacity-50': currentPage <= 1,
            }
          )}
        >
          Trước
        </button>
        <span className="text-sm text-gray-700">
          Trang {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => router.push(createPageURL(currentPage + 1, pageSize))}
          disabled={currentPage >= totalPages}
          className={clsx(
            'relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700',
            {
              'hover:bg-gray-50': currentPage < totalPages,
              'cursor-not-allowed opacity-50': currentPage >= totalPages,
            }
          )}
        >
          Sau
        </button>
      </div>

      {/* Desktop view */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        {/* Page size selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Hiển thị</span>
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-700">bản ghi/trang</span>
        </div>

        {/* Page navigation */}
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {/* Previous button */}
            <button
              onClick={() => router.push(createPageURL(currentPage - 1, pageSize))}
              disabled={currentPage <= 1}
              className={clsx(
                'relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300',
                {
                  'hover:bg-gray-50': currentPage > 1,
                  'cursor-not-allowed opacity-50': currentPage <= 1,
                }
              )}
            >
              <span className="sr-only">Trước</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Page numbers */}
            {pages.map((page, index) => {
              if (page === '...') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300"
                  >
                    ...
                  </span>
                );
              }

              const pageNumber = page as number;
              const isActive = pageNumber === currentPage;

              return (
                <button
                  key={pageNumber}
                  onClick={() => router.push(createPageURL(pageNumber, pageSize))}
                  className={clsx(
                    'relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300',
                    {
                      'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600':
                        isActive,
                      'text-gray-900 hover:bg-gray-50': !isActive,
                    }
                  )}
                >
                  {pageNumber}
                </button>
              );
            })}

            {/* Next button */}
            <button
              onClick={() => router.push(createPageURL(currentPage + 1, pageSize))}
              disabled={currentPage >= totalPages}
              className={clsx(
                'relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300',
                {
                  'hover:bg-gray-50': currentPage < totalPages,
                  'cursor-not-allowed opacity-50': currentPage >= totalPages,
                }
              )}
            >
              <span className="sr-only">Sau</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
