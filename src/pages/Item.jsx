import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils/extras";
import cost from "../assets/cost.svg";
import icon from "../assets/icon.png";
import unitCost from "../assets/unitCost.svg";
import estimate from "../assets/estimate.svg";
import calendar from "../assets/calendar.svg";
import ItemTracker from "../components/ItemTracker";
import axios from "axios";
import EntryList from "../components/EntryList";
import Dashboard from "../components/Dashboard";

export const loader = async ({ params }) => {
  const id = params.id;

  const response = await axios.get(`/.netlify/functions/item?id=${id}`);

  const item = response.data;

  return item;
};

export const getEntries = async () => {
  try {
    const response = await axios.get(`/.netlify/functions/entries`);

    const data = response.data.records;

    return data;
  } catch (error) {
    return { error: "Error making request" };
  }
};

const Item = () => {
  const [entries, setEntries] = useState([]);
  const fetchData = async () => {
    try {
      const list = await getEntries();
      const formattedList = list.filter(
        (entry) => entry.fields.item[0] === singleItem.id
      );
      setEntries(formattedList);
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className="flex justify-left w-2/3 mx-auto border-b-2 border-slate-800 capitalize pb-6">
        <h1 className="text-4xl font-bold  text-slate-900 ">Item Details:</h1>
      </div>
      <div className="mt-8 flex justify-center items-center gap-x-4 mr-10">
        <img
          src={imgUrl}
          alt={item}
          className="w-48 h-auto object-fit hover:scale-105 rounded-[35%] "
        />
        <div className="stats grid-cols-2 shadow w-2/4 bg-emerald-100 h-36">
          <div
            className="  flex
          flex-col justify-center items-center"
          >
            <div className="stat-figure text-secondary">
              <img src={icon} alt="item" className="w-12 h-12" />
            </div>
            <div className="stat-title text-lg font-medium">Item</div>
            <div className="stat-value text-base font-mono">{item}</div>
            <div className="stat-desc"></div>
          </div>

          <div
            className="flex
          flex-col justify-center items-center"
          >
            <div className="stat-figure text-secondary">
              <img src={unitCost} alt="unitCost" className="w-12 h-12" />
            </div>
            <div className="stat-title text-lg font-medium">Cost / Unit</div>
            <div className="stat-value text-base font-mono">
              {formatPrice(priceUnit)}
            </div>
            <div className="stat-desc"></div>
          </div>
        </div>
      </div>
      <Dashboard
        costWeek={costWeek}
        costMonth={costMonth}
        costYear={costYear}
      />

      <ItemTracker fetchData={fetchData} />
      <EntryList entries={entries} fetchData={fetchData} />
    </section>
  );
};

export default Item;
