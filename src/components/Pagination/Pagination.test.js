import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Pagination from "./Pagination";

afterEach(cleanup);

it("Should have 9 pagination button", () => {
  const linkHeader = {
    first: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=1&_limit=24",
      _limit: "24",
      _page: "1"
    },
    last: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=209&_limit=24",
      _limit: "24",
      _page: "209"
    },
    next: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=3&_limit=24",
      _limit: "24",
      _page: "8"
    },
    prev: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=1&_limit=24",
      _limit: "24",
      _page: "6"
    }
  };
  const { getAllByTestId } = render(
    <Pagination currentPage={7} linkHeader={linkHeader} onSelect={jest.fn()} />
  );
  const elems = getAllByTestId("pagi-btn");
  expect(elems.length).toBe(9);
});

it("Should have next and prev button", () => {
  const linkHeader = {
    first: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=1&_limit=24",
      _limit: "24",
      _page: "1"
    },
    last: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=209&_limit=24",
      _limit: "24",
      _page: "209"
    },
    next: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=3&_limit=24",
      _limit: "24",
      _page: "8"
    },
    prev: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=1&_limit=24",
      _limit: "24",
      _page: "6"
    }
  };
  const { getAllByText } = render(
    <Pagination currentPage={7} linkHeader={linkHeader} onSelect={jest.fn()} />
  );
  const nextButton = getAllByText("next");
  expect(nextButton.length).toBe(1);
  const prevButton = getAllByText("prev");
  expect(prevButton.length).toBe(1);
});

it("Should have 5 pagination button", () => {
  const linkHeader = {
    first: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=1&_limit=24",
      _limit: "24",
      _page: "1"
    },
    last: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=209&_limit=24",
      _limit: "24",
      _page: "209"
    },
    next: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=3&_limit=24",
      _limit: "24",
      _page: "2"
    }
  };
  const { getAllByTestId } = render(
    <Pagination currentPage={1} linkHeader={linkHeader} onSelect={jest.fn()} />
  );
  const elems = getAllByTestId("pagi-btn");
  expect(elems.length).toBe(5);
});

it("Should not have prev button", () => {
  const linkHeader = {
    first: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=1&_limit=24",
      _limit: "24",
      _page: "1"
    },
    last: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=209&_limit=24",
      _limit: "24",
      _page: "209"
    },
    next: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=3&_limit=24",
      _limit: "24",
      _page: "2"
    }
  };
  const { queryByText } = render(
    <Pagination currentPage={1} linkHeader={linkHeader} onSelect={jest.fn()} />
  );
  expect(queryByText("prev")).toBe(null);
});

it("Should not have next button", () => {
  const linkHeader = {
    first: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=1&_limit=24",
      _limit: "24",
      _page: "1"
    },
    last: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=209&_limit=24",
      _limit: "24",
      _page: "209"
    },
    prev: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=1&_limit=24",
      _limit: "24",
      _page: "208"
    }
  };
  const { queryByText } = render(
    <Pagination
      currentPage={208}
      linkHeader={linkHeader}
      onSelect={jest.fn()}
    />
  );
  expect(queryByText("next")).toBe(null);
});

it("Page 10 should be active", () => {
  const linkHeader = {
    first: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=1&_limit=24",
      _limit: "24",
      _page: "1"
    },
    last: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=209&_limit=24",
      _limit: "24",
      _page: "209"
    },
    prev: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=1&_limit=24",
      _limit: "24",
      _page: "9"
    },
    next: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=3&_limit=24",
      _limit: "24",
      _page: "11"
    }
  };
  const { queryByText } = render(
    <Pagination currentPage={10} linkHeader={linkHeader} onSelect={jest.fn()} />
  );
  expect(queryByText("10")).toHaveClass("active");
});

it("Function should be called with 10", () => {
  const linkHeader = {
    first: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=1&_limit=24",
      _limit: "24",
      _page: "1"
    },
    last: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=209&_limit=24",
      _limit: "24",
      _page: "209"
    },
    prev: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=1&_limit=24",
      _limit: "24",
      _page: "9"
    },
    next: {
      url: "http://jsonplaceholder.typicode.com/photos?_page=3&_limit=24",
      _limit: "24",
      _page: "11"
    }
  };
  const trackEvent = jest.fn();
  const { queryByText } = render(
    <Pagination
      currentPage={10}
      linkHeader={linkHeader}
      onSelect={trackEvent}
    />
  );
  fireEvent(
    queryByText("10"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true
    })
  );
  expect(trackEvent).toHaveBeenCalledWith(10);
});
