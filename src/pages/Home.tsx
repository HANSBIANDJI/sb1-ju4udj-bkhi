import { useNavigate } from 'react-router-dom';
import { HeroCarousel } from '@/components/HeroCarousel';
import { Categories } from '@/components/Categories';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { Shield, Truck, Sparkles, ArrowRight, Star, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from '@/components/CountdownTimer';

export default function Home() {
  const navigate = useNavigate();
  const handleDiscoverClick = () => navigate('/parfums');

  // Date de fin de la promo (3 jours à partir de maintenant)
  const promoEndDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

  return (
    <div className="flex-1">
      {/* Section Promo Flash - Maintenant juste en dessous du header */}
      <div className="w-full py-1.5 bg-gradient-to-r from-purple-600 to-purple-500">
        <div className="container px-4 md:px-6 flex items-center justify-center gap-3">
          <div className="flex items-center gap-1.5">
            <Timer className="h-3.5 w-3.5 text-white animate-pulse" />
            <span className="text-xs font-medium text-white">Vente Flash</span>
          </div>
          <CountdownTimer endDate={promoEndDate} />
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 text-xs py-1 px-2 h-auto"
            onClick={() => navigate('/promotions')}
          >
            Voir les promotions
          </Button>
        </div>
      </div>

      <HeroCarousel onDiscoverClick={handleDiscoverClick} />
      
      <Categories onDiscoverClick={handleDiscoverClick} />
      
      <section className="w-full py-12 md:py-24 bg-purple-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-3 items-center justify-center text-center">
            {[
              { icon: Shield, title: "Authenticité Garantie", description: "Tous nos parfums sont authentiques et certifiés" },
              { icon: Truck, title: "Livraison Rapide", description: "Livraison express disponible en Côte d'Ivoire" },
              { icon: Sparkles, title: "Qualité Premium", description: "Une sélection des meilleures fragrances" }
            ].map(({ icon: Icon, title, description }, index) => (
              <div 
                key={title} 
                className="flex flex-col items-center space-y-2 animate-on-scroll"
                style={{animationDelay: `${index * 200}ms`}}
              >
                <div className="rounded-full bg-purple-100 p-3 transition-transform hover:scale-110">
                  <Icon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProducts onDiscoverClick={handleDiscoverClick} />

      <section className="bg-purple-600 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=2070')] opacity-10"></div>
        <div className="container px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-on-scroll">
            Prêt à découvrir votre signature olfactive ?
          </h2>
          <p className="mx-auto max-w-[700px] mt-4 text-white/80 animate-on-scroll animation-delay-200">
            Explorez notre collection exclusive de parfums et trouvez celui qui vous correspond
          </p>
          <Button 
            className="mt-8 bg-white text-purple-600 hover:bg-white/90 transition-colors animate-on-scroll animation-delay-400"
            onClick={handleDiscoverClick}
          >
            Découvrir la collection <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">
            Témoignages de nos clients
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { name: "Sophie L.", comment: "J'ai trouvé mon parfum signature grâce à Babismell. Le service client est exceptionnel !", rating: 5 },
              { name: "Marc D.", comment: "Une sélection incroyable de parfums de qualité. Je recommande vivement !", rating: 5 },
              { name: "Amina K.", comment: "Livraison rapide et emballage soigné. Je suis ravie de mon achat !", rating: 4 }
            ].map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-on-scroll"
                style={{animationDelay: `${index * 200}ms`}}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                      fill={i < testimonial.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{testimonial.comment}</p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}