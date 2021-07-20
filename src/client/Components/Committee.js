import React from "react";
import Link from "next/link";

export default function Committee() {
  function openLink(page) {
    let win = window.open(page, "_blank");
    win.focus();
  }

  return (
    <div className="content-block">
      <div className="text-l text-b">Committee</div>
      <div className="text-s margin-top-s">
        Our shared love of art, music, and design
      </div>
      <div className="page-container margin-top">
        <Link href="/donate" className="text-rainbow remove-a">
          Sevens Foundation's Donors
        </Link>
        <div className="text-s">Our sincerest thanks to you all</div>
        <div className="text-m margin-top">Advisors</div>
        <span
          className="text-s text-grey pointer"
          onClick={() =>
            openLink("https://y.at/%F0%9F%91%89%F0%9F%8E%B1%F0%9F%95%B3")
          }
        >
          Tim Kang (illestrater)
        </span>
        <div className="text-s">Sevens Developer & paradigm pusher</div>
        <span
          className="text-s margin-top-s text-grey pointer"
          onClick={() => openLink("https://twitter.com/darlington")}
        >
          Mike Darlington
        </span>
        <div className="text-s">
          CEO of Monstercat music label & captain NFT gremlin
        </div>
        <span
          className="text-s margin-top-s text-grey pointer"
          onClick={() => openLink("https://www.slimesunday.com")}
        >
          Devin Dube
        </span>
        <div className="text-s">
          Digital Marketing @ Slime Sunday & art lover
        </div>
        <span
          className="text-s margin-top-s text-grey pointer"
          onClick={() => openLink("https://twitter.com/EthArtX")}
        >
          Larry Saggese
        </span>
        <div className="text-s">NFT podcaster & communications guru</div>
        <span
          className="text-s margin-top-s text-grey pointer"
          onClick={() => openLink("https://3lau.com/")}
        >
          Justin Blau (3LAU)
        </span>
        <div className="text-s">Music producer & NFT innovator</div>
        <span
          className="text-s margin-top-s text-grey pointer"
          onClick={() => openLink("https://www.instagram.com/yesladypheonix/")}
        >
          Lady PheOnix
        </span>
        <div className="text-s">
          Co-Founder of Universe Contemporary & leading crypto art evangelist
        </div>
        <span
          className="text-s margin-top-s text-grey pointer"
          onClick={() => openLink("https://twitter.com/axieking")}
        >
          OhhShiny
        </span>
        <div className="text-s">Traditional fine art & NFT collector</div>
        <span
          className="text-s margin-top-s text-grey pointer"
          onClick={() => openLink("https://twitter.com/pablorfraile")}
        >
          Pablo
        </span>
        <div className="text-s">
          Co-Founder of Museum of Crypto Art & NFT collector
        </div>
        <span
          className="text-s margin-top-s text-grey pointer"
          onClick={() => openLink("https://twitter.com/LordTylerWard")}
        >
          Tyler Ward
        </span>
        <div className="text-s">Founder of Barn Bridge & DeFi degen</div>
        <span
          className="text-s margin-top-s text-grey pointer"
          onClick={() =>
            openLink("https://y.at/%E2%AD%90%F0%9F%8E%AC%E2%AD%90")
          }
        >
          Brandon Kang
        </span>
        <div className="text-s">Professional videographer & NFT collector</div>
        <span
          className="text-s margin-top-s text-grey pointer"
          onClick={() => openLink("http://justinmaller.com/")}
        >
          Justin Maller
        </span>
        <div className="text-s">Digital Artist & CCO of Deviantart</div>
        <span
          className="text-s margin-top-s text-grey pointer"
          onClick={() => openLink("https://parishilton.com/")}
        >
          Paris Hilton
        </span>
        <div className="text-s">Entrepreneur & NFT and social pioneer</div>
        <span
          className="text-s margin-top-s text-grey pointer"
          onClick={() => openLink("https://www.beeple-crap.com/")}
        >
          Mike Winkelmann (beeple)
        </span>
        <div className="text-s">
          Renowned digital art director & professional hair trimmer
        </div>
        <div className="text-m margin-top">Artists</div>
        <div
          className="text-s margin-top-s text-grey pointer"
          onClick={() => openLink("https://nessgraphics.com/")}
        >
          NessGraphics
        </div>
        <br />
        <div
          className="text-s margin-top-s text-grey pointer"
          onClick={() => openLink("https://www.instagram.com/fvckrender")}
        >
          FVCKRENDER
        </div>
        <br />
        <div
          className="text-s margin-top-s text-grey pointer"
          onClick={() => openLink("https://aeforiadesign.com/")}
        >
          aeforia
        </div>
        <br />
        <div
          className="text-s margin-top-s text-grey pointer"
          onClick={() => openLink("https://thankyoux.com/")}
        >
          ThankYouX
        </div>
        <br />
        <div
          className="text-s margin-top-s text-grey pointer"
          onClick={() => openLink("https://maalavidaa.com/")}
        >
          Maalavidaa
        </div>
        <br />
        <div
          className="text-s margin-top-s text-grey pointer"
          onClick={() => openLink("http://www.blakekathryn.com/")}
        >
          Blake Kathryn
        </div>
        <br />
        <div
          className="text-s margin-top-s text-grey pointer"
          onClick={() => openLink("https://slimesunday.com/")}
        >
          slimesunday
        </div>
        <br />
        <div
          className="text-s margin-top-s text-grey pointer"
          onClick={() => openLink("https://www.instagram.com/toomuchlag")}
        >
          toomuchlag
        </div>
        <br />
        <div
          className="text-s margin-top-s text-grey pointer"
          onClick={() => openLink("https://www.victormosquera.com/")}
        >
          Victor Mosquera
        </div>
        <br />
        <div
          className="text-s margin-top-s text-grey pointer"
          onClick={() => openLink("https://smeccea.com/")}
        >
          smeccea
        </div>
        <br />
        <div
          className="text-s margin-top-s text-grey pointer"
          onClick={() => openLink("https://www.billelis.com/")}
        >
          Billelis
        </div>
        <br />
        <div
          className="text-s margin-top-s text-grey pointer"
          onClick={() => openLink("https://www.behance.net/Filiphds")}
        >
          Filip Hodas
        </div>
        <br />
        <br />
        <div className="text-m text-b">Partners</div>
        <div className="text-s margin-top">
          <span
            className="text-s text-grey pointer"
            onClick={() => openLink("https://www.numomo.com/")}
          >
            Numomo Creative Agency
          </span>
          <div className="text-s">World's First Creative NFT Agency</div>
        </div>
        <div className="text-s margin-top">
          <span
            className="text-s text-grey pointer"
            onClick={() =>
              openLink("https://www.playboy.com/custom/playboy-x-slimesunday")
            }
          >
            Playboy
          </span>
          <div className="text-s">Culture Progressor</div>
        </div>
        <div className="text-s margin-top">
          <span
            className="text-s text-grey pointer"
            onClick={() => openLink("https://www.ymugroup.com/")}
          >
            YMU Group
          </span>
          <div className="text-s">Arts & Talent Management</div>
        </div>
        <br />
      </div>
    </div>
  );
}
