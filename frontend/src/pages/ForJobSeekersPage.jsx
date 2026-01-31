import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Zap,
  Shield,
  Clock,
  Wallet,
  MapPin,
  Star,
  ArrowRight,
  CheckCircle,
  Calendar,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForJobSeekersPage() {
  const benefits = [
    {
      icon: Zap,
      title: "Instant Payouts",
      description: "Get paid within hours of completing your shift. No more waiting weeks for payday.",
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Work when you want. Perfect for students, parents, or anyone with a busy life.",
    },
    {
      icon: Shield,
      title: "Verified Employers",
      description: "Every employer is vetted. Work with confidence knowing you're in safe hands.",
    },
    {
      icon: MapPin,
      title: "Jobs Near You",
      description: "Find opportunities in your area. Less commute, more time for what matters.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Sign up in under 2 minutes. Add your skills, availability, and preferred job types.",
    },
    {
      number: "02",
      title: "Browse & Apply",
      description: "Filter jobs by location, pay rate, and shift type. Apply with a single tap.",
    },
    {
      number: "03",
      title: "Work & Get Paid",
      description: "Show up, do great work, and receive your earnings—often within hours.",
    },
  ];

  const testimonials = [
    {
      name: "Emma S.",
      role: "University Student",
      quote: "FinnJob helped me find flexible shifts around my class schedule. The instant payouts are a game-changer!",
      rating: 5,
    },
    {
      name: "Marcus T.",
      role: "Freelancer",
      quote: "I love the variety of gigs available. One week I'm at an event, the next I'm helping with deliveries.",
      rating: 5,
    },
    {
      name: "Lisa K.",
      role: "Part-time Worker",
      quote: "Finally, a platform that respects my time. I choose when I work and get paid fast.",
      rating: 5,
    },
  ];

  return (
    <main className="flex-1 pt-20" data-testid="for-job-seekers-page">
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
                <Users className="w-4 h-4" />
                <span>Join 15,000+ Workers</span>
              </div>

              <h1 className="font-heading font-semibold text-5xl md:text-6xl text-finn-slate-900 tracking-tight leading-[1.1] mb-6">
                Work on Your Terms
              </h1>

              <p className="text-lg md:text-xl text-finn-slate-600 leading-relaxed mb-8">
                Find flexible gigs that fit your life. Set your own schedule, choose jobs you love, and get paid fast.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="h-14 px-8 rounded-full bg-finn-slate-900 text-white hover:bg-finn-slate-800 text-base font-medium shadow-lg shadow-finn-slate-900/20"
                    data-testid="signup-cta"
                  >
                    Start Earning
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/jobs">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 rounded-full border-finn-slate-200 text-finn-slate-700"
                  >
                    Browse Jobs
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block"
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=500&fit=crop"
                alt="People working flexibly"
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
              Why Workers Love FinnJob
            </h2>
            <p className="text-lg text-finn-slate-600">
              Built by workers, for workers. We understand what matters to you.
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

      {/* How It Works */}
      <section className="section bg-white">
        <div className="container-finn">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading font-semibold text-4xl text-finn-slate-900 tracking-tight mb-4">
              Getting Started is Easy
            </h2>
            <p className="text-lg text-finn-slate-600">
              Three simple steps to your first flexible gig.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <span className="text-8xl font-heading font-bold text-finn-slate-100 absolute -top-4 -left-2">
                  {step.number}
                </span>
                <div className="relative z-10 pt-8">
                  <h3 className="font-heading font-semibold text-xl text-finn-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-finn-slate-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-finn-slate-50">
        <div className="container-finn">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading font-semibold text-4xl text-finn-slate-900 tracking-tight mb-4">
              What Workers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border border-finn-slate-100"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-finn-slate-600 mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-finn-slate-900">{testimonial.name}</p>
                  <p className="text-finn-slate-500 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-finn-slate-900">
        <div className="container-finn">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading font-semibold text-4xl text-white tracking-tight mb-4">
              Ready to Start Earning?
            </h2>
            <p className="text-lg text-finn-slate-400 mb-8">
              Join thousands of workers who've found their perfect flexible gig.
            </p>
            <Link to="/signup">
              <Button
                size="lg"
                className="h-14 px-8 rounded-full bg-teal-500 text-finn-slate-900 hover:bg-teal-400 text-base font-semibold"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
