import AutoComplete from "./AutoComplete";
import "./styles.css";

const OPTION = [
  { name: "Jeevan" },
  { name: "manish" },
  { name: "virat" },
  { name: "akash" },
  { name: "Jeevan Mishra" },
  { name: "anuskha" }
];

export default function App() {
  const handleSearch = (value, cb) => {
    // just to explian API call
    let tempOptions = [...OPTION, { name: "piyush" }];
    tempOptions = tempOptions.filter((item) =>
      item["name"]?.toLowerCase().includes(value.toLowerCase())
    );
    // setOptions
    cb(tempOptions);
  };

  return (
    <div className="App">
      <div style={{ width: 300, margin: "auto" }}>
        <AutoComplete
          options={OPTION}
          noOptionText={"No Match Found"}
          onSearch={handleSearch}
          optionKey={"name"}
          optionCount={5}
        />
      </div>
    </div>
  );
}
