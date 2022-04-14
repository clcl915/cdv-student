d3.json("births.json").then(gotData);

let w = 900;
let h = 500;
let xpadding = 100;
let ypadding = 50;
let viz = d3
  .select("#container")
  .append("svg")
  .style("width", w)
  .style("height", h)
  .style("outline", "solid black");
let currentCountryIndex = 0;

function gotData(incomingData) {
  incomingData = fixJSDateObjects(incomingData);
  console.log(incomingData);

  let flatData = d3.merge(incomingData);
  let xDomain = d3.extent(flatData, function (d) {
    return d.year;
  });
  let xScale = d3
    .scaleTime()
    .domain(xDomain)
    .range([xpadding, w - xpadding]);
  let xAxis = d3.axisBottom(xScale);
  let xAxisGroup = viz
    .append("g")
    .attr("class", "xaxisgroup")
    .attr("transform", "translate(0," + (h - ypadding) + ")");
  xAxisGroup.call(xAxis);

  let yMax = d3.max(flatData, function (d) {
    return d.birthsPerThousand;
  });
  let yDomain = [0, yMax];
  let yScale = d3
    .scaleLinear()
    .domain(yDomain)
    .range([h - ypadding, ypadding]);
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz
    .append("g")
    .attr("class", "yaxisgroup")
    .attr("transform", "translate(" + xpadding / 2 + ",0)");
  yAxisGroup.call(yAxis);
  //d3.line() returns a function that produces path element's d strings for us.
  let startline = d3
    .line()
    .x(function (d, i) {
      // console.log(d);
      return xScale(d.year);
    })
    .y(function (d, i) {
      console.log (h - ypadding) 
      return (h - ypadding) 
    });
  function assignKeys(d, i) {
    return d.key;
  }
  let lineMaker = d3
    .line()
    .x(function (d, i) {
      // console.log(d);
      return xScale(d.year);
    })
    .y(function (d, i) {
      return yScale(d.birthsPerThousand);
    });

  function assignKeys(d, i) {
    return d.key;
  }

  let graphGroup = viz.append("g").attr("class", "graphGroup");

  function draw() {
    console.log(currentCountryIndex);
    let drawPaths = graphGroup
      .selectAll(".line")
      .data([incomingData[currentCountryIndex]], assignKeys);
    drawPaths
      .enter()
      .append("path")
      .attr("class", "line")
      .attr("id", (d, i) => {
        // console.log(d);
        if (d[0].country == "China") {
          return "china";
        } else {
          return "usa";
        }
      })
      .attr("d", startline).transition().duration(800).attr("d", lineMaker)
      .attr("fill", "none")
      .attr("stroke", (d, i) => {
        if (d[0].country == "China") {
          return "red";
        } else {
          return "blue";
        }
      })
      .attr("stroke-width", 5)
    ;  
    drawPaths
      .transition()
      .duration(500)
      .attr("d", lineMaker)
      .attr("stroke", (d, i) => {
        if (d[0].country == "China") {
          return "red";
        } else {
          return "blue";
        }
      });
  }
  document.getElementById("usa").addEventListener("click", () => {
    console.log("usa");
    currentCountryIndex = 0;
    draw();
  });
  document.getElementById("china").addEventListener("click", () => {
    console.log("china");
    currentCountryIndex = 1;
    draw();
  });
}

// function that turns all datapoints year values
// into JS date objects in the very beginning
// so that WE DON'T HAVE TO DEAL WITH IT LATER
function fixJSDateObjects(dataToFix) {
  // timeParser
  let timeParse = d3.timeParse("%Y");
  return dataToFix.map(function (data) {
    return data.map(function (d) {
      return {
        country: d.country,
        year: timeParse(d.year),
        birthsPerThousand: d.birthsPerThousand,
      };
    });
  });
}
