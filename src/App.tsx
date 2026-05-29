import { Heart } from "lucide-react";
import { Link } from "./components/AppLink";
import { FloatingActions } from "./components/FloatingActions";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { useLocation } from "./lib/navigation";
import HomePage from "./routes";
import AboutPage from "./routes/about";
import ActivitiesPage from "./routes/activities";
import ContactPage from "./routes/contact";
import DonatePage from "./routes/donate";
import FounderPage from "./routes/founder";
import GalleryPage from "./routes/gallery";

const titles: Record<string, string> = {
  "/": "Dr. A.G.S.S.T Trust - Together We Can Transform Lives",
  "/about": "About Us - Dr. A.G.S.S.T Trust",
  "/founder": "Founder - Dr. Anilkumar Baliram Gaikwad",
  "/activities": "Our Activities - Dr. A.G.S.S.T Trust",
  "/gallery": "Gallery - Dr. A.G.S.S.T Trust",
  "/donate": "Donate - Dr. A.G.S.S.T Trust",
  "/contact": "Contact - Dr. A.G.S.S.T Trust",
};

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-20">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display font-bold text-gradient-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow-blue"
        >
          <Heart className="h-4 w-4 fill-current" />
          Go home
        </Link>
      </div>
    </div>
  );
}

function CurrentPage() {
  const { pathname } = useLocation();
  document.title = titles[pathname] ?? titles["/"];

  switch (pathname) {
    case "/":
      return <HomePage />;
    case "/about":
      return <AboutPage />;
    case "/founder":
      return <FounderPage />;
    case "/activities":
      return <ActivitiesPage />;
    case "/gallery":
      return <GalleryPage />;
    case "/donate":
      return <DonatePage />;
    case "/contact":
      return <ContactPage />;
    default:
      return <NotFoundPage />;
  }
}

export default function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <CurrentPage />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
