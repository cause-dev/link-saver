"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";

const MainHeader = () => {
  const { error, isPending, data } = useSession();
  const [openDropdown, setOpenDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isPending) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>Something has gone wrong.</p>;
  }

  return (
    <div className="flex h-20 w-full items-center justify-between bg-surface-2 px-10 text-fg">
      <h2 className="text-2xl font-bold">
        <Link href="/">Link Saver</Link>
      </h2>
      <nav className="flex items-center justify-center">
        <ul className="flex items-center justify-center gap-12">
          <li>
            <Link href="#">Home</Link>
          </li>
          <li>
            <Link href="#">My Links</Link>
          </li>
          <li>
            <Link href="#">Add New Link</Link>
          </li>
        </ul>
      </nav>
      <div ref={ref} className="relative">
        {!data?.user ? (
          <Link
            href="/sign-in"
            className="flex h-10 w-24 cursor-pointer items-center justify-center rounded-full bg-primary font-bold transition-[3s] hover:bg-primary-hover"
          >
            Sign In
          </Link>
        ) : (
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="flex cursor-pointer flex-col items-center justify-center gap-1"
          >
            <Image
              src={data.user.image ?? "/cat.png"}
              width={30}
              height={30}
              alt={data.user.name ?? "user"}
              className="rounded-full"
            />
            <span className="text-xs">{data.user.name}</span>
          </button>
        )}
        {openDropdown && (
          <div className="absolute top-17 right-0.5 flex items-center justify-center rounded-xl bg-active px-5 py-3">
            <button
              onClick={() => signOut()}
              className="cursor-pointer text-red-400"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainHeader;
