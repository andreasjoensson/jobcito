"use client";
import React from "react";
import "./Job.css";
import Badge from "react-bootstrap/Badge";
import Image from "next/image";

export default function Job({
  logo,
  title,
  company,
  location,
  postedAt,
  applyLink,
}) {
  return (
    <div>
      <div className="job-container">
        <div className="job-logo">
          <Image src={logo} alt="airbnb" width={100} height={100} />
        </div>
        <div className="job-title">
          <h1>{title}</h1>
          <p>{company}</p>
        </div>

        <div className="badges-jobs">
          <Badge bg="light" text="dark">
            Fullstack
          </Badge>
          <Badge bg="light" text="dark">
            Machine Learning
          </Badge>
          <Badge bg="light" text="dark">
            Senior Developer
          </Badge>
        </div>
        <div className="location">
          <h3>Location</h3>
          <p>{location}</p>
        </div>

        <div className="posted-at">
          <h3>Posted at</h3>
          <p>{postedAt}</p>
        </div>

        <div className="apply-link">
          <div className="apply-link-button">
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}
