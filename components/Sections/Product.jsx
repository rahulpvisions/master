const Product = ({product, handleAddToCart}) => {
    return (
        <>
        <div className="col-md-4 mb-2">
            <div className="card">
                <div className="card-body">
                    <img className="list-prod-img" src={product.image} alt={product.name} />
                    <div className="row mt-3">
                        <div className="col-md-7"><h5>{product.name}</h5></div>
                        <div className="col-md-5 text-end">
                            {(product.on_sale) ? (
                                <>
                                    <span className="text-start text-decoration-line-through fs-6 text-danger" dangerouslySetInnerHTML={{ __html: product.display_regular_price }}></span> <span className="text-end" dangerouslySetInnerHTML={{ __html: product.display_sale_price }}></span>
                                </>
                            ) : (
                                <span className="text-start fs-6" dangerouslySetInnerHTML={{ __html: product.display_regular_price }}></span>
                            ) }
                        </div>
                    </div>
                    {/* <p>{product.excerpt}</p> */}
                    <div className="d-flex flex-row justify-content-center mt-3">
                        <button onClick={() => handleAddToCart(product)} className="btn btn-primary w-50" type="button">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Product;