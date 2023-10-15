import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorElement from "./components/ErrorElement";
import Hero from "./pages/Hero";
import Savings from "./pages/Savings";
import HomeLayout from "./pages/HomeLayout";
import Stats from "./pages/Stats";
import Item from "./pages/Item";
import { loader as itemsLoader } from "./pages/Savings";
import { loader as itemLoader } from "./pages/Item";
import { action as entriesAction } from "./components/ItemTracker";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Hero />,
        errorElement: <ErrorElement />,
      },
      {
        path: "savings",
        element: <Savings />,
        errorElement: <ErrorElement />,
        loader: itemsLoader,
      },
      {
        path: "savings/:id",
        element: <Item />,
        errorElement: <ErrorElement />,
        loader: itemLoader,
        action: entriesAction,
      },
      {
        path: "stats",
        element: <Stats />,
        errorElement: <ErrorElement />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}>
        <h1 className="text-7xl font-bold underline">
          VicePiggyBank project by Jaybee
        </h1>
        ;
      </RouterProvider>
    </>
  );
}

export default App;
