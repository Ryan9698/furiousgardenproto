import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <div className="flex flex-row h-12 bg-green-500 rounded justify-center items-center">
        <Link href="/">Home</Link>
        <Link href="/bio">Bio</Link>
        <Link href="/store">Store</Link>
        <Link href="/events">Events</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
