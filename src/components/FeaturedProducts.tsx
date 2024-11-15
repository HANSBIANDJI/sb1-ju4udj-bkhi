import { PerfumeCard } from '@/components/PerfumeCard';
import { perfumes } from '@/data/perfumes';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FeaturedProductsProps {
  onDiscoverClick: () => void;
}

export function FeaturedProducts({ onDiscoverClick }: FeaturedProductsProps) {
  const featuredPerfumes = perfumes.slice(0, 4);

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold">Nos Best-Sellers</h2>
          <Button 
            variant="ghost" 
            className="text-purple-600 hover:text-purple-700"
            onClick={onDiscoverClick}
          >
            Voir tout <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {featuredPerfumes.map((perfume) => (
            <PerfumeCard key={perfume.id} {...perfume} />
          ))}
        </div>
      </div>
    </section>
  );
}