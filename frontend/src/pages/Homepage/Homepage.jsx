import CTA from '@/components/organisms/Homepage/CtaSection/CtaSection';
import Features from '@/components/organisms/Homepage/FeaturesSection/FeaturesSection';
import Hero from '@/components/organisms/Homepage/HeroSection/HeroSection';
import Navbar from '@/components/organisms/Homepage/Navbar/Navbar';

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <CTA />
    </div>
  );
}
