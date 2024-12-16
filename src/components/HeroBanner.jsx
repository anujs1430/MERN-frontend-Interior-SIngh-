import React from 'react'

const HeroBanner = () => {
    return (
        <section className="hero">
            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                    <div className="carousel-item carousel-item-img active">
                        <div className="carousel-content">
                            <div className="container h-100">
                                <div className="row h-100 align-items-center text-light">
                                    <div className="col-lg-6">
                                        <p><small>Lorem ipsum dolor sit amet.</small></p>
                                        <h2>Welcome To Our House <br /> interior Design Website</h2>
                                        <p><small>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga beatae ex
                                            deleniti,
                                            aspernatur quasi quis reiciendis modi numquam veritatis possimus?</small>
                                        </p>
                                        <div>
                                            <a href="#services" className="btn btn-primary">Our Services</a>
                                            <a href="#portfolio" className="btn btn-light">Our Works</a>
                                        </div>
                                    </div>
                                    <div className="col-lg-6"></div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item carousel-item-img">
                        <div className="carousel-content">
                            <div className="container h-100">
                                <div className="row h-100 align-items-center text-light">
                                    <div className="col-lg-6">
                                        <p><small>Lorem ipsum dolor sit amet.</small></p>
                                        <h2>Welcome To Our House <br /> interior Design Website</h2>
                                        <p><small>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga beatae ex
                                            deleniti,
                                            aspernatur quasi quis reiciendis modi numquam veritatis possimus?</small>
                                        </p>
                                        <div>
                                            <a href="#services" className="btn btn-primary">Our Services</a>
                                            <a href="#portfolio" className="btn btn-light">Our Works</a>
                                        </div>
                                    </div>
                                    <div className="col-lg-6"></div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item carousel-item-img">
                        <div className="carousel-content">
                            <div className="container h-100">
                                <div className="row h-100 align-items-center text-light">
                                    <div className="col-lg-6">
                                        <p><small>Lorem ipsum dolor sit amet.</small></p>
                                        <h2>Welcome To Our House <br /> interior Design Website</h2>
                                        <p><small>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga beatae ex
                                            deleniti,
                                            aspernatur quasi quis reiciendis modi numquam veritatis possimus?</small>
                                        </p>
                                        <div>
                                            <button className="btn btn-primary">Our Services</button>
                                            <button className="btn btn-light">Our Works</button>
                                        </div>
                                    </div>
                                    <div className="col-lg-6"></div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </section>
    )
}

export default HeroBanner
