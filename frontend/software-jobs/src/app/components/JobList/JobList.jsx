import React from "react";
import JobCard from "../JobCard/JobCard";

export default function JobList({ jobs }) {
  return (
    <div className="pe-4">
      {jobs.map((job) => (
        <JobCard
          logo={job.logo}
          title={job.title}
          company={job.company}
          location={job.location}
          postedAt={job.postedAt}
          applyLink={job.applyLink}
        />
      ))}
    </div>
  );
}
