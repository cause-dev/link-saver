import Link from "next/link";

const MainHeader = () => {
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
        <button className="flex h-10 w-24 cursor-pointer items-center justify-center rounded-full bg-primary font-bold transition-[3s] hover:bg-primary-hover">
          Login
        </button>
      </div>
    </div>
  );
};

export default MainHeader;
