"use client";
import Image from "next/image";
import Button from "../ui/Button/Button";
import { Car } from "@/types/car";
import css from "./CarListItem.module.css";
import { useCarStore } from "@/lib/store/carStore";
import Icon from "../ui/Icon/Icon";
export default function CarListItem({ car }: { car: Car }) {
  const favorites = useCarStore((state) => state.favorites);
  const toggleFavorite = useCarStore((state) => state.toggleFavorite);

  const isSaved = favorites.includes(car.id);
  const [city, country] = car.address
    .split(",")
    .map((a) => a.trim())
    .splice(-2);
  const handleFavoriteClick = () => {
    toggleFavorite(car.id);
  };
  return (
    <>
      <li className={css.carListItem}>
        <div className={css.carImageTumb}>
          <Image
            src={car.img ?? "/path-to-your-placeholder.png"}
            alt="car"
            fill
            className={css.carImage}
          />
          <button
            type="button"
            onClick={handleFavoriteClick}
            className={css.buttonSaveCar}
          >
            <Icon
              width="16"
              height="15"
              className={isSaved ? css.iconHeartActive : css.iconHeart}
              name="heart"
            />
          </button>
        </div>
        <div className={css.carContent}>
          <p>
            {car.brand} <span className={css.carModel}>{car.model}</span>,{" "}
            {car.year}
          </p>
          <p>${car.rentalPrice}</p>
        </div>
        <div className={css.carInfo}>
          <span>{city}</span>
          <span>{country}</span>
          <span>{car.rentalCompany}</span>
          <p className={css.typeBreak}>
            <span>
              {car.type.charAt(0).toUpperCase() +
                car.type.slice(1).toLowerCase()}
            </span>
            <span>{`${car.mileage.toLocaleString("fr-FR")} km`}</span>
          </p>
        </div>
        <Button href={`/catalog/${car.id}`}>Read more</Button>
      </li>
    </>
  );
}
