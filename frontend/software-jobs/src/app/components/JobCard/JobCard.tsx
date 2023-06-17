"use client";
import React from "react";
import "./JobCard.css";
import Badge from "react-bootstrap/Badge";
import Image from "next/image";
import { MdOutlineNotInterested } from "react-icons/md";

interface JobProps {
  logo: string | null;
  company: string;
  applyLink: string;
  title: string;
  location: string;
  postedAt: string;
  description: string;
  tags: {
    skills: string[];
    time: string;
    seniority: string | null;
    remote: boolean | null;
  };
}

export default function Job({
  logo,
  title,
  company,
  location,
  postedAt,
  applyLink,
  tags,
  description,
}: JobProps) {
  return (
    <div>
      <div className="job-container p-3 d-flex align-items-center justify-content-between">
        <div className="job-intro-container d-flex align-items-center">
          <div className="job-logo me-4">
            {logo ? (
              <Image
                src={logo}
                alt="Firma logo"
                width={50}
                height={50}
                className="job-logo"
              />
            ) : (
              <MdOutlineNotInterested size={50} />
            )}
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
          {tags.skills ? (
            <div>
              {tags.skills.map((skill, index) => (
                <Badge key={index} bg="light" text="dark" className="me-2">
                  {skill}
                </Badge>
              ))}
            </div>
          ) : null}
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
