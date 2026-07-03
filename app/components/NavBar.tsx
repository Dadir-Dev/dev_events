import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <header>
      <nav className="flex flex-row justify-between mx-auto container sm:px-10 px-5 py-4">
        <Link href="/" className="flex flex-row items-center gap-2">
          <Image
            src="/icons/logo.png"
            alt="logo"
            width={32}
            height={32}
            className="logo"
          />
          <h1 className="text-xl font-bold italic max-sm:hidden px-0.5">
            DevEvents
          </h1>
        </Link>

        <ul className="flex md:gap-5 lg:gap-10 list-none">
          <li>
            <Link href="/events">Home</Link>
          </li>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/about">Create Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
