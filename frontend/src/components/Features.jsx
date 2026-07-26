import {
  ShieldCheck,
  BrainCircuit,
  BarChart3,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Sentiment Analysis",
    text: "Automatically understand guest emotions and detect recurring feedback.",
  },
  {
    icon: BarChart3,
    title: "Interactive Dashboard",
    text: "Track ratings, customer satisfaction and trends using beautiful charts.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    text: "JWT authentication keeps your account and review data protected.",
  },
  {
    icon: Clock,
    title: "Real-time Insights",
    text: "Instantly analyze new reviews as they are submitted.",
  },
];

function Features() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Why Choose StayInsight?
          </h2>

          <p className="mt-5 text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Everything you need to understand guest feedback and improve
            hospitality experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <div
                key={index}
                className="p-8 rounded-3xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-xl transition duration-300"
              >

                <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-6">

                  <Icon className="text-blue-600" size={28} />

                </div>

                <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300">
                  {feature.text}
                </p>

              </div>

            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Features;