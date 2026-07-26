import { ClipboardList, BrainCircuit, BarChart3, TrendingUp } from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      icon: <ClipboardList size={34} className="text-blue-600" />,
      title: "Collect Reviews",
      description:
        "Gather guest feedback from your hospitality platform.",
    },
    {
      icon: <BrainCircuit size={34} className="text-blue-600" />,
      title: "Analyze Feedback",
      description:
        "Use AI-powered analysis to understand customer sentiment.",
    },
    {
      icon: <BarChart3 size={34} className="text-blue-600" />,
      title: "View Insights",
      description:
        "Visualize ratings, trends, and customer experience metrics.",
    },
    {
      icon: <TrendingUp size={34} className="text-blue-600" />,
      title: "Improve Service",
      description:
        "Take informed decisions to improve guest satisfaction.",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-3xl md:text-4xl font-bold">
            How StayInsight Works
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-300 text-lg">
            Transform guest feedback into actionable insights in four simple
            steps.
          </p>

        </div>

        <div className="grid md:grid-cols-4 gap-8 mt-16">

          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-slate-700 hover:shadow-lg transition duration-300"
            >
              <div className="w-16 h-16 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-6">
                {step.icon}
              </div>

              <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                {step.title}
              </h3>

              <p className="mt-4 text-slate-600 dark:text-slate-300 leading-7">
                {step.description}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;