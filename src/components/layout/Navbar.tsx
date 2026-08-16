// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Menu, X } from "lucide-react";
// import logo from "../../assets/logo.png";

// type NavLink =
//   | { name: string; href: string }
//   | { name: string; type: "dropdown" };

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isPackagesOpen, setIsPackagesOpen] = useState(false);

//   const navLinks: NavLink[] = [
//     { name: "Home", href: "/" },
//     { name: "About", href: "/about" },
//     { name: "Services", href: "/services" },
//     { name: "Packages", type: "dropdown" },
//     { name: "Booking System", href: "/booking" },
//     { name: "Customers", href: "/login" },
//   ];

//   const closeAllMenus = () => {
//     setIsOpen(false);
//     setIsPackagesOpen(false);
//   };

//   return (
//     <nav className="bg-[#06090d] text-white relative">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-24">

//           {/* Logo */}
//           <div className="shrink-0">
//             <img src={logo} alt="Logo" className="h-20 w-auto" />
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center gap-6 lg:gap-8">

//             {navLinks.map((link, index) => {
//               if ("type" in link && link.type === "dropdown") {
//                 return (
//                   <div key={`dropdown-${index}`} className="relative">
//                     <button
//                       onClick={() =>
//                         setIsPackagesOpen(prev => !prev)
//                       }
//                       className="text-white hover:text-cyan-400 transition-colors text-md font-medium"
//                     >
//                       {link.name}
//                     </button>

//                     {isPackagesOpen && (
//                       <div className="absolute top-10 left-0 bg-black border border-gray-800 rounded-lg shadow-lg w-52 z-50">
//                         <Link
//                           to="/packages/monthly"
//                           className="block px-4 py-2 hover:bg-gray-800"
//                           onClick={closeAllMenus}
//                         >
//                           Monthly Services
//                         </Link>
//                         <Link
//                           to="/packages/detailing"
//                           className="block px-4 py-2 hover:bg-gray-800"
//                           onClick={closeAllMenus}
//                         >
//                           Premium Services
//                         </Link>
//                       </div>
//                     )}
//                   </div>
//                 );
//               }

//               if ("href" in link) {
//                 return (
//                   <Link
//                     key={`link-${index}`}
//                     to={link.href}
//                     className="text-white hover:text-cyan-400 transition-colors text-md font-medium"
//                     onClick={() => setIsPackagesOpen(false)} // ✅ close dropdown
//                   >
//                     {link.name}
//                   </Link>
//                 );
//               }

//               return null;
//             })}
//           </div>

//           {/* Contact Button */}
//           <div className="hidden md:block">
//             <Button
//               asChild
//               className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-8 py-2 text-lg"
//             >
//               <Link to="/contact" onClick={closeAllMenus}>
//                 Contact
//               </Link>
//             </Button>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-white hover:text-cyan-400"
//             >
//               {isOpen ? <X size={26} /> : <Menu size={26} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-black border-t border-gray-800">
//           <div className="px-4 pt-3 pb-4 space-y-3">

//             {navLinks.map((link, index) => {
//               if ("type" in link && link.type === "dropdown") {
//                 return (
//                   <div key={`mobile-dropdown-${index}`}>
//                     <button
//                       onClick={() =>
//                         setIsPackagesOpen(prev => !prev)
//                       }
//                       className="w-full text-left text-white py-2 text-sm font-medium"
//                     >
//                       {link.name}
//                     </button>

//                     {isPackagesOpen && (
//                       <div className="pl-4 space-y-2">
//                         <Link
//                           to="/packages/monthly"
//                           className="block text-gray-300 text-sm"
//                           onClick={closeAllMenus}
//                         >
//                           Monthly Services
//                         </Link>
//                         <Link
//                           to="/packages/detailing"
//                           className="block text-gray-300 text-sm"
//                           onClick={closeAllMenus}
//                         >
//                           Premium Services
//                         </Link>
//                       </div>
//                     )}
//                   </div>
//                 );
//               }

//               if ("href" in link) {
//                 return (
//                   <Link
//                     key={`mobile-${index}`}
//                     to={link.href}
//                     className="block text-white hover:text-cyan-400 py-2 text-sm font-medium"
//                     onClick={closeAllMenus}
//                   >
//                     {link.name}
//                   </Link>
//                 );
//               }

//               return null;
//             })}

//             {/* Contact Button */}
//             <Button
//               asChild
//               className="w-full bg-cyan-500 hover:bg-cyan-600 text-white rounded-full mt-3"
//             >
//               <Link to="/contact" onClick={closeAllMenus}>
//                 Contact
//               </Link>
//             </Button>

//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";

type NavLink =
  | { name: string; href: string }
  | { name: string; type: "dropdown" };

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPackagesOpen, setIsPackagesOpen] = useState(false);

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Packages", type: "dropdown" },
    { name: "Booking System", href: "/booking" },
    { name: "Customers", href: "/login" },
  ];

  const closeAllMenus = () => {
    setIsOpen(false);
    setIsPackagesOpen(false);
  };

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#06090d] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">

            {/* Logo */}
            <div className="shrink-0">
              <img src={logo} alt="Logo" className="h-20 w-auto" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link, index) => {
                if ("type" in link && link.type === "dropdown") {
                  return (
                    <div
                      key={`dropdown-${index}`}
                      className="relative"
                    >
                      <button
                        onClick={() =>
                          setIsPackagesOpen((prev) => !prev)
                        }
                        className="text-white hover:text-cyan-400 transition-colors text-md font-medium"
                      >
                        {link.name}
                      </button>

                      {isPackagesOpen && (
                        <div className="absolute top-10 left-0 bg-black border border-gray-800 rounded-lg shadow-lg w-52 z-50">
                          <Link
                            to="/packages/monthly"
                            className="block px-4 py-2 hover:bg-gray-800"
                            onClick={closeAllMenus}
                          >
                            Monthly Services
                          </Link>

                          <Link
                            to="/packages/detailing"
                            className="block px-4 py-2 hover:bg-gray-800"
                            onClick={closeAllMenus}
                          >
                            Premium Services
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                }

                if ("href" in link) {
                  return (
                    <Link
                      key={`link-${index}`}
                      to={link.href}
                      className="text-white hover:text-cyan-400 transition-colors text-md font-medium"
                      onClick={() =>
                        setIsPackagesOpen(false)
                      }
                    >
                      {link.name}
                    </Link>
                  );
                }

                return null;
              })}
            </div>

            {/* Contact Button */}
            <div className="hidden md:block">
              <Button
                asChild
                className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-8 py-2 text-lg"
              >
                <Link
                  to="/contact"
                  onClick={closeAllMenus}
                >
                  Contact
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-cyan-400"
              >
                {isOpen ? (
                  <X size={26} />
                ) : (
                  <Menu size={26} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-black border-t border-gray-800">
            <div className="px-4 pt-3 pb-4 space-y-3">

              {navLinks.map((link, index) => {
                if (
                  "type" in link &&
                  link.type === "dropdown"
                ) {
                  return (
                    <div
                      key={`mobile-dropdown-${index}`}
                    >
                      <button
                        onClick={() =>
                          setIsPackagesOpen(
                            (prev) => !prev
                          )
                        }
                        className="w-full text-left text-white py-2 text-sm font-medium"
                      >
                        {link.name}
                      </button>

                      {isPackagesOpen && (
                        <div className="pl-4 space-y-2">
                          <Link
                            to="/packages/monthly"
                            className="block text-gray-300 text-sm"
                            onClick={closeAllMenus}
                          >
                            Monthly Services
                          </Link>

                          <Link
                            to="/packages/detailing"
                            className="block text-gray-300 text-sm"
                            onClick={closeAllMenus}
                          >
                            Premium Services
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                }

                if ("href" in link) {
                  return (
                    <Link
                      key={`mobile-${index}`}
                      to={link.href}
                      className="block text-white hover:text-cyan-400 py-2 text-sm font-medium"
                      onClick={closeAllMenus}
                    >
                      {link.name}
                    </Link>
                  );
                }

                return null;
              })}

              {/* Contact Button */}
              <Button
                asChild
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white rounded-full mt-3"
              >
                <Link
                  to="/contact"
                  onClick={closeAllMenus}
                >
                  Contact
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-24"></div>
    </>
  );
};

export default Navbar;