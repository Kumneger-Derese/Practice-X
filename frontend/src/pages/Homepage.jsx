import {
  Hero,
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
      <Hero />
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
