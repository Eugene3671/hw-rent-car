"use client";
import { Car } from "@/types/car";
import Image from "next/image";
import Button from "../ui/Button/Button";
import Icon from "../ui/Icon/Icon";
import css from "./CarDetails.module.css";
import toast from "react-hot-toast";

interface CarDetailsProps {
  car: Car;
}

export function CarDetails({ car }: CarDetailsProps) {
  const [city, country] = car.address
    .split(",")
    .map((a) => a.trim())
    .splice(-2);
  const fileName = car.img?.split("/").pop();
  const id = fileName?.split("-")[0] || "";
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const loadingToast = toast.loading("Sending your request...");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success("Car booked successfully! We will call you soon.", {
      id: loadingToast,
    });
    form.reset();
  };
  return (
    <section className="container">
      <div className={css.carDetailsContainer}>
        <div className={css.leftSide}>
          <div className={css.carImageTumb}>
            <Image
              src={car.img ?? "/path-to-your-placeholder.png"}
              alt="car"
              fill
              className={css.carImage}
            />
          </div>
          <div className={css.formWrapper}>
            <h3 className={css.formTitle}>Book your car now</h3>
            <p className={css.formDescr}>
              Stay connected! We are always ready to help you.
            </p>
            <form onSubmit={handleSubmit} className={css.bookForm}>
              <input
                type="text"
                name="customer-name"
                placeholder="Name*"
                required
              />
              <input
                type="email"
                name="customer-email"
                placeholder="Email*"
                required
              />
              <input
                type="date"
                name="customer-data"
                placeholder="Booking date"
              />
              <textarea
                name="customer-text"
                maxLength={600}
                placeholder="Comment"
              ></textarea>
              <Button buttonType="submit" className={css.formBtn}>
                Send
              </Button>
            </form>
          </div>
        </div>
        <div>
          <div className={css.titleContainer}>
            <h2>{`${car.brand} ${car.model}, ${car.year}`}</h2>
            <p>Id: {id}</p>
          </div>
          <div className={css.locationMileageWrapper}>
            <div className={css.locationWrapper}>
              <Icon name="location" />
              <p>
                {city}, {country}
              </p>
            </div>
            <p>Mileage:{` ${car.mileage.toLocaleString("fr-FR")} km`}</p>
          </div>
          <p className={css.rentalPrice}>${car.rentalPrice}</p>
          <p className={css.carDesription}>{car.description}</p>
          <div className={css.carDetails}>
            <div>
              <h3 className={css.listTitle}>Rental Conditions: </h3>
              <ul className={css.listDetails}>
                {car.rentalConditions.map((cnd) => (
                  <li key={cnd}>
                    <Icon name="check" />
                    {cnd}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={css.listTitle}>Car Specifications:</h3>
              <ul className={css.listDetails}>
                <li>
                  <Icon name="calander" />
                  Year: {car.year}
                </li>
                <li>
                  <Icon name="car" />
                  Type: {car.type}
                </li>
                <li>
                  <Icon name="gas-station" />
                  Fuel Consumption: {car.fuelConsumption}
                </li>
                <li>
                  <Icon name="gear" />
                  Engine Size: {car.engineSize}
                </li>
              </ul>
            </div>
            <div>
              <h3 className={css.listTitle}>
                Accessories and functionalities:
              </h3>
              <ul className={css.listDetails}>
                {car.accessories.concat(car.functionalities).map((cnd) => (
                  <li key={cnd}>
                    <Icon name="check" />
                    {cnd}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
