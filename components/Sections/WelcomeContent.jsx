const WelcomeContent = ( { content } ) => {

    console.log("homepageContent", content);
    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="text-left">{content.heading}</h1>
                        <div className="text-justify">
                            <div dangerouslySetInnerHTML={{__html: content.content}}></div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img className="img-fluid" src={content.section_image.url} alt={content.section_image.alt} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default WelcomeContent;