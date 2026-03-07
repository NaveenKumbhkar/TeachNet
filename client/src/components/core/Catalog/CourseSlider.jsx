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
          //centeredSlides={true}
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
              spaceBetween: 0,
            },

            // 📱 Large Mobile
            480: {
              slidesPerView: 1,
              spaceBetween: 0,
            },

            // 📱➡️📲 Small Tablet
            640: {
              slidesPerView: 2,
              spaceBetween: 2,
            },

            // 📲 Tablet
            768: {
              slidesPerView: 2,
              spaceBetween: 5,
            },

            // 💻 Laptop
            1024: {
              slidesPerView: 3,
              spaceBetween: 0,
            },

            // 🖥️ Desktop
            1280: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
          }}
        >
          {Courses.map((course, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center">
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
