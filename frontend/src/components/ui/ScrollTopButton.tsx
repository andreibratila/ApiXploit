import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const ScrollTopButton = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <button
      onClick={scrollToTop}
      className={`
    fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-lg
    transition-all duration-300 hover:bg-blue-700 focus:outline-none
    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer
    ${
      showBackToTop
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-16 pointer-events-none"
    }
  `}
      aria-label="Back to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};
