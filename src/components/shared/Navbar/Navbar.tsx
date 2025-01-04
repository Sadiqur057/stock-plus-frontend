import Link from "next/link";
import { Button } from "@/components/ui/button";
import logo from "@/assets/images/logo.png"
import Image from "next/image";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="navbar mb-20">
      <div className="navbar__container container">
        <Link href="/" className="navbar__logo">
          <Image src={logo} height={100} width={140} alt="StockPlus" />
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
          <li className="navbar__actions">
            <Button className="navbar__get-started-button">Get Started</Button>
          </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
