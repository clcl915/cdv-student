let w = 1200;
let h = 800;
let padding = 90;
let currentYear = 2017;
// SVG
let viz = d3
  .select("#container")
  .append("svg")
  .style("width", w)
  .style("height", h)
  .style("background-color", "lavender");
// IMPORT DATA
d3.json("mainland.geojson").then(function (geoData) {
  d3.csv("china-pop-2018.csv").then(function (incomingData) {
    // PRINT DATA
    console.log(incomingData);
    console.log(geoData);

    // CHANGE POPULATION STRINGS TO NUMBERS
    incomingData = incomingData.map((d, i) => {
      d.population = Number(d.population);
      return d;
    });
    console.log(incomingData);

    let minPop = d3.min(incomingData, (d, i) => {
      return d.population;
    });
    console.log("minPop", minPop);
    let maxPop = d3.max(incomingData, (d, i) => {
      return d.population;
    });
    console.log("maxPop", maxPop);

    let colorScale = d3
      .scaleLinear()
      .domain([minPop, maxPop])
      .range(["white", "blue"]);
    console.log(colorScale(20));
    let projection = d3
      .geoMercator()
      .translate([w / 2, h / 2])
      // .center([103.8,34.1])
      .fitExtent(
        [
          [padding, padding],
          [w - padding, h - padding],
        ],
        geoData
      );
    let pathMaker = d3.geoPath(projection);
    // CREATE SHAPES ON THE PAGE!
    viz
      .selectAll(".provinces")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("class", "provinces")
      .attr("d", pathMaker)
      .attr("fill", "darkgray")
      .attr("stroke", "white");

    let shanghaiLat = 31.22773;
    let shanghaiLon = 121.52946;
    let pixelValue = projection([shanghaiLon, shanghaiLat]);
    console.log(pixelValue);
    viz
      .append("circle")
      // .attr("cx",pixelValue[0])
      // .attr("cy",pixelValue[1])
      .attr("cx", () => {
        return projection([shanghaiLon, shanghaiLat])[0];
      })
      .attr("cy", () => {
        return projection([shanghaiLon, shanghaiLat])[1];
      })
      .attr("r", 5)
      .attr("fill", "red");
    let citiesVisited = [
      { city: "Hangzhou", year: "2018", longitude:30.2741, latitude:120.1552},
      { city: "Hainan", year: "2019", longitude:20.02, latitude:110.3486},
      { city: "Guangzhou", year: "2021", longitude:23.1291, latitude:113.2644},
      { city: "Shenzhen", year: "2021", longitude:22.54288, latitude:114.06299},
      { city: "Anji", year: "2021", longitude:30.6382, latitude:119.6822},
      { city: "Guilin", year: "2021", longitude:25.2736, latitude:110.29},
      { city: "Yangshuo", year: "2021", longitude:24.7784, latitude:110.4966},
    ];
    let years = [2018, 2019, 2020, 2021, 2022];
    let currentYearIndex = 0;
    setInterval(function () {
      currentYearIndex++;
      if (currentYearIndex > years.length) {
        currentYearIndex = 0;
        viz.selectAll(".visitedCircles").remove()
      }
      // viz.selectAll(".visitedCircles").attr("opacity", 0)
      currentYear = years[currentYearIndex];
      year.text(currentYear);
      for (let i =0 ; i<citiesVisited.length;i++){
        console.log(citiesVisited[i])
        let longitude = citiesVisited[i].longitude
        let latitude = citiesVisited[i].latitude
        console.log(projection([latitude, longitude]))
        if (currentYear == citiesVisited[i].year){
          console.log(currentYear)
            let circles = viz.append("circle")
            .attr("class","visitedCircles")
            .attr("cx", () => {
              return projection([latitude,longitude])[0];
            })
            .attr("cy", () => {
              return projection([latitude,longitude])[1];
            })
            .attr("r", 5)
            .attr("fill", "red")
            .attr("opacity", (d,i)=>{
              setInterval(function () {
                if (currentYear == citiesVisited[i].year){
                  return 1
                }
                else
                  return 0
              }, 2000);
            });
        };
      }
    }, 2000);
    


  // this puts the YEAR onto the visualization
  let year = viz
    .append("text")
    .text("")
    .attr("x", 0 + padding)
    .attr("y", h - padding)
    .attr("font-family", "sans-serif")
    .attr("font-size", "3em")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("fill", "#a2a2a2")
    .attr("opacity", 0.2);
  // this called the drawViz function every second
  // and changes the year of interest
  // and updates the text element that displays the year.
  

});

});
