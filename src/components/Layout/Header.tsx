"use client";

import Link from "next/link";
import { useState } from "react";
import { buttonVariants } from "../shadcnui/button";
import ThemeToggleButton from "./ThemeToggleButton";

const Header = () => {
  // custom style for ui routing

  // the value fixed and maintain as string for as const
  const [selectRoutes, setSelectRoutes] = useState<Route | null>(null);

  const routes = ["/student", "/teacher"] as const;
  type Route = (typeof routes)[number];

  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 border-b shadow"
      aria-label="app-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href={"/"}>
          <h1
            className="text-2xl font-semibold"
            aria-label="App Name">
            StudentApp
          </h1>
        </Link>

        <nav className="flex items-center gap-4">
          {routes.map((route) => (
            <Link
              key={route}
              href={route}
              onClick={() => setSelectRoutes(route)}
              className={buttonVariants({
                variant: selectRoutes === route ? "default" : "secondary",
                size: "sm",
              })}>
              {route.slice(1)}
            </Link>
          ))}

          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
};

export default Header;
