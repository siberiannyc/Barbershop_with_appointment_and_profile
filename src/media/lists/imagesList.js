import img1desk from "../Desktop/5.jpg";
import img2desk from "../Desktop/10.jpg";
import img3desk from "../Desktop/1.jpg";
import img4desk from "../Desktop/13.jpeg";
import img5desk from "../Desktop/16.jpg";
import img1mob from "../Mobile/5.jpg";
import img2mob from "../Mobile/10.jpg";
import img3mob from "../Mobile/1.jpg";
import img4mob from "../Mobile/13.jpeg";
import img5mob from "../Mobile/16.jpg";
import img1tab from "../Tab/5.jpg";
import img2tab from "../Tab/10.jpg";
import img3tab from "../Tab/1.jpg";
import img4tab from "../Tab/13.jpeg";
import img5tab from "../Tab/16.jpg";
import { useState, useEffect } from "react";

const imagesArray = [
  {
    id: 1,
    mob: img1mob,
    tab: img1tab,
    desk: img1desk,
  },
  {
    id: 2,
    mob: img2mob,
    tab: img2tab,
    desk: img2desk,
  },
  {
    id: 3,
    mob: img3mob,
    tab: img3tab,
    desk: img3desk,
  },
  {
    id: 4,
    mob: img4mob,
    tab: img4tab,
    desk: img4desk,
  },
  {
    id: 5,
    mob: img5mob,
    tab: img5tab,
    desk: img5desk,
  },
];

const ImgBp = (id) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  const pic = imagesArray
    .filter((img) => img.id === id)
    .map((img) => {
      if (windowWidth < 600) {
        return img.mob;
      } else if (windowWidth >= 900) {
        return img.desk;
      } else {
        return img.tab;
      }
    });
  return pic.toString();
};

export default ImgBp;
