"use client";
import React from "react";
import { Container, Button } from "react-bootstrap";
import "./Banner.css";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";

export default function Banner() {
  return (
    <Container className="p-4 px-5" fluid={true}>
      <div className="banner mt-3">
        <h1>Find your dream job here!</h1>
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
              placeholder="Job title or keyword"
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
              placeholder="Add country or city"
              className="search-input p-3 ms-2"
            />
          </div>
          <div className="search-button-container ms-auto">
            <button className="search-button">Search</button>
          </div>
        </div>
      </div>
    </Container>
  );
}
