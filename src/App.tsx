import SelectScratch from "./components/SelectScratch.tsx";
import * as React from "react";

function App() {
  let options = [
    {
      label: "Sumit Ailani",
      value: "opt1",
    },
    {
      label: "Zepto User",
      value: "opt2",
    },
    {
      label: "Bruce Wayne",
      value: "opt3",
    },
    {
      label: "Jason Jordan",
      value: "opt4",
    },
    {
      label: "Nancy Mayers",
      value: "opt5",
    },
  ];

  return (
    <div className="App">
      <h3>Bonus task done and test cases implemented using RTL</h3>
      <SelectScratch
        options={options}
        placeHolder="Please select User"
        isSearchable
        isMulti
      />
    </div>
  );
}

export default App;
