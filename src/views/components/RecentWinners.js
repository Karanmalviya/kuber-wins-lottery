import React, { useEffect } from "react";
import AbbrNumber from "./AbbrNumber";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentWinner } from "../../features/apiSlice";
import Swiper, {
  A11y,
  Navigation,
  Pagination,
  Parallax,
  Scrollbar,
} from "swiper";
import SwiperCore, { Autoplay } from "swiper/core";

import { SwiperSlide } from "swiper/react";
export default function RecentWinners() {
  SwiperCore.use([Autoplay, Pagination, Navigation, Parallax]);

  const dispatch = useDispatch();
  const { recentWinnersData } = useSelector((state) => state.api);

  useEffect(() => {
    dispatch(fetchRecentWinner());
  }, [dispatch]);

  console.log(recentWinnersData);
  return (
    <section className="sec-four">
      <div className="container pb-5">
        <h2 className="mt-5 mb-0 sec-heading">Recent Winners</h2>

        <Swiper
          className="row w-100 swiper"
          modules={[Navigation, Pagination, Scrollbar, A11y, Parallax]}
          loop={Boolean(recentWinnersData.length > 3)}
          watchOverflow={true}
          observer={true}
          observeParents={true}
          parallax={true}
          spaceBetween={20}
          breakpoints={{
            1400: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 3,
            },
            512: {
              slidesPerView: 2,
            },
            425: {
              slidesPerView: 1,
            },
            320: {
              slidesPerView: 1,
            },
            240: {
              slidesPerView: 1,
            },
          }}
          slidesPerView={3}
          pagination={{ clickable: true, el: ".swiper-pagination" }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          scrollbar={{ draggable: true }}
          grabCursor={true}
          effect={false}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {recentWinnersData.length &&
            recentWinnersData.map((scratchCard, index) => (
              <SwiperSlide key={index} className="mb-4">
                <div
                  className="col-lg-4 first-w mt-5 pt-5"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                  data-aos-easing="ease"
                  data-aos-delay={200}
                >
                  <div
                    className="card"
                    style={{
                      backgroundImage: 'url("assets/images/winner-bg.png")',
                    }}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-12 win-div justify-content-center align-items-center d-flex">
                          <img
                            className="fa-solid_crown"
                            src="assets/images/fa-solid_crown.png"
                          />
                          <img
                            className="p-b-14"
                            src="assets/images/p-b-14.png"
                          />
                          <img
                            className="pro-m-pic"
                            src="assets/images/Ellipse-14.png"
                          />
                        </div>
                      </div>
                      <div className="row mt-5">
                        <div className="col-lg-12 text-center">
                          <h4>Nitesh Malviya</h4>
                          <h5>10 August 2022</h5>
                          <h1>
                            <AbbrNumber
                              props={{ number: 1000000000, decPlaces: 2 }}
                            />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>

        {/* </div> */}
      </div>
    </section>
  );
}
