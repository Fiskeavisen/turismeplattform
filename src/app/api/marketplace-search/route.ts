import { NextResponse } from "next/server";
import {
  searchMarketplaceAvailability,
  type MarketplaceProductType,
} from "@/lib/booking/marketplace";

const productTypes = new Set(["alle", "overnatting", "opplevelse"]);

function getProductType(value: string | null): MarketplaceProductType | "alle" {
  return productTypes.has(value ?? "") ? (value as MarketplaceProductType | "alle") : "alle";
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const guests = Number(searchParams.get("guests") ?? "1");
  const productType = getProductType(searchParams.get("type"));

  const results = searchMarketplaceAvailability({
    from: searchParams.get("from") ?? undefined,
    to: searchParams.get("to") ?? undefined,
    guests: Number.isFinite(guests) ? guests : 1,
    productType,
    query: searchParams.get("q") ?? undefined,
  });

  return NextResponse.json({
    count: results.length,
    availableCount: results.filter((result) => result.available).length,
    results,
  });
}
