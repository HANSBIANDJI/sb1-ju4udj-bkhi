import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroCarouselProps {
  onDiscoverClick: () => void;
}

const slides = [
  {
    title: "Floral Elegance",
    description: "Découvrez la délicatesse des parfums floraux",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=2070",
  },
  {
    title: "Oriental Mystique",
    description: "Laissez-vous envoûter par nos fragrances orientales",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=2070",
  },
  {
    title: "Collection Premium",
    description: "Des parfums d'exception pour des moments uniques",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2069",
  }
];

export function HeroCarousel({ onDiscoverClick }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="absolute inset-0 bg-black/40" />
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h2 className="text-5xl font-bold mb-4 text-center animate-fade-in-up">
              {slide.title}
            </h2>
            <p className="text-xl mb-8 text-center animate-fade-in-up animation-delay-200">
              {slide.description}
            </p>
            <Button 
              className="bg-white text-purple-600 hover:bg-white/90 animate-fade-in-up animation-delay-400"
              onClick={onDiscoverClick}
            >
              Découvrir
            </Button>
          </div>
        </div>
      ))}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-4' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}