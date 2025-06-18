import {
  HeroSection,
  Features,
  HowItWorks,
  Testimonials,
  CTA,
  Footer,
  Benefits,
} from '../components/section/index';

const Homepage = () => {
  return (
    <div>
      <HeroSection />
      <Features />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};
export default Homepage;
