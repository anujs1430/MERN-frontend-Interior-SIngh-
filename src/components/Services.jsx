import React from 'react'
import img from '../assets/images/about2.webp'

const Services = () => {

    const card = [1, 2, 3];

    return (
        <section className="services section-devider py-5" id="services">
            <div className="text-center p-1">
                <p className="text-theme m-0"><small>Services</small></p>
                <h2><span className="text-theme">O</span>ur <span className="text-theme">S</span>ervices</h2>
                <p><i>Lorem ipsum dolor sit amet consectetur adipisicing elit. A, adipisci!</i></p>
            </div>
            <div className="container mt-3">
                <div id="carouselExampleIndicators" className="carousel slide">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                            className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                            aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                            aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner p-3">
                        <div className="carousel-item active">
                            <div className="row">
                                {card.map((item, i) => (
                                    <div className="col-lg-4" key={i}>
                                        <div className="card" style={{ 'width': '22rem' }}>
                                            <img src={img} className="card-img-top" alt="image" />
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text text-secondary"><small>Some quick example text to build on the
                                                    card
                                                    title and make up
                                                    the
                                                    bulk of the card's content.</small></p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                                {card.map((item, i) => (
                                    <div className="col-lg-4" key={i}>
                                        <div className="card" style={{ 'width': '22rem' }}>
                                            <img src={img} className="card-img-top" alt="image" />
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text text-secondary"><small>Some quick example text to build on the
                                                    card
                                                    title and make up
                                                    the
                                                    bulk of the card's content.</small></p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                                {card.map((item, i) => (
                                    <div className="col-lg-4" key={i}>
                                        <div className="card" style={{ 'width': '22rem' }}>
                                            <img src={img} className="card-img-top" alt="image" />
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text text-secondary"><small>Some quick example text to build on the
                                                    card
                                                    title and make up
                                                    the
                                                    bulk of the card's content.</small></p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Services
