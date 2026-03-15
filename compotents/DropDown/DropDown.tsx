"use client";
import css from "./DropDown.module.css";

type CustomDropdownProps = {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  onToggle: (state: boolean) => void;
};

export default function CustomDropdown({
  label,
  name,
  options,
  value,
  onChange,
  isOpen,
  onToggle,
}: CustomDropdownProps) {
  const selectOption = (val: string) => {
    onChange(val);
    onToggle(false);
  };
  return (
    <div className={css.selectContainer}>
      <label htmlFor={name}>{label}</label>

      <div
        className={`${css.customSelect} ${isOpen ? css.open : ""}`}
        onClick={() => onToggle(!isOpen)}
      >
        {value || `Choose a ${name.toLowerCase()}`}
        <svg width={"16"} height={"16"}>
          <use href="/icons.svg#icon-chevron-down" />
        </svg>
      </div>

      {isOpen && (
        <ul className={css.dropDown}>
          {options.map((opt) => (
            <li
              key={opt}
              className={opt === value ? css.selected : ""}
              onClick={() => selectOption(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ display: "none" }}
      >
        <option value="">Choose a {name.toLowerCase()}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
