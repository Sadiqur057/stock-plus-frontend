export function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Subscribe Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Subscribe</h2>
          <p className="text-sm mb-4">Get 10% off your first order</p>
          <form className="flex items-center bg-gray-800 rounded-md overflow-hidden">
            <label htmlFor="email" className="sr-only">
              Enter your email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="bg-transparent text-sm text-white px-4 py-2 w-full focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-gray-600 px-4 py-2"
              aria-label="Subscribe"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l15-7.5m0 0l-7.5 15m7.5-15H9.75a2.25 2.25 0 00-2.25 2.25v3.75"
                />
              </svg>
            </button>
          </form>
        </div>

        {/* Support Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Support</h2>
          <address className="text-sm not-italic space-y-2">
            <p>111 Bijoy Sarani, Dhaka, DH 1515, Bangladesh</p>
            <p>
              <a href="mailto:exclusive@gmail.com" className="hover:underline">
                exclusive@gmail.com
              </a>
            </p>
            <p>
              <a href="tel:+88015888889999" className="hover:underline">
                +88015-88888-9999
              </a>
            </p>
          </address>
        </div>

        {/* Account Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Account</h2>
          <ul className="text-sm space-y-2">
            <li>
              <a href="/account" className="hover:underline">
                My Account
              </a>
            </li>
            <li>
              <a href="/login" className="hover:underline">
                Login / Register
              </a>
            </li>
            <li>
              <a href="/cart" className="hover:underline">
                Cart
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="text-sm space-y-2">
            <li>
              <a href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/products" className="hover:underline">
                Products
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Download App Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Download App</h2>
          <p className="text-sm mb-4">Save $3 with App New User Only</p>
          <div className="flex items-center space-x-4">
            <button
              className="bg-gray-800 px-4 py-8 rounded-md text-sm"
              aria-label="QR Code for App Download"
            >
              QR Code
            </button>
            <div className="flex flex-col space-y-2">
              <a
                href="#"
                className="bg-gray-800 px-4 py-2 rounded-md text-sm text-center hover:bg-gray-700"
              >
                Google Play
              </a>
              <a
                href="#"
                className="bg-gray-800 px-4 py-2 rounded-md text-sm text-center hover:bg-gray-700"
              >
                App Store
              </a>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4 mt-4">
            <a
              href="#"
              className="text-white"
              aria-label="Facebook"
              title="Facebook"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="#"
              className="text-white"
              aria-label="Twitter"
              title="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-white"
              aria-label="Instagram"
              title="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="text-white"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
