import ContactUsForm from "./ContactUsForm";


const ContactForm = () => {
    return(
        <div className="flex flex-col gap-3 p-7 lg:p-14 text-richblack-300 rounded-xl border border-richblack-600">
            <h1 className="text-4xl font-semibold text-richblack-5 leading-10">
                Got a Idea? We&apos;ve got the skills. Let&apos;s team up
            </h1>
            <p className="">
                Tell us more about yourself and what you&apos;re got in mind.
            </p>
            <div className="mt-7">
                <ContactUsForm/>
            </div>
        </div>
    )
}

export default ContactForm;