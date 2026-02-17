import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturedMenu from "@/components/landing/FeaturedMenu";
import AboutSection from "@/components/landing/AboutSection";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import SignatureIngredients from "@/components/landing/SignatureIngredients";
import Testimonials from "@/components/landing/Testimonials";
import LocationContact from "@/components/landing/LocationContact";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturedMenu />
      <AboutSection />
      <WhyChooseUs />
      <SignatureIngredients />
      <Testimonials />
      <LocationContact />
      <Footer />
    </main>
  );
};

export default Index;
