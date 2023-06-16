"use client";
import React from "react";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import { AiOutlineCheck } from "react-icons/ai";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import "./FilterJobs.css";

export default function FilterJobs({ filter }) {
  const [fullTime, setFulltime] = useState(false);
  const [seniorLevel, setSeniorLevel] = useState(false);
  const [remote, setRemote] = useState(false);
  const [contract, setContract] = useState(false);
  const [chosenSpecialties, setChosenSpecialties] = useState<string[]>([]);
  const [showEmploymentDropdown, setShowEmploymentDropdown] = useState(true);
  const [showSpecialityDropdown, setShowSpecialityDropdown] = useState(false);
  const [showRemoteDropdown, setShowRemoteDropdown] = useState(true);
  const [showSeniorityDropdown, setShowSeniorityDropdown] = useState(true);
  const specialties = [
    "Java",
    "JavaScript",
    "Python",
    ".NET",
    "Machine Learning",
    "Ruby",
    "C++",
    "React",
    "Angular",
    "Node.js",
    "PHP",
    "Go",
    "Swift",
    "TypeScript",
    "SQL",
    "HTML/CSS",
    "Android",
    "iOS",
    "DevOps",
    "Data Science",
    "Blockchain",
    "Cloud Computing",
    "UI/UX Design",
    "Front-end Development",
    "Back-end Development",
    "Mobile App Development",
    "Game Development",
    "Cybersecurity",
    "Big Data",
    "Artificial Intelligence",
    "Embedded Systems",
  ];

  const handleSpecialtyToggle = (e, specialty) => {
    const isChecked = e.currentTarget.checked;

    if (isChecked) {
      setChosenSpecialties((prevSelected) => [...prevSelected, specialty]);
    } else {
      setChosenSpecialties((prevSelected) =>
        prevSelected.filter((selected) => selected !== specialty)
      );
    }
  };

  const filterList = (e) => {
    e.preventDefault();
    const filterText = e.target.value.toLowerCase();
    filter(filterText);
  };

  return (
    <div className="container job-filter-container px-4">
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="fw-bold">Filter</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => filterList(e)}
            placeholder="Company,skill,tag..."
          />
        </Form.Group>
      </Form>

      <h6 className="mt-5 fw-bold">
        Speciality
        {showSpecialityDropdown ? (
          <SlArrowUp
            onClick={() => setShowSpecialityDropdown(false)}
            className="dropdown-btn"
          />
        ) : (
          <SlArrowDown
            onClick={() => setShowSpecialityDropdown(true)}
            className="dropdown-btn"
          />
        )}
      </h6>

      {showSpecialityDropdown ? (
        <ul className="filter-list mt-3 p-0">
          {specialties.map((specialty, index) => (
            <li key={index} className="d-flex mb-3 align-items-center">
              <ToggleButton
                className="filter-checkbox"
                id={`toggle-${specialty}`}
                checked={chosenSpecialties.includes(specialty)}
                type="checkbox"
                variant="outline-primary"
                size="sm"
                value={specialty}
                onChange={(e) => handleSpecialtyToggle(e, specialty)}
              >
                {chosenSpecialties.includes(specialty) ? (
                  <AiOutlineCheck />
                ) : (
                  <span className="p-2"></span>
                )}
              </ToggleButton>
              <p className="filter-text ms-2">{specialty}</p>
            </li>
          ))}
        </ul>
      ) : null}

      <h6 className="mt-5 fw-bold">
        Ansættelse{" "}
        {showEmploymentDropdown ? (
          <SlArrowUp
            onClick={() => setShowEmploymentDropdown(false)}
            className="dropdown-btn"
          />
        ) : (
          <SlArrowDown
            onClick={() => setShowEmploymentDropdown(true)}
            className="dropdown-btn"
          />
        )}
      </h6>

      {showEmploymentDropdown ? (
        <ul className="filter-list mt-3 p-0">
          <li key={1} className="d-flex mb-3 align-items-center">
            <ToggleButton
              className="filter-checkbox"
              id="toggle-fulltime"
              type="checkbox"
              variant="outline-primary"
              checked={fullTime}
              size="sm"
              value="1"
              onChange={(e) => setFulltime(e.currentTarget.checked)}
            >
              {fullTime ? <AiOutlineCheck /> : <span className="p-2"></span>}
            </ToggleButton>

            <p className="filter-text ms-2">Fuldtid</p>
          </li>

          <li key={2} className="mt-3 d-flex mb-3 align-items-center">
            <ToggleButton
              className="filter-checkbox"
              id="toggle-seniorlevel"
              type="checkbox"
              variant="outline-primary"
              size="sm"
              checked={seniorLevel}
              value="1"
              onChange={(e) => setSeniorLevel(e.currentTarget.checked)}
            >
              {seniorLevel ? <AiOutlineCheck /> : <span className="p-2"></span>}
            </ToggleButton>

            <p className="filter-text ms-2">Deltid</p>
          </li>

          <li key={3} className="mt-3 d-flex mb-3 align-items-center">
            <ToggleButton
              className="filter-checkbox"
              id="toggle-seniorlevel"
              type="checkbox"
              variant="outline-primary"
              size="sm"
              checked={seniorLevel}
              value="1"
              onChange={(e) => setSeniorLevel(e.currentTarget.checked)}
            >
              {seniorLevel ? <AiOutlineCheck /> : <span className="p-2"></span>}
            </ToggleButton>

            <p className="filter-text ms-2">Freelance/kontrakt</p>
          </li>

          <li key={4} className="mt-3 d-flex align-items-center">
            <ToggleButton
              className="filter-checkbox"
              id="toggle-remote"
              type="checkbox"
              size="sm"
              variant="outline-primary"
              checked={remote}
              value="1"
              onChange={(e) => setRemote(e.currentTarget.checked)}
            >
              {remote ? <AiOutlineCheck /> : <span className="p-2"></span>}
            </ToggleButton>
            <p className="filter-text ms-2">Intern</p>
          </li>
        </ul>
      ) : null}

      <h6 className="mt-5 fw-bold">
        Remote/fjernarbejde{" "}
        {showEmploymentDropdown ? (
          <SlArrowUp
            onClick={() => setShowEmploymentDropdown(false)}
            className="dropdown-btn"
          />
        ) : (
          <SlArrowDown
            onClick={() => setShowEmploymentDropdown(true)}
            className="dropdown-btn"
          />
        )}
      </h6>

      {showRemoteDropdown ? (
        <ul className="filter-list mt-3 p-0">
          <li key={1} className="d-flex mb-3 align-items-center">
            <ToggleButton
              className="filter-checkbox"
              id="toggle-fulltime"
              type="checkbox"
              variant="outline-primary"
              checked={fullTime}
              size="sm"
              value="1"
              onChange={(e) => setFulltime(e.currentTarget.checked)}
            >
              {fullTime ? <AiOutlineCheck /> : <span className="p-2"></span>}
            </ToggleButton>

            <p className="filter-text ms-2">Yes</p>
          </li>

          <li key={2} className="mt-3 d-flex mb-3 align-items-center">
            <ToggleButton
              className="filter-checkbox"
              id="toggle-seniorlevel"
              type="checkbox"
              variant="outline-primary"
              size="sm"
              checked={seniorLevel}
              value="1"
              onChange={(e) => setSeniorLevel(e.currentTarget.checked)}
            >
              {seniorLevel ? <AiOutlineCheck /> : <span className="p-2"></span>}
            </ToggleButton>

            <p className="filter-text ms-2">No</p>
          </li>
        </ul>
      ) : null}

      <h6 className="mt-5 fw-bold">
        Erfaring{" "}
        {showEmploymentDropdown ? (
          <SlArrowUp
            onClick={() => setShowEmploymentDropdown(false)}
            className="dropdown-btn"
          />
        ) : (
          <SlArrowDown
            onClick={() => setShowEmploymentDropdown(true)}
            className="dropdown-btn"
          />
        )}
      </h6>

      {showSeniorityDropdown ? (
        <ul className="filter-list mt-3 p-0">
          <li key={1} className="d-flex mb-3 align-items-center">
            <ToggleButton
              className="filter-checkbox"
              id="toggle-fulltime"
              type="checkbox"
              variant="outline-primary"
              checked={fullTime}
              size="sm"
              value="1"
              onChange={(e) => setFulltime(e.currentTarget.checked)}
            >
              {fullTime ? <AiOutlineCheck /> : <span className="p-2"></span>}
            </ToggleButton>

            <p className="filter-text ms-2">Senior</p>
          </li>

          <li key={2} className="mt-3 d-flex mb-3 align-items-center">
            <ToggleButton
              className="filter-checkbox"
              id="toggle-seniorlevel"
              type="checkbox"
              variant="outline-primary"
              size="sm"
              checked={seniorLevel}
              value="1"
              onChange={(e) => setSeniorLevel(e.currentTarget.checked)}
            >
              {seniorLevel ? <AiOutlineCheck /> : <span className="p-2"></span>}
            </ToggleButton>

            <p className="filter-text ms-2">Junior</p>
          </li>

          <li key={3} className="mt-3 d-flex mb-3 align-items-center">
            <ToggleButton
              className="filter-checkbox"
              id="toggle-seniorlevel"
              type="checkbox"
              variant="outline-primary"
              size="sm"
              checked={seniorLevel}
              value="1"
              onChange={(e) => setSeniorLevel(e.currentTarget.checked)}
            >
              {seniorLevel ? <AiOutlineCheck /> : <span className="p-2"></span>}
            </ToggleButton>

            <p className="filter-text ms-2">Ikke skrevet</p>
          </li>
        </ul>
      ) : null}
    </div>
  );
}
