import { cleanup, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BAD_REQUEST } from "http-status-codes";

import { renderWithRouteAndContext } from "../../utils/route-renderer";
import PhotoItem from "./PhotoItem";

afterEach(() => {
  cleanup();
  fetch.resetMocks();
});

it("Should load the photo details page", async () => {
  const { container, getByTestId } = renderWithRouteAndContext(PhotoItem, {
    route: "/photos/1",
    path: "/photos/:id"
  });
  await act(async () => {
    container;
  });
  expect(getByTestId("item-view")).not.toBe(null);
});

it("Back to grid button should exist and point to grid view", async () => {
  const { container, getByTestId } = renderWithRouteAndContext(PhotoItem, {
    route: "/photos/1",
    path: "/photos/:id"
  });
  await act(async () => {
    container;
  });
  const backButton = getByTestId("btn-bck-to-grd-view");
  expect(backButton).not.toBe(null);
  act(() => {
    fireEvent.click(backButton);
  });
  expect(window.location.pathname).toBe("/");
});

it("should call the fetch api", async () => {
  fetch.mockResponseOnce(
    JSON.stringify({
      albumId: 1,
      id: 1,
      title: "accusamus beatae ad facilis cum similique qui sunt",
      url: "https://via.placeholder.com/600/92c952",
      thumbnailUrl: "https://via.placeholder.com/150/92c952"
    })
  );
  const { container } = renderWithRouteAndContext(PhotoItem, {
    route: "/photos/1",
    path: "/photos/:id"
  });

  await act(async () => {
    container;
  });
  expect(fetch.mock.calls.length).toEqual(1);
  expect(fetch.mock.calls[0][0]).toEqual(
    "https://jsonplaceholder.typicode.com/photos/1"
  );
});

it("Should render with error", async () => {
  fetch.mockRejectOnce({ status: BAD_REQUEST });
  const { container, getByTestId } = renderWithRouteAndContext(PhotoItem, {
    route: "/photos/1",
    path: "/photos/:id"
  });

  await act(async () => {
    container;
  });
  expect(getByTestId("err-alrt")).not.toBe(null);
});

it("Should render with success", async () => {
  fetch.mockResponseOnce(
    JSON.stringify({
      albumId: 1,
      id: 1,
      title: "accusamus beatae ad facilis cum similique qui sunt",
      url: "https://via.placeholder.com/600/92c952",
      thumbnailUrl: "https://via.placeholder.com/150/92c952"
    })
  );
  const { container, getByTestId } = renderWithRouteAndContext(PhotoItem, {
    route: "/photos/1",
    path: "/photos/:id"
  });
  await act(async () => {
    container;
  });
  expect(getByTestId("img-details")).not.toBe(null);
});
