
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const SinglePost = () => {

    const postSlug = useParams();
    const location = useLocation();
    const [post, setPost] = useState(location.state.post || null);

    useEffect(() => {
        if(!postSlug.postSlug){
            axios.get(`http://localhost/wordpress-new/wp-json/custom/v1/post/${postSlug.postSlug}`)
            .then((response) => setPost(response.data))
            .catch((error) => console.log(error))
        }
    },[postSlug.postSlug])

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-12">
                    <div className="card mt-4 mb-4">
                        <div className="card-body">
                            {(post.thumbnail) ? <img className="img-fluid mb-4" alt={post.title} src={post.thumbnail} /> : ''}
                            <h2 className="card-title">{post.title}</h2>  
                            <div className="card-text" dangerouslySetInnerHTML={{ __html: post.content }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePost;