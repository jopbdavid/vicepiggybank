import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

const HomeLayout = () => {
  const navigate = useNavigation();
  const isLoading = navigate.status === "loading";
  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <section>
          <Outlet />
        </section>
      )}
    </>
  );
};

export default HomeLayout;
