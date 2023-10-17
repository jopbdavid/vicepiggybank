import React from "react";
import { formatPrice } from "../utils/extras";
import cost from "../assets/cost.svg";
import estimate from "../assets/estimate.svg";
import calendar from "../assets/calendar.svg";

const Dashboard = ({ costWeek, costMonth, costYear }) => {
  return (
    <>
      <div className="flex justify-left w-2/3 mx-auto  border-slate-800   mt-12">
        <h1 className="text-xl font-mono  text-slate-900 ">Projected Cost:</h1>
      </div>
      <div className="mt-16 flex gap-x-10 justify-center">
        <div className="stats shadow w-3/4 bg-emerald-100 h-56">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <img src={cost} alt="weeklycost" className="w-16 h-16" />
            </div>
            <div className="stat-title">Cost / Week</div>
            <div className="stat-value">{formatPrice(costWeek)}</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <img src={estimate} alt="weeklycost" className="w-14 h-14" />
            </div>
            <div className="stat-title">Cost / Month</div>
            <div className="stat-value">{formatPrice(costMonth)}</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <img src={calendar} alt="weeklycost" className="w-16 h-16" />
            </div>
            <div className="stat-title">Cost / Year</div>
            <div className="stat-value">{formatPrice(costYear)}</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>
      <div className="flex justify-left w-2/3 mx-auto  border-slate-800   mt-12">
        <h1 className="text-xl font-mono  text-slate-900 ">
          Real Cost (year to date):
        </h1>
      </div>
      <div className="mt-16 flex gap-x-10 justify-center">
        <div className="stats shadow w-3/4 bg-emerald-100 h-56">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <img src={cost} alt="weeklycost" className="w-16 h-16" />
            </div>
            <div className="stat-title">Cost / Week</div>
            <div className="stat-value">{formatPrice(costWeek)}</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <img src={estimate} alt="weeklycost" className="w-14 h-14" />
            </div>
            <div className="stat-title">Cost / Month</div>
            <div className="stat-value">{formatPrice(costMonth)}</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <img src={calendar} alt="weeklycost" className="w-16 h-16" />
            </div>
            <div className="stat-title">Cost / Year</div>
            <div className="stat-value">{formatPrice(costYear)}</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
