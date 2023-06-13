import Banner from "./components/Banner/Banner";
import CategoryShowcase from "./components/CategoryShowcase/CategoryShowcase";
import FilterJobs from "./components/FilterJobs/FilterJobs";
import Header from "./components/Header";
import JobList from "./components/JobList/JobList";
import "./page.css";
import instance from "./axios/api_instance";

export default async function Page() {
  const jobs = await getJobs();
  return (
    <div>
      <div className="banner-header pb-4">
        <Header />
        <Banner />
      </div>
      <CategoryShowcase />
      <div className="row mt-5">
        <div className="col-2">
          <div className="filter-container">
            <FilterJobs />
          </div>
        </div>
        <div className="col-10">
          <JobList jobs={jobs} />
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
