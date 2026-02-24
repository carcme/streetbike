import { Link } from "@tanstack/react-router";

const Footer = () => {
  return (
    <footer className="w-full py-4 border-t border-foreground/10">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-end ">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex font-bold">
              <span className="text-lg">
                Project<span className="text-primary">R65</span>
              </span>
              {/* <span>MotoFighter</span> */}
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with patience and coffee by
            <a
              href="https://hammer3.com"
              target="_blank"
              className="text-primary hover:underline"
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
