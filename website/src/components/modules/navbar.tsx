import Link from 'next/link';

import { cn } from '@/util/style.util';

interface IProps {
  fixed?: boolean;
}

const Navbar = ({ fixed = true }: IProps) => {
  return (
    <nav
      className={cn(
        'flex justify-end w-full px-32 py-8',
        fixed ? 'z-50 fixed top-0 bg-indigo-950/80' : 'bg-indigo-950',
      )}
    >
      <ul className="flex gap-8 text-indigo-300">
        <li>
          <Link className="hover:text-indigo-400 transition-all duration-300 ease-in-out" href="/#">
            Home
          </Link>
        </li>
        <li>
          <Link className="hover:text-indigo-400 transition-all duration-300 ease-in-out" href="/playlists">
            Playlists
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
