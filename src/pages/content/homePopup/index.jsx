import React, { Component } from "react";
import homeIcon from "../../../assets/imgs/home.png";
import icon2DSvg from "../../../assets/imgs/icon_2D.svg"
import icon3DSvg from "../../../assets/imgs/icon_3D.svg"
import iconARSvg from "../../../assets/imgs/icon_AR.svg"
import iconTraficSvg from "../../../assets/imgs/icon_trafic.svg"

import "./index.scss";

export default function HomePopup() {
    const backToHome = () => {
        window.location.href = "about:blank";
        window.close();
    }
    return (
        <>
            <div className="home-icon-wrapper">
                <img src={homeIcon} alt="" className="home-icon" onClick={backToHome} />
            </div>
            <div className="other-icon-wrapper">
                <img className="icon-style icon_2D" src={icon2DSvg} alt="" srcSet="" />
                <img className="icon-style icon_3D" src={icon3DSvg} alt="" srcSet="" />
                <img className="icon-style icon_AR" src={iconARSvg} alt="" srcSet="" />
                <img className="icon-style icon_trafic" src={iconTraficSvg} alt="" srcSet="" />
            </div>
        </>
    )
}