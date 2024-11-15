import { useState, useMemo } from 'react';
import { PerfumeCard } from '@/components/PerfumeCard';
import { PerfumeFilters } from '@/components/PerfumeFilters';
import { perfumes } from '@/data/perfumes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

export default function Parfums() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('tous');

  const filteredPerfumes = useMemo(() => {
    return perfumes.filter((perfume) => {
      const matchesPrice = perfume.price >= priceRange[0] && perfume.price <= priceRange[1];
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(perfume.brand);
      const matchesCategory = activeCategory === 'tous' || perfume.category.toLowerCase() === activeCategory;
      
      return matchesPrice && matchesBrand && matchesCategory;
    });
  }, [priceRange, selectedBrands, activeCategory]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Notre Collection de Parfums</h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Découvrez notre sélection exclusive de fragrances
          </p>
        </motion.div>
        
        <Tabs 
          defaultValue="tous" 
          className="mb-8 sm:mb-12"
          onValueChange={setActiveCategory}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <TabsList className="grid grid-cols-4 w-full sm:w-[600px] p-1 bg-purple-100/50">
              <TabsTrigger 
                value="tous"
                className="text-sm data-[state=active]:bg-white data-[state=active]:text-purple-600 transition-all duration-300"
              >
                Tous
              </TabsTrigger>
              <TabsTrigger 
                value="pour elle"
                className="text-sm data-[state=active]:bg-white data-[state=active]:text-purple-600 transition-all duration-300"
              >
                Pour Elle
              </TabsTrigger>
              <TabsTrigger 
                value="pour lui"
                className="text-sm data-[state=active]:bg-white data-[state=active]:text-purple-600 transition-all duration-300"
              >
                Pour Lui
              </TabsTrigger>
              <TabsTrigger 
                value="unisexe"
                className="text-sm data-[state=active]:bg-white data-[state=active]:text-purple-600 transition-all duration-300"
              >
                Unisexe
              </TabsTrigger>
            </TabsList>
          </motion.div>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-8">
          <motion.aside
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-1"
          >
            <PerfumeFilters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
            />
          </motion.aside>
          
          <motion.main
            variants={container}
            initial="hidden"
            animate="show"
            className="md:col-span-3"
          >
            <motion.div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {filteredPerfumes.length > 0 ? (
                filteredPerfumes.map((perfume) => (
                  <motion.div key={perfume.id} variants={item}>
                    <PerfumeCard {...perfume} />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  variants={item}
                  className="col-span-full text-center py-12"
                >
                  <p className="text-lg text-gray-500">
                    Aucun parfum ne correspond à vos critères de recherche.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.main>
        </div>
      </div>
    </div>
  );
}