import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-yellow-500 py-4 mb-5">
      <nav className="container mx-auto px-4">
        <Link href="/" passHref>
          <button className="text-white font-bold text-4xl hover:text-red-500 transition-colors focus:outline-none">
            Home
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
