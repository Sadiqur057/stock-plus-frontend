import Link from "next/link";
// import logo from "@/assets/images/logo.png";
import Image from "next/image";
import poppins from "@/fonts/font";
import AuthButton from "./AuthButton";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="navbar">
      <div className={`navbar__container container ${poppins.className}`}>
        <Link href="/" className="navbar__logo">
          <Image src="https://i.postimg.cc/Hk4tR1BC/logo.png" height={120} width={160} alt="StockPlus" />
        </Link>
        <input type="checkbox" id="navbar-toggle" className="navbar__toggle" />
        <label htmlFor="navbar-toggle" className="navbar__toggle-label">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <nav className="navbar__nav">
          <ul className="navbar__nav-list">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="navbar__nav-item">
                  {item.name}
                </Link>
              </li>
            ))}
            <AuthButton />
          </ul>
        </nav>
      </div>
    </header>
  );
}
