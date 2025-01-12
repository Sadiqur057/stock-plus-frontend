
export function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Subscribe Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
          <p className="text-sm mb-4">Get 10% off your first order</p>
          <div className="flex items-center bg-gray-800 rounded-md overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent text-sm text-white px-4 py-2 w-full focus:outline-none"
            />
            <button className="bg-gray-600 px-4 py-2">
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
          </div>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <p className="text-sm">
            111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
          </p>
          <p className="text-sm">exclusive@gmail.com</p>
          <p className="text-sm">+88015-88888-9999</p>
        </div>

        {/* Account Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Account</h3>
          <ul className="text-sm space-y-2">
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
          </ul>
        </div>

        {/* Quick Link Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Link</h3>
          <ul className="text-sm space-y-2">
            <li>Privacy Policy</li>
            <li>Products</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Download App Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Download App</h3>
          <p className="text-sm mb-4">Save $3 with App New User Only</p>
          <div className="flex items-center space-x-4">
            <button className="bg-gray-800 px-4 py-8 rounded-md text-sm">
              QR Code
            </button>
            <div className="flex flex-col space-y-2">
              <button className="bg-gray-800 px-4 py-2 rounded-md text-sm">
                Google Play
              </button>
              <button className="bg-gray-800 px-4 py-2 rounded-md text-sm">
                App Store
              </button>
            </div>
          </div>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-white">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
