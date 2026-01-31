import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Heart, Zap, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Worker-First",
      description: "Everything we build starts with what's best for the people doing the work.",
    },
    {
      icon: Heart,
      title: "Trust & Safety",
      description: "We verify every employer and worker to create a marketplace you can trust.",
    },
    {
      icon: Zap,
      title: "Speed Matters",
      description: "Fast job matching, fast payouts. Your time is valuable.",
    },
    {
      icon: Users,
      title: "Community",
      description: "We're building more than a platform—we're building a community.",
    },
  ];

  const milestones = [
    { year: "2022", event: "FinnJob founded in Helsinki" },
    { year: "2023", event: "Reached 5,000 active workers" },
    { year: "2024", event: "Expanded to 5 Finnish cities" },
    { year: "2025", event: "15,000+ workers, 890+ employers" },
  ];

  const team = [
    { name: "Anna Virtanen", role: "CEO & Co-founder", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" },
    { name: "Mikko Lahtinen", role: "CTO & Co-founder", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" },
    { name: "Sara Korhonen", role: "Head of Operations", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop" },
  ];

  return (
    <main className="flex-1 pt-20" data-testid="about-page">
      {/* Hero */}
      <section className="bg-white">
        <div className="container-finn py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="font-heading font-semibold text-5xl md:text-6xl text-finn-slate-900 tracking-tight leading-[1.1] mb-6">
              Making Work Work for Everyone
            </h1>
            <p className="text-xl text-finn-slate-600 leading-relaxed">
              FinnJob was born from a simple idea: work should fit your life, not the other way around. 
              We're on a mission to connect people with flexible opportunities that respect their time 
              and reward their effort—instantly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image */}
      <section className="bg-finn-slate-50">
        <div className="container-finn py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=500&fit=crop"
              alt="FinnJob team"
              className="rounded-3xl shadow-lg w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section bg-white">
        <div className="container-finn">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading font-semibold text-4xl text-finn-slate-900 tracking-tight mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-finn-slate-600 text-lg leading-relaxed">
                <p>
                  In 2022, we noticed something broken in the world of part-time work. Students were 
                  struggling to find gigs that fit their schedules. Workers waited weeks to get paid. 
                  And employers couldn't find reliable staff when they needed them.
                </p>
                <p>
                  So we built FinnJob—a platform designed from the ground up to fix these problems. 
                  We made it easy to find flexible work, simplified the application process, and 
                  introduced instant payouts so workers don't have to wait for what they've earned.
                </p>
                <p>
                  Today, we're proud to serve thousands of workers and hundreds of employers across 
                  Finland. But we're just getting started.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-finn-slate-50 rounded-3xl p-8">
              <h3 className="font-heading font-semibold text-xl text-finn-slate-900 mb-6">
                Our Journey
              </h3>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className="flex gap-4">
                    <div className="w-16 flex-shrink-0">
                      <span className="font-heading font-semibold text-teal-600">
                        {milestone.year}
                      </span>
                    </div>
                    <div className="flex-1 pb-6 border-b border-finn-slate-200 last:border-0 last:pb-0">
                      <p className="text-finn-slate-700">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-finn-slate-50">
        <div className="container-finn">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading font-semibold text-4xl text-finn-slate-900 tracking-tight mb-4">
              What We Stand For
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border border-finn-slate-100"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-finn-slate-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-finn-slate-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-white">
        <div className="container-finn">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading font-semibold text-4xl text-finn-slate-900 tracking-tight mb-4">
              Meet the Team
            </h2>
            <p className="text-lg text-finn-slate-600">
              The people building the future of flexible work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((member) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-heading font-semibold text-lg text-finn-slate-900">
                  {member.name}
                </h3>
                <p className="text-finn-slate-600 text-sm">{member.role}</p>
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
              Join Our Mission
            </h2>
            <p className="text-lg text-finn-slate-400 mb-8">
              Whether you're looking for work or looking to hire, we'd love to have you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/jobs">
                <Button
                  size="lg"
                  className="h-14 px-8 rounded-full bg-teal-500 text-finn-slate-900 hover:bg-teal-400 text-base font-semibold"
                >
                  Find Jobs
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/for-employers">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 rounded-full border-finn-slate-700 text-white hover:bg-finn-slate-800"
                >
                  Hire Workers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
