import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";

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
        </div>
    )
};
export default RestaurantMenuPage;
