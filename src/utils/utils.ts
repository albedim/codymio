//export const BASE_URL = "http://localhost:5000/api/v1"
export const BASE_FE_URL = "http://localhost:3000"

export const BASE_URL = "https://codymio.pythonanywhere.com/api/v1"
//export const BASE_FE_URL = "https://codymio.pages.dev"


export const setCookie = (cookie: string, cValue: string, expDays: number) => {
  let date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = cookie + "=" + cValue + "; " + expires + "; path=/";
}

export const getCookie = (cookie: string) => {
  const name = cookie + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded .split('; ');
  let res;
  cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
  })
  return res;
}

export const eraseCookie = (cookie: string) => {   
  document.cookie = cookie+'=; Max-Age=-99999999;';  
}