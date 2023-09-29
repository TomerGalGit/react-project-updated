import ImageSlider from "../components/ImageSlider";
import "./About.css";
export default function About() {
  
  const images = [
    require('../Assets/Images/ss1.png'),
    require('../Assets/Images/ss2.png'),
    require('../Assets/Images/ss3.png'),
    require('../Assets/Images/ss4.png'),
    require('../Assets/Images/ss5.png'),
    require('../Assets/Images/ss6.png'),
    require('../Assets/Images/ss7.png'),
  ];
  
  return (
    <>
      <div className="about-info">
        <h1>Welcome to GetHired!</h1>
        <h2>
          Here you can find all the business cards of diffrent individuals
          within our man-power company.
        </h2>
        <h2>
          Make sure to sign up or log in if you already have an existing
          account.
        </h2>
        <h2>
          If you want to interview anyone of our talented candidates contact them using the information detailed in their card. 
        </h2>
      </div>
      <div className="about-slideshow">
        <ImageSlider images={images}/>
      </div>
    </>
  );
}
