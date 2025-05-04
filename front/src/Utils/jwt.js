import { jwtDecode } from "jwt-decode";

export function isTokenValid(token) {
  const currentTime = Date.now() / 1000;
  const Decode = jwtDecode(token);
  return Decode.exp > currentTime;
}

export function toggleLocalStorage(token) {
  if (token) {
    localStorage.setItem("accessToken", token);
  } else {
    localStorage.removeItem("accessToken");
  }
}
