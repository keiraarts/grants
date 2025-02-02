import React, { useEffect, useState, useRef } from "react";
import OpenMarket from "./Market/OpenMarket.js";
import Image from "next/image";

const ExhibitionNFT = ({
  small,
  nft,
  src,
  important,
  metadata,
  hidden,
  contract,
}) => {
  const [loaded, setLoaded] = useState(true);
  const video = useRef();

  const [isFullScreen, setFullScreen] = useState(false);
  function fullScreen() {
    if (video.current) {
      video.current.muted = false;
      if (video.current.requestFullScreen) {
        video.current.requestFullScreen();
      } else if (video.current.webkitRequestFullScreen) {
        video.current.webkitRequestFullScreen();
      } else if (video.current.mozRequestFullScreen) {
        video.current.mozRequestFullScreen();
      } else if (video.current.msRequestFullscreen) {
        video.current.msRequestFullscreen();
      } else if (video.current.webkitEnterFullscreen) {
        video.current.webkitEnterFullscreen(); //for iphone this code worked
      }

      setMuted(false);
    } else {
      if (document.documentElement.requestFullScreen) {
        if (isFullScreen) document.exitFullscreen();
        else document.documentElement.requestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        if (isFullScreen) document.webkitExitFullscreen();
        else document.documentElement.webkitRequestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        if (isFullScreen) document.mozExitFullscreen();
        else document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.msRequestFullscreen) {
        if (isFullScreen) document.msExitFullscreen();
        else document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.webkitEnterFullscreen) {
        if (isFullScreen) document.webkitExitFullscreen();
        else document.documentElement.webkitEnterFullscreen();
      }

      setFullScreen(!isFullScreen);
    }
  }

  useEffect(() => {
    document.addEventListener("webkitfullscreenchange", (event) => {
      if (!document.webkitIsFullScreen) {
        setFullScreen(false);
        if (video.current) {
          setTimeout(() => {
            video?.current?.play();
          });
        }
      } else setFullScreen(true);
    });

    return () => {
      document.removeEventListener("fullscreenchange", () => {});
    };
  }, []);

  const [muted, setMuted] = useState(true);
  function toggleAudio() {
    video.current.muted = !video.current.muted;
    if (video.current.muted) setMuted(true);
    else setMuted(false);
  }

  useEffect(() => {
    if (hidden && video.current) {
      video.current.muted = true;
      setMuted(true);
    }

    if (!hidden && video.current) {
      video.current.currentTime = 0;
    }
  }, [hidden]);

  useEffect(() => {
    if (loaded && video.current) {
      video.current.addEventListener("pause", (e) => {
        video.current?.play();
      });
    }
  }, [loaded]);

  if (nft && nft.art) nft.imageType = nft.art.split(".")[1];
  let website, twitter, instagram;
  if (nft && nft.user && nft.user.website) website = nft.user.website;
  if (nft && nft.user && nft.user.twitter) twitter = nft.user.twitter;
  if (nft && nft.user && nft.user.instagram) instagram = nft.user.instagram;

  return (
    <div
      className={`margin-top flex full-width ${!small && "side-space"}`}
      style={{ display: hidden && "none" }}
    >
      {nft ? (
        <div className="gallery-container full-width">
          <div
            className={`flex-full xl:pr-10 center ${
              small
                ? "gallery-frame-container-small"
                : "gallery-frame-container"
            }`}
          >
            <div className="w-full frame gallery-art-container">
              <div className="w-full min-h-screen-30 frame-shadow">
                {(nft.imageType === "mp4" || nft.imageType === "mov") && (
                  <video
                    muted
                    loop
                    autoPlay
                    webkit-playsinline="true"
                    playsInline
                    className={`gallery-art w-full`}
                    ref={video}
                  >
                    <source
                      src={`https://cdn.grants.art/${nft.artWeb}`}
                      type={`video/${nft.imageType}`}
                    />
                  </video>
                )}

                {!["mov", "mp4"].includes(nft.imageType) && (
                  <Image
                    alt={`${nft.user.artistName} ${nft.description}`}
                    className="bg-white gallery-art frame"
                    src={`https://cdn.grants.art/${nft.art}`}
                    layout="responsive"
                    width={metadata?.width}
                    height={metadata?.height}
                    priority={true}
                  />
                )}
              </div>
            </div>
            {isFullScreen && !video.current && (
              <div className="fullscreen-container">
                <img
                  src={MinScreen}
                  className="frame-exit pointer"
                  onClick={() => fullScreen()}
                />
                <img
                  className="gallery-art-fullscreen"
                  src={`https://cdn.grants.art/${nft.art}`}
                />
              </div>
            )}
            {!loaded ? (
              <div className="loader margin-top-l">
                <div className="loaderBar"></div>
              </div>
            ) : (
              <div className="flex margin-top-s">
                <img
                  src="/assets/secure.png"
                  className="margin-top-xs frame-control pointer"
                  onClick={() => openLink(`https://arweave.net/${nft.arweave}`)}
                />
                <div className="flex-full" />
                {video && video.current && (
                  <div onClick={() => toggleAudio()} className="pointer">
                    {muted ? (
                      <img src="/assets/muted.png" className="frame-control" />
                    ) : (
                      <img
                        src="/assets/unmuted.png"
                        className="frame-control"
                      />
                    )}
                  </div>
                )}
                <div onClick={() => fullScreen()} className="pointer">
                  <img
                    src="/assets/fullscreen.png"
                    className="margin-left-s frame-control"
                  />
                </div>
              </div>
            )}
            <div className="margin-top-s" />
          </div>
          {!isFullScreen && (
            <div className={`gallery-description`}>
              <div className="text-s">
                <div className="gallery-plate metal linear">
                  <div className="text-s">
                    <strong>{nft.user.artistName}</strong>
                    <br />
                    {nft.user.country}{" "}
                    {nft.user.birthYear && `(b. ${nft.user.birthYear})`}
                  </div>
                  <div className="margin-top-s text-s text-b">
                    <strong>
                      <i>{nft.title || "Untitled"}</i>
                    </strong>
                    , 2021
                    <br />
                    {nft.canvas ? (
                      <div className="text-xs">{nft.canvas}</div>
                    ) : (
                      <div>{nft.imageType.toUpperCase()} as NFT</div>
                    )}
                  </div>
                  <div className="text-xs margin-top-s">
                    {nft.description.trim()}
                  </div>
                </div>
              </div>
              <div className="flex margin-top-s center">
                {website && (
                  <div>
                    <img
                      src="/assets/website.png"
                      className="account-social-web pointer"
                      alt="Website"
                      onClick={() => openLink(website)}
                    />
                  </div>
                )}
                {twitter && (
                  <div>
                    <img
                      src="/assets/twitter.png"
                      className="account-social pointer"
                      alt="Twitter"
                      onClick={() =>
                        openLink(
                          twitter.substring(0, 4) === "http" ||
                            twitter.substring(0, 3) === "www"
                            ? twitter
                            : `https://twitter.com/${twitter}`
                        )
                      }
                    />
                  </div>
                )}
                {instagram && (
                  <div>
                    <img
                      src="/assets/instagram.png"
                      className="account-social pointer"
                      alt="Instagram"
                      onClick={() =>
                        openLink(
                          instagram.substring(0, 4) === "http" ||
                            instagram.substring(0, 3) === "www"
                            ? instagram
                            : `https://instagram.com/${instagram}`
                        )
                      }
                    />
                  </div>
                )}
              </div>
              {small && !hidden && (
                <OpenMarket tokenId={nft.order} contract={contract} />
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="margin-top">
          This NFT does not seem to exist...
          <div className="margin-top" />
        </div>
      )}
    </div>
  );
};

export default ExhibitionNFT;
