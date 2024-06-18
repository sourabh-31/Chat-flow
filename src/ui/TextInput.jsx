function TextInput({ value, onChange }) {
  return (
    <input
      className="border border-gray-200 w-full rounded-md outline-none text-sm p-2"
      value={value}
      onChange={onChange}
    />
  );
}

export default TextInput;
