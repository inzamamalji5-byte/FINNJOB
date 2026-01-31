import { Link } from "react-router-dom";
import { MapPin, Clock, Zap, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const JobCard = ({ job }) => {
  return (
    <Link
      to={`/jobs/${job.job_id}`}
      className="block bg-white rounded-2xl border border-finn-slate-100 p-6 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 group"
      data-testid={`job-card-${job.job_id}`}
    >
      <div className="flex items-start gap-4">
        {/* Company Image */}
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-finn-slate-100 flex-shrink-0">
          <img
            src={job.image}
            alt={job.company}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Job Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-heading font-semibold text-lg text-finn-slate-900 group-hover:text-teal-600 transition-colors">
                {job.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-finn-slate-600">{job.company}</span>
                {job.employer_verified && (
                  <BadgeCheck className="w-4 h-4 text-teal-500" />
                )}
              </div>
            </div>

            {/* Pay Rate */}
            <div className="text-right flex-shrink-0">
              <span className="font-heading font-semibold text-xl text-finn-slate-900">
                €{job.pay_rate.toFixed(2)}
              </span>
              <span className="text-finn-slate-500 text-sm">/{job.pay_frequency === 'hourly' ? 'hr' : job.pay_frequency}</span>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <div className="flex items-center gap-1.5 text-finn-slate-500 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-finn-slate-500 text-sm">
              <Clock className="w-4 h-4" />
              <span>{job.shift_type}</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            {job.instant_payout && (
              <Badge className="bg-teal-50 text-teal-700 border border-teal-100 hover:bg-teal-100">
                <Zap className="w-3 h-3 mr-1" />
                Instant Payout
              </Badge>
            )}
            <Badge variant="secondary" className="bg-finn-slate-100 text-finn-slate-600">
              {job.shift_type}
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
