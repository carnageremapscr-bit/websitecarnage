import Head from "next/head";

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog | Carnage Remaps</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-gray-100 flex flex-col items-center justify-center p-8">
        <div className="max-w-2xl w-full bg-white/90 rounded-2xl shadow-xl border-2 border-yellow-200 p-8">
          <h1 className="text-3xl font-extrabold mb-6 text-yellow-700 text-center">Carnage Remaps Blog</h1>
          <article className="mb-8">
            <h2 className="text-xl font-bold text-yellow-700 mb-2">5 Signs Your Car Needs a Remap</h2>
            <ul className="list-disc ml-6 text-gray-700 mb-2">
              <li>Sluggish acceleration or flat spots in the rev range</li>
              <li>Poor fuel economy despite regular servicing</li>
              <li>Unresponsive throttle or turbo lag</li>
              <li>Heavy towing or load use (vans/fleets)</li>
              <li>Desire for a more enjoyable, efficient drive</li>
            </ul>
            <p className="text-gray-700">A professional remap can address these issues, unlocking your vehicle’s true potential while maintaining reliability and safety.</p>
          </article>
          <article className="mb-8">
            <h2 className="text-xl font-bold text-yellow-700 mb-2">DPF Solutions Explained</h2>
            <p className="text-gray-700 mb-2">DPF (Diesel Particulate Filter) problems are common in modern diesels, especially for vehicles used on short journeys. Our DPF solutions include professional cleaning, regeneration, and software optimization to prevent future issues.</p>
            <ul className="list-disc ml-6 text-gray-700">
              <li>Symptoms: warning lights, limp mode, poor MPG</li>
              <li>Our process: diagnostics, safe cleaning, and software update</li>
              <li>Prevention: regular motorway runs, quality fuel, and periodic checks</li>
            </ul>
          </article>
          <article className="mb-8">
            <h2 className="text-xl font-bold text-yellow-700 mb-2">What Makes a Good Remap?</h2>
            <p className="text-gray-700">A quality remap is custom-written for your vehicle, tested for reliability, and installed by experienced professionals. We never use generic files or push your engine beyond safe limits. Our remaps are fully reversible and come with lifetime support.</p>
          </article>
          <article>
            <h2 className="text-xl font-bold text-yellow-700 mb-2">Customer Story: Fleet Fuel Savings</h2>
            <p className="text-gray-700">After remapping their fleet of vans, a local business saw a 15% reduction in fuel costs and happier drivers thanks to improved performance. We offer tailored solutions for fleets of any size.</p>
          </article>
        </div>
      </main>
    </>
  );
}
