"use client"
import Link from "next/link";
import { useIntl } from 'react-intl';

function Navbar() {
  const intl = useIntl();

  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/">
          <h1 className="font-bold text-xl">NextAuth</h1>
        </Link>

        <ul className="flex gap-x-2">
          <li className="px-3 py-1">
            <Link href="/about">{intl.formatMessage({ id: 'navbar.about' })}</Link>
          </li>
          <li className="bg-indigo-500 px-3 py-1">
            <Link href="/">{intl.formatMessage({ id: 'navbar.login' })}</Link>
          </li>
          <li className="bg-indigo-700 px-3 py-1">
            <Link href="/register">{intl.formatMessage({ id: 'navbar.register' })}</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
