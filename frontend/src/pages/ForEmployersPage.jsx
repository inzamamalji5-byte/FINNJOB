import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  Clock,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  Building,
  TrendingUp,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForEmployersPage() {
  const benefits = [
    {
      icon: Users,
      title: "Access Vetted Workers",
      description: "Tap into our pool of pre-screened, reliable workers ready to fill your shifts.",
    },
    {
      icon: Clock,
      title: "Fill Shifts Fast",
      description: "Post a job and get applicants within hours. No more scrambling for coverage.",
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description: "Every worker is verified. If there's an issue, we'll make it right.",
    },
    {
      icon: TrendingUp,
      title: "Scale On Demand",
      description: "Need 5 workers or 50? Scale your workforce up or down as needed.",
    },
  ];

  const features = [
    "Post unlimited jobs",
    "Access to 15,000+ workers",
    "Same-day staffing",
    "Integrated payments",
    "Worker ratings & reviews",
    "Dedicated support",
    "Compliance management",
    "Real-time tracking",
  ];

  const stats = [
    { value: "98%", label: "Shift Fill Rate" },
    { value: "<4hrs", label: "Avg. Time to Fill" },
    { value: "4.8/5", label: "Worker Rating" },
  ];

  return (
    <main className="flex-1 pt-20" data-testid="for-employers-page">
      {/* Hero */}
      <section className="bg-white relative overflow-hidden">
        <div className="hero-blob-1"></div>
        <div className="hero-blob-2"></div>
        
        <div className="container-finn py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Building className="w-4 h-4" />
                <span>Trusted by 890+ Employers</span>
              </div>

              <h1 className="font-heading font-semibold text-5xl md:text-6xl text-finn-slate-900 tracking-tight leading-[1.1] mb-6">
                Staff Up in Minutes
              </h1>

              <p className="text-lg md:text-xl text-finn-slate-600 leading-relaxed mb-8">
                Access a pool of verified, reliable workers. Fill shifts fast and scale your workforce on demand.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="h-14 px-8 rounded-full bg-finn-slate-900 text-white hover:bg-finn-slate-800 text-base font-medium shadow-lg shadow-finn-slate-900/20"
                    data-testid="post-job-cta"
                  >
                    Post a Job
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 rounded-full border-finn-slate-200 text-finn-slate-700"
                  >
                    Talk to Sales
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8 mt-8 border-t border-finn-slate-100">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-heading font-semibold text-3xl text-finn-slate-900">
                      {stat.value}
                    </div>
                    <div className="text-finn-slate-500 text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block"
            >
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=500&fit=crop"
                alt="Team at work"
                className="rounded-3xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section bg-finn-slate-50">
        <div className="container-finn">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading font-semibold text-4xl text-finn-slate-900 tracking-tight mb-4">
              Why Employers Choose FinnJob
            </h2>
            <p className="text-lg text-finn-slate-600">
              Modern staffing solutions for modern businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border border-finn-slate-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-finn-slate-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-finn-slate-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-white">
        <div className="container-finn">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading font-semibold text-4xl text-finn-slate-900 tracking-tight mb-6">
                Everything You Need to Hire Smarter
              </h2>
              <p className="text-lg text-finn-slate-600 mb-8">
                Our platform gives you all the tools to find, manage, and pay your flexible workforce.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
                    <span className="text-finn-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-finn-slate-900 rounded-3xl p-8 text-white">
                <h3 className="font-heading font-semibold text-2xl mb-6">
                  Simple Pricing
                </h3>
                <div className="text-4xl font-heading font-bold mb-2">
                  15% <span className="text-lg font-normal text-finn-slate-400">per booking</span>
                </div>
                <p className="text-finn-slate-400 mb-6">
                  No hidden fees. Pay only when you successfully fill a shift.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-finn-slate-300">
                    <CheckCircle className="w-4 h-4 text-teal-400" />
                    Unlimited job postings
                  </li>
                  <li className="flex items-center gap-2 text-finn-slate-300">
                    <CheckCircle className="w-4 h-4 text-teal-400" />
                    No monthly minimums
                  </li>
                  <li className="flex items-center gap-2 text-finn-slate-300">
                    <CheckCircle className="w-4 h-4 text-teal-400" />
                    Cancel anytime
                  </li>
                </ul>
                <Link to="/signup">
                  <Button className="w-full h-12 rounded-full bg-teal-500 text-finn-slate-900 hover:bg-teal-400 font-semibold">
                    Get Started
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section bg-finn-slate-50">
        <div className="container-finn">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading font-semibold text-4xl text-finn-slate-900 tracking-tight mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg text-finn-slate-600">
              From retail to events, we help businesses across sectors find the right talent.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {["Retail", "Hospitality", "Events", "Warehousing", "Food & Beverage", "Delivery", "Customer Service", "Administration"].map(
              (industry) => (
                <div
                  key={industry}
                  className="px-6 py-3 bg-white rounded-full border border-finn-slate-200 text-finn-slate-700 font-medium"
                >
                  {industry}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-finn-slate-900">
        <div className="container-finn">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading font-semibold text-4xl text-white tracking-tight mb-4">
              Ready to Simplify Staffing?
            </h2>
            <p className="text-lg text-finn-slate-400 mb-8">
              Post your first job in minutes and see how easy flexible staffing can be.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="h-14 px-8 rounded-full bg-teal-500 text-finn-slate-900 hover:bg-teal-400 text-base font-semibold"
                >
                  Post a Job Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 rounded-full border-finn-slate-700 text-white hover:bg-finn-slate-800"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
