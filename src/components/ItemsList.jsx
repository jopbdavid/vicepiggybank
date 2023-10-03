import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { formatPrice } from "../utils/extras";
import { FaTags } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";

const ItemsList = () => {
  const items = useLoaderData();
  console.log(items);
  return (
    <div className="mt-12 grid gap-y-8 w-2/3">
      {items.map((i) => {
        const id = i.id;
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
        } = i.fields;
        const imgUrl = photo[0].url;

        return (
          <Link
            key={id}
            to={`/savings/${id}`}
            className=" rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap bg-emerald-100 shadow-xl hover:shadow-2xl duration-300 group"
          >
            <img
              src={imgUrl}
              alt={item}
              className="h-20 w-20 rounded-lg sm:h-18 sm:w-18 object-cover group-hover:scale-105 transition duration-300 ml-8 self-center"
            />
            <div className="ml-20 mt-2">
              <div className="badge badge-info gap-2 text-lg font-semibold bg-slate-600 text-slate-200 p-4 ml-20">
                <FaTags size={18} />
                <h3>{item}</h3>
              </div>
              <div className="mt-2 flex ml-28 items-center">
                <div className="stat-figure text-primary">
                  <GrMoney size={30} />
                </div>

                <div className="stat-value text-3xl ml-10 text-slate-800">
                  {formatPrice(priceUnit)}
                </div>
                <img
                  src="https://cdn0.iconfinder.com/data/icons/cosmo-layout/40/box-1024.png"
                  alt=""
                  className="w-12 h-12 ml-10"
                />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ItemsList;
