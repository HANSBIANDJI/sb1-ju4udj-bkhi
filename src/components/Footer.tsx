import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container px-4 py-8 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/parfums" className="text-sm hover:text-purple-600 transition-colors">
                  Nos Parfums
                </Link>
              </li>
              <li>
                <Link to="/nouveautes" className="text-sm hover:text-purple-600 transition-colors">
                  Nouveautés
                </Link>
              </li>
              <li>
                <Link to="/promotions" className="text-sm hover:text-purple-600 transition-colors">
                  Promotions
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>+225 07 59 93 70 93</li>
              <li>babismell@gmail.com</li>
              <li>Cocody Blockhauss, Abidjan</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Aide</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-sm hover:text-purple-600 transition-colors">
                  Livraison
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-purple-600 transition-colors">
                  Retours
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-purple-600 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <form className="flex gap-2">
              <Input placeholder="Votre email" type="email" />
              <Button type="submit" className="bg-purple-600 text-white hover:bg-purple-700">
                OK
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center text-sm">
          © {new Date().getFullYear()} Babismell. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}