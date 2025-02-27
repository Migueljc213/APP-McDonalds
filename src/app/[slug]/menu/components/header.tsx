"use client"

import { Restaurant } from "@prisma/client";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

interface RestaurantHeaderProps{
    restaraunt: Pick<Restaurant, "name" | "coverImageUrl">;
}

const RestarauntHeader = ({ restaraunt }: RestaurantHeaderProps) => {
    const { slug } = useParams<{ slug: string }>;
    const router = useRouter();
    const handleBackClick = () => router.back();
    const handleOrders

};

export default RestarauntHeader;