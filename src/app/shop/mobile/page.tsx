export default function MobilePage() {
  return (
    <div className="px-6 py-10">
      <h1 className="mb-4 text-3xl font-bold">Mobile</h1>

      <p className="mb-6 text-lg text-gray-700">
        Choose from mobile plans, devices, offers, and more.
      </p>

      <ul className="ml-6 list-disc text-gray-800">
        <li>
          <a href="/shop/mobile/plans" className="text-blue-600 underline">
            View Mobile Plans
          </a>
        </li>
      </ul>
    </div>
  );
}
