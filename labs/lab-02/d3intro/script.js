let viz= d3.select("#viz-container")
            .append("svg")
                .attr("id","viz")
                .attr("width",800)
                .attr("height",800)

;
viz.attr("height",600);

// let myCircle = viz.append("circle")
//     .attr("cx", 100)
//     .attr("cy", 400)
//     .attr("r",90)
// ;

// myCircle.attr("fill","white");

// FIRST EXERCISE BINDING DATA
let myData = [4,6,8,2,9];

function xPos(d, i){
    console.log("d3 is passing in " + d);
    return 50+i*100;
}
function getRadius(d, i){
    console.log("d3 is passing in " + d);
    return d*4;
}

// viz.selectAll("circle").data(myData).enter().append("circle")
//                                                 .attr("cx", xPos)
//                                                 .attr("cy", 400)
//                                                 .attr("r",getRadius)
// ;
function durianRadius(d, i){
    console.log(d);
    return d.durian*2;
}

function gotData(newData){
    console.log(newData);
    //               0              7        7
    viz.selectAll("circle").data(newData).enter().append("circle")
                                                .attr("cx", xPos)
                                                .attr("cy", 400)
                                                .attr("r",durianRadius)
    ;   
};

d3.json('data.json').then(gotData);