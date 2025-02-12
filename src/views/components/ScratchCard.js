import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { encrypt } from "../../utils/encryptdecrypt";

export default function ScratchCard({ props }) {
  const [frequencies, setFrequencies] = useState("");

  useEffect(() => {
    if (props.frequency) {
      try {
        const parsedData = JSON.parse(props.frequency);
        setFrequencies(parsedData?.[0].frequency);
      } catch (error) {}
    }
  }, [props.frequency]);

  return (
    <div className="card filter-none pointer ">
      <img
        draggable={false}
        src={
          props.image
            ? props.image
            : "../assets/images/scratch-cards/scratch-cards-1.jpg"
        }
        alt=""
        loading="lazy"
        // style={{ height: "40vh" }}
      />

      <span className="text-center text-light py-1 border-radius-0 img-tg">
        {props?.card_type === "multi-scratch" ? (
          <>
            Reschedules Every{" "}
            {frequencies === "Daily"
              ? "Day"
              : frequencies === "Weekly"
              ? "Week"
              : "Month"}
          </>
        ) : (
          "One Time Scratcher"
        )}
      </span>

      <div className="card-body pb-4 px-4">
        <p className="p-label text-capitalize">
          {props?.card_type?.replace("-", " ")}
        </p>
        <p className="price">Price</p>
        <h4 className="price-amt">Rs.{props?.ticketPrize}</h4>
        <h5 className="scrtch-crd-title mb-0 pb-0 text-capitalize">
          {props?.card_name}
        </h5>
        <p className=" text-capitalize mb-4 pb-0 text-truncate">
          {props?.game_slogan}
        </p>
        <Link
          to={`/scratch-cards/${props?.card_name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "")}/${encrypt(props?.id.toString())}`}
          className="btn btn-outline-info w-100"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
}
