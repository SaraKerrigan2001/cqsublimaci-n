"use client"

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 rounded-full w-12 h-12 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/40 border border-white/10 animate-in fade-in slide-in-from-bottom-4 transition-all hover:scale-110"
      size="icon"
      title="Volver arriba"
    >
      <ChevronUp className="w-6 h-6" />
    </Button>
  );
}
