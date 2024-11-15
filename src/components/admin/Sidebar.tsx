import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Tags,
  Percent,
  LogOut
} from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Package, label: 'Produits', path: '/admin/products' },
  { icon: ShoppingCart, label: 'Commandes', path: '/admin/orders' },
  { icon: Tags, label: 'Catégories', path: '/admin/categories' },
  { icon: Percent, label: 'Promotions', path: '/admin/promotions' },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logoutAdmin } = useAdmin();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen w-64 bg-white border-r flex flex-col">
      <div className="p-6 border-b">
        <Link to="/admin" className="block">
          <h1 className="text-2xl font-bold text-purple-600">BABISMELL</h1>
          <p className="text-sm text-gray-500">Administration</p>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors",
              location.pathname === path
                ? "bg-purple-50 text-purple-600"
                : "hover:bg-gray-50"
            )}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-8 py-4 hover:bg-gray-50 text-red-600 border-t w-full"
      >
        <LogOut className="h-5 w-5" />
        Déconnexion
      </button>
    </div>
  );
}