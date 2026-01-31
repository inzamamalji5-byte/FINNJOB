import { Link } from "react-router-dom";

export const Logo = ({ className = "" }) => {
  return (
    <Link to="/" className={`flex items-center gap-1 ${className}`} data-testid="logo">
      <span className="font-heading font-bold text-2xl text-finn-slate-900">Finn</span>
      <span className="font-heading font-bold text-2xl text-teal-500">Job</span>
    </Link>
  );
};

export default Logo;
