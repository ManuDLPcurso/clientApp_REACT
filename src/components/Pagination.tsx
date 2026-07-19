interface PaginationProps { 
    pageNumber: number[];
    currentPage: number;
    setCurrentPage: (page:number)=>void;
}

export default function Pagination({
    pageNumber,
    currentPage,
    setCurrentPage
}:PaginationProps) {
    return(
        <div className="pagination">
            {pageNumber.map((page) => (
                <button
                    key={page}
                    className={
                        page === currentPage
                        ? "btn btn-primary mx-1"
                        : "btn btn-outline-primary mx-1"
                    }
                    onClick={() => setCurrentPage(page)}
                >
                {page}
                </button>
            ))}
        </div>
    )
}