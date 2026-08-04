import { motion } from "framer-motion";
import {
  BrainCircuit,
  ShieldCheck,
  BarChart3,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Sentiment Analysis",
    text: "Analyze guest reviews using Google Gemini AI and understand customer emotions instantly.",
    bg: "bg-blue-100 dark:bg-blue-900",
    color: "text-blue-600",
  },
  {
    icon: BarChart3,
    title: "Interactive Dashboard",
    text: "Monitor review trends, ratings, and customer satisfaction through beautiful visualizations.",
    bg: "bg-green-100 dark:bg-green-900",
    color: "text-green-600",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    text: "JWT authentication with role-based authorization ensures secure access for every user.",
    bg: "bg-purple-100 dark:bg-purple-900",
    color: "text-purple-600",
  },
  {
    icon: Clock,
    title: "Real-Time Insights",
    text: "Receive instant AI-powered summaries and identify recurring issues without manual effort.",
    bg: "bg-orange-100 dark:bg-orange-900",
    color: "text-orange-500",
  },
];

function Features() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >

          <span className="inline-flex px-5 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-semibold text-sm">

            Why Choose StayInsight?

          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">

            Built for Smarter Hospitality

          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-8">

            StayInsight combines Artificial Intelligence, secure cloud
            technologies, and interactive analytics to help hospitality
            businesses improve customer experience.

          </p>

        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                whileHover={{
                  y: -10,
                }}
                className="group bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl shadow-lg hover:shadow-2xl p-8 transition-all duration-300"
              >

                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.1,
                  }}
                  className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-6`}
                >

                  <Icon
                    className={feature.color}
                    size={32}
                  />

                </motion.div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 transition">

                  {feature.title}

                </h3>

                <p className="text-gray-600 dark:text-gray-300 leading-7">

                  {feature.text}

                </p>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}

export default Features;