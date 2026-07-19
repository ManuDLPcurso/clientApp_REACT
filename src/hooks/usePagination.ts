import { useState } from "react";

export function usePagination<T>(data: T[], recordsPerPage:number){
    const [currentPage, setCurrentPage] = useState(1);

    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;

    const currentData = data.slice(firstIndex, lastIndex);
    const totalPage = Math.ceil(data.length / recordsPerPage);

    const pageNumber = [];

    for (let i = 1; i <= totalPage; i++) {
    pageNumber.push(i);
    }   

    return {
        currentPage,
        setCurrentPage,
        currentData,
        pageNumber
    }


}