import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <div className="flex flex-row h-12 bg-neon-green rounded justify-center items-center space-x-6">
        <Link href="/" className="hover:scale-110">
          Home
        </Link>
        <Link href="/bio" className="hover:scale-110">
          Bio
        </Link>
        <Link href="/store" className="hover:scale-110">
          Store
        </Link>
        <Link href="/events" className="hover:scale-110">
          Events
        </Link>
        <Link href="/contact" className="hover:scale-110">
          Contact
        </Link>
      </div>
    </nav>
  );
}
