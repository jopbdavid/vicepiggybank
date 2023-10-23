import React, { useState, useEffect } from "react";
import { formatPrice } from "../utils/extras";
import weekIcon from "../assets/week.png";
import monthIcon from "../assets/month.png";
import yearIcon from "../assets/year.png";
import axios from "axios";
import { useNavigation, useLoaderData, useLocation } from "react-router-dom";

export const editItem = async (itemId, projectedWeeklyUnits) => {
  try {
    const units = {
      projectedWeeklyUnits: projectedWeeklyUnits,
    };
    const response = await axios.post(
      `/.netlify/functions/editItem?id=${itemId}`,
      units
    );

    const data = response.data;

    return data;
  } catch (error) {
    return { error: "Error making request" };
  }
};

const Dashboard = () => {
  const [projectedWeeklyUnits, setProjectedWeeklyUnits] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { id, qntWeek, costWeek, costMonth, costYear } = useLoaderData();

  const [week, setWeek] = useState(costWeek);
  const [month, setMonth] = useState(costMonth);
  const [year, setYear] = useState(costYear);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const weekCostResult = week - 30;
  const monthCostResult = month - 150;
  const yearCostResult = year - 800;
  const weekCostPercentage = (30 / week - 1) * 100;
  const monthCostPercentage = month / 150;
  const yearCostPercentage = year / 800;

  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    setProjectedWeeklyUnits(e.target.value);
  };

  const handleClick = async () => {
    try {
      console.log(id, projectedWeeklyUnits);
      const updatedItem = await editItem(id, projectedWeeklyUnits);

      if (updatedItem) {
        setIsSuccess(true);
        setProjectedWeeklyUnits("");
        setWeek(updatedItem.costWeek);
        setMonth(updatedItem.costMonth);
        setYear(updatedItem.costYear);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h4 className="font-medium text-xl capitalize">Projected Consumption:</h4>
      <div className="flex flex-row gap-y-2 gap-x-2">
        <div className="form-control w-1/3">
          <label htmlFor="units" className="label">
            <span className="label-text capitalize">Units / week:</span>
          </label>
          <input
            type="number"
            name="units"
            defaultValue=""
            value={projectedWeeklyUnits}
            className={`input input-bordered sm`}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="mt-4 w-1/2 m-auto">
        <button
          type="button"
          className="btn btn-primary btn-block "
          disabled={isSubmitting}
          onClick={handleClick}
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner"></span>
              Submitting...
            </>
          ) : (
            "Update"
          )}
        </button>
      </div>

      {isSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 mb-42">
          <div className="alert alert-success w-2/3 m-auto p-8 rounded-lg shadow-lg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xl capitalize">
              Your entry was added successfully!
            </span>
          </div>
        </div>
      )}
      <div className=" flex justify-left w-2/3 mx-auto mt-20">
        <div className="tabs tabs-boxed w-full">
          <a className="tab tab-active w-1/2">
            <h1 className=" font-mono  text-slate-200 text-2xl">
              Projected Cost:
            </h1>
          </a>
        </div>
      </div>
      <div className=" flex gap-x-10 justify-center">
        <div className="stats shadow w-3/4 bg-emerald-100 h-36">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <img src={weekIcon} alt="weeklycost" className="w-14 h-14" />
            </div>
            <div className="stat-title">Cost / Week</div>
            <div className="stat-value">{formatPrice(week)}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <img src={monthIcon} alt="monthlycost" className="w-14 h-14" />
            </div>
            <div className="stat-title">Cost / Month</div>
            <div className="stat-value">{formatPrice(month)}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <img src={yearIcon} alt="yearlycost" className="w-14 h-14" />
            </div>
            <div className="stat-title">Cost / Year</div>
            <div className="stat-value">{formatPrice(year)}</div>
          </div>
        </div>
      </div>
      <div className=" flex justify-left w-2/3 mx-auto mt-10">
        <div className="tabs tabs-boxed w-full">
          <a className="tab tab-active w-1/2">
            <h1 className=" font-mono  text-slate-200 text-2xl">
              Real Cost (year to date):
            </h1>
          </a>
        </div>
      </div>

      <div className="flex gap-x-10 justify-center">
        <div className="stats shadow w-3/4 bg-emerald-100 h-36">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <img src={weekIcon} alt="weeklycost" className="w-14 h-14" />
            </div>
            <div className="stat-title">Cost / Week</div>
            <div className="stat-value">{formatPrice(week)}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <img src={monthIcon} alt="monthlycost" className="w-14 h-14" />
            </div>
            <div className="stat-title">Cost / Month</div>
            <div className="stat-value">{formatPrice(month)}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <img src={yearIcon} alt="yearlycost" className="w-14 h-14" />
            </div>
            <div className="stat-title">Cost / Year</div>
            <div className="stat-value">{formatPrice(year)}</div>
          </div>
        </div>
      </div>
      <div className=" flex justify-left w-2/3 mx-auto mt-10">
        <div className="tabs tabs-boxed w-full">
          <a className="tab tab-active w-1/2">
            <h1 className=" font-mono  text-slate-200 text-2xl">Results:</h1>
          </a>
        </div>
      </div>
      <div className="flex gap-x-10 justify-center">
        <div className="stats shadow w-3/4 bg-emerald-100 h-28">
          <div className="stat">
            <div
              className={`stat-value ${
                weekCostResult <= 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              {formatPrice(weekCostResult)}
            </div>
            <div className="stat-desc">
              ↘︎ 90 ({weekCostPercentage.toFixed(2)}%)
            </div>
          </div>

          <div className="stat">
            <div
              className={`stat-value ${
                monthCostResult <= 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              {formatPrice(monthCostResult)}
            </div>
            <div className="stat-desc">↘︎ 90 ({monthCostPercentage}%)</div>
          </div>

          <div className="stat">
            <div
              className={`stat-value ${
                yearCostResult <= 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              {formatPrice(yearCostResult)}
            </div>
            <div className="stat-desc">↘︎ 90 ({yearCostPercentage}%)</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
