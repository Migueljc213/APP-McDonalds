import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import RestaurantHeader from "./components/header";

interface IRestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodvalid = (consumptionMethod: string) => {
  return ["DINE-IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: IRestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  if (!isConsumptionMethodvalid(consumptionMethod)) {
    return notFound();
  }
    const restaraunt = await db.restaurant.findUnique({
        where: { slug },
        include: {
            menuCategories: {
                include: {products: true}
            }
        }
    })
    if (!restaraunt) {
        return notFound();
    }

    return (
        <div>
            <RestaurantHeader restaurant={restaraunt} />
        </div>
    )
};
export default RestaurantMenuPage;
