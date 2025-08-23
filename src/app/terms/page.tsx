import Head from "next/head";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms & Privacy | Carnage Remaps</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-gray-100 flex flex-col items-center justify-center p-8">
        <div className="max-w-2xl w-full bg-white/90 rounded-2xl shadow-xl border-2 border-yellow-200 p-8">
          <h1 className="text-3xl font-extrabold mb-6 text-yellow-700 text-center">Terms & Privacy</h1>
          <h2 className="font-bold text-yellow-700 mt-4 mb-2">Terms of Service</h2>
          <p className="text-gray-700 mb-4">By using Carnage Remaps, you agree to our terms and conditions. All remapping is performed at the customer’s request and risk. We always provide honest advice and a backup of your original ECU file. Our services are intended for off-road and motorsport use unless otherwise stated. We are not responsible for any loss of warranty or insurance coverage as a result of remapping.</p>
          <ul className="list-disc ml-6 text-gray-700 mb-4">
            <li>All work is carried out by qualified technicians using industry-leading tools.</li>
            <li>We reserve the right to refuse service if we believe a remap would compromise safety or reliability.</li>
            <li>Payment is due upon completion of work unless otherwise agreed in writing.</li>
            <li>Any issues must be reported within 14 days for investigation and resolution.</li>
          </ul>
          <h2 className="font-bold text-yellow-700 mt-4 mb-2">Privacy Policy</h2>
          <p className="text-gray-700 mb-2">We respect your privacy. Your data is never shared with third parties. All information is stored securely and only used to provide our services or respond to your enquiries.</p>
          <ul className="list-disc ml-6 text-gray-700">
            <li>We collect only the information necessary to provide our services (name, contact details, vehicle info).</li>
            <li>We do not store payment details. All transactions are processed securely.</li>
            <li>You may request deletion of your data at any time by contacting us.</li>
            <li>We use cookies only for site functionality and analytics.</li>
          </ul>
        </div>
      </main>
    </>
  );
}
