import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { motion } from 'framer-motion';

interface PerfumeCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  isNew?: boolean;
  isOnSale?: boolean;
  discount?: number;
}

export function PerfumeCard({
  id,
  name,
  brand,
  price,
  image,
  isNew,
  isOnSale,
  discount
}: PerfumeCardProps) {
  const { addToCart } = useCart();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const finalPrice = isOnSale && discount ? price * (1 - discount / 100) : price;
  const favorite = isFavorite(id);

  return (
    <Card className="group overflow-hidden">
      <CardContent className="p-0 relative">
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          {isNew && (
            <Badge className="bg-purple-500">Nouveau</Badge>
          )}
          {isOnSale && (
            <Badge variant="destructive">-{discount}%</Badge>
          )}
        </div>
        <div className="relative aspect-[3/4] sm:aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full transition-transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full"
                onClick={() => favorite ? removeFromFavorites(id) : addToFavorites(id)}
              >
                <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${favorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full"
                onClick={() => addToCart(id)}
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-3 sm:p-4">
        <p className="text-xs sm:text-sm text-muted-foreground">{brand}</p>
        <h3 className="text-sm sm:text-base font-semibold">{name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-base sm:text-lg font-bold">{finalPrice.toLocaleString('fr-FR')} FCFA</span>
          {isOnSale && (
            <span className="text-xs sm:text-sm text-muted-foreground line-through">
              {price.toLocaleString('fr-FR')} FCFA
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}