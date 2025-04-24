import { useState } from "react";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        yourName: "", yourEmail: "", yourSubject: "", yourMessage: ""
    });
    const [formStep, setFormStep] = useState(1);

    const handleNextStep = () => {
        setFormStep(prevStep => Math.min(prevStep + 1, 4));
    }

    const handlePreviousStep = () => {
        setFormStep(prevStep => Math.max(prevStep - 1, 1));
    }

    const handleChangeForm = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <div className="container mt-4">
            <h1>Contact Us</h1>
            <form onSubmit={handleFormSubmit}>
                {(formStep === 1) && <div className="form-group">
                    <input type="text" className="form-control" name="yourName" onChange={handleChangeForm} id="your-name" placeholder="Your Name" value={formData.yourName} required />
                </div> }

                {(formStep === 2) && <div className="form-group">
                    <input type="text" className="form-control" name="yourEmail" id="your-email" onChange={handleChangeForm} placeholder="Your Email" required value={formData.yourEmail} />
                </div> }

                {(formStep === 3) && <div className="form-group">
                    <input type="text" className="form-control" name="yourSubject" id="your-subject" onChange={handleChangeForm} placeholder="Your Subject" required value={formData.yourSubject} />
                </div> }

                {(formStep === 4) && <div className="form-group">
                    <textarea name="yourMessage" className="form-control" onChange={handleChangeForm} id="your-message" placeholder="Your Message" value={formData.yourMessage}></textarea>
                </div> }
                
                {(formStep > 1) && <button className="btn btn-primary mt-4" type="button" onClick={handlePreviousStep}>Previous</button>} {(formStep < 4) && <button type="button" className="btn btn-primary mt-4" onClick={handleNextStep}>Next</button>} {(formStep===4) && <button className="btn btn-primary mt-4" type="submit">Submit</button>}
            </form>
        </div>
    );
}
export default ContactUs;