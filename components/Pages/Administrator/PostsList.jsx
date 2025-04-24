import { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";

const PostsList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        setLoading(true);
        const fetchPosts = async () => {
            try{
                const postsData = await axios.get("http://localhost/wordpress-new/wp-json/custom/v1/posts?per_page=-1&page=1");
                console.log("post Data", postsData)
                setPosts(postsData.data.posts);
                setLoading(false);
            }catch(error){
                console.error(error);
            }
        }

        fetchPosts();
    },[]);

    const deletePost = async (postID) => {
        console.log("PostID", postID)
        const confirmDel = window.confirm("Do you really want to delete?");
        if (!confirmDel) return;
        if(confirmDel){
            try{
                await axios.delete(`http://localhost/wordpress-new/wp-json/custom/v1/delete-post/${postID}`);
                setPosts(prevPosts => prevPosts.filter(post => post.id !== postID));
            }catch(error){
                console.error(error);
            }
        }
    }

    return (
        <div className="container">
            <div className="row mb-4">
                <div className="col-md-10">
                    <h3 className="text-center">Posts List</h3>
                </div>
                <div className="col-md-2">
                    <div className="list-group">
                        <Link className="text-center list-group-item list-group-item-action" to="/dashboard/add-post">Add Post</Link>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    
                    {(loading) ? 'Loading...' : (
                        
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Post Title</th>
                                    <th>Post Excerpt</th>
                                    <th>Post Date</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post, index) => (
                                    <tr key={index}>
                                        <td><Link to={`/${post.slug}`} state={{ post }}>{post.title}</Link></td>
                                        <td>{post.excerpt}</td>
                                        <td>{post.date}</td>
                                        <td><button className="btn btn-dark" onClick={() => deletePost(post.id)}>delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    )
}
export default PostsList;