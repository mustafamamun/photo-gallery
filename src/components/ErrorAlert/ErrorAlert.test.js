import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ErrorAlert from "./ErrorAllert";

afterEach(cleanup);

it("Validate button text", () => {
  const { getByTestId } = render(<ErrorAlert tryAgain={jest.fn()} />);
  expect(getByTestId("btn-tryagain")).toHaveTextContent("Try again!");
});

it("Should call the passed fuctions", () => {
  const trackEvent = jest.fn();
  const { getByTestId } = render(<ErrorAlert tryAgain={trackEvent} />);
  fireEvent(
    getByTestId("btn-tryagain"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true
    })
  );
  expect(trackEvent).toHaveBeenCalledTimes(1);
});
