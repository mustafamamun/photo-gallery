import React from "react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import { LoadingContext } from "../context/LoadingContext";

export const renderWithRouteAndContext = (
  ui,
  {
    path = "/",
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) => {
  return render(
    <LoadingContext.Provider value={{ setIsLoading: jest.fn() }}>
      <Router history={history}>
        <Route path={path} component={ui} />
      </Router>
    </LoadingContext.Provider>
  );
};
