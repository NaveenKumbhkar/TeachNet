

const status = [
    { count:"5K" , label:"Active Students"},
    { count: "10+", label: "Mentors" },
    { count: "200+", label: "Courses" },
    { count: "50+", label: "Awards" },
]


const StatusComponent = () => {
    return(
        <div className="bg-richblack-700">
            <div className="w-11/12 mx-auto max-w-maxContent text-white">
                <div className="grid grid-cols-2 md:grid-cols-4 text-center">
                    {
                        status.map((data,index) => {
                            return(
                                <div key={index} className="flex flex-col py-10">
                                    <h1 className="text-[30px] text-richblack-5 font-bold">
                                        {data.count}
                                    </h1>
                                    <h2 className="text-[16px] font-semibold text-richblack-500">
                                        {data.label}
                                    </h2>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default StatusComponent;