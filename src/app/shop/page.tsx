export default function ShopPage() {
  return (
    <div className="px-6 py-10">
      <h1 className="mb-4 text-3xl font-bold">Shop</h1>

      <p className="mb-6 text-lg text-gray-700">
        Explore our categories including mobile, broadband, accessories and more.
      </p>

      <ul className="ml-6 list-disc text-gray-800">
        <li>
          <a href="/shop/mobile" className="text-blue-600 underline">
            Mobile
          </a>
        </li>
      </ul>
    </div>
  );
}
