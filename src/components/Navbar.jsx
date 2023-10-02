import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdSavings } from "react-icons/md";
import { IoIosStats } from "react-icons/io";
import { FaBarsStaggered } from "react-icons/fa6";
import animeAIpiggy from "../assets/animeAIpiggy.png";

const links = [
  { id: 1, url: "/", text: "Home", icon: <AiOutlineHome size={30} /> },
  {
    id: 2,
    url: "savings",
    text: "Savings",
    icon: <MdSavings size={30} />,
  },
  {
    id: 3,
    url: "stats",
    text: "Stats",
    icon: <IoIosStats size={30} />,
  },
];

const Navbar = () => {
  return (
    <nav className="bg-emerald-100">
      <div className="align-element py-4 flex flex-col sm:flex-row sm:gap-x-16 sm:items-center sm:py-8">
        <h2 className="text-3xl uppercase tracking-wider flex justify-center items-center">
          <img
            src={animeAIpiggy}
            alt="piggybank logo"
            className="w-16 h-16 rounded-full mr-2"
          />
          <span className="text-emerald-600 font-bold">Vice</span>
          <span className="italic">PiggyBank</span>
        </h2>
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <FaBarsStaggered className="h-6 w-6" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
          >
            {links.map((link) => {
              const { id, url, text, icon } = link;

              return (
                <li key={id}>
                  <NavLink className="capitalize px-16 mx-8" to={url}>
                    {icon}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal ml-16">
            {links.map((link) => {
              const { id, url, text, icon } = link;

              return (
                <li key={id}>
                  <NavLink className="capitalize px-16 mx-8" to={url}>
                    {icon}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
