import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorElement from "./components/ErrorElement";
import Hero from "./pages/Hero";
import Savings from "./pages/Savings";
import HomeLayout from "./pages/HomeLayout";
import Stats from "./pages/Stats";

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
        <h1 className="text-7xl font-bold underline">Tailwind project</h1>;
      </RouterProvider>
    </>
  );
}

export default App;
