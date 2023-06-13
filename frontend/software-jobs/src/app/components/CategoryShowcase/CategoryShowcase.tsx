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
      <Badge bg="light" text="dark">
        Fullstack
      </Badge>
      <Badge bg="light" text="dark">
        Machine Learning
      </Badge>
      <Badge bg="light" text="dark">
        Senior Developer
      </Badge>
      <Badge bg="light" text="dark">
        Junior Developer
      </Badge>
      <Badge bg="light" text="dark">
        Frontend
      </Badge>
      <Badge bg="light" text="dark">
        Backend
      </Badge>
      <Badge bg="light" text="dark">
        Cloud
      </Badge>

      <Badge bg="light" text="dark">
        Fullstack
      </Badge>
      <Badge bg="light" text="dark">
        .NET
      </Badge>
      <Badge bg="light" text="dark">
        Java
      </Badge>
      <Badge bg="light" text="dark">
        Python
      </Badge>
      <Badge bg="light" text="dark">
        C#
      </Badge>
      <Badge bg="light" text="dark">
        Embedded systems
      </Badge>
      <Badge bg="light" text="dark">
        React
      </Badge>
      <Badge bg="light" text="dark">
        Next JS
      </Badge>
      <Badge bg="light" text="dark">
        Angular
      </Badge>
      <Badge bg="light" text="dark">
        Vue
      </Badge>
    </div>
  );
}
