export const COUPON_CODES ={
  BLFRIDAY:"BLFRIDAY",
  XMAS2025:"XMAS2025",
  NEWYEAR2026:"NEWYEAR2026",
  EASTER2025:"EASTER2025"
}as const;

export type CouponCode = keyof typeof COUPON_CODES;