import React, { useEffect, useReducer, useState } from "react";
import NFT from "../../../src/client/Components/ExhibitionNFT.js";

import { useSwipeable } from "react-swipeable";
import { useHistory } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import ReactAutolinker from "react-autolinker";
import { apiUrl } from "../../../src/client/baseUrl";
import Link from "next/link";

export async function getStaticPaths() {
  const res = await fetch(`${apiUrl()}/program/getGalleries`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  // Get {program, gallery} object
  const data = await res.json();

  const paths = data
    ?.map((row) => {
      return row.gallery.map((el) => {
        return { params: { url: row.program.url, id: el.order.toString() } };
      });
    })
    .flat();

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${apiUrl()}/program/getGallery`, {
    method: "POST",
    body: JSON.stringify({ program: params.url, id: params.id }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  return {
    props: { data, id: params.id, url: params.url },
  };
}

export default function Exhibition({ data, id, url }) {
  const history = useHistory();
  const small = useStoreState((state) => state.app.small);
  const order = Number(id);

  console.log({ data });

  const [gallery, setGallery] = useState(data?.gallery);
  useEffect(() => {
    setGallery(data?.gallery);
  }, [data?.gallery?.id]);

  const [exhibition] = useState({ ...data, gallery: undefined });

  const [preload, dispatch] = useReducer((preload, { type, value }) => {}, []);

  function switchPage(direction) {
    // setSwipeDirection(direction);
    if (gallery) {
      if (id === "1" && direction === "previous") return gallery.length;
      else if (gallery && direction === "next" && Number(id) === gallery.length)
        return 1;
      else if (direction === "next") return Number(id) + 1;
      else return Number(id) - 1;
    }
  }

  const handlers = useSwipeable({
    onSwipedRight: (eventData) => {
      if (id) {
        history.push(`/${url}/${switchPage("previous")}`);
      }
    },
    onSwipedLeft: (eventData) => {
      if (id) {
        history.push(`/${url}/${switchPage("next")}`);
      }
    },
    preventDefaultTouchmoveEvent: true,
  });

  return (
    <div className="content-block" {...handlers}>
      <div className="flex items-center w-full">
        <Link
          href={`/exhibition/${url}/${switchPage("previous")}`}
          className="relative margin-top-s"
        >
          <div className="round">
            <div id="cta">
              <span className="arrow-left segunda previous"></span>
              <span className="arrow-left primera previous"></span>
            </div>
          </div>
        </Link>

        <div className="flex-full">
          <div className="center text-m text-b margin-top-minus">
            {exhibition.organizer && (
              <Link passHref href={`/curator/${exhibition.organizerUrl}`}>
                <a className="text-rainbow text-s margin-top-minus">
                  <strong>{exhibition.organizer}</strong>
                </a>
              </Link>
            )}
            {exhibition.name && (
              <div>
                <strong>{exhibition.name} Exhibition</strong>
              </div>
            )}
          </div>
        </div>

        <Link href={`/exhibition/${url}/${switchPage("next")}`}>
          <a className="relative">
            <div className="round arrow-right">
              <div id="cta">
                <span className="arrow primera next"></span>
                <span className="arrow segunda next"></span>
              </div>
            </div>
          </a>
        </Link>
      </div>
      {!id && (
        <div className="line-breaks">
          {gallery && gallery.length ? (
            <div className="margin-top-l center">
              <Link
                href={`/exhibition/${url}/${
                  Math.floor(
                    Math.random() * (gallery.length ? gallery.length : 1)
                  ) + 1
                }`}
              >
                <a className="button">
                  <span className="text-l">Enter Gallery</span>
                </a>
              </Link>
            </div>
          ) : (
            <div className="flex center">
              {gallery ? (
                <div className="margin-top-l">
                  <div>There are no art pieces in this exhibition yet</div>
                  <Link href={`/apply/${url}`}>
                    <a className="margin-top text-grey">
                      You may submit your artwork here!
                    </a>
                  </Link>
                </div>
              ) : (
                <div className="block-loading">
                  <div className="loading">
                    <div></div>
                    <div></div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="margin-top-l" />
          <ReactAutolinker text={exhibition.description} className="text-mid" />
          {exhibition && exhibition.curators && (
            <div className="margin-top-l center">Curated By</div>
          )}
          <div className="text-s margin-top-s center">
            {exhibition &&
              exhibition.curators &&
              exhibition.curators.map((curator, index) => {
                return (
                  <div className="margin-top" key={index}>
                    <div>
                      <strong>
                        {curator.artistName
                          ? `${curator.artistName}`
                          : `${curator.first} ${curator.last}`}
                      </strong>
                    </div>
                    <div className="flex center">
                      {curator.website && (
                        <div className="margin-top-xs">
                          <a href={curator.website}>
                            <img
                              src="/assets/website.png"
                              className="curator-icon-web pointer"
                            />
                          </a>
                        </div>
                      )}
                      {curator.twitter && (
                        <div className="margin-top-xs">
                          <a href={`https://twitter.com/${curator.twitter}`}>
                            <img
                              src="/assets/twitter.png"
                              className="curator-icon pointer"
                            />
                          </a>
                        </div>
                      )}
                      {curator.instagram && (
                        <div className="margin-top-xs">
                          <a
                            href={`https://instagram.com/${curator.instagram}`}
                          >
                            <img
                              src="/assets/instagram.png"
                              className="curator-icon pointer"
                              alt="Instagram"
                            />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {id && gallery && (
        <div className="gallery-min-height" id={gallery.id}>
          <NFT
            key={gallery.id}
            src={gallery.id}
            small={small}
            nft={gallery}
            contract={exhibition.contract}
            metadata={data.imageMetadata}
            important
          />
        </div>
      )}
      <div className="margin-top-l" />
    </div>
  );
}
