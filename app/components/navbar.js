'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Remove all theme state, useEffect, and toggleTheme logic
  // Remove the theme toggle button from both desktop and mobile menus
  // Restore all classNames to use only dark theme classes

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about-us', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="relative group flex items-center h-12">
            <Image src="/assets/getsolar-logo.png" alt="GetSolar Logo" width={120} height={40} className="object-contain" priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium relative transition-all duration-300 ${
                  pathname === link.href 
                    ? 'text-pink-400' 
                    : 'text-black hover:text-pink-400'
                }`}
              >
                <span className="relative">
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 ${
                    pathname === link.href ? 'w-full' : 'group-hover:w-full'
                  }`}></span>
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-all duration-200 hover:scale-110"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-medium transition-all duration-200 hover:translate-x-2 ${
                    pathname === link.href 
                      ? 'text-pink-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {/* Theme Toggle Button for mobile */}
              {/* Remove all theme state, useEffect, and toggleTheme logic */}
              {/* Remove the theme toggle button from both desktop and mobile menus */}
              {/* Restore all classNames to use only dark theme classes */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
