import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ShoppingBag, Minus, Plus, X, CreditCard } from "lucide-react";
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { perfumes } from '@/data/perfumes';

export default function Commande() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const { isAuthenticated } = useAuth();

  const cartItems = items.map(item => ({
    ...item,
    perfume: perfumes.find(p => p.id === item.id)!
  }));

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-6">
            <ShoppingBag className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Mon Panier</h1>
          <p className="text-lg text-muted-foreground">
            Finalisez votre commande en toute sécurité
          </p>
        </motion.div>

        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="lg:col-span-2"
            >
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={item}
                    className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-6"
                  >
                    <img
                      src={item.perfume.image}
                      alt={item.perfume.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.perfume.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.perfume.brand}</p>
                      <p className="font-bold mt-2">
                        {item.perfume.price.toLocaleString('fr-FR')} FCFA
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                <h2 className="text-xl font-semibold mb-6">Récapitulatif</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{getTotalPrice().toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span>2,000 FCFA</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{(getTotalPrice() + 2000).toLocaleString('fr-FR')} FCFA</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={handleCheckout}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Procéder au paiement
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
              <ShoppingBag className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Votre panier est vide</h2>
            <p className="text-muted-foreground mb-8">
              Découvrez notre collection de parfums et commencez votre shopping
            </p>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => navigate('/parfums')}
            >
              Continuer mes achats
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}