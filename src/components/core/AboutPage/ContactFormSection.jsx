
import ContactUsForm from "../../ContactPage/ContactUsForm"

const ContactFormSection = () => {
    return(
        <div className="mx-auto">
            <h1 className="text-4xl font-semibold text-center">
                Get in Touch
            </h1>
            <p className="text-richblack-300 text-center font-medium mt-3">
                We&apos;d love to here for you, Please fill out this form.
            </p>
            <div className="mx-auto mt-12">
                <ContactUsForm/>
            </div>
        </div>
    )
}

export default ContactFormSection;