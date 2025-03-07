// import React, { useEffect, useState } from "react";
// import OwlCarousel from "react-owl-carousel";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchBanners } from "../../features/apiSlice";

// export default function Slider({ props }) {
//   const dispatch = useDispatch();
//   const [page, setPage] = useState(1);
//   const [data, setData] = useState([]);
//   const { bannersData } = useSelector((state) => state.api);

//   useEffect(() => {
//     dispatch(fetchBanners({ page, pageSize: 5 }));
//   }, [dispatch, page]);

//   useEffect(() => {
//     if (bannersData?.data?.length) {
//       setData(bannersData.data);
//     }
//   }, [bannersData]);

//   return (
//     <>
//       <OwlCarousel
//         className="owl-theme position-relative mt-2"
//         loop
//         margin={10}
//         items={1}
//         autoplay={true}
//         nav={false}
//         dots={true}
//         height={341}
//         autoplayTimeout={2000}
//         onChange={(elem) => {
//           const count = elem.item.index;
//           console.log(count);
//         }}
//       >
//         {data?.length ? (
//           data?.map((slide, index) => {
//             return (
//               <div
//                 key={index}
//                 className="item slider-item mt-4"
//                 style={
//                   slide.banner
//                     ? {
//                         backgroundImage: `url("${slide.banner}")`,
//                         borderRadius: "5px",
//                       }
//                     : {}
//                 }
//               >
//                 {/* <div className="slider-item-container">
//                 <h2 className="mt-1">{slide.title}</h2>
//                 <p>{slide.descr}</p>
//                 <Link to={slide.link} className="btn btn-default">
//                   It's Easy to Join
//                 </Link>
//               </div> */}
//               </div>
//             );
//           })
//         ) : (
//           <div
//             style={{ height: "341px", background: "#fdfdfd" }}
//             className="item slider-item mt-4"
//           />
//         )}
//       </OwlCarousel>{" "}
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanners } from "../../features/apiSlice";

export default function Slider({ props }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoopEnabled, setIsLoopEnabled] = useState(false); // State to control looping
  const { bannersData } = useSelector((state) => state.api);

  useEffect(() => {
    dispatch(fetchBanners({ page, pageSize: 20 }));
  }, [dispatch, page]);

  useEffect(() => {
    if (bannersData?.data?.length) {
      // Check if the new data is already in the `data` state
      const newData = bannersData.data.filter(
        (item) => !data.some((existingItem) => existingItem.id === item.id)
      );

      // Append only new data to the existing data
      if (newData.length > 0) {
        setData((prevData) => [...prevData, ...newData]);
      }
    }

    // Check if there are no more pages to fetch
    if (bannersData?.currentPage >= bannersData?.totalPages) {
      setIsLoopEnabled(true); // Enable looping
    }
  }, [bannersData.data]); // Only run this effect when `bannersData` changes

  const handleCarouselChange = (elem) => {
    const currentIndex = elem.item.index;
    const totalItems = data.length;
    // Check if the current index is the second-to-last item
    if (currentIndex === totalItems - 2) {
      // Fetch more data only if there are more pages
      if (bannersData?.currentPage < bannersData?.totalPages) {
        setPage((prevPage) => prevPage + 1); // Increment page to fetch more data
      }
    }
  };

  return (
    <>
      <OwlCarousel
        className="owl-theme position-relative mt-2"
        loop={isLoopEnabled} // Enable or disable looping based on state
        margin={10}
        items={1}
        autoplay={true}
        nav={false}
        dots={true}
        height={341}
        autoplayTimeout={2000}
        onChange={handleCarouselChange}
      >
        {data?.length ? (
          data?.map((slide, index) => {
            return (
              <div
                key={index}
                className="item slider-item mt-4"
                style={
                  slide.banner
                    ? {
                        backgroundImage: `url("${slide.banner}")`,
                        borderRadius: "5px",
                      }
                    : {}
                }
              >
                {/* <div className="slider-item-container">
                <h2 className="mt-1">{slide.title}</h2>
                <p>{slide.descr}</p>
                <Link to={slide.link} className="btn btn-default">
                  It's Easy to Join
                </Link>
              </div> */}
              </div>
            );
          })
        ) : (
          <div
            style={{ height: "341px", background: "#fdfdfd" }}
            className="item slider-item mt-4"
          />
        )}
      </OwlCarousel>{" "}
    </>
  );
}
