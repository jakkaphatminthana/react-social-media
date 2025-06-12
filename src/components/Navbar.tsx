import { useState } from "react";
import { Link } from "react-router";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useAuthStore } from "../store/useAuthStore";
import AuthButton from "./button/AuthButton";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  //   const { user, signInWithGitHub, signOut } = useAuthStore();
  const user = useAuthStore((state) => state.user);
  const signInWithGitHub = useAuthStore((state) => state.signInWithGitHub);
  const signOut = useAuthStore((state) => state.signOut);

  const links = [
    { to: "/", label: "Home" },
    { to: "/create", label: "Create Post" },
    { to: "/communities", label: "Communities" },
    { to: "/communities/create", label: "Create Community" },
  ];

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(10, 10, 10, 0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-mono text-xl font-bold text-white">
            forum<span className="text-purple-500">.app</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <AuthButton
            user={user}
            signInWithGitHub={signInWithGitHub}
            signOut={signOut}
          />

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-gray-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? <IoClose size={24} /> : <RxHamburgerMenu size={24} />}
            </button>
          </div>

          {/* Mobile Links */}
          {menuOpen && (
            <div className="md:hidden bg-[rgba(10,10,10, 0.9)]">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {links.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
