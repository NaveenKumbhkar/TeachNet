// import React from 'react'

// import {Swiper, SwiperSlide} from "swiper/react"
// import "swiper/css"
// import "swiper/css/free-mode"
// import "swiper/css/pagination"
// //import { FreeMode, Pagination}  from 'swiper'
// import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper/modules'

// import Course_Card from './Course_Card'

// const CourseSlider = ({Courses}) => {
//   return (
//     <>
//       {Courses?.length ? (
//         <Swiper
//           slidesPerView={1}
//           spaceBetween={25}
//           loop={true}
//           modules={[FreeMode, Pagination]}
//           breakpoints={{
//             1024: {
//               slidesPerView: 5,
//             },
//           }}
//           className="max-h-[30rem]"
//         >
//           {Courses?.map((course, i) => (
//             <SwiperSlide key={i}>
//               <Course_Card course={course} Height={"h-[200px]"} />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       ) : (
//         <p className="text-xl text-richblack-5">No Course Found</p>
//       )}
//     </>
//   )
// }

// export default CourseSlider



import React from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import { FreeMode, Pagination, Autoplay } from "swiper/modules"

import Course_Card from "./Course_Card"

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="max-h-[30rem]"
          breakpoints={{
            // 📱 Mobile
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
              centeredSlides: true,
            },

            // 📱 Large Mobile
            480: {
              slidesPerView: 1,
              spaceBetween: 20,
              centeredSlides: true,
            },

            // 📱➡️📲 Small Tablet
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
              centeredSlides: false,
            },

            // 📲 Tablet
            768: {
              slidesPerView: 3,
              spaceBetween: 22,
              centeredSlides: false,
            },

            // 💻 Laptop
            1024: {
              slidesPerView: 4,
              spaceBetween: 25,
              centeredSlides: false,
            },

            // 🖥️ Desktop
            1280: {
              slidesPerView: 5,
              spaceBetween: 25,
              centeredSlides: false,
            },
          }}
        >
          {Courses.map((course, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <Course_Card
                course={course}
                Height="h-[200px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5 text-center">
          No Course Found
        </p>
      )}
    </>
  )
}

export default CourseSlider
