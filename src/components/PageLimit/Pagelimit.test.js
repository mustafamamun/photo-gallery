import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PageLimit from "./PageLimit";

afterEach(cleanup);

it("finds inner text as given limit", () => {
  const limits = [10, 15];
  const { getAllByTestId } = render(
    <PageLimit limits={limits} limit={10} onSelect={jest.fn()} />
  );
  const elems = getAllByTestId("pagi-btn");
  expect(elems[0].innerHTML).toBe("10");
});

it("function should be called with given value", () => {
  const limits = [10, 15];
  const trackEvent = jest.fn();
  const { getAllByTestId } = render(
    <PageLimit limits={limits} limit={10} onSelect={trackEvent} />
  );
  const elems = getAllByTestId("pagi-btn");
  fireEvent(
    elems[0],
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true
    })
  );
  expect(trackEvent).toHaveBeenCalledWith(10);
});

it("2nd element should be active", () => {
  const limits = [10, 15];
  const { getAllByTestId } = render(
    <PageLimit limits={limits} limit={15} onSelect={jest.fn()} />
  );
  const elems = getAllByTestId("pagi-btn");
  expect(elems[1]).toHaveClass("active");
});
