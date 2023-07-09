import React, { useEffect, useState } from "react";
import cl from "./MyPromoSwiper.module.scss";
import { useHttp } from "../../../hooks/http.hook";
import Carousel from "nuka-carousel/lib/carousel";
import { PromoSlide } from "../../../types/IPromo";

export const MyPromoSwiper = () => {
  const { request, loading } = useHttp();
  const [swiperSrcs, setSwiperSrcs] = useState<PromoSlide[]>();
  useEffect(() => {
    request("/api/promo/getSwiperSrcs").then((data) => setSwiperSrcs(data));
  }, []);

  console.log(swiperSrcs);

  if (!swiperSrcs) {
    return <></>;
  }

  return (
    <div className={cl.Swiper}>
      <Carousel
        autoplay={true}
        wrapAround={true}
        defaultControlsConfig={{
          nextButtonClassName: "catalog__slider-next-btn",
          prevButtonClassName: "catalog__slider-prev-btn",
          pagingDotsClassName: "catalog__slider-dots",
        }}
        renderCenterLeftControls={({ previousSlide }) => <></>}
        renderCenterRightControls={({ nextSlide }) => <></>}
      >
        {swiperSrcs.map((src) => {
          return (
            <img
              style={{ width: "100%", height: "100%" }}
              src={`/${src.imgSrc}`}
              alt="slider"
              key={src._id}
            />
          );
        })}
      </Carousel>
    </div>
  );
};
