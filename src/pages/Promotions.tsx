import { motion } from 'framer-motion';
import { perfumes } from '@/data/perfumes';
import { PerfumeCard } from '@/components/PerfumeCard';
import { Button } from '@/components/ui/button';
import { Timer, Percent, Zap } from 'lucide-react';
import { CountdownTimer } from '@/components/CountdownTimer';

export default function Promotions() {
  const discountedPerfumes = perfumes.filter(perfume => perfume.isOnSale);
  const flashSaleEndDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now

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
          className="text-center mb-8 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="bg-purple-100 text-purple-600 px-4 sm:px-6 py-2 rounded-full inline-flex items-center gap-2 mb-6 sm:mb-8"
          >
            <Timer className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
            <span className="text-sm sm:text-base font-semibold">Offres limitées</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">
            Promotions Exclusives
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Profitez de réductions exceptionnelles sur une sélection de parfums de luxe
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-purple-600 to-purple-500 p-6 sm:p-8 rounded-2xl max-w-3xl mx-auto mb-8 sm:mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white animate-pulse" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">Vente Flash</h2>
            </div>
            <CountdownTimer endDate={flashSaleEndDate} />
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-8"
        >
          {discountedPerfumes.map((perfume) => (
            <motion.div key={perfume.id} variants={item}>
              <PerfumeCard {...perfume} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 sm:mt-24 bg-gradient-to-r from-purple-600 to-purple-500 rounded-3xl p-6 sm:p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=2070')] opacity-10 bg-cover bg-center" />
          <div className="relative z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2"
            >
              <Percent className="h-24 sm:h-32 w-24 sm:w-32 text-white opacity-10" />
            </motion.div>
            
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
              Ne manquez aucune promotion
            </h2>
            <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Inscrivez-vous pour recevoir en avant-première nos meilleures offres
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
                className="flex-1 rounded-xl border-0 px-4 py-2 sm:px-6 sm:py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white transition-all"
              />
              <Button 
                type="submit"
                className="bg-white text-purple-600 px-6 py-2 sm:px-8 sm:py-3 rounded-xl hover:bg-white/90 transition-all hover:scale-105"
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