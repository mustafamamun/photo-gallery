import React from "react";
import { Router } from "react-router-dom";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createMemoryHistory } from "history";
import PhotoGrid from "./PhotoGrid";

afterEach(cleanup);

const photos = [
  {
    albumId: 1,
    id: 1,
    title: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/92c952",
    thumbnailUrl: "https://via.placeholder.com/150/92c952"
  },
  {
    albumId: 1,
    id: 2,
    title: "reprehenderit est deserunt velit ipsam",
    url: "https://via.placeholder.com/600/771796",
    thumbnailUrl: "https://via.placeholder.com/150/771796"
  },
  {
    albumId: 1,
    id: 3,
    title: "officia porro iure quia iusto qui ipsa ut modi",
    url: "https://via.placeholder.com/600/24f355",
    thumbnailUrl: "https://via.placeholder.com/150/24f355"
  },
  {
    albumId: 1,
    id: 4,
    title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
    url: "https://via.placeholder.com/600/d32776",
    thumbnailUrl: "https://via.placeholder.com/150/d32776"
  },
  {
    albumId: 1,
    id: 5,
    title: "natus nisi omnis corporis facere molestiae rerum in",
    url: "https://via.placeholder.com/600/f66b97",
    thumbnailUrl: "https://via.placeholder.com/150/f66b97"
  }
];

it("Shoud have 5 image", () => {
  const history = createMemoryHistory();
  const { getAllByTestId } = render(
    <Router history={history}>
      <PhotoGrid photos={photos} />
    </Router>
  );

  expect(getAllByTestId("img-elm").length).toBe(photos.length);
});

it("Shoud navigate to right item view", () => {
  const history = createMemoryHistory();
  const { getByTestId } = render(
    <Router history={history}>
      <PhotoGrid photos={photos} />
    </Router>
  );
  fireEvent.click(getByTestId("link-1"));
  expect(history.location.pathname).toEqual("/photos/1");
});
