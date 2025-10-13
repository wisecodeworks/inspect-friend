import { Link, useLocation } from "react-router-dom";
import { Home, BookmarkIcon } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          CSS Inspector
        </Link>
        
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          
          <Link
            to="/bookmarklet"
            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
              isActive("/bookmarklet") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <BookmarkIcon className="h-4 w-4" />
            <span>Install Bookmarklet</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
