"use client";
import React from "react";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import { AiOutlineCheck } from "react-icons/ai";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { useEffect } from "react";
import instance from "../../axios/api_instance";
import "./FilterJobs.css";

export default function FilterJobs({ filterJobs, setLoading }) {
  const [fullTime, setFulltime] = useState(false);
  const [partTime, setParttime] = useState(false);
  const [contract, setContract] = useState(false);
  const [internEmployment, setInternEmployment] = useState(false);
  const [seniorLevel, setSeniorLevel] = useState(false);
  const [juniorLevel, setJuniorLevel] = useState(false);
  const [internLevel, setInternLevel] = useState(false);
  const [remote, setRemote] = useState(false);
  const [notRemote, setNotRemote] = useState(false);
  const [chosenSpecialties, setChosenSpecialties] = useState<string[]>([]);
  const [showEmploymentDropdown, setShowEmploymentDropdown] = useState(true);
  const [showSpecialityDropdown, setShowSpecialityDropdown] = useState(false);
  const [showRemoteDropdown, setShowRemoteDropdown] = useState(true);
  const [showSeniorityDropdown, setShowSeniorityDropdown] = useState(true);
  const specialties = [
    "Javascript",
    "React",
    "C#",
    "Typescript",
    ".net",
    "Git",
    "Java",
    "Docker",
    "Html",
    "Kafka",
    "Software development",
    "C++",
    "Rest",
    "Php",
    "Asp.net",
    "Machine learning",
    "Rest apis",
    "Rest api",
    "Mysql",
    "Sap",
    "Agile",
    "Laravel",
    "Mongodb",
    "Postgresql",
    "Graphql",
    "Jira",
    "Devops",
    "Soap",
    "Tailwind",
    "Vue.js",
    "It",
    "Figma",
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
    filterJobs(filterText);
  };

  useEffect(() => {
    setLoading(true);
    // Define your API call function
    const fetchJobs = async () => {
      try {
        const response = await instance.get("/api/jobs/filter", {
          params: {
            fullTime,
            partTime,
            contract,
            internEmployment,
            seniorLevel,
            juniorLevel,
            internLevel,
            remote,
            chosenSpecialties: chosenSpecialties.join(","), // Convert array to comma-separated string
          },
        });

        // Handle the response, e.g., update your state with the filtered jobs
        const filteredJobs = response.data;

        console.log("filteredJobs", filteredJobs);
        filterJobs(filteredJobs);
        setLoading(false);
        // Update your state with the filtered jobs
        // setJobs(filteredJobs);
      } catch (error) {
        setLoading(false);
        // Handle any errors that occur during the API call
        console.error("Error fetching jobs:", error);
      }
    };

    // Call the API whenever any of the state values change
    fetchJobs();
  }, [
    fullTime,
    partTime,
    contract,
    internEmployment,
    seniorLevel,
    juniorLevel,
    internLevel,
    remote,
    chosenSpecialties,
  ]);

  return (
    <div className="container px-4">
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

      <div className="filters-job  job-filter-container">
        <div className="filter-container">
          <h6 className="fw-bold">
            Færdigheder
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
            <ul className="filter-list p-0">
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
        </div>
        <div className="filter-container">
          <h6 className="fw-bold">
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
            <ul className="filter-list p-0">
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
                  {fullTime ? (
                    <AiOutlineCheck />
                  ) : (
                    <span className="p-2"></span>
                  )}
                </ToggleButton>

                <p className="filter-text ms-2">Fuldtid</p>
              </li>

              <li key={2} className="d-flex mb-3 align-items-center">
                <ToggleButton
                  className="filter-checkbox"
                  id="toggle-parttime"
                  type="checkbox"
                  variant="outline-primary"
                  size="sm"
                  checked={partTime}
                  value="1"
                  onChange={(e) => setParttime(e.currentTarget.checked)}
                >
                  {partTime ? (
                    <AiOutlineCheck />
                  ) : (
                    <span className="p-2"></span>
                  )}
                </ToggleButton>

                <p className="filter-text ms-2">Deltid</p>
              </li>

              <li key={3} className="d-flex mb-3 align-items-center">
                <ToggleButton
                  className="filter-checkbox"
                  id="toggle-freelance"
                  type="checkbox"
                  variant="outline-primary"
                  size="sm"
                  checked={contract}
                  value="1"
                  onChange={(e) => setContract(e.currentTarget.checked)}
                >
                  {contract ? (
                    <AiOutlineCheck />
                  ) : (
                    <span className="p-2"></span>
                  )}
                </ToggleButton>

                <p className="filter-text ms-2">Freelance/kontrakt</p>
              </li>

              <li key={4} className="d-flex align-items-center">
                <ToggleButton
                  className="filter-checkbox"
                  id="toggle-internemployment"
                  type="checkbox"
                  size="sm"
                  variant="outline-primary"
                  checked={internEmployment}
                  value="1"
                  onChange={(e) => setInternEmployment(e.currentTarget.checked)}
                >
                  {internEmployment ? (
                    <AiOutlineCheck />
                  ) : (
                    <span className="p-2"></span>
                  )}
                </ToggleButton>
                <p className="filter-text ms-2">Intern</p>
              </li>
            </ul>
          ) : null}
        </div>

        <div className="filter-container">
          <h6 className=" fw-bold">
            Remote{" "}
            {showRemoteDropdown ? (
              <SlArrowUp
                onClick={() => setShowRemoteDropdown(false)}
                className="dropdown-btn"
              />
            ) : (
              <SlArrowDown
                onClick={() => setShowRemoteDropdown(true)}
                className="dropdown-btn"
              />
            )}
          </h6>

          {showRemoteDropdown ? (
            <ul className="filter-list  p-0">
              <li key={1} className="d-flex mb-3 align-items-center">
                <ToggleButton
                  className="filter-checkbox"
                  id="toggle-remote"
                  type="checkbox"
                  variant="outline-primary"
                  checked={remote}
                  size="sm"
                  value="1"
                  onChange={(e) => setRemote(e.currentTarget.checked)}
                >
                  {remote ? <AiOutlineCheck /> : <span className="p-2"></span>}
                </ToggleButton>

                <p className="filter-text ms-2">Yes</p>
              </li>

              <li key={2} className="d-flex mb-3 align-items-center">
                <ToggleButton
                  className="filter-checkbox"
                  id="toggle-remoteoff"
                  type="checkbox"
                  variant="outline-primary"
                  size="sm"
                  checked={notRemote}
                  value="1"
                  onChange={(e) => setNotRemote(e.currentTarget.checked)}
                >
                  {notRemote ? (
                    <AiOutlineCheck />
                  ) : (
                    <span className="p-2"></span>
                  )}
                </ToggleButton>

                <p className="filter-text ms-2">No</p>
              </li>
            </ul>
          ) : null}
        </div>

        <div className="filter-container">
          <h6 className="fw-bold">
            Erfaring{" "}
            {showSeniorityDropdown ? (
              <SlArrowUp
                onClick={() => setShowSeniorityDropdown(false)}
                className="dropdown-btn"
              />
            ) : (
              <SlArrowDown
                onClick={() => setShowSeniorityDropdown(true)}
                className="dropdown-btn"
              />
            )}
          </h6>

          {showSeniorityDropdown ? (
            <ul className="filter-list mt-3 p-0">
              <li key={1} className="d-flex mb-3 align-items-center">
                <ToggleButton
                  className="filter-checkbox"
                  id="toggle-seniorlevel"
                  type="checkbox"
                  variant="outline-primary"
                  checked={seniorLevel}
                  size="sm"
                  value="1"
                  onChange={(e) => setSeniorLevel(e.currentTarget.checked)}
                >
                  {seniorLevel ? (
                    <AiOutlineCheck />
                  ) : (
                    <span className="p-2"></span>
                  )}
                </ToggleButton>

                <p className="filter-text ms-2">Senior</p>
              </li>

              <li key={2} className="d-flex mb-3 align-items-center">
                <ToggleButton
                  className="filter-checkbox"
                  id="toggle-juniorlevel"
                  type="checkbox"
                  variant="outline-primary"
                  size="sm"
                  checked={juniorLevel}
                  value="1"
                  onChange={(e) => setJuniorLevel(e.currentTarget.checked)}
                >
                  {juniorLevel ? (
                    <AiOutlineCheck />
                  ) : (
                    <span className="p-2"></span>
                  )}
                </ToggleButton>

                <p className="filter-text ms-2">Junior</p>
              </li>

              <li key={3} className="d-flex mb-3 align-items-center">
                <ToggleButton
                  className="filter-checkbox"
                  id="toggle-internlevel"
                  type="checkbox"
                  variant="outline-primary"
                  size="sm"
                  checked={internLevel}
                  value="1"
                  onChange={(e) => setInternLevel(e.currentTarget.checked)}
                >
                  {internLevel ? (
                    <AiOutlineCheck />
                  ) : (
                    <span className="p-2"></span>
                  )}
                </ToggleButton>

                <p className="filter-text ms-2">Intern/praktik</p>
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}
