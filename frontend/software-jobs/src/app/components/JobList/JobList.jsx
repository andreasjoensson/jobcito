"use client";
import React from "react";
import JobCard from "../JobCard/JobCard";
import { useState } from "react";
import "./JobList.css";
import Pagination from "react-bootstrap/Pagination";

export default function JobList({ jobs }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Array.from(
    { length: jobs.length / 9 },
    (_, index) => index + 1
  );
  const [currentJobs, setCurrentJobs] = useState(jobs.slice(0, 9));

  const nextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
      setCurrentJobs(jobs.slice(currentPage * 9, currentPage * 9 + 9));
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setCurrentJobs(
        jobs.slice((currentPage - 2) * 9, (currentPage - 2) * 9 + 9)
      );
    }
  };

  const changePage = (page) => {
    setCurrentPage(page);
    setCurrentJobs(jobs.slice((page - 1) * 9, (page - 1) * 9 + 9));
  };

  return (
    <div className="pe-4">
      {currentJobs.length == 0 && (
        <h3 className="mt-3">Ingen jobs er fundet...</h3>
      )}

      {currentJobs.map((job, i) => (
        <JobCard
          key={i}
          logo={job.logo}
          title={job.title}
          company={job.company}
          location={job.location}
          postedAt={job.postedAt}
          applyLink={job.applyLink}
          tags={job.tags}
          description={job.description}
        />
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
