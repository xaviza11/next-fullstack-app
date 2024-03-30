"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { parseJwt } from "@/app/utils/parseJWT";
import { useDispatch, useSelector } from "react-redux";
import { toggleAlert, toggleSession, setName } from "../../store/actions";

function Navbar() {
  const intl = useIntl();
  const dispatch = useDispatch();

  dispatch(toggleAlert(false));

  const session = useSelector(
    (state: { hasSession: boolean }) => state.hasSession
  );
  const user = useSelector((state: { name: string }) => state.name);

  useEffect(() => {
    const cookie = getCookie("token");
    let parsedCookie = null;

    if (cookie !== null) parsedCookie = parseJwt(cookie);
    else parsedCookie = "none";

    if (parsedCookie !== "none") {
      dispatch(setName(parsedCookie.name));
      dispatch(toggleSession(true));
    }

    function getCookie(name: string) {
      let cookieArr = document.cookie.split(";");
      for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if (name === cookiePair[0].trim()) {
          return decodeURIComponent(cookiePair[1]);
        }
      }
      return null;
    }
  });

  return (
    <nav id="navbar" className="bg-black p-4 w-full z-10">
      <div className="container mx-auto flex justify-between">
        <Link href="/">
          <h1 className="font-bold text-xl cursor-pointer sm:text-lg">
            FlightSimWay
          </h1>
        </Link>

        <ul className="flex gap-x-2">
          {!session && (
            <>
              <li className="bg-orange-500 px-3 py-1 text-sm sm:text-xs">
                <Link href="/pages/login">
                  {intl.formatMessage({ id: "navbar.login" })}
                </Link>
              </li>
              <li className="bg-blue-500 px-3 py-1 text-sm sm:text-xs">
                <Link href="/pages/register">
                  {intl.formatMessage({ id: "navbar.register" })}
                </Link>
              </li>
            </>
          )}
          <li className=" py-1 text-sm sm:text-xs">
            <Link href="/pages/about">
              {intl.formatMessage({ id: "navbar.about" })}
            </Link>
          </li>
          {session && (
            <li className="py-1 text-sm sm:text-xs">
              <Link href="/pages/dashboard/profile">{user}</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
