import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="p-5" id="supportWrapper">
        <h4>Support Portal</h4>
        <a href="">Track Tickets</a>
      </div>
      <div className="row p-5 m-3">
        <div className="col-6 p-5">
          <h1 className="fs-3">
            Search for an answer or browse help topics to create a ticket
          </h1>
          <input placeholder="Eg. how do i activate F/O" />
          <br />
          <a href="" style={{textDecoration:"underline"}}>Track account opening</a>
          <a href="" className="mx-3" style={{textDecoration:"underline"}}>Track segment activation</a>
          <a href="" style={{textDecoration:"underline"}}>Intraday margins</a>
          <a href="" style={{textDecoration:"underline"}}>Kite user manual</a>
        </div>
        <div className="col-6 p-5">
          <h1 className="fs-3">Featured</h1>
          <ol>
            <li><a href="" style={{textDecoration:"underline"}}>Current Takeovers and Delisting - January 2024</a></li>
            <li><a href="" style={{textDecoration:"underline"}}>Latest Intraday leverages - MIS & CO</a></li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;
