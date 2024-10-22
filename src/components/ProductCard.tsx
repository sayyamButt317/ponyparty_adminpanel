import { formatCurrency } from "@/lib/formatters";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

type ProductCardProps = {
  id: string;
  name: string;
  priceInCents: number;
  description: string;
  imagePath: string;
};

export function ProductCard({
  id,
  name,
  priceInCents,
  description,
  imagePath,
}: ProductCardProps) {
  return (
    <Card className="flex overflow-hidden flex-col">
      <div className="flex justify-center items-center w-full h-auto aspect-video">
        <Image
          src={imagePath}
          height="200"
          width="200"
          alt="loading"
          className="object-cover rounded-md"
        />
      </div>

      <CardHeader className="flex flex-col items-center">
        <CardTitle className="text-[10px] font-serif hover:text-[#ffa9f9] sm:text-[12px] xl:text-[14px]">
          <Link href={`/products/${id}/purchase`}>
            {name} - {formatCurrency(priceInCents / 100)}
          </Link>
        </CardTitle>

        {/* Centered Line */}
        <div className="h-[2px] w-[100px] bg-[#ffa9f9] my-[10px]"></div>
      </CardHeader>
      <div className="flex-auto flex justify-center">
        <p className="line-clamp-2  text-[10px] text-black text-opacity-60 h-[40px] mb-[10px] sm:text-[12px] xl:text-[14px] text-center">
          {description}
        </p>
      </div>

      <CardFooter className="flex flex-col items-center">
        <Button
          asChild
          className="text-[12px] bg-[#ffa9f9]  text-white font-medium px-[15px] py-[10px] mb-4"
        >
          <Link href={`/products/${id}/purchase`}>Book now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
