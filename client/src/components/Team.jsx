import React from "react";
import "./Styles/Team.css";
import { AiFillLinkedin } from "react-icons/ai";
import { FaFacebook, FaMastodon } from "react-icons/fa6";

const Team = () => {
    return (
        <>
            <div className="topTeamsContainer">
                <p>
                    Without bonding and cordination, every project is a failure. Look at
                    who makes KICKSUP great. ;)
                </p>
            </div>

            <div className="mainTeamContainer">
                <div className="singleTeamImgSection">
                    <div className="singleTeamImage">
                        <img
                            src="https://www.realmadrid.com/img/horizontal_940px/gettyimages-1314863425__20210428122528.jpg"
                            alt=""
                        />
                    </div>
                    <div className="singleTeamProdDetails">
                        <h3>Zidane</h3>
                        <p>LeaderSHip & management</p>
                    </div>

                    <div className="singleTeamImgIcon">
                        <div className="linkedIn">
                            <AiFillLinkedin />
                        </div>
                        <div className="mIcon">
                            <FaMastodon />
                        </div>
                        <div className="fbIcon">
                            <FaFacebook />
                        </div>
                    </div>
                </div>
                <div className="singleTeamImgSection">
                    <div className="singleTeamImage">
                        <img
                            src="https://i2-prod.mirror.co.uk/incoming/article30775873.ece/ALTERNATES/n615/1_Real-Madrid-Press-Conference.jpg"
                            alt=""
                        />
                    </div>
                    <div className="singleTeamProdDetails">
                        <h3>Toni Kroos</h3>
                        <p>Product Developer</p>
                    </div>
                    <div className="singleTeamImgIcon">
                        <div className="linkedIn">
                            <AiFillLinkedin />
                        </div>
                        <div className="mIcon">
                            <FaMastodon />
                        </div>
                    </div>
                </div>
                <div className="singleTeamImgSection">
                    <div className="singleTeamImage">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-8Lno7u9cTeQKjuvOJWtKY4CxgrKqCVyx1w&usqp=CAU"
                            alt=""
                        />
                    </div>
                    <div className="singleTeamProdDetails">
                        <h3>Iker Casillas</h3>
                        <p>Marketing strategy</p>
                    </div>

                    <div className="singleTeamImgIcon">
                        <div className="linkedIn">
                            <AiFillLinkedin />
                        </div>
                        <div className="mIcon">
                            <FaMastodon />
                        </div>
                        <div className="fbIcon">
                            <FaFacebook />
                        </div>
                    </div>
                </div>
                <div className="singleTeamImgSection">
                    <div className="singleTeamImage">
                        <img
                            src="https://www.realmadrid.com/img/horizontal_940px/gettyimages-1314863425__20210428122528.jpg"
                            alt=""
                        />
                    </div>
                    <div className="singleTeamProdDetails">
                        <h3>James</h3>
                        <p>Product designer</p>
                    </div>

                    <div className="singleTeamImgIcon">
                        <div className="mIcon">
                            <FaMastodon />
                        </div>
                    </div>
                </div>
                <div className="singleTeamImgSection">
                    <div className="singleTeamImage">
                        <img
                            src="https://www.iwmbuzz.com/wp-content/uploads/2020/05/cristiano-ronaldo-and-his-best-fashion-moments.jpg"
                            alt=""
                        />
                    </div>
                    <div className="singleTeamProdDetails">
                        <h3>christiano ronaldo</h3>
                        <p>Financial Operations</p>
                    </div>

                    <div className="singleTeamImgIcon">
                        <div className="linkedIn">
                            <AiFillLinkedin />
                        </div>
                        <div className="fbIcon">
                            <FaFacebook />
                        </div>
                    </div>
                </div>
            </div>

            <div className="andYou">
                <p>and You! ;)</p>
            </div>
        </>
    );
};

export default Team;