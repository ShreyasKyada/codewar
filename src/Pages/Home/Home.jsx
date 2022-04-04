import React, { useContext, useEffect } from "react";
import "./Home.css";
import {
  BsFillQuestionCircleFill,
  BsFillQuestionSquareFill,
} from "react-icons/bs";
import { FaUsers, FaUserFriends } from "react-icons/fa";
import { GiTrophyCup, GiTrophiesShelf } from "react-icons/gi";
import { MdDeveloperMode } from "react-icons/md";
import CountUp from "react-countup";
import home from "../../Assets/home.svg";
import { loginContext } from "../../Context/LoginContext";

const Home = () => {
  const { setIsLoadingState } = useContext(loginContext);

  document.title = "Home | CodeWar";

  useEffect(() => {
    setIsLoadingState(false);
  }, []);

  return (
    <div className="home-main-container">
      <div className="home-container">
        <div className="home-container-txt">
          <h1>A New Way to Learn</h1>
          <p>
            <span>
              CodeWar is the best platform to help you enhance your skills,
              expand your knowledge and prepare for technical interviews.
            </span>
          </p>
          <button className="cbtn">Create Account</button>
        </div>
        <div className="container-img">
          <img src={home} alt="Home" className="wp"></img>
        </div>
      </div>

      <br />
      <br />
      <div className="flip-card-container">
        <div className="flip-card-container1">
          <div className="flip-card">
            <div className="filp-card-front">
              <h2>Questions, Community & Contests</h2>
              <div className="flip-card-1-icon-container">
                <BsFillQuestionCircleFill className="filp-icons" />
                <FaUsers className="filp-icons" />
                <GiTrophyCup className="filp-icons" />
              </div>
              <br />
            </div>
            <div className="filp-card-back">
              <p>
                <span>
                  Over 2200 questions for you to practice. Come and join one of
                  the largest tech communities with hundreds of thousands of
                  active users and participate in our contests to challenge
                  yourself and earn rewards.
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flip-card-container2">
          <div className="flip-card">
            <div className="filp-card-front">
              <h2>Developer</h2>
              <MdDeveloperMode className="filp-icons" />
            </div>
            <div className="filp-card-back">
              <p>
                <span>
                  We now support 14 popular coding languages. At our core,
                  CodeWar is about developers. Our powerful development tools
                  such as Playground help you test, debug and even write your
                  own projects online.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="count-up-container">
        <div className="Count-up">
          <h2>
            <FaUserFriends
              style={{
                color: "#3CB371",
              }}
              className="Countup-icons"
            />
          </h2>
          <h1>
            <CountUp start={0} end={200} duration={20} />
          </h1>
          <h4>Users</h4>
        </div>
        <div className="Count-up">
          <h2>
            <BsFillQuestionSquareFill
              style={{
                color: "#BC8F8F",
              }}
              className="Countup-icons"
            />
          </h2>
          <h1>
            <CountUp start={0} end={100} duration={20} />
          </h1>
          <h4>Questions</h4>
        </div>
        <div className="Count-up">
          <h2>
            <GiTrophiesShelf
              style={{
                color: "FFD700",
              }}
              className="Countup-icons"
            />
          </h2>
          <h1>
            <CountUp start={0} end={100} duration={20} />
          </h1>
          <h4>Contests</h4>
        </div>
      </div>
    </div>
  );
};

export default Home;
