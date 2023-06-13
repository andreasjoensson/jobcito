"use client";
import React from "react";
import "./JobCard.css";
import Badge from "react-bootstrap/Badge";
import Image from "next/image";

interface JobProps {
  logo: string;
  title: string;
  company: string;
  location: string;
  postedAt: string;
  applyLink: string;
}

export default function Job({
  logo,
  title,
  company,
  location,
  postedAt,
  applyLink,
}: JobProps) {
  return (
    <div>
      <div className="job-container p-3 d-flex align-items-center justify-content-between">
        <div className="job-intro-container d-flex align-items-center">
          <div className="job-logo me-4">
            <Image
              src={logo ? logo : "/logo.png"}
              alt="Firmalogo"
              width={50}
              height={50}
              className="job-logo"
            />
          </div>
          <div className="job-title-container">
            <span className="job-title">
              {title.length > 27 ? `${title.substring(0, 28)}...` : title}
            </span>
            <p>
              {company.length > 18 ? `${company.substring(0, 18)}...` : company}
            </p>
          </div>
        </div>

        <div className="badges-jobs">
          <Badge className="me-2" bg="light" text="dark">
            Fullstack
          </Badge>
          <Badge className="me-2" bg="light" text="dark">
            Machine Learning
          </Badge>
          <Badge bg="light" text="dark">
            Senior Developer
          </Badge>
        </div>
        <div className="location">
          <p className="location-text">{location ? location : "Not known.."}</p>
        </div>

        <div className="posted-at">
          <p className="created-at-text">
            {postedAt ? postedAt : "Not known..."}
          </p>
        </div>

        <div className="apply-link">
          <div className="apply-link-button">
            <a
              className="btn btn-primary purple-btn"
              target="_blank"
              href={applyLink}
            >
              Ansøg
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
