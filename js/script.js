var menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];

const mainEl = document.querySelector("main")
mainEl.style.backgroundColor = "#4a4e4d"
mainEl.innerText = "SEI Rocks!"
mainEl.classList.add("flex-ctr")

const topMenuEl = document.getElementById("top-menu")
topMenuEl.style.height = "100%"
topMenuEl.style.backgroundColor = "#0e9aa7"
topMenuEl.classList.add("flex-around")

for(let link of menuLinks){
  const a = document.createElement("a")
  a.setAttribute("href", link.href)
  a.innerText = link.text
  topMenuEl.append(a)
}

const subMenuEl = document.getElementById("sub-menu") // 4.0
subMenuEl.style.height = "100%" // 4.1
subMenuEl.style.backgroundColor = "#3da4ab" // 4.2
subMenuEl.classList.add("flex-around") // 4.3
subMenuEl.style.position = "absolute" // 4.4
subMenuEl.style.position.top = "0" // 4.5

const topMenuLinks = topMenuEl.querySelectorAll("a"); // 5.1
let showingSubMenu = false;

topMenuEl.addEventListener("click", function(event){
  event.preventDefault();
  console.dir(event.target)
  if(event.target.nodeName !== "A"){
    console.log(event.target.text)
    return;
  }  

  if(event.target.innerHTML === "about"){
    document.querySelector("h1").innerText = "<h1>about</h1>";
  }

  if(event.target.className === "active"){ //started experimenting at 5.2
    event.target.classList.remove("active")
    showingSubMenu = false;
    subMenuEl.style.top = "0";
    return // 5.3
  }
  
  const navLinks = document.querySelectorAll("a");
console.log(navLinks)
  for(let navLink of navLinks) {
    navLink.classList.remove("active"); // 5.4
  }

  const targetSubLink = function () {
    for(let menuLink of menuLinks){
      if(menuLink.text === event.target.text) {
        return menuLink.subLinks;
      }
    }
  };
  event.target.className = "active"; // 5.5
  if(targetSubLink){ // 5.6
    showingSubMenu = true;
  } else {
    showingSubMenu = false;
  }
  if(showingSubMenu){
    buildSubMenu(targetSubLink()); // 5.7
    subMenuEl.style.top = "100%";
  } else {
    subMenuEl.style.top = "0";
  }

})

function buildSubMenu(subLinks){
  subMenuEl.innerText = "";
  for(let sub of subLinks){
    const a = document.createElement("a")
    a.setAttribute("href", sub.href)
    a.innerText = sub.text
    subMenuEl.append(a)
  }
};

subMenuEl.addEventListener("click", function(event) { // 6.0
  event.preventDefault(); 
  if(event.target.nodeName !== "a"){
    return;
  }
  showingSubMenu = false;
  subMenuEl.style.top = "0";

  const navLinks = topMenuEl.querySelectorAll("a");
  for (let navLink of navLinks) {
    navLink.classList.remove("active");
  }

  document.querySelector("h1").innerHTML = `${event.target.text}`
})
