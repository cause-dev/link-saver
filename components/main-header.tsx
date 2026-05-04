import Link from "next/link";

const MainHeader = () => {
  return (
    <div className="h-20 w-full flex justify-between items-center px-10 bg-surface-2 text-fg">
      <h2 className="font-bold text-2xl">
        <Link href="/">Link Saver</Link>
      </h2>
      <nav className="flex justify-center items-center">
        <ul className="flex justify-center items-center gap-12">
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
        <button className="bg-primary font-bold w-24 h-10 rounded-full cursor-pointer flex justify-center items-center hover:bg-primary-hover transition-[3s]">
          Login
        </button>
      </div>
    </div>
  );
};

export default MainHeader;
