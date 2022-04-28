let wW= window.innerWidth
let wH = window.innerHeight
let gW = 700
let gH = 450;
let paddingTop = (wH-gH)/2;
let paddingLeft = (wW-gW)/2;


let viz = d3
  .select("#vizContainer")
  .append("svg")
  .style("width", wW)
  .style("height", wH) 
  .style("background-color", "lavender")
;
viz.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", wW)
  .attr("height", wH)
  .attr("fill", 0)
  .attr("opacity", 0.2)
;
let bothGraphs = viz.append("g").attr("class","bothGraphs");

let graphTranslationScale = d3.scaleLinear().domain([0,1]).range([0,-wH]);

// get data
d3.json("monarchs.json").then(function (incomingData) {
  data = formatData(incomingData);

  // get list of types
  let types = data.map(d=>d.type).filter(onlyUnique); //see onlyUnique function at bottom

  // count datapoints within their types and add a key value pair to data point
  let typeCount = {}
  types.forEach(d=>{
    typeCount[d] = 0;
  })
  // also get the MAXIMUM number of data points within one type
  // its type : military which contains 23 datapoints 
  let maxTypeCount = 0;
  data.forEach(d=>{
    // console.log(d, typeCount[d.tpe])
    d.countInType = typeCount[d.type];
    typeCount[d.type]++
    maxTypeCount = Math.max(typeCount[d.type],maxTypeCount)
  })

  console.log(maxTypeCount)
  console.log(data)

  // build SCALES and AXIS for both graphs
  // the functions should deal with ENTER and UPDATE selection, So.... 

// graph 1 : Scales and Axis
    //  x axis
    let g1xScale = d3.scaleTime().range([paddingLeft, paddingLeft+gW]);
    g1xScale.domain(d3.extent(data, (d) => d.date));
    let g1xAxis = d3.axisBottom(g1xScale).tickFormat(d3.timeFormat("%-Y"));
    let g1xAxisGroup = bothGraphs.append("g")
      .attr("class", "g1xaxisgroup")
      .attr("transform", "translate(0," + (paddingTop+gH) + ")");
    g1xAxisGroup.call(g1xAxis);

    //y axis
    let g1yScale = d3.scaleBand().range([paddingTop, paddingTop + gH]);
    g1yScale.domain(types);
    let g1yAxis = d3.axisLeft(g1yScale);
    let g1yAxisGroup = bothGraphs.append("g")
      .attr("class", "g1yaxisgroup")
      .attr("transform", "translate(" + (paddingLeft) + ",0)");
    g1yAxisGroup.call(g1yAxis);

// graph 2 : Scales and Axis
  // x axis
    let g2xScale = d3.scaleBand().range([paddingLeft, paddingLeft+gW]);
    g2xScale.domain(types);
    let g2xAxis = d3.axisBottom(g2xScale);
    let g2xAxisGroup = bothGraphs.append("g")
      .attr("class", "g2xaxisgroup")
      .attr("transform", "translate(0," + (paddingTop+gH+wH) + ")");
    g2xAxisGroup.call(g2xAxis);
    
  // y axis
  // make linear scale with maximum points from counter
    let g2yScale = d3.scaleLinear().range([wH+paddingTop, wH+paddingTop+gH]);
    g2yScale.domain([maxTypeCount,0]);
    let g2yAxis = d3.axisLeft(g2yScale);
    let g2yAxisGroup = bothGraphs.append("g")
      .attr("class", "g2yaxisgroup")
      .attr("transform", "translate(" + (paddingLeft) + ",0)");
    // g2yAxisGroup.call(g2yAxis);


  // add group to hold visualizations for both graphs  
  let graphicGroup = bothGraphs.append("g").attr("class","graphicGroup")
// build 2 functions that show data in each graph
  // function 1: 
  //            -  deal with entering elements (when page is loaded) 
  //            -  deal with updating elements (when we transition backwards from graph2 to graph1)

  function showGraph1(){ 
    let datagroups = graphicGroup.selectAll(".datagroup").data(data);
    // entering
    let enteringElements = datagroups.enter().append("g")
      .attr("class","datagroup")
      .attr("transform", (d,i)=>{
        let x = g1xScale(d.date);
        let y= g1yScale(d.type);
        let bandHeight = g1yScale.bandwidth();  // return the width ( but in this case, the height) of the band scale 
        return "translate("+x+","+(y+bandHeight/2)+")";
      })
      enteringElements.append("circle")
        .attr("x",0)
        .attr("y",0)
        .attr("r",5)
        .attr("fill","red")
      ;
      // updating 
      datagroups.transition().duration(1000).attr("transform", (d,i)=>{
        let x = g1xScale(d.date);
        let y= g1yScale(d.type);
        let bandHeight = g1yScale.bandwidth();  // return the width ( but in this case, the height) of the band scale 
        return "translate("+x+","+(y+bandHeight/2)+")";
      })

  }

  // call function 1
  showGraph1();

   // function 2: 
  //            -  deal with UPDATING elements ( when we transition from graph1 to graph2)
  function showGraph2(){
    // only ever updates elements because elements are already visible in graph 1 when the page starts
    let updatingdatagroups = graphicGroup.selectAll(".datagroup").data(data);
    updatingdatagroups.transition().duration(1000)
      .attr("transform", (d,i)=>{
        let x = g2xScale(d.type);
        let y= g2yScale(d.countInType);
        let bandWidth = g2xScale.bandwidth();  // return the width of the band scale 
        return "translate("+(x+bandWidth/2)+","+(y)+")";
      })
    }    
  // call function 2
  // in the beginning, we dont want to show graph2
  // showGraph2();


  // set up enterView listeners that 
  //            -  trigger functions 
  //            -  translate graphs
  //in-class coding transition
          // let current = 1;
          // enterView({
          //   selector: '.text2',
          //   enter: function(el) {
          //     el.classList.add('entered');
          //     console.log("enter")
          //     showGraph2();
          //   },
          //   exit: function(el) {
          //     el.classList.remove('entered');
          //     console.log("exit")
          //     showGraph1();
          //   },
          //   progress: function(el, progress) {
          //     // el.style.opacity = progress;
          //     console.log("progress", progress)
          //     bothGraphs.attr("transform",function(){
          //       let y = graphTranslationScale(progress)
          //       return "translate(0,"+y+")"
          //     })
          //   },
          //   offset: 0.5, // enter at middle of viewport
          //   // once: true, // trigger just once
          // });

  // better transition from graph 1 to graph 2        
  let current = 1;
  enterView({
    selector: '.text2',
    enter: function(el) {
      console.log('a special element entered');
      // console.log("Color")
      // myData[0][3] = "lightyellow"
      // updateGraph();
  
    },
    exit: function(el) {
      console.log('a special element exited');
      // myData[0][3] = "lightblue"
      // updateGraph();
      showGraph1()
  
    },
    prev: undefined,
    progress: function(el, progress) {
      console.log("the special element's progress is:", progress, this.prev);


      bothGraphs.attr("transform", ()=>{
        return "translate(0, "+graphTranslationScale(progress)+")"
      });
      console.log(graphTranslationScale(progress))
// let graphTranslationScale = d3.scaleLinear().domain([0, 100]).range([0, -wH])

      if(this.prev < progress && progress > 0.5 && current != 2){
        showGraph2()
        current = 2
      }else if(this.prev > progress && progress <= 0.5 && current != 1){
        showGraph1()
        current = 1
      }



      // if(progress==1){
      //   showGraph2()
      // }
      this.prev = progress;
    },
    offset: 0.5, // enter at middle of viewport
    // once: true, // trigger just once
  });







// let textElement = viz
//   .append("text")
//   .attr("class", "description")
//   .text("Historic Events")
//   .attr("text-anchor", "middle")
//   .attr("x", w / 2)
//   .attr("y", padding / 2)
//   .attr("opacity",0)
// ;


  // yAxisGroup.call(yAxis);
  // // style the y axis
  // yAxisGroup.selectAll("line").attr("display", "none");
  // yAxisGroup.selectAll("path").attr("display", "none");
  // yAxisGroup
  //   .selectAll("text")
  //   .attr("text-anchor", "middle")
  //   .attr("transform", "rotate(-90)")
  //   .attr("x", "0");

  // let graphGroup = viz.append("g").attr("class", "graphgroup");

  // let datagroups = graphGroup
  //   .selectAll(".datagroup")
  //   .data(data)
  //   .enter()
  //   .append("g")
  //   .attr("class", "datagroup")
  //   .attr("transform", function (d, i) {
  //     console.log(d);
  //     return (
  //       "translate(" +
  //       xScale(d.date) +
  //       "," +
  //       (yScale(d.type) + yScale.bandwidth() / 2) +
  //       ")"
  //     );
  //   })
  //   .on("mouseover", function (event, d) {
  //     textElement.text(d.event);
  //     // OPTION 1
  //     // go to wherever the hovered element is using the same maths of the translation of it above
  //     // textElement.attr("x", xScale(d.date)).attr("y",(yScale(d.type) + yScale.bandwidth() / 2)).attr("opacity", 1)

  //     // OPTION 2
  //     // we can get the location of the mouse in reference to the PAGE with event.pageX and event.pageY
  //     // textElement.attr("x", event.pageX).attr("y",event.pageY).attr("opacity", 1);
      
  //     // OPTION 3
  //     // we can get the location of the mouse in reference to the WINDOW with event.pageX and event.pageY
  //     // textElement.attr("x", event.clientX).attr("y",event.clientY).attr("opacity", 1);
      
  //     // OPTION 4
  //     // d3 has a function to calculate the mouse position in relation to any element of choice
  //     let mousePos = d3.pointer(event,this.parentNode)
  //     textElement.attr("x", mousePos[0]).attr("y",mousePos[1]).attr("opacity", 1);

  //     // do stm with the hovered element
  //     d3.select(this).select("circle").attr("opacity", 1);
  //     //do stm else with all other elements
  //     //loops over all elements in datagroups and if return true, data will pass. if return false, data willn't pass
  //     datagroups
  //       .filter(function (datapoint) {
  //         if (datapoint == d) {
  //           // if one is the same as the one we hovered, we return false to filter it out
  //           return false;
  //         } else {
  //           return true;
  //         }
  //       })
  //       .select("circle")
  //       .transition()
  //       // .delay(function (d, i) {
  //       //   return i * 2;
  //       // })
  //       .attr("opacity", 0.1)
  //       .attr("r", 5);
  //   })
  //   .on("mouseout", function (event, d) {
  //     d3.select(this).select("circle").attr("opacity", 0.5);
  //     textElement.text("Historic Events").attr("opacity",0)
  //     datagroups.select("circle").attr("r", 10).attr("opacity", 0.5);
  //   });

  // datagroups.append("circle").attr("r", 10).attr("opacity", 0.5);

  // datagroups.append("text")
  //     .text((d,i)=>{
  //       return d.event
  //     })
  //     .attr("x",0)
  //     .attr("y",23)
  //     .attr("text-anchor","middle")
  // ;
});

let timeParse = d3.timeParse("%Y");

function formatData(incoming) {
  let keys = Object.keys(incoming.Dates);
  return keys.map((d) => {
    incoming.Dates[d].date = timeParse(incoming.Dates[d].date);
    return incoming.Dates[d];
  });
}

//from: https://stackoverflow.com/a/14438954
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
