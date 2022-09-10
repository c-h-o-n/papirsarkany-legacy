import AboutCard from '../components/AboutCard';
import logo from '../assets/logo.svg';

import handcraftDeltoid from '../assets/photos/handcraft-deltoid.png';

export default function LandingPage() {
  return (
    <>
      <div className="flex justify-center mx-4">
        <img src={logo} alt="cover" className="m-12" />
      </div>

      <div className="grid gap-4 m-4 lg:grid-cols-2 xl:grid-cols-3">
        {/* TODO Sarkanyepito foglalkozasok [x] | Tervrajzok | A vallalkozasrol [x] | Elerhetoseg [x] | Fotok  */}

        <AboutCard title="A vállalkozásról">
          <div className="space-y-6">
            <p>Üzletem nincs, ezért postai utánvétellel szállítok, melynek költsége a megrendelőt terheli.</p>

            <p>
              A postai utánvételes szállításhoz szükség van a megrendelő pontos nevére, címére (irányítószámmal),
              továbbá a rendelt sárkány nevére, mennyiségére. Ha a számlázási cím nem azonos a megrendelőével, kérem azt
              is pontosanmegjelölni!
            </p>

            <p>Személyesen Nagykovácsiban (63-as BKV busszal megközelíthető) is vásárolhat.</p>

            <p>
              Sárkányaim repülési és nyolc napos pénzvisszafizetési garanciával kaphatók. A visszaküldés költsége a
              vevőt terheli.
            </p>

            <p>
              Minden érdeklődőnek egy óra ingyenes oktatás sárkány biztosításával - vásárlási kötelezettség nélkül -
              Nagykovácsiban. (Telefonos időpont egyeztetés után.)
            </p>

            <p>
              Mindenkinek kellemes sárkányeresztést kíván a www.papirsarkany.hu egyéni vállalkozás tulajdonosa: <br />
              Ducsai Barnabás
            </p>
          </div>
        </AboutCard>

        <AboutCard title="Sárkányépítő foglalkozások">
          <div className="space-y-6">
            <p>
              A sárkánykészítés és -repítés régebben mindennapos dolog volt a gyerekek hétköznapjaiban. Ez a
              &quot;tudomány&quot; apáról fiúra szállt, illetve a nagyobbaktól lesték el a kisebbek. A gyerekek mára
              elfelejtették ezt a szép régi játékot.
            </p>
            <p>
              Vállalom sárkányépítő foglalkozások vezetését gyerekrendezvények, -intézmények és céges rendezvények
              számára. Anyagot biztosítok. (Szelet a megrendelő biztosít.) Ár egyedi megállapodás alapján.
            </p>
            <p>A SÁRKÁNYÉPÍTÉSI FOGLALKOZÁSON KÉSZÍTHETŐ SÁRKÁNYOK</p>
            <img src={handcraftDeltoid} alt="deltoid" />
          </div>
        </AboutCard>

        <AboutCard title="Elérhetőség">
          <div className="">Email: mail@papirsarkany.hu</div>
          <div className="">Telefon: 0630 9754 786</div>
          <iframe
            title="terkep"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1131.6105816797208!2d18.87852618960264!3d47.57870829362802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xceefc53f4870d42e!2swww.papirsarkany.hu!5e0!3m2!1shu!2shu!4v1579197549648!5m2!1shu!2shu"
            className="rounded-3xl w-full flex-grow "
          />
        </AboutCard>

        <AboutCard title="Tervrajzok">
          <p>Genki-sárkány</p>
          <p>A rajz nem méretarányos!</p>
          <p>
            A <span>piros</span> vonalak a vázat jelölik.
          </p>
          <p>
            A kis háromszögek (14cm) végéből indulnak a kantárszárak. Úgy kell bekantározni, hogy a négy szál egy
            pontban találkozzon a sárkány középvonalán, oly módon, hogy a lelógatott sárkány a vízszintessel kb. 30
            fokos szöget zár be. A kis háromszögek (14cm) végéből indulnak a kantárszárak. Úgy kell bekantározni, hogy a
            négy szál egy pontban találkozzon a sárkány középvonalán, oly módon, hogy a lelógatott sárkány a
            vízszintessel kb. 30 fokos szöget zár be. A kis háromszögek (14cm) végéből indulnak a kantárszárak. Úgy kell
            bekantározni, hogy a négy szál egy pontban találkozzon a sárkány középvonalán, oly módon, hogy a lelógatott
            sárkány a vízszintessel kb. 30 fokos szöget zár be. A kis háromszögek (14cm) végéből indulnak a
            kantárszárak. Úgy kell bekantározni, hogy a négy szál egy pontban találkozzon a sárkány középvonalán, oly
            módon, hogy a lelógatott sárkány a vízszintessel kb. 30 fokos szöget zár be. A kis háromszögek (14cm)
            végéből indulnak a kantárszárak. Úgy kell bekantározni, hogy a négy szál egy pontban találkozzon a sárkány
            középvonalán, oly módon, hogy a lelógatott sárkány a vízszintessel kb. 30 fokos szöget zár be. A kis
            háromszögek (14cm) végéből indulnak a kantárszárak. Úgy kell bekantározni, hogy a négy szál egy pontban
            találkozzon a sárkány középvonalán, oly módon, hogy a lelógatott sárkány a vízszintessel kb. 30 fokos szöget
            zár be. A kis háromszögek (14cm) végéből indulnak a kantárszárak. Úgy kell bekantározni, hogy a négy szál
            egy pontban találkozzon a sárkány középvonalán, oly módon, hogy a lelógatott sárkány a vízszintessel kb. 30
            fokos szöget zár be. A kis háromszögek (14cm) végéből indulnak a kantárszárak. Úgy kell bekantározni, hogy a
            négy szál egy pontban találkozzon a sárkány középvonalán, oly módon, hogy a lelógatott sárkány a
            vízszintessel kb. 30 fokos szöget zár be. A kis háromszögek (14cm) végéből indulnak a kantárszárak. Úgy kell
            bekantározni, hogy a négy szál egy pontban találkozzon a sárkány középvonalán, oly módon, hogy a lelógatott
            sárkány a vízszintessel kb. 30 fokos szöget zár be. A kis háromszögek (14cm) végéből indulnak a
            kantárszárak. Úgy kell bekantározni, hogy a négy szál egy pontban találkozzon a sárkány középvonalán, oly
            módon, hogy a lelógatott sárkány a vízszintessel kb. 30 fokos szöget zár be. A kis háromszögek (14cm)
            végéből indulnak a kantárszárak. Úgy kell bekantározni, hogy a négy szál egy pontban találkozzon a sárkány
            középvonalán, oly módon, hogy a lelógatott sárkány a vízszintessel kb. 30 fokos szöget zár be. A kis
            háromszögek (14cm) végéből indulnak a kantárszárak. Úgy kell bekantározni, hogy a négy szál egy pontban
            találkozzon a sárkány középvonalán, oly módon, hogy a lelógatott sárkány a vízszintessel kb. 30 fokos szöget
            zár be. A kis háromszögek (14cm) végéből indulnak a kantárszárak. Úgy kell bekantározni, hogy a négy szál
            egy pontban találkozzon a sárkány középvonalán, oly módon, hogy a lelógatott sárkány a vízszintessel kb. 30
            fokos szöget zár be. A kis háromszögek (14cm) végéből indulnak a kantárszárak. Úgy kell bekantározni, hogy a
            négy szál egy pontban találkozzon a sárkány középvonalán, oly módon, hogy a lelógatott sárkány a
            vízszintessel kb. 30 fokos szöget zár be. A kis háromszögek (14cm) végéből indulnak a kantárszárak. Úgy kell
            bekantározni, hogy a négy szál egy pontban találkozzon a sárkány középvonalán, oly módon, hogy a lelógatott
            sárkány a vízszintessel kb. 30 fokos szöget zár be. A kis háromszögek (14cm) végéből indulnak a
            kantárszárak. Úgy kell bekantározni, hogy a négy szál egy pontban találkozzon a sárkány középvonalán, oly
            módon, hogy a lelógatott sárkány a vízszintessel kb. 30 fokos szöget zár be. A kis háromszögek (14cm)
            végéből indulnak a kantárszárak. Úgy kell bekantározni, hogy a négy szál egy pontban találkozzon a sárkány
            középvonalán, oly módon, hogy a lelógatott sárkány a vízszintessel kb. 30 fokos szöget zár be. A kis
            háromszögek (14cm) végéből indulnak a kantárszárak. Úgy kell bekantározni, hogy a négy szál egy pontban
            találkozzon a sárkány középvonalán, oly módon, hogy a lelógatott sárkány a vízszintessel kb. 30 fokos szöget
            zár be. A kis háromszögek (14cm) végéből indulnak a kantárszárak. Úgy kell bekantározni, hogy a négy szál
            egy pontban találkozzon a sárkány középvonalán, oly módon, hogy a lelógatott sárkány a vízszintessel kb. 30
            fokos szöget zár be. A kis háromszögek (14cm) végéből indulnak a kantárszárak. Úgy kell bekantározni, hogy a
            négy szál egy pontban találkozzon a sárkány középvonalán, oly módon, hogy a lelógatott sárkány a
            vízszintessel kb. 30 fokos szöget zár be. A kis háromszögek (14cm) végéből indulnak a kantárszárak. Úgy kell
            bekantározni, hogy a négy szál egy pontban találkozzon a sárkány középvonalán, oly módon, hogy a lelógatott
            sárkány a vízszintessel kb. 30 fokos szöget zár be. A kis háromszögek (14cm) végéből indulnak a
            kantárszárak. Úgy kell bekantározni, hogy a négy szál egy pontban találkozzon a sárkány középvonalán, oly
            módon, hogy a lelógatott sárkány a vízszintessel kb. 30 fokos szöget zár be. A kis háromszögek (14cm)
            végéből indulnak a kantárszárak. Úgy kell bekantározni, hogy a négy szál egy pontban találkozzon a sárkány
            középvonalán, oly módon, hogy a lelógatott sárkány a vízszintessel kb. 30 fokos szöget zár be.vv
          </p>
        </AboutCard>
      </div>
    </>
  );
}
