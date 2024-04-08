import React from "react";
import "./Home.css";
import Header from "../Header/Header";

const MainContent = () => {
    return (
        <div className="main-back1">
            <Header />
            <section className="hero-wrap">
                <div className="container1">
                    <div className="row no-gutters align-items-center justify-content-center">
                        <div className="col-lg-8 text-center pb-5 overall">
                            <div className="row justify-content-center">
                                <div className="col-lg-9">
                                    <h1 className="city">Let's Explore Your Awesome City</h1>
                                    <p>Find great places to stay, eat, shop, or visit from local experts.</p>
                                </div>
                            </div>
                            <form action="#" className="search-property-1 mt-md-5">
                                <div className="row g-0">
                                    <div className="col-md d-flex">
                                        <div className="form-group1 p-3">
                                            <div className="form-field1">
                                                <div className="icon1"><span className="fa fa-search"></span></div>
                                                <input type="text" className="form-control" placeholder="What are you looking for?"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md d-flex">
                                        <div className="form-group p-3">
                                            <div className="form-field">
                                                <div className="icon"><span className="ion-ios-pin"></span></div>
                                                <input type="text" className="form-control" placeholder="Search Location"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md d-flex">
                                        <div className="form-group p-3">
                                            <div className="form-field">
                                                <div className="select-wrap">
                                                    <div className="icon"><span className="fa fa-chevron-down"></span></div>
                                                    <select name="" id="" className="form-control">
                                                        <option value="">All Categories</option>
                                                        <option value="">Food &amp; Drinks</option>
                                                        <option value="">Hotel</option>
                                                        <option value="">Shopping</option>
                                                        <option value="">Beauty</option>
                                                        <option value="">Fitness</option>
                                                        <option value="">Bar &amp; Club</option>
                                                        <option value="">Games</option>
                                                        <option value="">Places</option>
                                                        <option value="">Circus</option>
                                                        <option value="">Theater</option>
                                                        <option value="">Sports</option>
                                                        <option value="">Health</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md d-flex">
                                        <div className="form-group d-flex w-100 border-0">
                                            <div className="form-field w-100 align-items-center d-flex align-items-stretch">
                                                <a href="#" className="btn btn-primary d-block w-100 d-flex align-items-center justify-content-center py-3"><span><i className="ion-ios-search"></i> Search</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};          

export default MainContent;
