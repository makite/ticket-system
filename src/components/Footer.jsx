import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsGithub, BsDribbble, BsLinkedin } from "react-icons/bs";
import logo from "/images/logo.png";
export default function FooterPage() {
  return (
    <Footer
      container
      className="border-t-8 border-green-500 dark:bg-gray-900 text-gray-300"
    >
      <div className="w-full max-w-7xl mx-auto px-6 py-8">
        <div className="grid sm:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="sm:col-span-1 flex flex-col items-center sm:items-start">
            <Link
              to="/"
              className=" whitespace-nowrap text-sm sm:text-xl font-semibold"
            >
              <img
                src={logo}
                alt="Ticket System Logo"
                className="h-10 sm:h-14 filter hue-rotate-180 saturate-100"
              />
              {/* Adjust size as needed */}
            </Link>
            <p className="mt-3 text-sm text-gray-400">
              Simplifying ticket management with seamless solutions.
            </p>
          </div>

          {/* Address & Contact */}
          <div>
            <Footer.Title title="Contact" className="dark:text-white" />
            <Footer.LinkGroup col>
              <Footer.Link
                href="https://where-am-i.org/?lat=9.0113882&lng=38.7540327"
                target="_blank"
                className="hover:text-green-500"
              >
                Addis Ababa, Ethiopia
              </Footer.Link>
              <Footer.Link
                href="mailto:makimanmtu@gmail.com"
                className="hover:text-green-500"
              >
                makimanmtu@gmail.com
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          {/* Social Media Links */}
          <div>
            <Footer.Title title="Follow Us" className="dark:text-white" />
            <div className="flex justify-center sm:justify-start gap-4 mt-2">
              <Footer.Icon
                href="https://www.linkedin.com/in/makite-desta/"
                icon={BsLinkedin}
                className="hover:text-blue-500 transition"
              />
              <Footer.Icon
                href="https://github.com/makite"
                icon={BsGithub}
                className="hover:text-gray-400 transition"
              />
              <Footer.Icon
                href="https://makite-portfolio.vercel.app/"
                icon={BsDribbble}
                className="hover:text-pink-500 transition"
              />
              <Footer.Icon
                href="https://web.facebook.com/maki.man.106"
                icon={BsFacebook}
                className="hover:text-blue-600 transition"
              />
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <Footer.Divider className="my-6 border-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm">
          <Footer.Copyright
            href="#"
            by="Makite Desta"
            year={new Date().getFullYear()}
          />
          <p className="mt-3 sm:mt-0 text-gray-400">All Rights Reserved.</p>
        </div>
      </div>
    </Footer>
  );
}
