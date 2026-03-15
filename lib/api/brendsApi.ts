import { api } from "./api";

export async function getBrands(): Promise<string[]> {
  const res = await api.get<string[]>("/brands");
  return res.data;
}
