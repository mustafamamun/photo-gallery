import { cleanup, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithRouterMatch } from "../../utils/route-renderer";
import PhotoItem from "./PhotoItem";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

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
  act(() => {
    fireEvent.click(backButton);
  });
  expect(window.location.pathname).toBe("/");
});

it("should call the fetch api", async () => {
  const mockSuccessResponse = {};
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise
  });
  jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

  const { container } = renderWithRouterMatch(PhotoItem, {
    route: "/photos/1",
    path: "/photos/:id"
  });

  await act(async () => {
    container;
  });
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(
    "https://jsonplaceholder.typicode.com/photos/1"
  );
});

it("Should render with error", async () => {
  const mockSuccessResponse = {};
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise
  });
  jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

  const { container, getByTestId } = renderWithRouterMatch(PhotoItem, {
    route: "/photos/1",
    path: "/photos/:id"
  });

  await act(async () => {
    container;
  });
  expect(getByTestId("err-alrt")).not.toBe(null);
});

it("Should render with success", async () => {
  const mockSuccessResponse = {
    albumId: 1,
    id: 1,
    title: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/92c952",
    thumbnailUrl: "https://via.placeholder.com/150/92c952"
  };
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    status: 200,
    json: () => mockJsonPromise
  });
  jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

  const { container, getByTestId } = renderWithRouterMatch(PhotoItem, {
    route: "/photos/1",
    path: "/photos/:id"
  });
  await act(async () => {
    container;
  });
  expect(getByTestId("img-details")).not.toBe(null);
});
