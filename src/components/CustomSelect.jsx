import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

function CustomSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Selecione",
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleSelect(optionValue) {
    onChange(optionValue);
    setOpen(false);
  }

  return (
    <div className="custom-select-field" ref={wrapperRef}>
      {label && <span className="custom-select-label">{label}</span>}

      <button
        type="button"
        className={`custom-select-trigger ${open ? "open" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown size={18} />
      </button>

      {open && (
        <div className="custom-select-dropdown">
          {options.map((option) => {
            const isActive = option.value === value;

            return (
              <button
                type="button"
                key={option.value}
                className={`custom-select-option ${isActive ? "active" : ""}`}
                onClick={() => handleSelect(option.value)}
              >
                <span>{option.label}</span>
                {isActive && <Check size={16} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;