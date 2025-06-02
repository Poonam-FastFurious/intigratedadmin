/* eslint-disable react/prop-types */
export const InputField = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="mb-5">
      <p className="mb-0 text-base text-black">{label}</p>
      <input
        className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
