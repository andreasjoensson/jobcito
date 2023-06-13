"use client";
import React from "react";
import "./CategoryShowcase.css";
import Badge from "react-bootstrap/Badge";
import { useRef, WheelEvent } from "react";

export default function CategoryShowcase({ filter }) {
  const containerRef = useRef<HTMLMainElement>(null);

  const handleScroll = (evt: WheelEvent<HTMLMainElement>) => {
    const scrollAmount = evt.deltaY;
    const container = containerRef.current;
    if (container) {
      container.scrollLeft += scrollAmount;
    }
  };

  const badges = [
    "Fullstack",
    "Machine Learning",
    "Senior Developer",
    "Junior Developer",
    "Frontend",
    "Backend",
    "Cloud",
    "Fullstack",
    ".NET",
    "Java",
    "Python",
    "C#",
    "Embedded systems",
    "React",
    "Next JS",
    "Angular",
    "Vue",
  ];

  return (
    <div
      className="badge-container mb-3 mt-3"
      ref={containerRef}
      onWheel={handleScroll}
    >
      {badges.map((badge, index) => (
        <Badge onClick={() => filter(badge)} key={index} bg="white" text="dark">
          {badge}
        </Badge>
      ))}
    </div>
  );
}
