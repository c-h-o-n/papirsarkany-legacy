import AboutCard from '../components/AboutCard';
import logo from '../assets/logo.svg';

export default function LandingPage() {
  return (
    <div>
      <div className="flex justify-center">
        <img src={logo} alt="cover" className="m-12" />
      </div>

      <div className="grid auto-rows-auto -space-y-32 md:space-y-0 md:grid-cols-3 md:gap-4  m-4">
        <AboutCard
          title="A vállalkozásról"
          content="Üzletem nincs, ezért postai utánvétellel szállítok, melynek költsége a megrendelőt terheli. A sárkányrendelés történhet on-line módon, faxon, vagy telefonon.
          A postai utánvételes szállításhoz szükség van a megrendelő pontos nevére, címére (irányítószámmal), továbbá a rendelt sárkány nevére, mennyiségére. Ha a számlázási cím nem azonos a megrendelőével, kérem azt is pontosan megjelölni!
          Személyesen Nagykovácsiban (63-as BKV busszal megközelíthető) is vásárolhat.
          Sárkányaim repülési és nyolc napos pénzvisszafizetési garanciával kaphatók. A visszaküldés költsége a vevőt terheli.
          Minden érdeklődőnek egy óra ingyenes oktatás sárkány biztosításával - vásárlási kötelezettség nélkül - Nagykovácsiban. (Telefonos időpont egyeztetés után.)
          Mindenkinek kellemes sárkányeresztést kíván a www.papirsarkany.hu egyéni vállalkozás tulajdonosa:
          Ducsai Barnabás"
        />
        <AboutCard />
        <AboutCard />
        <AboutCard />
        <AboutCard />
      </div>
    </div>
  );
}
