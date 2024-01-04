import React from "react";
import { Link, useLocation } from "react-router-dom";

import pngIg from "../../images/png/syspng/instagram_png.png";
import pngTg from "../../images/png/syspng/telegram_png.png";
import pngFb from "../../images/png/syspng/facebook_png.png";
import pngTw from "../../images/png/syspng/twitter_png.png";

const Footer = () => {
  const { pathname } = useLocation();
  if (pathname === "nasdaq") return null;

  return (
    <footer>
      <div className="full-footer">
        <div className="footer-col">
          <h4>Contact</h4>
          <p>+39 0000000000</p>
          <p>email</p>
        </div>

        <div className="footer-col">
          <h4>Collections</h4>
          <p>
            <Link to="/collections">Jordan</Link>
          </p>
          <p>
            <Link to="/collections">Dunks</Link>
          </p>
          <p>
            <Link to="/collections">Yeezy</Link>
          </p>
        </div>

        <div className="footer-col">
          <h4>Cose</h4>
          <p>prova</p>
          <p>prova</p>
          <p>prova</p>
        </div>

        <div className="footer-col">
          <h4>Cose</h4>
          <p>prova</p>
          <p>prova</p>
          <p>prova</p>
        </div>
      </div>

      <div className="footer-bottom">
        <ul>
          <li>
            <a
              href="https://www.twitter.com/"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={pngTw} alt="png twitter" className="footer-ico" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={pngIg} alt="png instagram" className="footer-ico" />
            </a>
          </li>
          <li>
            <a
              href="https://www.telegram.com/"
              aria-label="Telegram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={pngTg} alt="png telegram" className="footer-ico" />
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={pngFb} alt="png facebbok" className="footer-ico" />
            </a>
          </li>
        </ul>

        <p>&#169;Copyright &#8482;</p>
      </div>
    </footer>
  );
};

export default Footer;
