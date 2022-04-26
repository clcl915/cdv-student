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

// let viz = d3
//   .select("#vizContainer")
//   .append("svg")
//   .style("width", w)
//   .style("height", h)
//   .style("background-color", "lavender")
// ;
// function gotData(incomingData){
//   console.log("the incoming data is:" , incomingData)

//  let branchContainer =  viz.append("g");
//   ;
//   branchContainer.selectAll(".dataGroup").data(d3.range(6)).enter().append("g")
//           .attr("class","dataGroup")
//           .attr("transform", (d,i)=>{
//               let x=((i+1)* 100);
//               let y=100;

//               return "translate(" +  x + "," + y + ")"
//           })
//           .attr("stroke-width","1")
//           .attr("stroke","white")
//           .attr("fill","white")
//           .append("rect")
//           .attr("x",0)
//           .attr("y",0)
//           .attr("width",40)
//           .attr("height",40)

//   ;
//   let title = viz.append("g")
//                   .attr("class","title")
//                   .attr("fill","white")
//   ;
// }

d3.json("data.json").then(gotData);