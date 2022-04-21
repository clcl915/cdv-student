let w = 1200;
let h = 800;
let padding = 90

// SVG
let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "lavender")
;


// IMPORT DATA
d3.json("mainland.geojson").then(function(geoData){
  d3.csv("china-pop-2018.csv").then(function(incomingData){
    // PRINT DATA
    console.log(incomingData);
    console.log(geoData);

    // CHANGE POPULATION STRINGS TO NUMBERS
    incomingData = incomingData.map((d,i)=>{
      d.population = Number(d.population)
      return d
    })
    console.log(incomingData);

    let minPop = d3.min(incomingData, (d,i)=>{
      return d.population
    })
    console.log("minPop", minPop);
    let maxPop = d3.max(incomingData, (d,i)=>{
      return d.population
    })
    console.log("maxPop", maxPop);

    let colorScale = d3.scaleLinear().domain([minPop,maxPop]).range(["white","blue"]);
    console.log(colorScale(20))
    let projection = d3.geoEqualEarth()
        .translate([w/2,h/2])
        // .center([103.8,34.1])
        .fitExtent([[padding,padding],[w-padding,h-padding]], geoData)
    ;



    let pathMaker = d3.geoPath(projection);
    // CREATE SHAPES ON THE PAGE!
    viz.selectAll(".provinces").data(geoData.features).enter()
      .append("path")
        .attr("class", "provinces")
        .attr("d", pathMaker)
        .attr("fill", (d,i)=>{
          console.log(d.properties.name)
          //see if d.properties.name is in incomingData
          let correspondingDatapoint = incomingData.find((datapoint)=>{
            console.log(datapoint);
            if (datapoint.province == d.properties.name)
              return true
            else
              return false
          })
          if (correspondingDatapoint != undefined){
            console.log(correspondingDatapoint)
            return colorScale(correspondingDatapoint.population)
          }

          if (d.properties.name == 'Guizhou'){
            return "red"
          }
          return "black"
        })
        .attr("stroke", "red")
    ;

    let shanghaiLat = 31.22773;
    let shanghaiLon = 121.52946;
    let pixelValue = projection([shanghaiLon,shanghaiLat])
    console.log(pixelValue)
    viz.append("circle")
        // .attr("cx",pixelValue[0])
        // .attr("cy",pixelValue[1])
        .attr("cx",()=>{
          return projection([shanghaiLon,shanghaiLat])[0]
        })
        .attr("cy",()=>{
          return projection([shanghaiLon,shanghaiLat])[1]
        })
        .attr("r",20)
        .attr("fill","red")
  })


})
