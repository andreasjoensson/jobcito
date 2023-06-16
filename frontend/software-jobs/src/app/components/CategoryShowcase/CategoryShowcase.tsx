"use client";
import React from "react";
import "./CategoryShowcase.css";
import Badge from "react-bootstrap/Badge";
import { useRef, WheelEvent, useState } from "react";

export default function CategoryShowcase({ filter }) {
  const containerRef = useRef<HTMLMainElement>(null);
  const [chosenCategory, setChosenCategory] = useState("");

  const handleScroll = (evt: WheelEvent<HTMLMainElement>) => {
    const scrollAmount = evt.deltaY;
    const container = containerRef.current;
    if (container) {
      container.scrollLeft += scrollAmount;
    }
  };

  const chooseCategory = (category: string) => {
    if (chosenCategory == category) {
      setChosenCategory("");
      filter("");
    } else {
      setChosenCategory(category);
      filter(category);
    }
  };

  const badges = [
    "C#",
    "javascript",
    ".NET",
    "react",
    "git",
    "software development",
    "Kubernetes",
    "Java",
    "SQL",
    "React",
    "typescript",
    "python",
    "Docker",
    "JavaScript",
    ".NET Core",
    "java",
    "Angular",
    "machine learning",
    "SAP",
    "Azure",
    "Python",
    "angular",
    "agile",
    "docker",
    "CSS",
    "AWS",
    "C++",
    "c#",
    "Git",
    "REST",
    "DevOps",
    "TypeScript",
    "Kafka",
    "HTML",
    "Typescript",
    "aws",
    "IT",
    "softwareudvikling",
  ];

  return (
    <div
      className="badge-container mb-3 mt-3"
      ref={containerRef}
      onWheel={handleScroll}
    >
      {badges.map((badge, index) => (
        <Badge
          onClick={() => chooseCategory(badge)}
          key={index}
          bg={chosenCategory == badge ? "blue" : "white"}
        >
          {badge}
        </Badge>
      ))}
    </div>
  );
}
