import CountUp from "react-countup";

function StatCard({ title, value, color }) {
  const numericValue = parseFloat(
    String(value).replace(/[^\d.]/g, "")
  );

  const suffix =
    String(value).includes("⭐")
      ? " ⭐"
      : "";

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

      <h3 className="text-gray-500 dark:text-gray-300 text-sm font-medium">
        {title}
      </h3>

      <p className={`text-4xl font-bold mt-3 ${color}`}>
        <CountUp
          end={numericValue}
          duration={2}
          decimals={String(value).includes(".") ? 1 : 0}
        />
        {suffix}
      </p>

    </div>
  );
}

export default StatCard;