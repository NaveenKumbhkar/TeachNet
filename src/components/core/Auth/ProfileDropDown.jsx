// import { useRef, useState } from "react"
// import { AiOutlineCaretDown } from "react-icons/ai"
// import { VscDashboard, VscSignOut } from "react-icons/vsc"
// import { useDispatch, useSelector } from "react-redux"
// import { Link, useNavigate } from "react-router-dom"

// import useOnClickOutside from "../../../hooks/useOnClickOutside"
// import { logout } from "../../../services/operations/authAPI"

// export default function ProfileDropdown() {
//   const { user } = useSelector((state) => state.profile)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [open, setOpen] = useState(false)
//   const ref = useRef(null)

//   useOnClickOutside(ref, () => setOpen(false))

//   if (!user) return null

//   return (
//     <button className="relative" onClick={() => setOpen(true)}>
//       <div className="flex items-center gap-x-1">
//         <img
//           src={user?.image}
//           alt={`profile-${user?.firstName}`}
//           className="aspect-square w-[30px] rounded-full object-cover"
//         />
//         <AiOutlineCaretDown className="text-sm text-richblack-100" />
//       </div>
//       {open && (
//         <div
//           onClick={(e) => e.stopPropagation()}
//           className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
//           ref={ref}
//         >
//           <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
//             <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
//               <VscDashboard className="text-lg" />
//               Dashboard
//             </div>
//           </Link>
//           <div
//             onClick={() => {
//               dispatch(logout(navigate))
//               setOpen(false)
//             }}
//             className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
//           >
//             <VscSignOut className="text-lg" />
//             Logout
//           </div>
//         </div>
//       )}
//     </button>
//   )
// }







import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../services/operations/authAPI"

export default function ProfileDropdown({setMobileMenuOpen}) {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  return (
    <div className="relative">
      {/* ================= TRIGGER ================= */}
      <button
        className="hidden md:flex items-center gap-x-1"
        onClick={() => setOpen((prev) => !prev)}
      >
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </button>

      {/* ================= DESKTOP DROPDOWN ================= */}
      {open && (
        <div
          ref={ref}
          className="absolute right-0 top-[120%] z-[1000]
          hidden w-[180px] divide-y divide-richblack-700
          rounded-md border border-richblack-700
          bg-richblack-800 md:block"
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex items-center gap-x-2 px-4 py-3 text-sm text-richblack-100 hover:bg-richblack-700">
              <VscDashboard />
              Dashboard
            </div>
          </Link>

          <button
            onClick={() => {
              setOpen(false)
              dispatch(logout(navigate))
            }}
            className="flex w-full items-center gap-x-2 px-4 py-3 text-sm text-richblack-100 hover:bg-richblack-700"
          >
            <VscSignOut />
            Logout
          </button>
        </div>
      )}

      {/* ================= MOBILE DROPDOWN ================= */}
      
        <div
          ref={ref}
          className="z-[1000]
          flex flex-col
          bg-richblack-800 md:hidden"
        >
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              navigate("/dashboard/my-profile")
            }}
            className="flex items-center gap-2 py-2 text-md text-richblack-100"
          >
            <VscDashboard />
            Dashboard
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false)
              dispatch(logout(navigate))
            }}
            className="flex items-center gap-2 py-2 text-md text-richblack-100"
          >
            <VscSignOut />
            Logout
          </button>
        </div>
      
    </div>
  )
}







// import { useRef, useState } from "react"
// import { AiOutlineCaretDown } from "react-icons/ai"
// import { VscDashboard, VscSignOut } from "react-icons/vsc"
// import { useDispatch, useSelector } from "react-redux"
// import { Link, useNavigate } from "react-router-dom"

// import useOnClickOutside from "../../../hooks/useOnClickOutside"
// import { logout } from "../../../services/operations/authAPI"

// export default function ProfileDropdown() {
//   const { user } = useSelector((state) => state.profile)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const [open, setOpen] = useState(false)
//   const ref = useRef(null)

//   useOnClickOutside(ref, () => setOpen(false))

//   if (!user) return null

//   return (
//     <>
//       {/* ================= DESKTOP TRIGGER ================= */}
//       <button
//         className="relative hidden md:block"
//         onClick={() => setOpen((prev) => !prev)}
//       >
//         <div className="flex items-center gap-x-1">
//           <img
//             src={user?.image}
//             alt={`profile-${user?.firstName}`}
//             className="aspect-square w-[30px] rounded-full object-cover"
//           />
//           <AiOutlineCaretDown className="text-sm text-richblack-100" />
//         </div>

//         {/* ================= DESKTOP DROPDOWN ================= */}
//         {open && (
//           <div
//             ref={ref}
//             onClick={(e) => e.stopPropagation()}
//             className="absolute top-[118%] right-0 z-[1000] w-[180px]
//             divide-y divide-richblack-700 rounded-md border border-richblack-700
//             bg-richblack-800 shadow-xl"
//           >
//             <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
//               <div className="flex items-center gap-x-2 px-4 py-3 text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
//                 <VscDashboard className="text-lg" />
//                 Dashboard
//               </div>
//             </Link>

//             <button
//               onClick={() => {
//                 dispatch(logout(navigate))
//                 setOpen(false)
//               }}
//               className="flex w-full items-center gap-x-2 px-4 py-3 text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
//             >
//               <VscSignOut className="text-lg" />
//               Logout
//             </button>
//           </div>
//         )}
//       </button>

//       {/* ================= MOBILE TRIGGER ================= */}
//       <button
//         className="flex items-center gap-x-2 md:hidden"
//         onClick={() => setOpen(true)}
//       >
//         <img
//           src={user?.image}
//           alt={`profile-${user?.firstName}`}
//           className="aspect-square w-[36px] rounded-full object-cover"
//         />
//         <span className="text-sm text-richblack-100">
//           {user?.firstName}
//         </span>
//       </button>

//       {/* ================= MOBILE OVERLAY ================= */}
//       {open && (
//         <div
//           className="fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm md:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* ================= MOBILE BOTTOM SHEET ================= */}
//       {open && (
//         <div
//           onClick={(e) => e.stopPropagation()}
//           className="fixed bottom-0 left-0 z-[999] w-full rounded-t-2xl
//    bg-richblack-800 p-6 shadow-2xl animate-slideUp md:hidden"
//         >
//           {/* Handle */}
//           <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-richblack-600" />

//           {/* User Info */}
//           <div className="mb-6 flex items-center gap-3">
//             <img
//               src={user?.image}
//               alt="profile"
//               className="h-12 w-12 rounded-full object-cover"
//             />
//             <div>
//               <p className="text-sm font-semibold text-richblack-25">
//                 {user?.firstName} {user?.lastName}
//               </p>
//               <p className="text-xs text-richblack-400">
//                 {user?.email}
//               </p>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex flex-col gap-3">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation()
//                 setOpen(false)
//                 navigate("/dashboard/my-profile")
//               }}
//               className="flex items-center gap-3 rounded-lg bg-richblack-700 px-4 py-3 text-richblack-25"
//             >
//               <VscDashboard className="text-xl" />
//               Dashboard
//             </button>

//             <button
//               onClick={(e) => {
//                 e.stopPropagation()
//                 setOpen(false)
//                 dispatch(logout(navigate))
//               }}
//               className="flex items-center gap-3 rounded-lg bg-richblack-700 px-4 py-3 text-richblack-25"
//             >
//               <VscSignOut className="text-xl" />
//               Logout
//             </button>
//           </div>

//         </div>
//       )}
//     </>
//   )
// }
