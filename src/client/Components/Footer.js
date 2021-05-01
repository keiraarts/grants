import React, { useEffect } from "react";
import { Link } from "next/link";

export default function Header() {
  function openLink(page) {
    let win = window.open(page, "_blank");
    win.focus();
  }

  return (
    <div className="footer">
      <div className="center text-s">
        Curated by{" "}
        <a to="/team" className="remove-a">
          <div className="text-grey">Sevens Foundation Committee</div>
        </a>
        <br />
        <br />
        Developed by{" "}
        <a
          className="text-rainbow pointer"
          onClick={() =>
            openLink("https://y.at/%F0%9F%91%89%F0%9F%8E%B1%F0%9F%95%B3")
          }
        >
          illestrater
        </a>
        <br />
      </div>
      <div className="social-icons margin-top flex center">
        <img
          src="/assets/twitter.png"
          className="social-icon"
          alt="Twitter"
          onClick={() => openLink("https://twitter.com/sevensgrant")}
        />
        <img
          src="/assets/instagram.png"
          className="social-icon"
          alt="Instagram"
          onClick={() => openLink("https://instagram.com/sevensgrant")}
        />
        <img
          src="/assets/discord.png"
          className="social-icon"
          alt="Instagram"
          onClick={() => openLink("https://discord.gg/YB4HDKwxyc")}
        />
        <a href="mailto:tim@grants.art">
          <img src="/assets/email.png" className="social-icon" alt="Email" />
        </a>
      </div>
    </div>
  );
}
