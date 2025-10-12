import { DropdownOption } from "@/src/lib/interface";
import { isEmpty } from "lodash";
import { BsChevronDown } from "react-icons/bs";



interface Props {
  options: DropdownOption[];
  onShow: () => void;
  onHide: () => void;
  label: string;
  visible: boolean;
  onSelect: (option: DropdownOption) => void;
  value: string | number;
}

const DropDown = (props: Props) => {
  const { options, onShow, onHide, label, visible, onSelect, value } = props;

  const selectedLabel = !isEmpty(options)
    ? options.find((o) => o.value === value)?.label
    : null;
 
  
  return (
    <div>
      <p className="text-xs text-[#888888] mb-3">{label}</p>
      <div className="relative">
        <button
          onClick={onShow}
          className="w-full relative flex items-center justify-between bg-[#2A2A2A] px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm border border-[#3A3A3A] hover:border-[#4A4A4A] transition-colors"
          onBlur={onHide}
        >
          <span className="text-white w-full truncate text-left">
            {selectedLabel || "Select an option"}
          </span>
          <BsChevronDown
            size={14}
            className={`text-gray-400 transition-transform flex-shrink-0 ml-1 ${
              visible ? "rotate-180" : ""
            }`}
          />
          {visible && (
            <div className="absolute left-0 top-full mt-1 w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg shadow-xl z-10 max-h-48 overflow-y-auto">
              <div className="flex flex-col">
                {options.map((p, i) => (
                  <div
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      onHide();
                      onSelect(p);
                    }}
                    className="px-3 py-2 hover:bg-[#3A3A3A] cursor-pointer text-xs sm:text-sm text-white transition-colors text-left"
                  >
                    {p.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default DropDown;
