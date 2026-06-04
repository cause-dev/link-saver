"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useModal } from "@/context/modal-context";
import {
  Menu,
  X,
  Plus,
  LogOut,
  LayoutDashboard,
  Link as LinkIcon,
} from "lucide-react";

const MainHeader = () => {
  const { isPending, data } = useSession();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { openAddLink } = useModal();
  const pathname = usePathname();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    { name: "My Links", href: "/links", icon: <LinkIcon size={18} /> },
  ];

  if (isPending)
    return <div className="h-20 w-full animate-pulse bg-surface-2/50" />;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-surface-2/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
            <LinkIcon className="text-white" />
          </div>
          <h2 className="hidden text-xl font-bold tracking-tight text-fg sm:block">
            Link<span className="text-primary">Saver</span>
          </h2>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href ? "text-primary" : "text-fg/70"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={openAddLink}
                className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 active:scale-95"
              >
                <Plus size={18} />
                Add Link
              </button>
            </li>
          </ul>
        </nav>

        {/* Right Section: Auth & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div ref={ref} className="relative">
            {!data?.user ? (
              <Link
                href="/sign-in"
                className="rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-semibold text-fg transition-all hover:bg-white/10"
              >
                Sign In
              </Link>
            ) : (
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 p-1 pr-4 transition-all hover:bg-white/10"
              >
                <Image
                  src={data.user.image ?? "/cat.png"}
                  width={32}
                  height={32}
                  alt="avatar"
                  className="rounded-full border border-white/20"
                />
                <span className="hidden text-sm font-medium text-fg sm:block">
                  {data.user.name?.split(" ")[0]}
                </span>
              </button>
            )}

            {/* User Dropdown */}
            {openDropdown && (
              <div className="absolute right-0 mt-3 w-48 overflow-hidden rounded-2xl border border-white/10 bg-surface-2 shadow-2xl">
                <div className="border-b border-white/5 px-4 py-3">
                  <p className="text-xs text-fg/50">Signed in as</p>
                  <p className="truncate text-sm font-medium">
                    {data?.user?.email}
                  </p>
                </div>
                <button
                  onClick={() => signOut()}
                  className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-400 transition-colors hover:bg-red-400/10"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="rounded-lg p-2 text-fg hover:bg-white/5 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="absolute inset-x-0 top-20 z-40 border-b border-white/10 bg-surface-2 p-6 shadow-xl md:hidden">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 text-lg font-medium text-fg/80 transition-colors hover:text-primary"
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <button
                onClick={() => {
                  openAddLink();
                  closeMobileMenu();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white transition-transform active:scale-[0.98]"
              >
                <Plus size={20} />
                Add New Link
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default MainHeader;
