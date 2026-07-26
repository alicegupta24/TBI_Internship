function StatCard({ title, value, color }) {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-6">
      <h3 className="text-gray-500 dark:text-gray-300 text-sm">
        {title}
      </h3>

      <p className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </p>
    </div>
  );
}

export default StatCard;