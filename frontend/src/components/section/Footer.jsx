import { GradientHeading2 } from '../GradientText';

const Footer = () => {
  return (
    <footer className='footer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-10 bg-base-200 text-base-content place-content-center mx-auto w-full'>
      <aside className='col-span-1 sm:col-span-2'>
        <GradientHeading2>Pracice X</GradientHeading2>
        <p>
          Worker Threads Ltd.
          <br />
          Providing reliable courses since created!
        </p>
      </aside>

      <nav className='flex flex-wrap gap-x-8 my-auto font-bold'>
        <a className='link link-hover'>Skills</a>
        <a className='link link-hover'>Resources</a>
        <a className='link link-hover'>Marketing</a>
        <a className='link link-hover'>Advertisement</a>
      </nav>
    </footer>
  );
};
export default Footer;
