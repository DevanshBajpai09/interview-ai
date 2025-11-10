"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ logo }) => {
  const [isUserButtonLoaded, setUserButtonLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const SkeletonLoader = () => (
    <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse shadow-inner"></div>
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserButtonLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const path = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/question", label: "Questions" },
    { href: "/dashboard/upgrade", label: "Upgrade" },
    { href: "/dashboard/howit", label: "How it works?" }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 shadow-sm sticky top-0 z-50">
      <div className="w-[90%] lg:w-[80%] m-auto flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block"
          >
            <Image 
              src={logo} 
              width={60} 
              height={60} 
              alt="logo" 
              className="drop-shadow-sm"
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="relative"
              >
                <div
                  className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                    path === item.href
                      ? "text-blue-600 bg-blue-50 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                  {path === item.href && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </motion.button>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <ModeToggle />
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {isUserButtonLoaded ? (
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                  }
                }}
              />
            ) : (
              <SkeletonLoader />
            )}
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/60"
          >
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={item.href} onClick={() => setIsOpen(false)}>
                    <div
                      className={`px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                        path === item.href
                          ? "text-blue-600 bg-blue-50 shadow-sm border border-blue-100"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;