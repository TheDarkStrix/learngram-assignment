import Cookies from "js-cookie";

export function saveAuthInfo(authInfo) {
  return Cookies.set("auth", JSON.stringify({ ...authInfo }));
}

export function getAuthInfo() {
  const authInfo = Cookies.get("auth");
  return authInfo ? JSON.parse(authInfo) : authInfo;
}

export function clearAuthInfo() {
  Cookies.remove("auth");
}
