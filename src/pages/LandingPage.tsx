import AboutCard from '../components/AboutCard';
import logo from '../assets/logo.svg';

export default function LandingPage() {
  return (
    <div>
      <div className="flex justify-center">
        <img src={logo} alt="cover" className="m-12" />
      </div>
      <div className="grid auto-rows-auto -space-y-24 md:space-y-0 md:grid-cols-3 md:gap-4  m-2 ">
        <AboutCard />
        <AboutCard />
        <AboutCard />
        <AboutCard />
        <AboutCard />
        <AboutCard />
        <AboutCard />
      </div>
    </div>
  );
}
