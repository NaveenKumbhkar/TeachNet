// import { useEffect, useState } from "react"
// import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
// import { BsChevronDown } from "react-icons/bs"
// import { useSelector } from "react-redux"
// import { Link, matchPath, useLocation } from "react-router-dom"

// // import logo from "../../assets/Logo/Logo-Full-Light.png"
// import logo from "../../assets/Logo/logo.png"
// import { NavbarLinks } from "../../data/navbar-links"
// import { apiConnector } from "../../services/apiConnector"
// import { categories } from "../../services/apis"
// import { ACCOUNT_TYPE } from "../../utils/constants"
// import ProfileDropdown from "../core/Auth/ProfileDropDown"

// function Navbar() {
//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)
//   const { totalItems } = useSelector((state) => state.cart)
//   const location = useLocation()

//   const [subLinks, setSubLinks] = useState([])
//   const [loading, setLoading] = useState(false)

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false)


//   useEffect(() => {
//     ; (async () => {
//       setLoading(true)
//       try {
//         const res = await apiConnector("GET", categories.CATEGORIES_API)
//         setSubLinks(res.data.data)
//       } catch (error) {
//         console.log("Could not fetch Categories.", error)
//       }
//       setLoading(false)
//     })()
//   }, [])

//   // console.log("sub links", subLinks)

//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname)
//   }

//   return (
//     <div
//       className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${location.pathname !== "/" ? "bg-richblack-800" : ""
//         } transition-all duration-200`}
//     >
//       <div className="flex w-11/12 max-w-maxContent items-center justify-between">
//         {/* Logo */}
//         <Link to="/">
//           <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
//         </Link>
//         {/* Navigation links */}
//         <nav className="hidden md:block">
//           <ul className="flex gap-x-6 text-richblack-25">
//             {NavbarLinks.map((link, index) => (
//               <li key={index}>
//                 {link.title === "Catalog" ? (
//                   <>
//                     <div
//                       className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName")
//                           ? "text-yellow-25"
//                           : "text-richblack-25"
//                         }`}
//                     >
//                       <p>{link.title}</p>
//                       <BsChevronDown />
//                       <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
//                         <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
//                         {loading ? (
//                           <p className="text-center">Loading...</p>
//                         ) : (subLinks && subLinks.length) ? (
//                           <>
//                             {subLinks
//                               ?.filter(
//                                 (subLink) => subLink?.courses?.length > 0
//                               )
//                               ?.map((subLink, i) => (
//                                 <Link
//                                   to={`/catalog/${subLink.name
//                                     .split(" ")
//                                     .join("-")
//                                     .toLowerCase()}`}
//                                   className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
//                                   key={i}
//                                 >
//                                   <p>{subLink.name}</p>
//                                 </Link>
//                               ))}
//                           </>
//                         ) : (
//                           <p className="text-center">No Courses Found</p>
//                         )}
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <Link to={link?.path}>
//                     <p
//                       className={`${matchRoute(link?.path)
//                           ? "text-yellow-25"
//                           : "text-richblack-25"
//                         }`}
//                     >
//                       {link.title}
//                     </p>
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>
//         {/* Login / Signup / Dashboard */}
//         <div className="hidden items-center gap-x-4 md:flex">
//           {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
//             <Link to="/dashboard/cart" className="relative">
//               <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
//               {totalItems > 0 && (
//                 <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>
//           )}
//           {token === null && (
//             <Link to="/login">
//               <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                 Log in
//               </button>
//             </Link>
//           )}
//           {token === null && (
//             <Link to="/signup">
//               <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                 Sign up
//               </button>
//             </Link>
//           )}
//           {token !== null && <ProfileDropdown />}
//         </div>
//         {/* <button className="mr-4 md:hidden">
//           <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
//         </button> */}
//         <button
//           className="mr-4 md:hidden"
//           onClick={() => setMobileMenuOpen((prev) => !prev)}
//         >
//           <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
//         </button>

//         {/* Mobile Navigation */}
// {mobileMenuOpen && (
//   <div className="absolute top-14 left-0 z-[1000] w-full bg-richblack-800 md:hidden">
//     <div className="flex flex-col gap-4 p-6 text-richblack-25">

//       {/* Nav Links */}
//       {NavbarLinks.map((link, index) => (
//         <div key={index}>
//           {link.title === "Catalog" ? (
//             <>
//               <button
//                 onClick={() => setMobileCatalogOpen((prev) => !prev)}
//                 className="flex w-full items-center justify-between py-2"
//               >
//                 <span>Catalog</span>
//                 <BsChevronDown
//                   className={`transition-transform ${
//                     mobileCatalogOpen ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>

//               {mobileCatalogOpen && (
//                 <div className="ml-4 flex flex-col gap-2">
//                   {loading ? (
//                     <p>Loading...</p>
//                   ) : subLinks?.length ? (
//                     subLinks
//                       .filter((subLink) => subLink?.courses?.length > 0)
//                       .map((subLink, i) => (
//                         <Link
//                           key={i}
//                           to={`/catalog/${subLink.name
//                             .split(" ")
//                             .join("-")
//                             .toLowerCase()}`}
//                           onClick={() => setMobileMenuOpen(false)}
//                           className="py-1 text-sm text-richblack-100"
//                         >
//                           {subLink.name}
//                         </Link>
//                       ))
//                   ) : (
//                     <p>No Courses Found</p>
//                   )}
//                 </div>
//               )}
//             </>
//           ) : (
//             <Link
//               to={link.path}
//               onClick={() => setMobileMenuOpen(false)}
//               className="block py-2"
//             >
//               {link.title}
//             </Link>
//           )}
//         </div>
//       ))}

//       {/* Cart */}
//       {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
//         <Link
//           to="/dashboard/cart"
//           onClick={() => setMobileMenuOpen(false)}
//           className="relative flex items-center gap-2"
//         >
//           <AiOutlineShoppingCart className="text-xl" />
//           <span>Cart</span>
//           {totalItems > 0 && (
//             <span className="ml-auto rounded-full bg-yellow-100 px-2 text-xs text-richblack-900">
//               {totalItems}
//             </span>
//           )}
//         </Link>
//       )}

//       {/* Auth Buttons */}
//       {token === null && (
//         <>
//           <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
//             <button className="w-full rounded-md border border-richblack-700 py-2">
//               Log in
//             </button>
//           </Link>
//           <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
//             <button className="w-full rounded-md border border-richblack-700 py-2">
//               Sign up
//             </button>
//           </Link>
//         </>
//       )}

//       {/* Profile */}
//       {token !== null && <ProfileDropdown />}
//     </div>
//   </div>
// )}


//       </div>
//     </div>
//   )
// }

// export default Navbar










import { useEffect, useRef, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/logo.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false)

  const mobileMenuRef = useRef(null)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch categories", error)
      }
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto"

    const handleClickOutside = (e) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target)
      ) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [mobileMenuOpen])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <div
        className={`flex h-14 items-center justify-center border-b border-richblack-700 ${
          location.pathname !== "/" ? "bg-richblack-800" : ""
        } transition-all`}
      >
        <div className="flex w-11/12 max-w-maxContent items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="Logo" className="w-40" />
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:block">
            <ul className="flex gap-x-6 text-richblack-25">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : ""
                      }`}
                    >
                      <span>Catalog</span>
                      <BsChevronDown />
                      <div className="invisible absolute left-1/2 top-full z-[1000] mt-4 w-64 -translate-x-1/2 rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks?.length ? (
                          subLinks
                            .filter((sub) => sub?.courses?.length > 0)
                            .map((sub, i) => (
                              <Link
                                key={i}
                                to={`/catalog/${sub.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="block rounded-md px-3 py-2 hover:bg-richblack-50"
                              >
                                {sub.name}
                              </Link>
                            ))
                        ) : (
                          <p>No Courses Found</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={
                        matchRoute(link.path)
                          ? "text-yellow-25"
                          : ""
                      }
                    >
                      {link.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Right */}
          <div className="hidden items-center gap-4 md:flex">
            {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className="text-2xl" />
                {totalItems > 0 && (
                  <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-yellow-100 text-xs font-bold text-richblack-900">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {token === null && (
              <>
                <Link to="/login">
                  <button className="rounded-md border px-3 py-1">
                    Log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="rounded-md bg-yellow-100 px-3 py-1 text-richblack-900">
                    Sign up
                  </button>
                </Link>
              </>
            )}

            {token !== null && <ProfileDropdown />}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <AiOutlineMenu className="text-2xl text-richblack-100" />
          </button>
        </div>
      </div>

      {/* ================= MOBILE OVERLAY ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm md:hidden" />
      )}

      {/* ================= MOBILE DRAWER ================= */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed left-0 top-0 z-[1000] h-full w-[80%] max-w-[320px] animate-slideIn bg-richblack-800 md:hidden"
        >
          <div className="flex flex-col gap-6 p-6 text-richblack-25">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <img src={logo} className="w-32" alt="logo" />
              </Link>
              
              <button onClick={() => setMobileMenuOpen(false)}>✕</button>
            </div>

            {/* Links */}
            {NavbarLinks.map((link, index) => (
              <div key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <button
                      onClick={() =>
                        setMobileCatalogOpen((prev) => !prev)
                      }
                      className="flex w-full items-center justify-between text-lg"
                    >
                      Catalog
                      <BsChevronDown
                        className={`transition-transform ${
                          mobileCatalogOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        mobileCatalogOpen
                          ? "max-h-[500px]"
                          : "max-h-0"
                      }`}
                    >
                      <div className="ml-4 mt-2 flex flex-col gap-2">
                        {loading ? (
                          <p>Loading...</p>
                        ) : subLinks?.length ? (
                          subLinks
                            .filter(
                              (sub) => sub?.courses?.length > 0
                            )
                            .map((sub, i) => (
                              <Link
                                key={i}
                                to={`/catalog/${sub.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                onClick={() =>
                                  setMobileMenuOpen(false)
                                }
                                className="rounded-md px-2 py-1 hover:bg-richblack-700"
                              >
                                {sub.name}
                              </Link>
                            ))
                        ) : (
                          <p>No Courses</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-md py-2 text-lg hover:bg-richblack-700"
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            ))}

            {/* Divider */}
            <div className="h-px bg-richblack-700" />

            {/* Cart */}
            {user &&
              user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                <Link
                  to="/dashboard/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3"
                >
                  <AiOutlineShoppingCart />
                  Cart
                  {totalItems > 0 && (
                    <span className="ml-auto rounded-full bg-yellow-100 px-2 text-xs text-richblack-900">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}

            {/* Auth */}
            {token === null ? (
              <div className="flex flex-col gap-3">
                <Link to="/login">
                  <button className="w-full rounded-md border py-2"
                  onClick={() => setMobileMenuOpen(false)}>
                    Log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="w-full rounded-md bg-yellow-100 py-2 text-richblack-900"
                  onClick={() => setMobileMenuOpen(false)}>
                    Sign up
                  </button>
                </Link>
              </div>
            ) : (
              <ProfileDropdown setMobileMenuOpen={setMobileMenuOpen} />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
