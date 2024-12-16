import React from 'react'
import { FaStar } from 'react-icons/fa6';

const Testimonials = () => {

    const card = [1, 2, 3];

    return (
        <section className="testimonial section-devider py-5" id="testimonial">
            <div className="text-center p-1">
                <p className="text-theme m-0"><small>Testimonials</small></p>
                <h2><span className="text-theme">O</span>ur <span className="text-theme">T</span>estimonials</h2>
                <p><i>Lorem ipsum dolor sit amet consectetur adipisicing elit. A, adipisci!</i></p>
            </div>
            <div className="container">
                <div id="carouselExampleCaptions" className="carousel slide">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active"
                            aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                            aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                            aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                {card.map((item, i) => (
                                    <div className="col" key={i}>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-center">
                                                    {Array(5).fill(<FaStar className='text-warning' />)}
                                                </div>
                                                <p className="card-text text-secondary"><small><i><i className="bi bi-quote"></i>This is
                                                    a longer card with
                                                    supporting text below as a
                                                    natural lead-in to additional content. This content is a little bit
                                                    longer.<i className="bi bi-quote"></i></i></small>
                                                </p>
                                                <div className="d-flex gap-2 align-items-center justify-content-center">
                                                    <i className="bi bi-person-circle h2"></i>
                                                    <div>
                                                        <h5 className="card-title m-0">John Cena</h5>
                                                        <p><small>ABC Tech PVT LTD</small></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                {card.map((item, i) => (
                                    <div className="col" key={i}>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-center">
                                                    {Array(5).fill(<FaStar className='text-warning' />)}
                                                </div>
                                                <p className="card-text text-secondary"><small><i><i className="bi bi-quote"></i>This is
                                                    a longer card with
                                                    supporting text below as a
                                                    natural lead-in to additional content. This content is a little bit
                                                    longer.<i className="bi bi-quote"></i></i></small>
                                                </p>
                                                <div className="d-flex gap-2 align-items-center justify-content-center">
                                                    <i className="bi bi-person-circle h2"></i>
                                                    <div>
                                                        <h5 className="card-title m-0">John Cena</h5>
                                                        <p><small>ABC Tech PVT LTD</small></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                {card.map((item, i) => (
                                    <div className="col" key={i}>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-center">
                                                    {Array(5).fill(<FaStar className='text-warning' />)}
                                                </div>
                                                <p className="card-text text-secondary"><small><i><i className="bi bi-quote"></i>This is
                                                    a longer card with
                                                    supporting text below as a
                                                    natural lead-in to additional content. This content is a little bit
                                                    longer.<i className="bi bi-quote"></i></i></small>
                                                </p>
                                                <div className="d-flex gap-2 align-items-center justify-content-center">
                                                    <i className="bi bi-person-circle h2"></i>
                                                    <div>
                                                        <h5 className="card-title m-0">John Cena</h5>
                                                        <p><small>ABC Tech PVT LTD</small></p>
                                                    </div>
                                                </div>
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

export default Testimonials;