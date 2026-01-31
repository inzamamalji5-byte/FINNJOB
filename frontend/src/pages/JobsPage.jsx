import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Clock, Zap, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import JobCard from "@/components/JobCard";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [location, setLocation] = useState("all");
  const [shiftType, setShiftType] = useState("all");
  const [instantPayoutOnly, setInstantPayoutOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const locations = ["all", "Helsinki", "Espoo", "Tampere", "Vantaa", "Remote"];
  const shiftTypes = ["all", "Part-time", "Flexible", "Gig"];

  useEffect(() => {
    fetchJobs();
  }, [location, shiftType, instantPayoutOnly]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/api/jobs?`;
      if (location !== "all") url += `location=${location}&`;
      if (shiftType !== "all") url += `shift_type=${shiftType}&`;
      if (instantPayoutOnly) url += `instant_payout=true&`;

      const response = await fetch(url);
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query)
    );
  });

  const clearFilters = () => {
    setLocation("all");
    setShiftType("all");
    setInstantPayoutOnly(false);
    setSearchQuery("");
  };

  const hasActiveFilters =
    location !== "all" || shiftType !== "all" || instantPayoutOnly;

  return (
    <main className="flex-1 pt-20" data-testid="jobs-page">
      {/* Header */}
      <section className="bg-white border-b border-finn-slate-100">
        <div className="container-finn py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading font-semibold text-4xl md:text-5xl text-finn-slate-900 tracking-tight mb-4">
              Find Your Next Gig
            </h1>
            <p className="text-lg text-finn-slate-600 max-w-2xl">
              Browse flexible jobs that fit your schedule. Filter by location, shift type, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-finn-slate-50 border-b border-finn-slate-100 sticky top-16 md:top-20 z-40">
        <div className="container-finn py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-finn-slate-400" />
              <Input
                placeholder="Search jobs, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-xl border-finn-slate-200 bg-white"
                data-testid="job-search-input"
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-4">
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-40 h-12 rounded-xl border-finn-slate-200 bg-white" data-testid="location-filter">
                  <MapPin className="w-4 h-4 mr-2 text-finn-slate-400" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc === "all" ? "All Locations" : loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={shiftType} onValueChange={setShiftType}>
                <SelectTrigger className="w-40 h-12 rounded-xl border-finn-slate-200 bg-white" data-testid="shift-type-filter">
                  <Clock className="w-4 h-4 mr-2 text-finn-slate-400" />
                  <SelectValue placeholder="Shift Type" />
                </SelectTrigger>
                <SelectContent>
                  {shiftTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "all" ? "All Types" : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-finn-slate-200">
                <Zap className="w-4 h-4 text-teal-500" />
                <Label htmlFor="instant-payout" className="text-sm text-finn-slate-600 cursor-pointer">
                  Instant Payout
                </Label>
                <Switch
                  id="instant-payout"
                  checked={instantPayoutOnly}
                  onCheckedChange={setInstantPayoutOnly}
                  data-testid="instant-payout-filter"
                />
              </div>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-finn-slate-500 hover:text-finn-slate-900"
                  data-testid="clear-filters-button"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden h-12 rounded-xl border-finn-slate-200"
              data-testid="mobile-filters-toggle"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 w-5 h-5 rounded-full bg-teal-500 text-white text-xs flex items-center justify-center">
                  {(location !== "all" ? 1 : 0) +
                    (shiftType !== "all" ? 1 : 0) +
                    (instantPayoutOnly ? 1 : 0)}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pt-4 border-t border-finn-slate-200"
            >
              <div className="grid grid-cols-2 gap-4">
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="h-12 rounded-xl border-finn-slate-200 bg-white">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc === "all" ? "All Locations" : loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={shiftType} onValueChange={setShiftType}>
                  <SelectTrigger className="h-12 rounded-xl border-finn-slate-200 bg-white">
                    <SelectValue placeholder="Shift Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {shiftTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === "all" ? "All Types" : type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-teal-500" />
                  <Label htmlFor="instant-payout-mobile" className="text-sm text-finn-slate-600">
                    Instant Payout Only
                  </Label>
                </div>
                <Switch
                  id="instant-payout-mobile"
                  checked={instantPayoutOnly}
                  onCheckedChange={setInstantPayoutOnly}
                />
              </div>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="w-full mt-4 text-finn-slate-500"
                >
                  Clear All Filters
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Job Listings */}
      <section className="container-finn py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-finn-slate-600">
            {loading ? (
              "Loading..."
            ) : (
              <>
                <span className="font-semibold text-finn-slate-900">
                  {filteredJobs.length}
                </span>{" "}
                jobs found
              </>
            )}
          </p>
        </div>

        {loading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-finn-slate-100 animate-pulse"
              >
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-finn-slate-200 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-finn-slate-200 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-finn-slate-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-finn-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-finn-slate-400" />
            </div>
            <h3 className="font-heading font-semibold text-xl text-finn-slate-900 mb-2">
              No jobs found
            </h3>
            <p className="text-finn-slate-600 mb-4">
              Try adjusting your filters or search query
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid gap-4"
          >
            {filteredJobs.map((job) => (
              <motion.div
                key={job.job_id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  );
}
