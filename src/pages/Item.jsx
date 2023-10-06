import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils/extras";
import cost from "../assets/cost.svg";
import estimate from "../assets/estimate.svg";
import calendar from "../assets/calendar.svg";
import ItemTracker from "../components/ItemTracker";

import axios from "axios";

export const loader = async ({ params }) => {
  const id = params.id;

  const response = await axios.get(`/.netlify/functions/item?id=${id}`);

  const item = response.data;

  return item;
};

const Item = () => {
  const singleItem = useLoaderData();
  const {
    notes,
    brand,
    priceUnit,
    qntWeek,
    category,
    item,
    photo,
    costWeek,
    costMonth,
    costYear,
  } = singleItem;
  const imgUrl = photo[0].url;

  return (
    <section className="bg-emerald-200 pb-24 pt-8">
      <div className="text-md breadcrumbs pl-12">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/savings">Items</Link>
          </li>
        </ul>
      </div>

      <div className="mt-16 flex gap-x-10 justify-center">
        <img
          src={imgUrl}
          alt={item}
          className="w-64 h-auto object-fit hover:scale-105 rounded-[35%] ml-10"
        />

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
      <ItemTracker />
    </section>
  );
};

export default Item;
