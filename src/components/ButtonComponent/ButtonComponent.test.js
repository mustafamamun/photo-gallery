import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ButtonComponent from "./ButtonComponent";

afterEach(cleanup);

it("Insert text in button element", () => {
  const { getByTestId } = render(
    <ButtonComponent isActive={false} text={12} onSelect={jest.fn()} />
  );
  expect(getByTestId("pagi-btn")).toHaveTextContent("12");
});

it("Should call the passed function", () => {
  const trackEvent = jest.fn();
  const { getByTestId } = render(
    <ButtonComponent isActive={false} text={12} onSelect={trackEvent} />
  );
  fireEvent(
    getByTestId("pagi-btn"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true
    })
  );
  expect(trackEvent).toHaveBeenCalledTimes(1);
});

it("Check button status", () => {
  const { getByTestId } = render(
    <ButtonComponent isActive={true} text={12} onSelect={jest.fn()} />
  );
  expect(getByTestId("pagi-btn")).toHaveClass("active");
});
