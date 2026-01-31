import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "For Job Seekers": [
      { href: "/jobs", label: "Browse Jobs" },
      { href: "/for-job-seekers", label: "How It Works" },
      { href: "/signup", label: "Create Account" },
    ],
    "For Employers": [
      { href: "/for-employers", label: "Post a Job" },
      { href: "/for-employers", label: "Pricing" },
      { href: "/for-employers", label: "Why FinnJob" },
    ],
    Company: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/about", label: "Careers" },
    ],
  };

  return (
    <footer className="bg-finn-slate-900 text-white" data-testid="footer">
      <div className="container-finn py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-1 mb-4">
              <span className="font-heading font-bold text-2xl text-white">Finn</span>
              <span className="font-heading font-bold text-2xl text-teal-400">Job</span>
            </div>
            <p className="text-finn-slate-400 mb-6 max-w-sm">
              Connecting students and gig workers with flexible jobs that fit their lifestyle. Fast payouts, verified employers.
            </p>
            <div className="flex flex-col gap-3 text-finn-slate-400">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-400" />
                <span>hello@finnjob.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-400" />
                <span>+358 40 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-teal-400" />
                <span>Helsinki, Finland</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-finn-slate-400 hover:text-teal-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-finn-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-finn-slate-500 text-sm">
            © {currentYear} FinnJob. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-finn-slate-500">
            <Link to="/about" className="hover:text-teal-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-teal-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/about" className="hover:text-teal-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
