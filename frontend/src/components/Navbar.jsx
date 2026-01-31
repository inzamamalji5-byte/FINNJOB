import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "./Logo";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        // Not logged in
      }
    };
    checkAuth();
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navLinks = [
    { href: "/jobs", label: "Find Jobs" },
    { href: "/for-job-seekers", label: "For Job Seekers" },
    { href: "/for-employers", label: "For Employers" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "navbar-glass shadow-sm" : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <nav className="container-finn">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-finn-slate-900 ${
                  isActive(link.href)
                    ? "text-finn-slate-900"
                    : "text-finn-slate-500"
                }`}
                data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 h-10 px-4 rounded-full hover:bg-finn-slate-100"
                    data-testid="user-menu-button"
                  >
                    {user.picture ? (
                      <img
                        src={user.picture}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-teal-600" />
                      </div>
                    )}
                    <span className="text-finn-slate-700">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer" data-testid="nav-dashboard">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600"
                    data-testid="logout-button"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="h-10 px-6 rounded-full text-finn-slate-600 hover:text-finn-slate-900 hover:bg-finn-slate-100"
                    data-testid="login-button"
                  >
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    className="h-10 px-6 rounded-full bg-finn-slate-900 text-white hover:bg-finn-slate-800"
                    data-testid="signup-button"
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-finn-slate-100"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="mobile-menu-button"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-finn-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-finn-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-finn-slate-100" data-testid="mobile-menu">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-finn-slate-100 text-finn-slate-900"
                      : "text-finn-slate-600 hover:bg-finn-slate-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-finn-slate-100 my-2"></div>
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="px-4 py-3 rounded-xl text-base font-medium text-finn-slate-600 hover:bg-finn-slate-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="px-4 py-3 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-3 rounded-xl text-base font-medium text-finn-slate-600 hover:bg-finn-slate-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-3 rounded-xl text-base font-medium bg-finn-slate-900 text-white text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
