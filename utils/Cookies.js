const setCookie = (cname, cvalue, exdays) => {
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie =
    cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Lax";
};

const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let cArray = decodedCookie.split(";");
  for (let i = 0; i < cArray.length; i++) {
    let c = cArray[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

const removeCookie = (name) => {
  document.cookie = name + "=;path=/;";
};

export { setCookie, getCookie, removeCookie };
