import { useEffect, useState } from "react";
import axios from "axios";
import Banners from "../Sections/Banners";
import WelcomeContent from "../Sections/WelcomeContent";
import BlogPosts from "../Sections/BlogPosts";
import ContactForm from "../Sections/ContactForm";

const Home = () => {
    const [banners, setBanners] = useState(null);
    const [homepageContent, setHomepageContent] = useState({});
    const [contactForm, setContactForm] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const response = async () => {
            try {
                const response = await axios.get("http://localhost/wordpress-new/wp-json/custom/v1/homepage-data");
                
                if(response.status === 200){
                    const data = response.data;
                    console.log(data);
                    setBanners(data.banner);
                    setHomepageContent(data.welcome_text);
                    
                    setContactForm(data.contact_form);
                    setLoading(false);
                }                
            }catch(error){
                console.log(error);
            }finally {
                setLoading(false);
            }
        };

        response();
    },[]);

    
    return (
        <>
        {(loading) ? <div class="loader-container">
            <div class="loader"></div>
        </div> : ''
        }

        <h4 className="text-center">Welcome to Homepage</h4>
        {(!loading && (
            <>
            {banners && <Banners banners={banners} />}
            {homepageContent && <WelcomeContent content={homepageContent} />}
            <div className="mt-4 mb-4">
                <BlogPosts posts_per_page={3} pagination={false} homepage={true} />
            </div>
            {contactForm && <ContactForm content={contactForm} />}
            </>
        ))}
        
        </>
    )
}
export default Home;