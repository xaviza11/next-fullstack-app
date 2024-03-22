"use client"
import Link from "next/link";
import { useIntl } from 'react-intl';
import { useSession } from "next-auth/react";

function Navbar() {
  const intl = useIntl();
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/">
          <h1 className="font-bold text-xl cursor-pointer">NextAuth</h1>
        </Link>

        <ul className="flex gap-x-2">
        {!session && 
          <li className="bg-indigo-500 px-3 py-1">
            <Link href="/">{intl.formatMessage({ id: 'navbar.login' })}</Link>
          </li>}
    
          {!session && 
          <li className="bg-indigo-700 px-3 py-1">
            <Link href="/register">{intl.formatMessage({ id: 'navbar.register' })}</Link>
          </li>
          }
          <li className="px-3 py-1">
            <Link href="/about">{intl.formatMessage({ id: 'navbar.about' })}</Link>
          </li>
          {session && <li className="px-3 py-1">
           <Link href="/dashboard/profile">{session.user.fullname}</Link>
          </li>}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
