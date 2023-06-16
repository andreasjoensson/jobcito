"use client";
import React from "react";
import "./companylist.css";
import CompanyCard from "../CompanyCard.tsx/CompanyCard";
import { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

export default function CompanyList({ companies }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Array.from(
    { length: companies.length / 9 },
    (_, index) => index + 1
  );
  const [currentcompanies, setCurrentcompanies] = useState(
    companies.slice(0, 9)
  );

  const nextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
      setCurrentcompanies(
        companies.slice(currentPage * 9, currentPage * 9 + 9)
      );
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setCurrentcompanies(
        companies.slice((currentPage - 2) * 9, (currentPage - 2) * 9 + 9)
      );
    }
  };

  const changePage = (page) => {
    setCurrentPage(page);
    setCurrentcompanies(companies.slice((page - 1) * 9, (page - 1) * 9 + 9));
  };

  return (
    <div className="pe-4">
      {currentcompanies.map((company, i) => (
        <CompanyCard key={i} name={company.name} logo={company.logo} />
      ))}

      <Pagination className="mt-5">
        <Pagination.Prev disabled={currentPage == 1} onClick={prevPage} />
        {pages.map((page, i) => (
          <Pagination.Item
            key={i}
            color="#2524D1"
            active={currentPage == page}
            onClick={() => changePage(page)}
          >
            {page}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={currentPage == pages[pages.length - 1]}
          onClick={nextPage}
        />
      </Pagination>
    </div>
  );
}
