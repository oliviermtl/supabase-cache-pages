import { add, format, isAfter } from "date-fns";

export default function fullUrl(slug = "/") {
  slug = slug.trim();
  if (slug.charAt(0) !== "/") slug = "/" + slug;

  if (!window) return process.env.NEXT_PUBLIC_URL + slug;
  return `${window.location.protocol}//${window.location.host}${slug}`;
}

export function alphaNumericString(length) {
  var charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function attemptValidation({ key, keyTo, maxAttemp = 5, errMessage }) {
  let savedTimout = localStorage.getItem(keyTo);
  if (!savedTimout) {
    savedTimout = add(new Date(), { hours: 1 });
    localStorage.setItem(keyTo, savedTimout);
  }

  let attempt = Number(localStorage.getItem(key) || 0);
  if (isAfter(new Date(), new Date(savedTimout))) attempt = 0;

  if (attempt >= maxAttemp) {
    throw new Error(
      `${errMessage}, please wait until ${format(
        new Date(savedTimout),
        "dd MMM, hh:mm z"
      )}`
    );
  }

  localStorage.setItem(key, attempt + 1);
}
