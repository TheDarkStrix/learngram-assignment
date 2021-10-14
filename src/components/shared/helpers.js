import Cookies from "js-cookie";

export function saveAuthInfo(authInfo) {
  return Cookies.set("auth", authInfo);
}

export function getAuthInfo() {
  const authInfo = Cookies.get("auth");
  return authInfo ? authInfo : authInfo;
}

export function clearAuthInfo() {
  Cookies.remove("auth");
}
