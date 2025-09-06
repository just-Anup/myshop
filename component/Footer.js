export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white">MyShop</h3>
          <p className="mt-2 text-sm">
            Your trusted shop for quality products.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Quick Links</h4>
          <ul className="mt-2 space-y-2">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/login" className="hover:text-white">Login</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Contact</h4>
          <p className="mt-2 text-sm">Email: anupdey9863@gmail.com</p>
          <p className="text-sm">Phone: +91 9863109273</p>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} AmronShop. All rights reserved.
      </div>
    </footer>
  );
}
