import { Link } from "react-router-dom";
import { Search, ShoppingBag, Heart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();
  const { favorites } = useFavorites();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-6">
                <button 
                  className="text-left text-lg font-medium hover:text-purple-600 transition-colors" 
                  onClick={() => handleNavigation("/")}
                >
                  Accueil
                </button>
                <button 
                  className="text-left text-lg font-medium hover:text-purple-600 transition-colors" 
                  onClick={() => handleNavigation("/parfums")}
                >
                  Parfums
                </button>
                <button 
                  className="text-left text-lg font-medium hover:text-purple-600 transition-colors" 
                  onClick={() => handleNavigation("/nouveautes")}
                >
                  Nouveautés
                </button>
                <button 
                  className="text-left text-lg font-medium hover:text-purple-600 transition-colors" 
                  onClick={() => handleNavigation("/promotions")}
                >
                  Promotions
                </button>
              </nav>
            </SheetContent>
          </Sheet>

          <Link 
            to="/" 
            className="text-2xl font-bold text-purple-600 hover:scale-105 transition-transform"
          >
            BABISMELL
          </Link>
        </div>
        
        <nav className="hidden md:flex gap-6">
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors" to="/parfums">
            Parfums
          </Link>
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors" to="/nouveautes">
            Nouveautés
          </Link>
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors" to="/promotions">
            Promotions
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block relative w-full max-w-sm">
            <Input
              className="pl-8 rounded-full"
              placeholder="Rechercher un parfum..."
              type="search"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="h-24">
              <div className="h-full flex items-center px-4">
                <div className="relative w-full">
                  <Input
                    className="pl-8 rounded-full"
                    placeholder="Rechercher un parfum..."
                    type="search"
                    autoFocus
                  />
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <Link to="/favoris">
            <Button size="icon" variant="ghost" className="relative hover:text-purple-600">
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-purple-600 text-[10px] font-medium text-white flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Button>
          </Link>
          
          <Link to="/commande">
            <Button size="icon" variant="ghost" className="relative hover:text-purple-600">
              <ShoppingBag className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-purple-600 text-[10px] font-medium text-white flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </Link>
          
          <Link to={isAuthenticated ? "/profile" : "/login"}>
            <Button size="icon" variant="ghost" className="hover:text-purple-600">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}