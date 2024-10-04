import React from 'react';
import './Footer.css';
export default function Footer(props) {
    return (
        <footer>
            <div class="ftrr-footer">
                <div class="ftrr-row">
                    <a href="#"><i class="fa fa-facebook"></i></a>
                    <a href="#"><i class="fa fa-instagram"></i></a>
                    <a href="#"><i class="fa fa-youtube"></i></a>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                </div>

                <div class="ftrr-row">
                    <ul>
                        <li><a href="#">Contact us</a></li>
                        <li><a href="#">Our Services</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                        <li><a href="#">Career</a></li>
                    </ul>
                </div>

                <div class="ftrr-row">
                    Copyright © 2024 CodexHub - All rights reserved || Designed By: Raheelkhan & Khush
                </div>
            </div>
        </footer>

    );

};



