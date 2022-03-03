let w = 2400; //front back 1200
let h = 800;

let viz = d3.select("#container")
  .append("svg")
    .attr("class", "viz")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lightblue")
;

function gotData(incomingData){
  console.log(incomingData);
  let datagroups = viz.selectAll('.datagroup').data(incomingData).enter()
                                                            .append("g")
                                                              .attr("class","datagroup")
  ;
  // let minHeight = d3.min(incomingData, (d,i)=>{return d.height;}) //which data, and max what
  let maxHeight = d3.max(incomingData, (d,i)=>{return d.height;}); //which data, and max what
  
  //min and max at once are called " extent"
  // let heightExtent = d3.extent(incomingData, (d,i)=>{return d.height;})
  // console.log(heightExtent);
  // let yScale = d3.scaleLinear().domain(heightExtent).range([0,h/2]);

  let padding = 20;
          //manufacturing the scale   input domain output range
  let yScale = d3.scaleLinear().domain([0,maxHeight]).range([0,h/2-padding]);
  // console.log(yScale(800));
  // let colorScale = d3.scaleLinear().domain ([0,300,maxHeight]).range( ["black","orange","yellow"] );
  let colorScale = d3.scaleLinear().domain ([400,maxHeight]).range( ["black","yellow"] );


  let towers = datagroups.append("rect")
              .attr("x",0)
              .attr("y",(d,i)=>{
                return -yScale(d.height);
              })
              .attr("width",20)
              .attr("height",(d,i)=>{
                let height = yScale(d.height)
                return height;
              })
              .attr('fill',(d,i)=>{
                // if (d.name == "Shanghai Tower"){
                //   return "yellow"
                // }
                // else{
                //   return "black"
                // }
                // return (d.name == "Shanghai Tower") ? "yellow" : "black"
                return colorScale(d.height);
              })
  ;
  let labels = datagroups.append("text")
              .attr("x",3)
              .attr("y",-5) //because we rotating it
              .text((d,i)=>{
                return d.name
              })
              .attr("transform", "rotate(90)")
              .style('font-family',"sans-serif")
  ;
  datagroups.attr("transform", (d,i)=>{
    let x=i*(w/100); 
    let y=h/2;
    return "translate("+x+","+y+")"
  })
}


d3.json("buildings.json").then(gotData);
