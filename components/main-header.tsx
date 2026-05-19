"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";

const MainHeader = () => {
  const { error, isPending, data } = useSession();

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
      <div>
        {!data?.user ? (
          <Link
            href="/login"
            className="flex h-10 w-24 cursor-pointer items-center justify-center rounded-full bg-primary font-bold transition-[3s] hover:bg-primary-hover"
          >
            Sign In
          </Link>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1">
            <Image
              src={data.user.image ?? "/cat.png"}
              width={30}
              height={30}
              alt={data.user.name ?? "user"}
              className="rounded-full"
            />
            <span className="text-xs">{data.user.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainHeader;
