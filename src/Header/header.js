import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import "./header.css";

export default class Header extends Component {
    render() {
        return (
            <div className="container">
                <div className="header" id="header">
                    <img src="/logo192.png" className="logo"></img>
                    <form className="search_form">
                        <input className="service" type="text" placeholder="послуга або товар"></input>
                        <input className="city" type="text" placeholder="адреса, місто, країна"></input>
                        <button className="submit_btn" type="submit" value="submit" ><FontAwesomeIcon icon={faSearch}  /></button>
                    </form>
                    <div className="link_btn_bar">
                        <div className="links">
                            <a href="#" className="first">For Business</a>
                            <a href="#" className="second">Write a Rewiev</a>
                            <a href="#" className="login">Log In</a> 
                            <a href="#" className="signup" id="signup">Sign Up</a>
                        </div>
                    </div>
                </div>
                <div className="header_dropdowns">
                    <div class="rest dropdown">
                        <button class="dropbtn">Dropdown <FontAwesomeIcon className="angledown" icon={faAngleDown}  /></button>
                        <div class="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            
                        </div>
                    </div>
                    <div class="home dropdown">
                        <button class="dropbtn">Dropdown <FontAwesomeIcon className="angledown" icon={faAngleDown}  /></button>
                        <div class="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                        </div>
                    </div>
                    <div class="auto dropdown">
                        <button class="dropbtn">Dropdown <FontAwesomeIcon className="angledown" icon={faAngleDown}  /></button>
                        <div class="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                        </div>
                    </div>
                    <div class="more dropdown">
                        <button class="dropbtn">Dropdown <FontAwesomeIcon className="angledown" icon={faAngleDown}  /></button>
                        <div class="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
