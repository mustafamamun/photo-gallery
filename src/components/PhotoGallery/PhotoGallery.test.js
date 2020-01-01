import { cleanup, waitForElement, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BAD_REQUEST } from "http-status-codes";

import { renderWithRouteAndContext } from "../../utils/route-renderer";
import PhotoGallery from "./PhotoGallery";

afterEach(() => {
  cleanup();
  fetch.resetMocks();
});
it("should call the fetch api", async () => {
  fetch.mockResponseOnce(
    JSON.stringify([
      {
        albumId: 1,
        id: 1,
        title: "accusamus beatae ad facilis cum similique qui sunt",
        url: "https://via.placeholder.com/600/92c952",
        thumbnailUrl: "https://via.placeholder.com/150/92c952"
      }
    ])
  );
  const { container } = renderWithRouteAndContext(PhotoGallery, {
    route: "/",
    path: "/"
  });

  await act(async () => {
    container;
  });
  expect(fetch.mock.calls.length).toEqual(1);
  expect(fetch.mock.calls[0][0]).toEqual(
    "https://jsonplaceholder.typicode.com/photos?_page=1&_limit=18"
  );
});
it("should load with error", async () => {
  fetch.mockRejectOnce({ status: BAD_REQUEST });
  const { container, getByTestId } = renderWithRouteAndContext(PhotoGallery, {
    route: "/",
    path: "/"
  });

  await act(async () => {
    container;
  });
  await waitForElement(() => getByTestId("err-alrt"));
});

it("should load with success", async () => {
  fetch.mockResponseOnce(
    JSON.stringify([
      {
        albumId: 1,
        id: 1,
        title: "accusamus beatae ad facilis cum similique qui sunt",
        url: "https://via.placeholder.com/600/92c952",
        thumbnailUrl: "https://via.placeholder.com/150/92c952"
      }
    ])
  );
  const { container, getByTestId } = renderWithRouteAndContext(PhotoGallery, {
    route: "/",
    path: "/"
  });

  await act(async () => {
    container;
  });
  await waitForElement(() => getByTestId("img-gallery"));
});
