"use client";
import { getCars, getCarsParams } from "@/lib/api/carsApi";
import CarListItem from "../CarListItem/CarListIrem";
import css from "./CarList.module.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import Button from "../ui/Button/Button";
import React, { useEffect, useState } from "react";
import CustomDropdown from "../DropDown/DropDown";
import LoaderEl from "../ui/LoaderEl/LoaderEl";
import { useCarStore } from "@/lib/store/carStore";

interface CarListProps {
  brands: string[];
}

export function CarList({ brands }: CarListProps) {
  const { filters, setFilters, resetFilters, setCars } = useCarStore();
  const [appliedFilters, setAppliedFilters] = useState<getCarsParams>(filters);

  const PerPage = "12";
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const hasFilters = Object.values(filters).some(Boolean);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["cars", appliedFilters],
      queryFn: ({ pageParam }) => {
        return getCars({
          ...appliedFilters,
          page: pageParam.toString(),
          limit: PerPage,
        });
      },
      initialPageParam: 1,
      getNextPageParam: (lastResponse) => {
        const nextPage = Number(lastResponse.page) + 1;
        return nextPage <= lastResponse.totalPages ? nextPage : undefined;
      },
      select: (data) => ({
        ...data,
        cars: data.pages.flatMap((page) => page.cars),
      }),
    });

  useEffect(() => {
    if (data?.cars) {
      setCars(data.cars);
    }
  }, [data, setCars]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setAppliedFilters(filters);
  };

  const handleReset = () => {
    resetFilters();
    setAppliedFilters({});
    setOpenDropdown(null);
  };

  const prices = ["30", "40", "50", "60", "70", "80"];

  return (
    <section className={`container ${css.carListContainer}`}>
      <form className={css.formFilter} onSubmit={handleSubmit}>
        <CustomDropdown
          name="brand"
          label="Car brand"
          options={brands || []}
          value={filters.brand || ""}
          onChange={(val) => setFilters({ brand: val })}
          isOpen={openDropdown === "brand"}
          onToggle={(state) => setOpenDropdown(state ? "brand" : null)}
        />

        <CustomDropdown
          name="price"
          label="Price / 1 hour"
          options={prices}
          value={filters.rentalPrice || ""}
          onChange={(val) => setFilters({ rentalPrice: val })}
          isOpen={openDropdown === "price"}
          onToggle={(state) => setOpenDropdown(state ? "price" : null)}
        />

        <div>
          <label>Car mileage / km</label>
          <div className={css.mileageWrapper}>
            <div className={css.inputWrapper}>
              <input
                className={css.inputMileageLeft}
                type="text"
                // Показуємо "From " завжди, навіть якщо цифр ще немає
                value={`From ${filters.minMileage ? Number(filters.minMileage).toLocaleString("en-EN") : ""}`}
                onChange={(e) => {
                  // Видаляємо слово "From" і будь-які не-цифри
                  const rawValue = e.target.value
                    .replace("From", "")
                    .replace(/\D/g, "");
                  setFilters({ minMileage: rawValue });
                }}
              />
            </div>

            <div className={css.inputWrapper}>
              <input
                className={css.inputMileageRight}
                type="text"
                // Показуємо "To " завжди
                value={`To ${filters.maxMileage ? Number(filters.maxMileage).toLocaleString("en-EN") : ""}`}
                onChange={(e) => {
                  const rawValue = e.target.value
                    .replace("To", "")
                    .replace(/\D/g, "");
                  setFilters({ maxMileage: rawValue });
                }}
              />
            </div>
          </div>
        </div>

        <Button className={css.formButton} buttonType="submit">
          Search
        </Button>
        {hasFilters && (
          <Button
            className={css.formButton}
            buttonType="button"
            onClick={handleReset}
          >
            Reset
          </Button>
        )}
      </form>

      {isLoading ? (
        <div className={css.loaderWrapper}>
          <LoaderEl />
        </div>
      ) : data?.cars.length ? (
        <ul className={css.carList}>
          {data.cars.map((car) => (
            <CarListItem key={car.id} car={car} />
          ))}
        </ul>
      ) : (
        <h1 className={css.titleNothing}>No cars match your filters</h1>
      )}

      {hasNextPage && (
        <Button
          buttonType="button"
          className={css.btnLoadMore}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      )}
    </section>
  );
}
