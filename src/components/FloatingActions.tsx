import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? (window.scrollY / h) * 100 : 0;
      setProgress(p);
      setShow(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* scroll progress */}
      <div className="fixed top-0 inset-x-0 h-1 z-[60] pointer-events-none">
        <div
          className="h-full gradient-accent transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* WhatsApp */}
      <a
        href="https://wa.me/918788390876"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 h-14 w-14 grid place-items-center rounded-full bg-[oklch(0.62_0.17_145)] text-white shadow-elevated animate-pulse-ring hover:scale-110 transition"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 fill-current" />
      </a>

      {/* Back to top */}
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-6 z-40 h-11 w-11 grid place-items-center rounded-full bg-primary text-primary-foreground shadow-elevated hover:scale-110 transition animate-fade-in"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
