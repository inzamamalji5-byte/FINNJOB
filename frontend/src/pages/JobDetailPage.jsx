import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Zap,
  BadgeCheck,
  Calendar,
  Share2,
  Heart,
  Building,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function JobDetailPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  const fetchJob = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/jobs/${jobId}`);
      if (!response.ok) throw new Error("Job not found");
      const data = await response.json();
      setJob(data);
    } catch (error) {
      console.error("Error fetching job:", error);
      toast.error("Job not found");
      navigate("/jobs");
    } finally {
      setLoading(false);
    }
  }, [jobId, navigate]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  const handleApply = async () => {
    setApplying(true);
    try {
      const response = await fetch(`${API_URL}/api/jobs/${jobId}/apply`, {
        method: "POST",
        credentials: "include",
      });

      if (response.status === 401) {
        toast.error("Please log in to apply");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Failed to apply");
      }

      toast.success("Application submitted successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setApplying(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  if (loading) {
    return (
      <main className="flex-1 pt-20">
        <div className="container-finn py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-finn-slate-200 rounded w-1/4 mb-8"></div>
            <div className="h-12 bg-finn-slate-200 rounded w-1/2 mb-4"></div>
            <div className="h-6 bg-finn-slate-200 rounded w-1/3"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!job) return null;

  const renderRequirement = (req, idx) => (
    <li key={idx} className="flex items-start gap-3 text-finn-slate-600">
      <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
      <span>{req}</span>
    </li>
  );

  const renderBenefit = (benefit, idx) => (
    <Badge
      key={idx}
      variant="secondary"
      className="bg-finn-slate-100 text-finn-slate-700 px-4 py-2 text-sm"
    >
      {benefit}
    </Badge>
  );

  return (
    <main className="flex-1 pt-20" data-testid="job-detail-page">
      {/* Back Button */}
      <div className="container-finn pt-6">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 text-finn-slate-600 hover:text-finn-slate-900 transition-colors"
          data-testid="back-to-jobs"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </Link>
      </div>

      <div className="container-finn py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            {/* Header */}
            <div className="bg-white rounded-3xl p-8 border border-finn-slate-100 mb-6">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-finn-slate-100 flex-shrink-0">
                  <img
                    src={job.image}
                    alt={job.company}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="font-heading font-semibold text-3xl text-finn-slate-900 mb-2">
                        {job.title}
                      </h1>
                      <div className="flex items-center gap-3">
                        <span className="text-lg text-finn-slate-600">{job.company}</span>
                        {job.employer_verified && (
                          <Badge className="bg-teal-50 text-teal-700 border border-teal-100">
                            <BadgeCheck className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    <div className="flex items-center gap-2 text-finn-slate-600">
                      <MapPin className="w-5 h-5" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-finn-slate-600">
                      <Clock className="w-5 h-5" />
                      <span>{job.shift_type}</span>
                    </div>
                    {job.instant_payout && (
                      <div className="flex items-center gap-2 text-teal-600">
                        <Zap className="w-5 h-5" />
                        <span>Instant Payout</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl p-8 border border-finn-slate-100 mb-6">
              <h2 className="font-heading font-semibold text-xl text-finn-slate-900 mb-4">
                About This Role
              </h2>
              <p className="text-finn-slate-600 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-3xl p-8 border border-finn-slate-100 mb-6">
              <h2 className="font-heading font-semibold text-xl text-finn-slate-900 mb-4">
                Requirements
              </h2>
              <ul className="space-y-3">
                {job.requirements.map(renderRequirement)}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-3xl p-8 border border-finn-slate-100">
              <h2 className="font-heading font-semibold text-xl text-finn-slate-900 mb-4">
                What You'll Get
              </h2>
              <div className="flex flex-wrap gap-3">
                {job.benefits.map(renderBenefit)}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            {/* Apply Card */}
            <div className="bg-white rounded-3xl p-6 border border-finn-slate-100 sticky top-24">
              <div className="text-center mb-6">
                <div className="font-heading font-semibold text-4xl text-finn-slate-900">
                  €{job.pay_rate.toFixed(2)}
                </div>
                <div className="text-finn-slate-500">
                  per {job.pay_frequency === "hourly" ? "hour" : job.pay_frequency}
                </div>
              </div>

              {job.instant_payout && (
                <div className="bg-teal-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-finn-slate-900 text-sm">
                        Instant Payout
                      </p>
                      <p className="text-finn-slate-600 text-xs">
                        Get paid within hours of completing your shift
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleApply}
                disabled={applying}
                className="w-full h-14 rounded-full bg-finn-slate-900 text-white hover:bg-finn-slate-800 text-base font-medium mb-3"
                data-testid="apply-button"
              >
                {applying ? "Applying..." : "Apply Now"}
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="flex-1 h-12 rounded-full border-finn-slate-200"
                  data-testid="share-button"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-12 rounded-full border-finn-slate-200"
                  data-testid="save-button"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>

              <div className="border-t border-finn-slate-100 mt-6 pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Building className="w-5 h-5 text-finn-slate-400" />
                  <span className="font-medium text-finn-slate-900">{job.company}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-finn-slate-400" />
                  <span className="text-finn-slate-600 text-sm">
                    Posted {new Date(job.posted_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
