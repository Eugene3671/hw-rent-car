import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Car } from "@/types/car";
import { getCarsParams } from "@/lib/api/carsApi";

interface CarState {
  cars: Car[];
  favorites: string[];
  filters: getCarsParams;

  setCars: (cars: Car[]) => void;
  addCars: (newCars: Car[]) => void;
  setFilters: (filters: getCarsParams) => void;
  resetFilters: () => void;
  toggleFavorite: (carId: string) => void;
}

export const useCarStore = create<CarState>()(
  persist(
    (set) => ({
      cars: [],
      favorites: [],
      filters: {},

      setCars: (cars) => set({ cars }),
      addCars: (newCars) =>
        set((state) => ({
          cars: [...state.cars, ...newCars],
        })),

      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),

      resetFilters: () => set({ filters: {} }),

      toggleFavorite: (carId) =>
        set((state) => ({
          favorites: state.favorites.includes(carId)
            ? state.favorites.filter((id) => id !== carId)
            : [...state.favorites, carId],
        })),
    }),
    {
      name: "car-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);
