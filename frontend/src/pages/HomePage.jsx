import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Users,
  BadgeCheck,
  Wallet,
  Calendar,
  Search,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function HomePage() {
  const stats = [
    { value: "15K+", label: "Active Workers" },
    { value: "890+", label: "Verified Employers" },
    { value: "2hrs", label: "Avg. Payout Time" },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Create Your Profile",
      description:
        "Sign up in minutes. Add your skills, availability, and preferred work areas.",
      icon: Users,
    },
    {
      step: "02",
      title: "Find Flexible Jobs",
      description:
        "Browse gigs that match your schedule. Filter by location, pay rate, and shift type.",
      icon: Search,
    },
    {
      step: "03",
      title: "Get Paid Fast",
      description:
        "Complete your shift and get paid within hours. Instant payouts available.",
      icon: Wallet,
    },
  ];

  const features = [
    {
      title: "Instant Payouts",
      description: "Get your earnings within hours, not weeks. Access your money when you need it.",
      icon: Zap,
      highlight: true,
    },
    {
      title: "Verified Employers",
      description: "Work with trusted companies. Every employer is vetted for your safety.",
      icon: BadgeCheck,
    },
    {
      title: "Flexible Scheduling",
      description: "Choose when you work. Perfect for students and those with busy lives.",
      icon: Calendar,
    },
    {
      title: "Secure & Safe",
      description: "Your data is protected. Work confidently with our secure platform.",
      icon: Shield,
    },
  ];

  return (
    <main className="flex-1" data-testid="home-page">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
        {/* Background Decorations */}
        <div className="hero-blob-1"></div>
        <div className="hero-blob-2"></div>

        <div className="container-finn relative z-10 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                <span>Instant Payouts Available</span>
              </div>

              <h1 className="font-heading font-semibold text-5xl md:text-7xl text-finn-slate-900 tracking-tight leading-[1.1] mb-6">
                Flexible Jobs.
                <br />
                <span className="gradient-text">Fast Pay.</span>
              </h1>

              <p className="text-lg md:text-xl text-finn-slate-600 leading-relaxed max-w-lg mb-8">
                Connect with part-time opportunities that fit your schedule. Work when you want, get paid when you need.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/jobs">
                  <Button
                    size="lg"
                    className="h-14 px-8 rounded-full bg-finn-slate-900 text-white hover:bg-finn-slate-800 text-base font-medium shadow-lg shadow-finn-slate-900/20 group"
                    data-testid="find-jobs-cta"
                  >
                    Find Jobs
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/for-employers">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 rounded-full border-finn-slate-200 text-finn-slate-700 hover:bg-finn-slate-50 text-base font-medium"
                    data-testid="hire-talent-cta"
                  >
                    Hire Talent
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8 border-t border-finn-slate-100">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-heading font-semibold text-3xl text-finn-slate-900">
                      {stat.value}
                    </div>
                    <div className="text-finn-slate-500 text-sm mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-teal-400/20 to-sky-400/20 rounded-3xl blur-2xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=500&fit=crop"
                  alt="Young professionals working"
                  className="relative rounded-3xl shadow-2xl w-full"
                />
                
                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-finn-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-finn-slate-900">€245.00</p>
                      <p className="text-finn-slate-500 text-sm">Paid in 2 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section bg-finn-slate-50" data-testid="how-it-works-section">
        <div className="container-finn">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading font-semibold text-4xl md:text-5xl text-finn-slate-900 tracking-tight mb-4">
              How FinnJob Works
            </h2>
            <p className="text-lg text-finn-slate-600">
              Get started in three simple steps. No complicated setup, just quick access to opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-white rounded-3xl p-8 border border-finn-slate-100 hover:shadow-lg transition-shadow"
              >
                <span className="text-6xl font-heading font-bold text-finn-slate-100 absolute top-4 right-6">
                  {item.step}
                </span>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-teal-600" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-finn-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-finn-slate-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container-finn">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading font-semibold text-4xl md:text-5xl text-finn-slate-900 tracking-tight mb-6">
                Built for the way you work
              </h2>
              <p className="text-lg text-finn-slate-600 mb-8">
                Whether you're a student, freelancer, or just looking for extra income, FinnJob adapts to your lifestyle.
              </p>

              <div className="space-y-6">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className={`flex gap-4 p-4 rounded-2xl transition-colors ${
                      feature.highlight
                        ? "bg-teal-50 border border-teal-100"
                        : "hover:bg-finn-slate-50"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        feature.highlight
                          ? "bg-teal-500 text-white"
                          : "bg-finn-slate-100 text-finn-slate-600"
                      }`}
                    >
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-finn-slate-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-finn-slate-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=700&fit=crop"
                alt="People working flexibly"
                className="rounded-3xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-finn-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500 rounded-full filter blur-3xl opacity-10"></div>

        <div className="container-finn relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-heading font-semibold text-4xl md:text-5xl text-white tracking-tight mb-6">
              Ready to find your next gig?
            </h2>
            <p className="text-lg text-finn-slate-400 mb-8">
              Join thousands of workers who've discovered flexible opportunities with fast payouts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="h-14 px-8 rounded-full bg-teal-500 text-finn-slate-900 hover:bg-teal-400 text-base font-semibold"
                  data-testid="get-started-cta"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/jobs">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 rounded-full border-finn-slate-700 text-white hover:bg-finn-slate-800 text-base font-medium"
                >
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
