import React, { useState } from "react";
import "./navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, Link } from "react-router-dom";


const Navbar = () => {
    const [showMediaIcons, setShowMediaIcons] = useState(false);

    return (
        <>
            <nav className="main-nav">
                {/* 1st logo part  */}
                <div className="logo">
                    <h2>
                        <span>F</span>_Truck <span> </span>
                        <span>O</span>fficials
                    </h2>
                </div>
                {/* 2nd menu part  */}
                <div
                    className={
                        showMediaIcons
                            ? "menu-link mobile-menu-link"
                            : "menu-link"
                    }
                >
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">about</NavLink>
                        </li>
                        <li>
                            <NavLink to="/service">services</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">contact</NavLink>
                        </li>

                        <li>
                            <a href="/home">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Login
                                </button>
                            </a>
                        </li>
                        <li>
                            <a href="/register">
                                <button
                                    type="button"
                                    className="btn btn-primary "
                                >
                                    Register
                                </button>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* 3rd social media links */}
                <div className="social-media">
                    {/* hamburget menu start  */}
                    <div className="hamburger-menu">
                        <a
                            href="#"
                            onClick={() => setShowMediaIcons(!showMediaIcons)}
                        >
                            <GiHamburgerMenu />
                        </a>
                    </div>
                </div>
            </nav>

            {/* hero section  */}
            {/* <section className="hero-section">
        <p>Welcome to </p>
        <h1>Thapa Technical</h1>
      </section> */}
        </>
    );
};



export default Navbar;
