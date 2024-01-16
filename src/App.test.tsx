import * as React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App.tsx";

const mainAppComponent = () => {
  return render(<App />);
};
describe("App component", () => {
  test("main render ", () => {
    const { container } = mainAppComponent();
    const mainRender = container.getElementsByClassName("App");
    expect(mainRender.length).toBe(1);
  });
  test("remaining renders", () => {
    mainAppComponent();
    const placeHolder = screen.getByText(/Please select User/i);
    const bonus = screen.getByText(
      /Bonus task done and test cases implemented using RTL/i
    );
    expect(placeHolder).toBeInTheDocument();
    expect(bonus).toBeInTheDocument();
  });
});
