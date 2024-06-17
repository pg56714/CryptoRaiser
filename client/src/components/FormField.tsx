interface Props {
  labelName?: string;
  placeholder?: string;
  inputType?: string;
  isTextArea?: boolean;
  value?: string;
  handleChange?: (e: any) => void;
}

const FormField = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
}: Props) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="text-[#808191] text-[14px] leading-[22px] font-epilogue font-medium mb-[10px]">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text=[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] hover:bg-[#26262e] transition"
          required
          value={value}
          rows={10}
          placeholder={placeholder}
          onChange={handleChange}
        />
      ) : (
        <input
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text=[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] hover:bg-[#26262e] transition"
          required
          value={value}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          onChange={handleChange}
        />
      )}
    </label>
  );
};

export default FormField;
