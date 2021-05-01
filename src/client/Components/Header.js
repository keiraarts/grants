import React from "react";
import { useStoreState } from "easy-peasy";
import Link from "next/link";

export default function Header() {
  const auth = useStoreState((state) => state.user.auth);
  const path = "/";

  return (
    <div className="header flex">
      <Link href="/">
        <a href="/" className="flex remove-a">
          <img src="/assets/logo.png" className="logo" alt="Twitter" />
        </a>
      </Link>
      <div className="flex-full" />
      <div className="nav-container">
        <div className="flex-full" />
        <div className="header-nav">
          <strong>
            <Link href="/ethos">
              <a
                href="/ethos"
                rel="canonical"
                className={`header-margin remove-a ${
                  path === "ethos" && "header-selected"
                }`}
              >
                Ethos
              </a>
            </Link>
            <Link href="/learn">
              <a
                href="/learn"
                rel="canonical"
                className={`header-margin remove-a ${
                  path === "learn" && "header-selected"
                }`}
              >
                Learn
              </a>
            </Link>
            <Link href="/team">
              <a
                href="/team"
                rel="canonical"
                className={`header-margin remove-a ${
                  path === "team" && "header-selected"
                }`}
              >
                Team
              </a>
            </Link>
            <Link href="/testimony">
              <a
                href="/testimony"
                rel="canonical"
                className={`header-margin remove-a ${
                  path === "testimony" && "header-selected"
                }`}
              >
                Testimonies
              </a>
            </Link>
            <Link href="/program">
              <a
                href="/program"
                rel="canonical"
                className={`header-margin remove-a ${
                  (path === "program" || path === "apply") && "header-selected"
                }`}
              >
                Grants
              </a>
            </Link>
          </strong>
        </div>
        <div className="flex-full margin-top-xs" />
        {auth && auth.username ? (
          <div>
            <div className="text-s flex">
              <div className="flex-full" />
              <a href="/account" className="pointer">
                <div className="text-grey">Edit Profile</div>
              </a>
              &nbsp;⬡&nbsp;
              <a href={`/u/${auth.username}`} className="pointer">
                <div className="text-rainbow">{auth.username}</div>
              </a>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-s flex">
              <div className="flex-full" />
              <a href="/login" className="pointer">
                <div className="text-grey">Log In</div>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
