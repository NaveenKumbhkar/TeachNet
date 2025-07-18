

const Tab = ({tabData, field, setField}) =>{
    return(
        <div
        className="flex p-1 gap-x-1 my-6 rounded-full bg-richblack-800 max-w-max shadow-[0px_1px_rgba(255,255,255,0.30)]">
            {
                tabData.map((tab) => (
                    <button
                    key={tab.id}
                    onClick={() => setField(tab.type)}
                    className={`${
                        field === tab.type ? 
                        "bg-richblack-900 text-richblack-5"
                        : "bg-transparent text-richblack-200"
                    } py-2 px-5 rounded-full transition-all duration-200`}>
                        {tab?.tabName}
                    </button>
                ))
            }
        </div>
    )
}

export default Tab;