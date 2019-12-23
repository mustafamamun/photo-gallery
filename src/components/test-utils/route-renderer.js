import React from "react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
export const renderWithRouterMatch = (
  ui,
  {
    path = "/",
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) => {
  return render(
    <Router history={history}>
      <Route path={path} component={ui} />
    </Router>
  );
};
