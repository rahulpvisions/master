import axios from "axios";
import { useEffect, useRef } from "react";

const ContactForm = ({ content }) => {
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            const response = await axios.post(
                'http://localhost/wordpress-new/wp-json/custom/v1/contact-form',
                Object.fromEntries(formData),
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            
            if(response.data.status === 'success') {
                e.target.reset();
            }
        } catch (error) {
            console.error('Submission error:', error);
        }
    };


    const handleInput = (e) => {
        const input = e.target;
        const error = input.nextElementSibling;
        if(error?.classList?.contains('wpcf7-not-valid-tip')) {
            error.remove();
        }
    };

    useEffect(() => {
        const form = formRef.current;
        if(!form) return;

        form.addEventListener('submit', handleSubmit);
        form.addEventListener('input', handleInput);

        return () => {
            form.removeEventListener('submit', handleSubmit);
            form.removeEventListener('input', handleInput);
        };
    }, []);

    return (
        <div className="container">
            <div className="contact-form">
                <h2>Get in Touch</h2>
                <div 
                    ref={formRef}
                    dangerouslySetInnerHTML={{ __html: content }} 
                />
            </div>
        </div>
    );
};

export default ContactForm;