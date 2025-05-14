interface RangeFilterProps {
  selectedRange: "full" | "firstHalf" | "secondHalf";
  onRangeChange: (range: "full" | "firstHalf" | "secondHalf") => void;
}

const RangeFilter: React.FC<RangeFilterProps> = ({
  selectedRange,
  onRangeChange,
}) => {
  return (
    <div className="flex gap-2 my-4 justify-end">
      {["firstHalf", "secondHalf", "full"].map((range) => (
        <button
          key={range}
          onClick={() =>
            onRangeChange(range as "full" | "firstHalf" | "secondHalf")
          }
          className={`px-4 py-2 rounded-lg text-sm border ${
            selectedRange === range
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {range === "firstHalf"
            ? "1–15"
            : range === "secondHalf"
            ? "16–31"
            : "Full Month"}
        </button>
      ))}
    </div>
  );
};

export default RangeFilter;
