import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SelectScratch from "./SelectScratch.tsx";

const mainAppComponent = () => {
  return render(
    <SelectScratch
      options={[
        {
          label: "test-label",
          value: "test-value",
        },
      ]}
      placeHolder="test-placeholder"
      isSearchable={true}
      isMulti={true}
    />
  );
};
describe("App component", () => {
  test("main render ", () => {
    const { container } = mainAppComponent();
    const mainRender = container.getElementsByClassName(
      "custom--dropdown-container"
    );
    expect(mainRender.length).toBe(1);
  });
  test("select component render", () => {
    mainAppComponent();
    const dropdown = screen.getByTestId(/test-drop/i);
    expect(dropdown).toBeInTheDocument();
    fireEvent.click(dropdown);
    const placeHolder = screen.getByText(/test-placeholder/i);
    const label = screen.getByText(/test-label/i);
    expect(placeHolder).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });
});
