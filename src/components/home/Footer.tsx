import { Facebook, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black text-white pt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">Subscribe</h2>
          <p className="text-sm mb-4">Get 10% off your first purchase</p>
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
            <p>Reach us directly</p>
            <p>
              <a href="mailto:exclusive@gmail.com" className="hover:underline">
                sadiqur057@gmail.com
              </a>
            </p>
            <p>
              <a href="tel:+88015888889999" className="hover:underline">
                +8801760521688
              </a>
            </p>
            <div className="flex gap-3 items-center">
              <a target="_blank" href="https://www.facebook.com/Sadiqur057">
                <Facebook size={20} />
              </a>
              <a target="_blank" href="https://www.github.com/Sadiqur057">
                <Github size={20} />
              </a>
              <a target="_blank" href="https://www.linkedin.com/in/sadiqur057">
                <Linkedin size={20} />
              </a>
            </div>
          </address>
        </div>

        {/* Account Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Account</h2>
          <ul className="text-sm space-y-2">
            <li>
              <Link href="/dashboard/my-account" className="hover:underline">
                My Account
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:underline">
                Login / Register
              </Link>
            </li>
            <li>
              <a href="/cart" className="hover:underline">
                Cart
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links Section */}
        {/* <div>
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
        </div> */}

        {/* Download App Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Download App</h2>
          <p className="text-sm mb-4">Our app will be launched soon.</p>
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
      <p className="text-center text-gray-300 py-6 border-t border-gray-700 mt-6">
        &copy; StockPlus Pro. Designed and developed by{" "}
        <a target="_blank" href="https://sadiqur057-portfolio.vercel.app" className="font-medium text-white hover:underline"> Sadiqur Rahman</a>
      </p>
    </footer>
  );
}
