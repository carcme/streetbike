import { Link } from "@tanstack/react-router";

const Footer = () => {
  return (
    <footer className="w-full border-t border-foreground/10 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-end ">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex font-bold">
              <span className="text-lg">
                Project<span className="text-gold">R65</span>
              </span>
              {/* <span>MotoFighter</span> */}
            </Link>
          </div>
          <p className="text-gray-500 text-sm">
            Built with patience and coffee by
            <a
              href="https://hammer3.com"
              target="_blank"
              className="text-gold/40 hover:underline"
            >
              {" "}
              Hammer3{" "}
            </a>
            © 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
