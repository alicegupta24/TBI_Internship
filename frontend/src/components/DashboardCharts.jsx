import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
function DashboardCharts({ reviews }) {

  const ratingData = [
    {
      rating: "5★",
      count: reviews.filter((r) => r.rating === 5).length,
    },
    {
      rating: "4★",
      count: reviews.filter((r) => r.rating === 4).length,
    },
    {
      rating: "3★",
      count: reviews.filter((r) => r.rating === 3).length,
    },
    {
      rating: "2★",
      count: reviews.filter((r) => r.rating === 2).length,
    },
    {
      rating: "1★",
      count: reviews.filter((r) => r.rating === 1).length,
    },
  ];

  const sentimentData = [
    {
      name: "Positive",
      value: reviews.filter((r) => r.rating >= 4).length,
    },
    {
      name: "Negative",
      value: reviews.filter((r) => r.rating < 4).length,
    },
  ];
console.log("Sentiment Data:", sentimentData);
  const COLORS = ["#2563eb", "#ef4444"];

  return (
    <div className="grid lg:grid-cols-2 gap-8 mb-12">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6 transition-colors duration-300">
        <h2 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">          Rating Distribution
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ratingData}>
            <XAxis
                dataKey="rating"
              stroke="#94a3b8"
            />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="#2563eb"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

      </div>
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <h2 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">          Review Sentiment
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>

           <Pie
            data={sentimentData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {sentimentData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
            <Legend />
            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default DashboardCharts;