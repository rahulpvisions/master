import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BlogPosts = ({ posts_per_page, pagination, homepage }) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost/wordpress-new/wp-json/custom/v1/posts?per_page=${posts_per_page}&page=${currentPage}`
        );
        setPosts(response.data.posts || []);
        setTotalPages(response.data.total_pages || 0);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, posts_per_page]);

  const handlePagination = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };
  
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <>
    {(loading && !homepage) ? <div class="loader-container">
        <div class="loader"></div>
      </div> : ''
    }

<div className="container mt-4">
      <h1 className={`${(!homepage) ? 'text-center': ''} mb-4 mt-4`}>Blog</h1>
      <div className="row">
        {posts.map((post, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100">
              {post.thumbnail && (
                <img
                  src={post.thumbnail}
                  alt={post.alt || ""}
                  className="card-img-top"
                />
              )}
              <div className="card-body d-flex flex-column">
                {post.title && <h5 className="card-title">{post.title}</h5>}
                {post.excerpt && (
                  <div
                    className="card-text"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                )}
                <Link
                  className="btn btn-primary mt-auto"
                  to={`/${post.slug}`}
                  state={{ post }}
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {pagination && totalPages > 1 && (
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center">
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePagination(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default BlogPosts;