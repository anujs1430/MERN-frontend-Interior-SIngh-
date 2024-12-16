import React from 'react'
import img1 from '../assets/images/about1.jpeg'
import img2 from '../assets/images/about2.webp'
import { FaAward } from 'react-icons/fa'
import { SlCalender } from 'react-icons/sl'

const About = () => {
    return (
        <section className="about py-5" id="about">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="images-container position-relative">
                            <img className="about-img1" src={img1} alt="about-img" width="350px" />
                            <img className="about-img2" src={img2} alt="about-img" width="300px" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div>
                            <p className="text-theme"><small>About Us</small></p>
                            <h2 className="mt-3">Lorem ipsum dolor sit amet <br /> consectetur adipisicing.</h2>
                            <p className="text-secondary mt-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Voluptate
                                maxime alias blanditiis cum nihil assumenda dignissimos quam quae, voluptatibus fugiat
                                eveniet delectus est nulla inventore deleniti, sapiente ex minus neque!</p>

                            <div className="mt-4">
                                <div className="d-flex gap-2">
                                    <div>
                                        <FaAward className='text-theme h4' />
                                    </div>
                                    <div>
                                        <h6 className="mb-0">20+ Winnging Award</h6>
                                        <p className="text-secondary"><small>Lorem ipsum dolor sit amet consectetur adipisicing
                                            elit.
                                            Quaerat, consectetur.</small></p>
                                    </div>
                                </div>
                                <div className="d-flex gap-2 my-3">
                                    <div>
                                        <SlCalender className='h4 text-theme' />
                                    </div>
                                    <div>
                                        <h6 className="mb-0">20+ Winnging Award</h6>
                                        <p className="text-secondary"><small>Lorem ipsum dolor sit amet consectetur adipisicing
                                            elit.
                                            Quaerat, consectetur.</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
