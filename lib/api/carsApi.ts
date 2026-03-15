import { Car } from "@/types/car";
import { api } from "./api";

export interface getCarsParams {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
  limit?: string;
  page?: string;
}
export interface getCarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}
export async function getCars(params: getCarsParams): Promise<getCarsResponse> {
  const res = await api.get<getCarsResponse>("/cars", { params });
  return res.data;
}
export async function getCarById(id: string): Promise<Car> {
  const res = await api.get<Car>(`/cars/${id}`);
  return res.data;
}
