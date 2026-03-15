import { CarList } from "@/compotents/CarList/CarList";
import { getBrands } from "@/lib/api/brendsApi";
import { getCars } from "@/lib/api/carsApi";
import { QueryClient } from "@tanstack/react-query";

export default async function CatalogPage() {
  const queryClient = new QueryClient();
  const brands = await getBrands();
  queryClient.prefetchQuery({
    queryKey: ["cars"],
    queryFn: () => getCars({ page: "1", limit: "12" }),
  });
  return (
    <>
      <CarList brands={brands} />
    </>
  );
}
