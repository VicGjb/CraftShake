import React from "react";
import '../../styles/main_page.scss'
import {ReactComponent as Logo} from "../../svg/home_logo.svg"
import { RegularButton } from "../../components/buttons/regular_button";
import { Link } from "react-router-dom";
export function MainPage(){

    return(

        <div className="main-page__wrapper">
            <div className="main-page__head">
                <div className="main-page__head___logo">
                    <Logo className='main-page__head___logo____svg'/>
                </div>
                <div className="main-page__head__login-btn">
                    <Link to={`/login`}>
                        <RegularButton lable={'Login'}/>
                    </Link>
                </div>
                
            </div>
            <div className="main-page__content">
                <div className="main-page__block-conteiner">
                    <div className="main-page__block-conteiner___title">
                        Cheers
                    </div>
                    <div className="main-page__block-conteiner__row first">
                        <div className="main-page_block-conteiner__row___text first">
                            Welcome to Craftshake, the home of perfectly crafted cocktails. 
                            Our company was founded by a team of expert bartenders, who have honed their skills and techniques from their experiences in various establishments around the world. 
                            With a passion for mixology and a desire to enhance the industry, we have brought together the best recipes and practices to offer you an exceptional cocktail experience.
                        </div>
                        <div className="main-page_block-conteiner__row___image">
                            <img src="https://craftshake.s3.eu-central-1.amazonaws.com/svg/Component+2.png" alt="" />
                        </div>
                    </div>
                    <div className="main-page__block-conteiner__row second">
                    <div className="main-page_block-conteiner__row___image">
                        <img src="https://craftshake.s3.eu-central-1.amazonaws.com/svg/Component+3.png" alt="" />
                    </div>
                        <div className="main-page_block-conteiner__row___text second">
                            At Craftshake, we understand the importance of consistency in taste and efficiency in service.
                            Our cocktails are created to guarantee a stable and memorable taste, while allowing your bartenders to work faster without compromising quality. 
                            We take pride in delivering personalized services to each of our clients, ensuring that the cocktail card we create matches the concept of your establishment and meets your specific preferences.
                        </div>
                        
                    </div>
                    <div className="main-page__block-conteiner__row">
                        <div className="main-page_block-conteiner__row___text last">
                            Our mission is simple - help you create a cocktail menu that works ideally for your establishment. 
                            So whether you're a bar owner or simply someone who loves a good cocktail, we're here to provide you with the best possible drinks. 
                            We view mixology as a craft and take pride in our ability to create delicious and unique cocktails. Cheers, and let's drink tasty!
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-page_footer">
                <div className="main-page_footer__content">
                    <div className="main-page_footer__title">
                        Contact Us
                    </div>
                    <div className="main-page_footer__info">
                        Email: craftshaketlv@gmail.com
                    </div>
                    {/* <div className="main-page_footer__info">
                        Phone:
                    </div> */}
                </div>
            </div>
        </div>
    )
}