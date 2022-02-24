// create and SVG as the first thing 
// global variable viz for that svg
let viz = d3.select("#viz-container")
                .append("svg")
                    .attr("id", "viz")
                    .attr("width", 600)
                    .attr("height", 400)
                    .style("background-color", "lavender")
;

function randomX(d, i){
    return Math.random()*600;
}
function randomY(d, i){
    return Math.random()*400;
}
function getText(d,i){
    console.log(d.timestamp);
    return d.timestamp;
}
function gotData(incomingData){
    console.log("the incoming data is:" , incomingData)
    
    //Classes
    // viz.selectAll(".blackCircle").data(incomingData).enter().append("circle")
    //                                                 .attr("class","blackCircle")
    //                                                 .attr("cx",randomX)
    //                                                 .attr("cy",randomY)
    //                                                 .attr("r",10)
    //                                                 .attr("fill","black")
    // ;
    // viz.selectAll(".redCircle").data(incomingData).enter().append("circle")
    //                                                 .attr("class","redCircle")
    //                                                 .attr("cx",randomX)
    //                                                 .attr("cy",randomY)
    //                                                 .attr("r",10)
    //                                                 .attr("fill","red")
    // ;

    //Grouping
    let datagroups = viz.selectAll(".dataGroup").data(incomingData).enter().append("g")
                                                        .attr("class","dataGroup");
    datagroups.append("circle")
                .attr("cx",-10)
                .attr("cy",0)
                .attr("r",20)
                .attr("fill", "black")
    ;
    datagroups.append("circle")
                .attr("cx",10)
                .attr("cy",0)
                .attr("r",20)
                .attr("fill", "red")
    ;
    datagroups.append("text")
                .text(getText)
                .attr("x",-15)
                .attr("font-size","smaller")
                .attr("y",35)
    datagroups.attr("transform",(d,i)=>{
        // let x=Math.random()*600;
        let x=50+i*100;
        let y=200;
        return "translate("+x+","+y+")"
    });
}


d3.json("data.json").then(gotData)

