import { CarDetails } from "@/compotents/CarDetails/CarDetails";
import { getCarById } from "@/lib/api/carsApi";

export default async function CarDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = await getCarById(id);
  return (
    <>
      <CarDetails car={car} />
    </>
  );
}
