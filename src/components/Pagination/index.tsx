import './index.scss';

type PaginationItem = number | 'start-gap' | 'end-gap';

function getPaginationItems(currentPage: number, totalPages: number): PaginationItem[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) return [1, 2, 3, 'end-gap', totalPages];
  if (currentPage >= totalPages - 2) {
    return [1, 'start-gap', totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, 'start-gap', currentPage, 'end-gap', totalPages];
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  label?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, label = 'Pagination' }: PaginationProps) {
  return (
            <nav className="pagination" aria-label={label}>
              <button className="pagination__page" type="button" aria-label="Previous page" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                ‹
              </button>
              {getPaginationItems(currentPage, totalPages).map((item) => (
                typeof item === 'number' ? (
                  <button className="pagination__page" type="button" key={item} aria-label={`Page ${item}`} aria-current={currentPage === item ? 'page' : undefined} onClick={() => onPageChange(item)}>
                    {item}
                  </button>
                ) : (
                  <span className="pagination__ellipsis" key={item} aria-hidden="true">…</span>
                )
              ))}
              <button className="pagination__page" type="button" aria-label="Next page" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
                ›
              </button>
            </nav>
  );
}

