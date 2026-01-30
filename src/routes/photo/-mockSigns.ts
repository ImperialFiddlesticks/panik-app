import type { PhotoSignType } from "./-fakeAnalyzeSign";

export const mockSigns: {
  type: PhotoSignType;
  label: string;
  image: string;
}[] = [
  {
    type: "noparking",
    label: "🚫 No parking",
    image: "/mock-signs/sign-noparking.png",
  },
  {
    type: "timelimit",
    label: "🅿️ Weekdays 08-17",
    image: "/mock-signs/sign-timelimit.png",
  },
  {
    type: "paid",
    label: "💳 Paid parking",
    image: "/mock-signs/sign-paid.png",
  },
  {
    type: "free",
    label: "🆓 Free parking",
    image: "/mock-signs/sign-free.png",
  },
];
