const Footer = () => {
  return (
    <footer className="bg-slate-800 shadow-sm dark:bg-gray-800 mt-3">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-white font-bold tracking-tight font-sans">
          © 2023{' '}
          <a href="https://flowbite.com/" className="hover:underline">
            RANDOM CHALLENGE™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="text-white hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline me-4 md:me-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline me-4 md:me-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
