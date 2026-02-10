import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

export default function InstructorChart({ courses }) {
  // State to keep track of the currently selected chart
  const [currChart, setCurrChart] = useState("students")

  // Function to generate random colors for the chart
  const generateRandomColors = (numColors) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`
      colors.push(color)
    }
    return colors
  }

  // Data for the chart displaying student information
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  }

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  }

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
      display: false,
      },
    }
  }

  return (
    // <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
    //   <p className="text-lg font-bold text-richblack-5">Visualize</p>
    //   <div className="space-x-4 font-semibold">
    //     {/* Button to switch to the "students" chart */}
    //     <button
    //       onClick={() => setCurrChart("students")}
    //       className={`rounded-sm p-1 px-3 transition-all duration-200 ${
    //         currChart === "students"
    //           ? "bg-richblack-700 text-yellow-50"
    //           : "text-yellow-400"
    //       }`}
    //     >
    //       Students
    //     </button>
    //     {/* Button to switch to the "income" chart */}
    //     <button
    //       onClick={() => setCurrChart("income")}
    //       className={`rounded-sm p-1 px-3 transition-all duration-200 ${
    //         currChart === "income"
    //           ? "bg-richblack-700 text-yellow-50"
    //           : "text-yellow-400"
    //       }`}
    //     >
    //       Income
    //     </button>
    //   </div>
    //   <div className="mx-auto aspect-square">
    //     {/* Render the Pie chart based on the selected chart */}
    //     <Pie
    //       data={currChart === "students" ? chartDataStudents : chartIncomeData}
    //       options={options}
    //     />
    //   </div>
    // </div>


    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>


      <div className="space-x-4 font-semibold">
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
            }`}
        >
          Students
        </button>


        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
            }`}
        >
          Income
        </button>
      </div>


      {/* Main container: legend left, chart right */}
      <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-center">


        {/* Legend on LEFT side */}
        <div className="flex flex-col gap-2 text-richblack-200 text-sm">
          {courses.map((course, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-4 rounded-sm"
                style={{
                  backgroundColor: currChart === "students"
                    ? chartDataStudents.datasets[0].backgroundColor[index]
                    : chartIncomeData.datasets[0].backgroundColor[index],
                }}
              ></span>
              <span>{course.courseName}</span>
            </div>
          ))}
        </div>


        {/* Chart on RIGHT */}
        <div className="w-[150px] md:w-[180px] lg:w-[250px] aspect-square">
          <Pie
            data={currChart === "students" ? chartDataStudents : chartIncomeData}
            options= {options}
          />
        </div>
      </div>
    </div>
  )
}