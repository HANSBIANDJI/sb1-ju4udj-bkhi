import { motion } from 'framer-motion';
import { perfumes } from '@/data/perfumes';
import { PerfumeCard } from '@/components/PerfumeCard';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function Nouveautes() {
  const newPerfumes = perfumes.filter(perfume => perfume.isNew);

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
      <div className="container px-4 py-8 sm:py-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-16 relative"
        >
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-16 w-16 text-purple-500 opacity-20" />
            </motion.div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Nouveautés
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos dernières fragrances et laissez-vous séduire par des parfums d'exception
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-8"
        >
          {newPerfumes.map((perfume) => (
            <motion.div key={perfume.id} variants={item}>
              <PerfumeCard {...perfume} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 sm:mt-24 bg-white rounded-3xl p-6 sm:p-12 text-center shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-pink-100/50" />
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
              Restez informé de nos nouveautés
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              Inscrivez-vous à notre newsletter pour être le premier à découvrir nos nouvelles fragrances et profiter d'offres exclusives
            </p>
            <motion.form 
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 rounded-xl border border-purple-100 px-4 py-2 sm:px-6 sm:py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <Button 
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-xl hover:bg-purple-700 transition-all hover:scale-105"
              >
                S'inscrire
              </Button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}