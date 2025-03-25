import { defineQuery } from "next-sanity";
import { CouponCode } from "./couponCodes";
import { sanityFetch } from "../live";

export const getActiveSaleByCuponCode = async (coupondCode: CouponCode) => {
  const ACTIVE_SALE_BY_COUPON_QUERY = defineQuery(`
    *[ 
      _type == "sale"
      && isActive == true
      && couponCode == $coupondCode
    ] | order(ValidFrom desc)[0]
    `);
  try {
    const activeSale = await sanityFetch({
      query: ACTIVE_SALE_BY_COUPON_QUERY,
      params: {
        coupondCode,
      },
    });
    return activeSale ? activeSale.data : null;
  } catch (error) {
    console.error("Error fetching active sales by coupon code:", error);
    return null;
  }
};
