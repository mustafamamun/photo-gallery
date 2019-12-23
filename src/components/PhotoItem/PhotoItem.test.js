import { cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithRouterMatch } from "../test-utils/route-renderer";
import PhotoItem from "./PhotoItem";

afterEach(cleanup);

it("Should load the photo details page", () => {
  const { getByTestId } = renderWithRouterMatch(PhotoItem, {
    route: "/photos/1",
    path: "/photos/:id"
  });
  expect(getByTestId("item-view")).not.toBe(null);
});

it("Back to grid button should exist and point to grid view", () => {
  const { getByTestId } = renderWithRouterMatch(PhotoItem, {
    route: "/photos/1",
    path: "/photos/:id"
  });
  const backButton = getByTestId("btn-bck-to-grd-view");
  expect(backButton).not.toBe(null);
  fireEvent.click(backButton);
  expect(window.location.pathname).toBe("/");
});
