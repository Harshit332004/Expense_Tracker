import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchResultCard({product}) {
  return (
    <div className="card mb-3" >
      <div className="row g-0">
        <div className="col-md-5 img_container">
          <img
            src={product?.imgUrl}
            className="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div className="col-md-7">
          <div className="card-body">
          <h5 className="card-title">{product?.name}</h5>
              <p className="card-text">
              {product?.description}
              </p>
              <p className="card-text mb-1">₹ {product?.price}</p>
              <div className="card-text mb-4">
                <FontAwesomeIcon icon={faStar} /> {product?.ratingAverage} ({product?.ratingCount} Reviews)
              </div>
              <div className="card-text mb-2">
                <button className="btn btn-light grey">Add to cart</button>
              </div>
              <div className="card-text">
                <button className="btn btn-primary">Buy Now</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
