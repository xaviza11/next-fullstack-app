// Sin cambios en los imports y la definición de la interfaz Session
"use client"
import Link from "next/link";
import { useIntl } from 'react-intl';
import { useSession } from "next-auth/react";

interface Session {
  user: {
    fullname: string;
    email: string;
  };
}

function Navbar() {
  const intl = useIntl();
  const { data: session } = useSession();

  return (
<nav id="navbar" className="bg-black p-4 w-full z-10">
  <div className="container mx-auto flex justify-between">
    <Link href="/">
      <h1 className="font-bold text-xl cursor-pointer sm:text-lg">FlightSimWay</h1>
    </Link>

    <ul className="flex gap-x-2">
      {!session && (
        <>
          <li className="bg-orange-500 px-3 py-1 text-sm sm:text-xs">
            <Link href="/">{intl.formatMessage({ id: 'navbar.login' })}</Link>
          </li>
          <li className="bg-blue-500 px-3 py-1 text-sm sm:text-xs">
            <Link href="/register">{intl.formatMessage({ id: 'navbar.register' })}</Link>
          </li>
        </>
      )}
      <li className=" py-1 text-sm sm:text-xs">
        <Link href="/about">{intl.formatMessage({ id: 'navbar.about' })}</Link>
      </li>
      {session && (
        <li className="py-1 text-sm sm:text-xs">
          <Link href="/dashboard/profile">{(session.user as unknown as Session['user']).fullname}</Link>
        </li>
      )}
    </ul>
  </div>
</nav>
  );
}

export default Navbar;
