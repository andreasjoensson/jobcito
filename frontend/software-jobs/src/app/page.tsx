"use client";
import Banner from "./components/Banner/Banner";
import CategoryShowcase from "./components/CategoryShowcase/CategoryShowcase";
import FilterJobs from "./components/FilterJobs/FilterJobs";
import Header from "./components/Header";
import JobList from "./components/JobList/JobList";
import "./page.css";
import instance from "./axios/api_instance";
import { useState, useEffect } from "react";

export default async function Page() {
  const [jobs, setJobs] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const filterJobs = async (category: String) => {
    const filteredJobs = await getFilteredJobs(category);
    console.log("filteredJobs", filteredJobs);
    setJobs(filteredJobs);
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const jobs = await getJobs();
      setJobs(jobs);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!jobs) return <p>No profile data</p>;

  return (
    <div>
      <div className="banner-header pb-4">
        <Header />
        <Banner />
      </div>
      <CategoryShowcase filter={filterJobs} />
      <div className="row mt-5">
        <div className="col-2">
          <div className="filter-container">
            <FilterJobs />
          </div>
        </div>
        <div className="col-10">
          {isLoading ? <p>loadding...</p> : <JobList jobs={jobs} />}
        </div>
      </div>
    </div>
  );
}

export async function getJobs() {
  try {
    const response = await instance.get("/api/jobs"); // Replace with your API endpoint
    const jobs = response.data; // Assuming your API response is an array of jobs
    console.log("response", response.data);

    return jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

export async function getFilteredJobs(category: String) {
  try {
    const response = await instance.get("/api/jobs", {
      params: {
        category: category,
      },
    }); // Replace with your API endpoint
    const jobs = response.data; // Assuming your API response is an array of jobs
    console.log("response", response.data);

    return jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}
