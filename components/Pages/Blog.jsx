import BlogPosts from "../Sections/BlogPosts";

const Blog = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <BlogPosts posts_per_page={1} pagination={true} />
                </div>
            </div>
        </div>
    )
}

export default Blog;