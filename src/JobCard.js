import React from "react";
import "./JobCard.css";

/** JobCard: displays job details.
 *
 *  Prop:
 *  - job: {title, salary, equity, companyName} or {title, salary, equity}
 *
 *  JobCardList -> JobCard
 */
function JobCard({ job }) {
  return (
    <div className="JobCard">
      {job.companyName === undefined ? (
        <div className="job-card">
          <h2>{job.title}</h2>
          <h6> Salary: {job.salary}</h6>
          <h6>Equity: {job.equity}</h6>
        </div>
      ) : (
        <div className="job-card">
          <h2>{job.title}</h2>
          <h2>{job.companyName}</h2>
          <h6>Salary: {job.salary}</h6>
          <h6>Equity :{job.equity}</h6>
        </div>
      )}
    </div>
  );
}
export default JobCard;
