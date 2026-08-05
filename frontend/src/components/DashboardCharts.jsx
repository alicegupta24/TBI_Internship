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

  // Sentiment counts
  const positive = reviews.filter((r) => r.rating >= 4).length;
  const neutral = reviews.filter((r) => r.rating === 3).length;
  const negative = reviews.filter((r) => r.rating <= 2).length;

  const sentimentData = [
    {
      name: "Positive",
      value: positive,
    },
    {
      name: "Neutral",
      value: neutral,
    },
    {
      name: "Negative",
      value: negative,
    },
  ];

  // Green, Yellow, Red
  const COLORS = [
    "#22c55e",
    "#facc15",
    "#ef4444",
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8 mb-12">

      {/* Rating Distribution */}

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6 transition-colors duration-300">

        <h2 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">
          Rating Distribution
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

      {/* Review Sentiment */}

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

        <h2 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">
          Review Sentiment
        </h2>

        <ResponsiveContainer width="100%" height={350}>

          <PieChart margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>

            <Pie
              data={sentimentData}
              cx="50%"
              cy="50%"
              outerRadius={85}
              dataKey="value"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >

              {sentimentData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default DashboardCharts;