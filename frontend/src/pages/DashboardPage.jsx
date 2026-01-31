import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Briefcase,
  Clock,
  Zap,
  MapPin,
  Calendar,
  TrendingUp,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function DashboardPage() {
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user || null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data if not passed from auth
    if (!user) {
      fetchUser();
    }
    fetchApplications();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/me`, {
        credentials: "include",
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch(`${API_URL}/api/my-applications`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: Briefcase, label: "Applications", value: applications.length },
    { icon: Clock, label: "Pending", value: applications.filter(a => a.status === "pending").length },
    { icon: Zap, label: "Hours Worked", value: "0" },
    { icon: TrendingUp, label: "Earnings", value: "€0.00" },
  ];

  return (
    <main className="flex-1 pt-20 bg-finn-slate-50 min-h-screen" data-testid="dashboard-page">
      <div className="container-finn py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-2">
            {user?.picture ? (
              <img
                src={user.picture}
                alt={user.name}
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center">
                <User className="w-8 h-8 text-teal-600" />
              </div>
            )}
            <div>
              <h1 className="font-heading font-semibold text-3xl text-finn-slate-900">
                Welcome back, {user?.name?.split(" ")[0] || "there"}!
              </h1>
              <p className="text-finn-slate-600">{user?.email}</p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-6 border border-finn-slate-100"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center mb-3">
                <stat.icon className="w-5 h-5 text-teal-600" />
              </div>
              <div className="font-heading font-semibold text-2xl text-finn-slate-900">
                {stat.value}
              </div>
              <div className="text-finn-slate-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Applications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl border border-finn-slate-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-semibold text-xl text-finn-slate-900">
                  My Applications
                </h2>
                <Link to="/jobs">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Search className="w-4 h-4 mr-2" />
                    Find Jobs
                  </Button>
                </Link>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-20 bg-finn-slate-100 rounded-xl"></div>
                    </div>
                  ))}
                </div>
              ) : applications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-finn-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-finn-slate-400" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-finn-slate-900 mb-2">
                    No applications yet
                  </h3>
                  <p className="text-finn-slate-600 mb-4">
                    Start applying to jobs to see them here
                  </p>
                  <Link to="/jobs">
                    <Button className="rounded-full">Browse Jobs</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <Link
                      key={app.application_id}
                      to={`/jobs/${app.job_id}`}
                      className="block p-4 bg-finn-slate-50 rounded-xl hover:bg-finn-slate-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-finn-slate-900">
                            {app.job_title}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-finn-slate-600 mt-1">
                            <span>{app.company}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {app.location}
                            </span>
                          </div>
                        </div>
                        <Badge
                          className={
                            app.status === "pending"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-100"
                              : app.status === "accepted"
                              ? "bg-green-50 text-green-700 border-green-100"
                              : "bg-finn-slate-100 text-finn-slate-600"
                          }
                        >
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl border border-finn-slate-100 p-6 mb-6">
              <h2 className="font-heading font-semibold text-xl text-finn-slate-900 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link to="/jobs" className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 rounded-xl"
                  >
                    <Search className="w-4 h-4 mr-3" />
                    Find New Jobs
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 rounded-xl"
                  disabled
                >
                  <Calendar className="w-4 h-4 mr-3" />
                  View Schedule
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 rounded-xl"
                  disabled
                >
                  <Zap className="w-4 h-4 mr-3" />
                  Request Payout
                </Button>
              </div>
            </div>

            {/* Instant Payout Card */}
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="font-semibold">Instant Payout</span>
              </div>
              <p className="text-teal-100 text-sm mb-4">
                Get your earnings within hours of completing a shift. No more waiting!
              </p>
              <div className="text-2xl font-heading font-bold">€0.00</div>
              <div className="text-teal-200 text-sm">Available balance</div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
