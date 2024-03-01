import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Price } from "./supabase/supabase.types";
import { string } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: price.currency || undefined,
    minimumFractionDigits: 0,
  }).format((price?.unitAmount || 0) / 100);
  return priceString;
};

export const getURL = () => {
  let url = process?.env?.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000/";

  url = url.includes("http") ? url : `https://${url}`;
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};

export const postData = async ({
  url,
  data,
}: {
  url: string;
  data?: { price: Price };
}) => {
  console.log("posting,", url, data);
  const res: Response = await fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    console.log("Error in postData", { url, data, res });
    throw Error(res.statusText);
  }
  return res.json();
};

export const toDateTime = (secs: number) => {
  var t = new Date("1970-01-01T00:30:00Z");
  t.setSeconds(secs);
  return t;
};

type GenericFunction = (...args: any[]) => any | (() => void);
export function debounce(
  func: GenericFunction,
  delay: number
): GenericFunction {
  let timeoutId: NodeJS.Timeout;

  return function (this: typeof debounce, ...args: any[]): void {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  }.bind(debounce); // Use bind para definir o tipo de 'this'
}
