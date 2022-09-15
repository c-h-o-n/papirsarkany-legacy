import logo from '../assets/logo.svg';

import AboutBusiness from '../components/infos/AboutBusiness';
import KiteBuildingSessions from '../components/infos/KiteBuildingSessions';
import InfoCard from '../components/InfoCard';
import Contact from '../components/infos/Contact';

export default function LandingPage() {
  return (
    <>
      <div className="flex justify-center mx-4">
        <img src={logo} alt="cover" className="m-12" />
      </div>

      <div className="grid gap-4 m-4 lg:grid-cols-2 xl:grid-cols-3">
        {/* TODO  | Tervrajzok |  | | Fotok  */}

        {/* A vallalkozasrol [x] */}
        <InfoCard>
          <AboutBusiness />
        </InfoCard>

        {/* Sarkanyepito foglalkozasok [x] */}
        <InfoCard>
          <KiteBuildingSessions />
        </InfoCard>

        {/* Elerhetoseg [x] */}
        <InfoCard>
          <Contact />
        </InfoCard>
      </div>
    </>
  );
}
