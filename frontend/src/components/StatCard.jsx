import CountUp from "react-countup";

function StatCard({ title, value, color }) {
  const number =
    typeof value === "number"
      ? value
      : Number(String(value).replace(/[^\d.]/g, ""));

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-6 hover:shadow-xl transition duration-300">
      <h3 className="text-gray-500 dark:text-gray-300 text-sm">
        {title}
      </h3>

      <p className={`text-3xl font-bold mt-2 ${color}`}>
        {Number.isNaN(number) ? (
          value
        ) : (
          <CountUp
            end={number}
            duration={2}
            decimals={String(number).includes(".") ? 1 : 0}
          />
        )}
      </p>
    </div>
  );
}

export default StatCard;