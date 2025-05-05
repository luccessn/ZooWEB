import React from "react";
import { Routes, Route } from "react-router-dom";
// import { RoutesConfig } from "./Config/routesConfig";
import { routesConfig } from "./Config/RoutesConfig";
const AppRoutes = () => {
  return (
    <Routes>
      {routesConfig.map((route) => {
        if (route.Guard) {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <route.Guard>
                  <route.Component />
                </route.Guard>
              }
            />
          );
        }
        return (
          <Route
            key={route.path}
            path={route.path}
            Component={route.Component}
          />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
