import horseBusImage from '../assets/1829_horse_bus.webp';
import horseBusColourImage from '../assets/horse_bus_colour.jpg';
import { useState } from 'react';
function HistoryPage() {
  const [isImageColoured, setIsImageColoured] = useState(false);

  function toggleImageColour() {
    setIsImageColoured(!isImageColoured);
  }
  function getButtonText() {
    return isImageColoured ? "Show Grayscale" : "Show Colour";
  }
  return (
    <main className="flex-1 flex flex-col items-center justify-start p-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-cyan-700 m-6 drop-shadow-sm text-center">
          History of Buses
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6 text-gray-700">
          <h2 className="text-2xl font-semibold mt-2 text-cyan-700">
            Origins: Early Buses
          </h2>
          <p className="mt-2 leading-relaxed">
            The first omnibus (horse-drawn) service in London was in 1829, run by
            George Shillibeer, between Paddington and the City of London. Soon
            after, steam carriages began to appear (notably Walter Hancock's in
            1831), and over the next decades many independent operators set up
            services. These evolved from horse-drawn to steam, then petrol and
            diesel buses.
          </p>
          <div className="relative inline-block group">
            <img
                src={horseBusImage}
                alt="1829 Horse-drawn Bus"
                className="block w-full h-auto rounded-lg mt-4"
            />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        bg-black/70 text-white px-4 py-2 rounded 
                        opacity-0 transition-opacity duration-300 
                        group-hover:opacity-100 select-none"
            >
                London Horse-drawn Bus in 1829
            </div>
          </div>
          <img src={horseBusColourImage} alt="Horse Bus Colour Illustration" className={`mt-4 w-full h-auto rounded-lg ${isImageColoured ? '' : 'grayscale'}`} />
          <button
            className={`block w-full mt-2 bg-cyan-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors ${isImageColoured ? 'grayscale' : ''}`}
            onClick={toggleImageColour}>{getButtonText()}
          </button>
          <h2 className="text-2xl font-semibold mt-4 text-cyan-700">
            Formation of Transport Authorities
          </h2>
          <p className="mt-2 leading-relaxed">
            In 1909, the London General Omnibus Company (LGOC) began
            manufacturing its own motor omnibuses, marking a major step in
            standardising services. By 1933, London Transport was formed,
            consolidating buses, underground railways and trams under one public
            body. During the 20th century, governance shifted through various
            boards and councils, before eventually coming under London Regional
            Transport.
          </p>

          <h2 className="text-2xl font-semibold mt-4 text-cyan-700">
            The Creation of TfL
          </h2>
          <p className="mt-2 leading-relaxed">
            Transport for London (TfL) was established in 2000, taking
            responsibility for the capital's bus network. TfL has since
            modernised services with accessibility requirements, simplified fares,
            improved reliability, and a strong focus on reducing emissions. While
            private companies operate routes under contract, TfL sets standards
            for vehicles, livery and service levels.
          </p>

          <h2 className="text-2xl font-semibold mt-4 text-cyan-700">
            Buses Over Time
          </h2>
          <p className="mt-2 leading-relaxed">
            London's buses have changed dramatically:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
            <li>From open-topped horse-drawn vehicles in the 1800s</li>
            <li>To enclosed double-deckers in the early 20th century</li>
            <li>
              To the world-famous Routemaster, introduced in the 1950s and still
              a cultural icon
            </li>
            <li>To today's hybrid, battery-electric and hydrogen buses</li>
          </ul>

          <p className="mt-4 leading-relaxed">
            Since 2006, all buses have been low-floor and wheelchair accessible.
          </p>

          <h2 className="text-2xl font-semibold mt-4 text-cyan-700">
            The Current Fleet (as of 2025)
          </h2>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
            <li>Total fleet size: 8,797 buses</li>
            <li>
              Types of buses: approx. 3,776 hybrid, 1,951 battery-electric, and
              20 hydrogen fuel cell buses
            </li>
            <li>
              Zero-emission fleet: over 2,000 zero-emission buses (electric +
              hydrogen)
            </li>
            <li>
              Accessibility: 100% of buses are low-floor, wheelchair accessible,
              and compliant with accessibility regulations
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-4 text-cyan-700">
            Routes and Coverage
          </h2>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
            <li>Around 675 bus routes operate across Greater London.</li>
            <li>
              Although privately operated, TfL specifies the red livery
              (mandatory since 1997), accessibility standards, and environmental
              requirements.
            </li>
            <li>
              The network runs day and night, providing one of the most extensive
              urban bus systems in the world.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-4 text-cyan-700">
            Interesting Facts
          </h2>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 mb-2">
            <li>London has one of the largest zero-emission bus fleets in Europe.</li>
            <li>All new buses joining the network must now be zero-emission.</li>
            <li>The Routemaster, although largely retired, remains a global symbol of London.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default HistoryPage;