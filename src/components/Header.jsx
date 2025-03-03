import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
// import { toggleTheme } from "../redux/theme/themeSlice";
// import { signoutSuccess } from "../redux/user/userSlice";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import logo from "/images/logo.png";
export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const handleSignout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Navbar className="border-b-2  xl:px-20">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold"
      >
        <img
          src={logo}
          alt="Ticket System Logo"
          className="h-10 sm:h-14 filter hue-rotate-180 saturate-100"
        />
        {/* Adjust size as needed */}
      </Link>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                <Link to={"/dashboard?tab=profile"}>{currentUser.email}</Link>
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link to="/">
          <Navbar.Link active={path === "/"} as={"div"}>
            Home
          </Navbar.Link>
        </Link>
        <Link to="/about">
          <Navbar.Link active={path === "/about"} as={"div"}>
            Why Us
          </Navbar.Link>
        </Link>
        {currentUser && (
          <Link
            to={`/dashboard?${
              currentUser.isAdmin ? "tab=dash-admin" : "tab=dash-user"
            }`}
          >
            <Navbar.Link active={path === "/dashboard"} as={"div"}>
              Manage
            </Navbar.Link>
          </Link>
        )}
        <Link to="/contact">
          <Navbar.Link active={path === "/contact"} as={"div"}>
            Contact Us
          </Navbar.Link>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
