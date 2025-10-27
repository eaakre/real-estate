"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, ChevronRight } from "lucide-react";
import Drawer from "./ui/Drawer";
// import Image from "next/image";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={`bg-primary sticky top-0 z-50 md:px-20 transition-transform duration-500 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold py-8">
            {/* <Image
              src="/images/numbers-and-nostalgia-logo.svg"
              alt="Jeremy Kopp - Real Estate"
              width={220}
              height={64}
              priority
            /> */}
            Jeremy Kopp
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks />
          </div>

          <button
            className="md:hidden"
            aria-label="Open Navigation Menu"
            onClick={() => setIsOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </nav>
      <div className="h-px bg-gradient-to-r from-transparent via-secondary-foreground/20 to-transparent"></div>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        direction="right"
      >
        <nav className="space-y-4 mt-8">
          <div className="flex flex-col divide-y divide-secondary-foreground gap-y-5">
            <NavLinks onClick={() => setIsOpen(false)} />
          </div>
        </nav>
      </Drawer>
    </>
  );
}

function NavLinks({ onClick }: { onClick?: () => void }) {
  return (
    <>
      <Link
        href="/listings"
        className="flex w-full justify-between md:w-auto hover:text-primary-hover py-5 md:py-0"
        onClick={onClick}
      >
        Listings
        <ChevronRight className="md:hidden" />
      </Link>
      <Link
        href="/blog"
        className="flex w-full justify-between md:w-auto hover:text-primary-hover py-5 md:py-0"
        onClick={onClick}
      >
        Blog
        <ChevronRight className="md:hidden" />
      </Link>
      <Link
        href="/contact"
        className="flex w-full justify-between md:w-auto hover:text-primary-hover py-5 md:py-0"
        onClick={onClick}
      >
        Contact
        <ChevronRight className="md:hidden" />
      </Link>
      <Link
        href="/about"
        className="flex w-full justify-between md:w-auto hover:text-primary-hover py-5 md:py-0"
        onClick={onClick}
      >
        About
        <ChevronRight className="md:hidden" />
      </Link>
    </>
  );
}
