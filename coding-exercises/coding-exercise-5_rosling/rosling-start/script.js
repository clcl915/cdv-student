console.log("hi");
//data from https://towardsdatascience.com/how-to-build-animated-charts-like-hans-rosling-doing-it-all-in-r-570efc6ba382

let w = 1200;
let h = 800;
let xPadding = 50;
let yPadding = 50;

let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    // .style("background-color", "lavender")
;


function gotData(incomingData){
  console.log(incomingData);

  // min max fertility rate (for xScale)
  let fertExtent = d3.extent(incomingData, function(d, i){
    return d.fert;
  });
  console.log("fertExtent", fertExtent);

  // make the xscale which we use to locate points along the xaxis
  let xScale = d3.scaleLinear().domain(fertExtent).range([xPadding, w-xPadding]);


  // min max life expectancy
  let lifeExtent = d3.extent(incomingData, function(d, i){
    return d.life;
  });
  console.log("lifeExtent", lifeExtent);

  // make the yscale which we use to locate points along the yaxis
  let yScale = d3.scaleLinear().domain(lifeExtent).range([h-yPadding, yPadding]);

  // using the function defined at the bottom of this script to build two axis
  buildXAndYAxis(xScale, yScale);


  // min max Population
  let popExtent = d3.extent(incomingData, function(d, i){
    return d.pop;
  });
  console.log("popExtent", popExtent);
  // you may use this scale to define a radius for the circles
  let rScale = d3.scaleLinear().domain(popExtent).range([5, 50]);




  // the simple out put of this complicated bit of code,
  // is an array of all the years the data talks about.
  // the "dates" array looks like:
  // ["1962", "1963", "1964", "1965", ... , "2012", "2013", "2014", "2015"]
  let dates = incomingData.reduce(function(acc,d,i){
    if(!acc.includes(d.year)){
      acc.push(d.year)
    }
    return acc
  }, [])

  console.log("dates", dates);

  // this block of code is needed to select a subsection of the data (by year)
  let currentYearIndex = 0;
  let currentYear = dates[currentYearIndex];
  function filterYear(d, i){
    if(d.year == currentYear){
      return true;
    }else{
      return false;
    }
  }



  let header = viz.append("g").attr("class", "header");
  header.append("text")
          .text("Fertility and Life Expectancy by Country over Time (1962-2015)")
          .attr("x",w/2)
          .attr("y",50)
          .attr("font-family", "sans-serif")
          .attr("font-size", "1.25em")
          .attr("font-weight", "bold")
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "central") 
  ;
  header.append("text")
          .text("recreating Hans Rosling's graph")
          .attr("x",w/2)
          .attr("y",75)
          .attr("font-family", "sans-serif")
          .attr("font-size", "14px")
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "central") 
  ;
  
  let key = viz.append("g").attr("class", "key").attr("transform","translate("+100+","+ 700+")").attr("opacity",0);
  // key.append("rect").attr("x",-30).attr("y",-60).attr("width",520).attr("height",100).attr("fill","#eee");

  key.append("text").text("KEY").attr("transform","translate("+0+","+ -25+")").attr("fill","black").attr("font-family","sans-serif");
  let eachColor = key.selectAll(".colors").data(keyColors).enter().append("g");
  eachColor.append("circle")
              .attr("cx",(d,i)=>{
                return i*100
              })
              .attr("class","colors")
              .attr("y",0)
              .attr("r",5)
              .attr("fill",(d,i)=>{
                return d.color
            })
  ;
  eachColor.append("text").text((d,i)=>{return d.continent}).attr("transform",(d,i)=>{let x=i*100+10; return "translate("+x+","+ 5+")" }).attr("font-family","sans-serif");



  // make a group for all things visualization:
  let vizGroup = viz.append("g").attr("class", "vizGroup");
  function getIncomingGroupLocation(d, i){
    let x = xScale(d.fert);
    let y = -100;
    return "translate("+x+", "+y+")"
  }
  function getGroupLocation(d, i){
    let x = xScale(d.fert);
    let y = yScale(d.life);
    return "translate("+x+", "+y+")"
  }
  function getPop(d,i){
    return rScale(d.pop)*1.5;
  }
  function getCountry(d,i){
    return d.Country;
  }
  function getColor(d,i){
    switch (d.continent){
      case "Africa":
        return "green";
        break;
      case "Americas":
        return "yellow";
        break;
      case "Asia":
        return "red";
        break;
      case "Europe":
        return "orange";
        break;
      case "Oceania":
        return "blue";
        break;
      default:
        return "black";
        break;
    }

  }
  // this function is called every second.
  // inside it is a data variable that always carries the "latest" data of a new year
  // inside it we want to draw shapes and deal wirth both updating and entering element.
  function drawViz(){

    let currentYearData = incomingData.filter(filterYear);
    // console.log("---\nthe currentYearData array now carries the data for year", currentYear);
    console.log(currentYearData);


    // Below here is where your coding should take place! learn from lab 6:
    // https://github.com/leoneckert/critical-data-and-visualization-spring-2020/tree/master/labs/lab-6
    // the three steps in the comments below help you to know what to aim for here

    // bind currentYearData to elements
    function assignKeys(d,i){
      return d.Country;
    }
    let datagroups = vizGroup.selectAll(".datagroup").data(currentYearData,assignKeys);
    datagroups.on('mouseover', function (d, i) {
                                                    d3.select(this).selectAll('.countryText').style("opacity",1)
                                                    d3.select(this.parentNode).raise()
                                                })
                                                .on('mouseout', function (d, i) {
                                                    d3.select(this).selectAll('.countryText').style("opacity",0)
                 
                                                })

    // take care of entering elements
    //ENTERING
    let enteringElements=datagroups.enter()
      .append("g")
        .attr("class", "datagroup")
    ;

    enteringElements.append("circle")
      .attr("r", getPop)
      .attr("fill", getColor)
      .attr("opacity",0.8)
    ;
    let countryText = enteringElements.append("text")
      .attr("class", "countryText")
      .text("")
      .attr("x", 0)
      .attr("y", 0)
      .attr("opacity",0)
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central") 
      .attr("font-size", ".75em")
      .attr("fill", "black")
    ;
    enteringElements.attr("transform", getIncomingGroupLocation).transition().attr("transform", getGroupLocation);
    console.log("from updating");
    // datagroups.attr("r", getPop);

    // take care of updating elements
    datagroups.transition().attr("transform", getGroupLocation);
    datagroups.select("circle").transition().attr("r", getPop);
    datagroups.selectAll("text").text(getCountry);
    // removing
    // let exitingElements = datagroups.exit();
    // exitingElements.remove();  

  }




  // this puts the YEAR onto the visualization
  let year = viz.append("text")
      .text("")
      .attr("x", w/2)
      .attr("y", h/2)
      .attr("font-family", "sans-serif")
      .attr("font-size", "10em")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central") 
      .attr("fill", "#a2a2a2")
      .attr("opacity",0.2)
  ;

  // this called the drawViz function every second
  // and changes the year of interest
  // and updates the text element that displays the year.
  setInterval(function(){
    currentYearIndex++;
    if(currentYearIndex>dates.length){
      currentYearIndex = 0;
    }
    currentYear = dates[currentYearIndex];
    year.text(currentYear)
    drawViz();
  }, 1000);

}


// load data
d3.csv("data.csv").then(gotData);





// function to build x anc y axis.
// the only reasons these are down here is to make the code above look less polluted

function buildXAndYAxis(xScale, yScale){
  let xAxisGroup = viz.append("g").attr("class", 'xaxis');
  let xAxis = d3.axisBottom(xScale);
  xAxisGroup.call(xAxis)
  xAxisGroup.attr("transform", "translate(0, "+ (h-yPadding) +")")
  xAxisGroup.append("g").attr('class', 'xLabel')
    .attr("transform", "translate("+w/2+", 40)")
    .append("text")
    .attr("fill", "black")
    .text("fertility")
    .attr("font-family", "sans-serif")
    .attr("font-size", "1.7em")

  ;

  let yAxisGroup = viz.append("g").attr("class", 'yaxis');
  let yAxis = d3.axisLeft(yScale);
  yAxisGroup.call(yAxis)
  yAxisGroup.attr("transform", "translate("+xPadding+", 0)")

  yAxisGroup.append("g").attr('class', 'xLabel')
    .attr("transform", "translate(-33, "+h/2+") rotate(-90)")
    .append("text")
    .attr("fill", "black")
    .text("life expectancy")
    .attr("font-family", "sans-serif")
    .attr("font-size", "1.7em")

  ;
}

let keyColors = [
  {
      continent:"Africa",
      color : "green"
  },
  {
    continent: "Americas",
      color:"yellow"
  },
  {
    continent: "Asia",
      color:"red"
  },    
  {
    continent: "Europe",
      color:"orange"
  },
  {
    continent: "Oceania",
      color:"blue"
  }
  ];