import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "./Pagination";

// Need to comment out svg to pass tests

const Wrapper = ({ page, lastPage }: { page: number; lastPage: number }) => {
  const [p, setP] = useState(page);
  const [l, setL] = useState(lastPage);

  const next = () => setP((p) => ++p);
  const back = () => setP((p) => --p);

  return <Pagination page={p} lastPage={l} next={next} back={back} />;
};

const NEXT_BTN_ID = "right";
const BACK_BTN_ID = "left";
const VALUES_ID = "value";

describe("Pagination", () => {
  describe("Pagination: next btn", () => {
    it("Next click: page should change", async () => {
      render(<Wrapper page={1} lastPage={3} />);
      await userEvent.click(screen.getByTestId(NEXT_BTN_ID));
      expect(screen.getByTestId(VALUES_ID)).toHaveTextContent("2 of 3");
    });

    it("Next click: page should not change", async () => {
      render(<Wrapper page={3} lastPage={3} />);
      await userEvent.click(screen.getByTestId(NEXT_BTN_ID));
      expect(screen.getByTestId(VALUES_ID)).toHaveTextContent("3 of 3");
    });
  });

  describe("Pagination: back btn", () => {
    it("Back click: page should change", async () => {
      render(<Wrapper page={3} lastPage={3} />);
      await userEvent.click(screen.getByTestId(BACK_BTN_ID));
      expect(screen.getByTestId(VALUES_ID)).toHaveTextContent("2 of 3");
    });

    it("Back click: page should not change", async () => {
      render(<Wrapper page={1} lastPage={3} />);
      await userEvent.click(screen.getByTestId(BACK_BTN_ID));
      expect(screen.getByTestId(VALUES_ID)).toHaveTextContent("1 of 3");
    });
  });
});
