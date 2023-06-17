"use client";
import Banner from "./components/Banner/Banner";
import CategoryShowcase from "./components/CategoryShowcase/CategoryShowcase";
import FilterJobs from "./components/FilterJobs/FilterJobs";
import Header from "./components/Header/Header";
import JobList from "./components/JobList/JobList";
import "./page.css";
import instance from "./axios/api_instance";
import { useState, useEffect } from "react";
import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineAlert } from "react-icons/ai";

interface Job {
  logo: null | string;
  company: string;
  applyLink: string;
  title: string;
  location: string;
  postedAt: string;
}

export default function Page() {
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [showFilterPhone, setShowFilterPhone] = useState(false);

  const filterJobs = async (category: string) => {
    setLoading(true);
    try {
      const filteredJobs = await getFilteredJobs(category);
      setJobs(filteredJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const filterFromLocationAndCategory = async (
    location: string,
    category: string
  ) => {
    setLoading(true);
    try {
      let filteredJobs = await getJobs();

      if (category) {
        filteredJobs = await getFilteredJobs(category);
      }

      if (location) {
        filteredJobs = filteredJobs.filter(
          (job: Job) => job.location === location
        );
      }

      setJobs(filteredJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedJobs = await getJobs();
        setJobs(fetchedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="banner-header pb-4">
        <Header />
        <Banner filterByLocAndCat={filterFromLocationAndCategory} />
      </div>
      <CategoryShowcase filter={filterJobs} />
      <div className="row jobs-container mx-auto mt-5">
        <div className="col-xs-12 col-sm-12 col-md-2">
          <div className="filter-container">
            <FilterJobs
              filterJobs={setJobs}
              showMobile={showFilterPhone}
              setMobile={setShowFilterPhone}
              setLoading={setLoading}
            />
            <div className="filter-jobs-mobile d-flex d-block d-sm-none justify-content-evenly">
              <button
                onClick={() => setShowFilterPhone(!showFilterPhone)}
                className="btn custom-btn btn-outline-primary"
              >
                {" "}
                <AiOutlineFilter
                  className="filter-btn-icon"
                  color="#2725ce"
                />{" "}
                Filtrer jobs
              </button>

              <button className="btn custom-btn btn-outline-primary">
                {" "}
                <AiOutlineAlert
                  className="filter-btn-icon"
                  color="#2725ce"
                />{" "}
                Opret alarm
              </button>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-10">
          {isLoading && (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {jobs && !isLoading ? <JobList jobs={jobs} /> : null}
        </div>
      </div>
    </div>
  );
}

async function getJobs() {
  try {
    const response = await instance.get("/api/jobs"); // Replace with your API endpoint
    const jobs = response.data; // Assuming your API response is an array of jobs

    return jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

async function getFilteredJobs(category: String) {
  try {
    const response = await instance.get("/api/jobs", {
      params: {
        category: category,
      },
    }); // Replace with your API endpoint
    const jobs = response.data; // Assuming your API response is an array of jobs

    return jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}
