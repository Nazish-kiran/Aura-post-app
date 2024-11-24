const logOutBtn = document.querySelector(".logOut-btn");

const logOut= ()=>{
  window.location.replace("https://aura-posting-web.web.app/index.html");
  window.location.replace("index.html");
  localStorage.clear()
}

logOutBtn.addEventListener("click",logOut)