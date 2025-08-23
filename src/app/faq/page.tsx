import Head from "next/head";

export default function FAQ() {
  return (
    <>
      <Head>
        <title>FAQ | Carnage Remaps</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-gray-100 flex flex-col items-center justify-center p-8">
        <div className="max-w-2xl w-full bg-white/90 rounded-2xl shadow-xl border-2 border-yellow-200 p-8">
          <h1 className="text-3xl font-extrabold mb-6 text-yellow-700 text-center">Frequently Asked Questions</h1>
          <ul className="space-y-6">
            <li>
              <h2 className="font-bold text-yellow-700">What is ECU remapping?</h2>
              <p className="text-gray-700">ECU remapping is the process of modifying the software within a vehicle’s Engine Control Unit to optimize performance, efficiency, or both. It’s safe, legal, and fully reversible. Our remaps are custom-written for your vehicle and driving style.</p>
            </li>
            <li>
              <h2 className="font-bold text-yellow-700">Will remapping void my warranty?</h2>
              <p className="text-gray-700">Remapping can affect your manufacturer’s warranty. We offer advice and options to minimize risk and always provide a backup of your original software. For newer vehicles, we offer warranty-friendly tuning options and full transparency.</p>
            </li>
            <li>
              <h2 className="font-bold text-yellow-700">How long does the process take?</h2>
              <p className="text-gray-700">Most remaps are completed within 1-2 hours. Some specialist services, such as DPF/EGR solutions or advanced diagnostics, may take longer. We always keep you updated throughout the process.</p>
            </li>
            <li>
              <h2 className="font-bold text-yellow-700">Is it safe for my engine?</h2>
              <p className="text-gray-700">Yes. All our remaps are custom and tested for reliability, safety, and compliance. We never push your engine beyond safe limits. We use only proven, reputable tuning tools and software.</p>
            </li>
            <li>
              <h2 className="font-bold text-yellow-700">Can I return to stock settings?</h2>
              <p className="text-gray-700">Absolutely. We keep a backup of your original ECU file and can restore your vehicle to factory settings at any time, free of charge for our customers.</p>
            </li>
            <li>
              <h2 className="font-bold text-yellow-700">What gains can I expect?</h2>
              <p className="text-gray-700">Typical gains are 20-35% more torque and power for turbocharged engines, with improved throttle response and fuel economy. Results vary by vehicle and remap type. We provide honest, realistic estimates for your specific car or van.</p>
            </li>
            <li>
              <h2 className="font-bold text-yellow-700">Do you offer mobile remapping?</h2>
              <p className="text-gray-700">Yes! We offer a fully mobile service across the region. We can remap your vehicle at your home, workplace, or our workshop—whichever is most convenient for you.</p>
            </li>
            <li>
              <h2 className="font-bold text-yellow-700">What payment methods do you accept?</h2>
              <p className="text-gray-700">We accept cash, all major credit/debit cards, and bank transfer. Payment is only taken once you are fully satisfied with the results.</p>
            </li>
            <li>
              <h2 className="font-bold text-yellow-700">Can you remap commercial vehicles and fleets?</h2>
              <p className="text-gray-700">Yes, we regularly remap vans, trucks, and fleet vehicles for better performance and fuel savings. We offer fleet discounts and tailored solutions for business customers.</p>
            </li>
            <li>
              <h2 className="font-bold text-yellow-700">Do you offer aftercare or support?</h2>
              <p className="text-gray-700">All our remaps come with lifetime software support. If you have any issues or questions, we’re always here to help—even years after your remap.</p>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}
