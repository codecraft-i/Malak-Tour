import { useTranslation } from 'react-i18next';

// Components
import Header from '../../../Components/Header/Header';
import Intro from '../../../Components/Intro/Intro';
import DestinationSlider from '../../../Components/DestinationSlider/DestinationSlider';
import CategorySections from '../../../Components/CategorySections/CategorySections';
import AboutSection from '../../../Components/AboutSection/AboutSection';
import PromoBanner from '../../../Components/PromoBanner/PromoBanner';
import GallerySection from '../../../Components/GallerySection/GallerySection';
import PartnersCarousel from '../../../Components/PartnersCarousel/PartnersCarousel';
import TestimonialsSlider from '../../../Components/TestimonialsSlider/TestimonialsSlider';
import Footer from '../../../Components/Footer/Footer';

export default function Home() {
  const { t } = useTranslation();
  return (
    <div>
        {/* <Header /> */}
        <Intro />
        <DestinationSlider />
        <CategorySections />
        <AboutSection />
        <PromoBanner />
        <GallerySection onViewAll={() => console.log("Full gallery")} />
        <PartnersCarousel />
        <TestimonialsSlider />
        <Footer />
    </div>
  );
}