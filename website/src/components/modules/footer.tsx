const Footer = () => {
  return (
    <nav className="flex gap-2 justify-center text-indigo-300 w-full px-32 py-8 bg-indigo-950">
      <p>
        By{' '}
        <a href="https://github.com/NioZow" className="hover:text-indigo-600">
          NioZow
        </a>{' '}
        | Contribute on{' '}
        <a href="https://github.com/NioZow/thehackerlibrary" className="hover:text-indigo-600">
          github
        </a>
      </p>
    </nav>
  );
};

export default Footer;
