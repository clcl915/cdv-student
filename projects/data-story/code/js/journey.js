new fullpage("#fullpage",{
    autoScrolling:true,
    navigation:true
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