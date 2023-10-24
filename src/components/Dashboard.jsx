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
  const { id, qntWeek, costWeek, costMonth, costYear, sumItems, sumCost } =
    useLoaderData();

  const [projectedWeeklyUnits, setProjectedWeeklyUnits] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [week, setWeek] = useState(costWeek);
  const [month, setMonth] = useState(costMonth);
  const [year, setYear] = useState(costYear);
  const [units, setUnits] = useState(qntWeek);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const weekUnitsResult = units * 4.5 * 12 - sumItems;
  const weekUnitsPercentage = (sumItems / (units * 4.5 * 12)) * 100;

  const yearCostResult = year - sumCost;

  const yearCostPercentage = (sumCost / year) * 100;

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
        setUnits(updatedItem.qntWeek);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="shadow  bg-slate-50 h-38 m-auto rounded-lg pb-2 w-full">
        <h4 className="font-medium text-l capitalize text-center mt-10">
          Insert Number of Units:
        </h4>
        <div className="flex flex-row justify-between items-center mx-auto ">
          <div className="form-control mx-auto w-1/4 mt-2">
            {/* <label htmlFor="units" className="label">
              <span className="label-text capitalize">
                Insert numbers of units to be consumed per week:
              </span>
            </label> */}
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
        <div className=" w-1/4 m-auto">
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
              Number of units updated successfully!
            </span>
          </div>
        </div>
      )}
      <div className=" flex justify-left w-2/3 mx-auto mt-20">
        <div className="tabs tabs-boxed w-full">
          <a className="tab tab-active w-1/2">
            <h1 className=" font-mono  text-slate-200 text-xl">
              Projected Cost:
            </h1>
          </a>
        </div>
      </div>
      <div className=" flex gap-x-10 justify-center">
        <div className="stats shadow w-3/4 bg-emerald-100 h-38">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <img src={weekIcon} alt="weeklycost" className="w-10 h-10" />
            </div>
            <div className="stat-title">Cost / Week</div>
            <div className="stat-value">{formatPrice(week)}</div>
            <div className="stat-desc">
              <div className="stat-title">Units / Week</div>
              <div className="stat-value">{units}</div>
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <img src={monthIcon} alt="monthlycost" className="w-10 h-10" />
            </div>
            <div className="stat-title">Cost / Month</div>
            <div className="stat-value">{formatPrice(month)}</div>
            <div className="stat-desc">
              <div className="stat-title">Units / Month</div>
              <div className="stat-value">{units * 4.5}</div>
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <img src={yearIcon} alt="yearlycost" className="w-10 h-10" />
            </div>
            <div className="stat-title">Cost / Year</div>
            <div className="stat-value">{formatPrice(year)}</div>
            <div className="stat-desc">
              <div className="stat-title">Units / Year</div>
              <div className="stat-value">{units * 4.5 * 12}</div>
            </div>
          </div>
        </div>
      </div>

      {/* RESULTS */}

      <div className=" flex justify-left w-2/3 mx-auto mt-10">
        <div className="tabs tabs-boxed w-full">
          <a className="tab tab-active w-1/2">
            <h1 className=" font-mono  text-slate-200 text-xl">
              Results (year to date):
            </h1>
          </a>
        </div>
      </div>
      <div className="flex gap-x-10 justify-center">
        <div className="stats shadow w-3/4 bg-emerald-100 h-28">
          <div className="stat">
            <div className="stat-title">Total Units:</div>
            <div
              className={`stat-value ${
                weekUnitsResult <= 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              {sumItems}
            </div>
            <div className="stat-desc">
              🎯 {sumItems} / {units * 4.5 * 12} (
              {weekUnitsPercentage.toFixed(2)}
              %)
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Total Cost:</div>
            <div
              className={`stat-value ${
                yearCostResult <= 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              {formatPrice(sumCost)}
            </div>
            <div className="stat-desc">
              {" "}
              🎯 {formatPrice(sumCost)} / {formatPrice(year)} (
              {yearCostPercentage.toFixed(2)}
              %)
            </div>
          </div>
        </div>
      </div>
      <iframe
        className="airtable-embed bg-transparent w-3/4 mx-auto rounded-xl"
        src="https://airtable.com/embed/appNiSW6Wp0N1Zjoi/shr3OxbYa7ebdnglq?backgroundColor=gray"
        frameborder="0"
        onmousewheel=""
        width="100%"
        height="533"
      ></iframe>
    </>
  );
};

export default Dashboard;
