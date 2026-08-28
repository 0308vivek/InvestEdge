import React from 'react';

function RightSection({
  imageURL,
  productName,
  productDescription,
  learnMore,
}) {
  return (
    <div className="container py-4 py-lg-5">
      <div className="row align-items-center g-4">
        <div className="col-12 col-lg-6 order-2 order-lg-1 p-3 p-lg-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>
          <div>
            <a
              href={learnMore}
              style={{
                textDecoration: "none ",
                color: "#0B58CA",
              }}
            >
              Learn more{" "}
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div> 
        <div className="col-12 col-lg-6 order-1 order-lg-2">
          <img className="img-fluid w-100" src={imageURL} alt={`${productName} platform`} />
        </div>
        
      </div>
    </div>
  );
}

export default RightSection;