"use client";
import React from "react";
import { Container, Button } from "react-bootstrap";
import "./Banner.css";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useState } from "react";

interface BannerProps {
  filterByLocAndCat: (location: string, category: string) => void;
}

export default function Banner({ filterByLocAndCat }: BannerProps) {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const filterJobs = () => {
    filterByLocAndCat(location, category);
  };

  return (
    <Container className="p-4 px-5" fluid={true}>
      <div className="banner mt-3">
        <h1>Find dit drømme job her!</h1>
      </div>

      <div className="search-jobs mt-4">
        <div className="search-jobs-input p-3 d-flex">
          <div className="search-input-container d-flex align-items-center ms-4 me-4">
            <AiOutlineSearch
              color="#8E8E8E"
              size={30}
              className="search-icon"
            />
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Job titel eller søgeord"
              className="search-input p-3 ms-2"
            />
          </div>
          <div className="line-break"></div>
          <div className="search-input-container d-flex align-items-center ms-4 me-4">
            <HiOutlineLocationMarker
              color="#8E8E8E"
              size={30}
              className="search-icon"
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Indtast by"
              className="search-input p-3 ms-2"
            />
          </div>
          <div className="search-button-container ms-auto">
            <button className="search-button" onClick={filterJobs}>
              Søg
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
