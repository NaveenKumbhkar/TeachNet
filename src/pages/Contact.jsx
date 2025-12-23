import ContactDetails from "../components/ContactPage/ContactDetails";
import ContactForm from "../components/ContactPage/ContactForm";
import Footer from "../components/Comman/Footer";


const Contact = () => {
    return (
        <div>
            <div className="flex flex-col lg:flex-row w-11/12 max-w-maxContent mx-auto mt-20 gap-10">
                <div className="lg:w-[40%]">
                    <ContactDetails />
                </div>
                <div className="lg:w-[60%]">
                    <ContactForm />
                </div>
            </div>

            <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">

                <h1 className="text-center text-4xl font-semibold mt-8">
                    Reviews from other learners
                </h1>
                {/* Review slider */}
            </div>
            <Footer />
        </div>
    )
}

export default Contact;