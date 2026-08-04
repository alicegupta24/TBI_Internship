import { useNavigate } from "react-router-dom";
import { BarChart3, TrendingUp, Search } from "lucide-react";

function Card({ title, description }) {
  const navigate = useNavigate();

  const getIcon = () => {
    switch (title) {
      case "Review Analysis":
        return <BarChart3 size={34} className="text-blue-600" />;

      case "Trend Dashboard":
        return <TrendingUp size={34} className="text-green-600" />;

      case "Smart Search":
        return <Search size={34} className="text-purple-600" />;

      default:
        return <BarChart3 size={34} />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

      <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-6">
        {getIcon()}
      </div>

      <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
        {title}
      </h3>

      <p className="mt-4 text-slate-600 dark:text-slate-300 leading-7 min-h-[90px] flex-grow">
        {description}
      </p>

      <button
        onClick={() => navigate("/about")}
        className="mt-6 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 transition"
      >
        Learn More →
      </button>

    </div>
  );
}

export default Card;