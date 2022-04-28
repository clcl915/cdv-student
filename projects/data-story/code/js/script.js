let container = document.getElementById("container")
let searchIcon = document.getElementsByClassName("searchIcon")[0]
let searchInput = document.getElementsByClassName("container__input")[0]


let w = 1200;
let h = 800;
let padding = 100;

searchIcon.addEventListener("click", ()=>{
  if (searchInput.classList.contains('search-active')){
    searchInput.classList.remove('search-active')
  }
  else{
    searchInput.classList.add('search-active')
  }
})

document.querySelector("#mlPokemon").addEventListener('click',show);
let notice = document.createElement('p');
notice.innerHTML = "Maybe will remove. Check back later :)";
notice.classList.add('notice');
document.querySelector("#mlPokemon").appendChild(notice);

function show(){
  navigator.clipboard.writeText("cl4750@nyu.edu");
  document.querySelector(".notice").classList.add('noticeActive');
  setTimeout(()=>{
    document.querySelector(".notice").classList.remove('noticeActive');
  },1500);
}