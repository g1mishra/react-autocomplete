import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const AutoComplete = ({
  options,
  onSearch,
  onSelect,
  optionKey = "label",
  optionCount = 5,
  noOptionText = "No Items"
}) => {
  const [searchText, setSearchText] = useState("");
  const [selected, setSelected] = useState("");
  const [allOption, setAllOption] = useState(options || []);

  useEffect(() => {
    setAllOption(options);
  }, [options]);

  const selectHandle = (val) => {
    setSearchText("");
    setSelected(val[optionKey]);
    if (onSelect) {
      onSelect(val);
      return;
    }
  };

  const handleChange = ({ target }) => {
    setSearchText(target.value);
    if (onSearch) {
      onSearch(target.value, (data) => setAllOption(data));
      return;
    }

    let tempOptions = [...options];
    tempOptions = tempOptions.filter((obj) =>
      obj[optionKey]?.toLowerCase().includes(target.value?.toLowerCase())
    );
    setAllOption(tempOptions);
  };

  return (
    <div className={styles.autoComplete}>
      <input
        className={styles.inputBox}
        onFocus={() => {
          setSelected("");
        }}
        value={selected || searchText}
        onChange={handleChange}
        style={{
          borderBottomLeftRadius: searchText ? 0 : "",
          borderBottomRightRadius: searchText ? 0 : ""
        }}
      />
      <div
        className={styles.dropdown}
        style={{
          display: searchText ? "flex" : "none",
          // oneOption Height * count - 1st borderTop (1px)
          maxHeight: `${35 * optionCount - 1}px`
        }}
      >
        {!allOption.length ? (
          <div> {noOptionText} </div>
        ) : (
          allOption.map((option, index) => (
            <div key={`${index}`} onClick={() => selectHandle(option)}>
              {option[optionKey]}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default AutoComplete;
