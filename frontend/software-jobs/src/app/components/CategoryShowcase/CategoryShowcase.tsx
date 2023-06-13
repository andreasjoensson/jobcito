"use client";
import React from "react";
import "./CategoryShowcase.css";
import Badge from "react-bootstrap/Badge";
import { useRef, WheelEvent } from "react";

export default function CategoryShowcase() {
  const containerRef = useRef<HTMLMainElement>(null);

  const handleScroll = (evt: WheelEvent<HTMLMainElement>) => {
    const scrollAmount = evt.deltaY;
    const container = containerRef.current;
    if (container) {
      container.scrollLeft += scrollAmount;
    }
  };

  return (
    <div
      className="badge-container mb-3 mt-3"
      ref={containerRef}
      onWheel={handleScroll}
    >
      <Badge bg="white" text="dark">
        Fullstack
      </Badge>
      <Badge bg="white" text="dark">
        Machine Learning
      </Badge>
      <Badge bg="white" text="dark">
        Senior Developer
      </Badge>
      <Badge bg="white" text="dark">
        Junior Developer
      </Badge>
      <Badge bg="white" text="dark">
        Frontend
      </Badge>
      <Badge bg="white" text="dark">
        Backend
      </Badge>
      <Badge bg="white" text="dark">
        Cloud
      </Badge>

      <Badge bg="white" text="dark">
        Fullstack
      </Badge>
      <Badge bg="white" text="dark">
        .NET
      </Badge>
      <Badge bg="white" text="dark">
        Java
      </Badge>
      <Badge bg="white" text="dark">
        Python
      </Badge>
      <Badge bg="white" text="dark">
        C#
      </Badge>
      <Badge bg="white" text="dark">
        Embedded systems
      </Badge>
      <Badge bg="white" text="dark">
        React
      </Badge>
      <Badge bg="white" text="dark">
        Next JS
      </Badge>
      <Badge bg="white" text="dark">
        Angular
      </Badge>
      <Badge bg="white" text="dark">
        Vue
      </Badge>
    </div>
  );
}
