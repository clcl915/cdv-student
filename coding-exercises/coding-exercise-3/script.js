// let categoryBranch = "M400,600 L500,500";
let categories = [];
let people = [];
let filteredData = [];
let reactions = ["No particular reaction","I felt bad","Pleasant","Hurry hurry","Feeling thankful"];
// let leafPath = "M400,280 C 350,270 350,210 400,200 C 450,210 450,270 400,280";
let viz= d3.select("#viz-container")
            .append("svg")
                .attr("id","viz")
                .attr("width",1200)
                .attr("height",700)
;


function gotData(newData){
    console.log(newData);
    // console.log(newData[0].typeOfInteraction);
    // filteredData = newData.reduce(function (r, a) {
    //     r[a.typeOfInteraction] = r[a.typeOfInteraction] || [];
    //     r[a.typeOfInteraction].push(a);
    //     console.log();
    //     return r;
    // }, Object.create(null));
    // filteredData = Object.entries(filteredData).map((e) => ( { [e[0]]: e[1] } ));
    // var myData = Object.keys(filteredData).map(key => {
    //     return filteredData[key];
    // })
    // console.log(myData);
    // console.log(newData);
    // console.log(filteredData[0]);
    // for (let index=0;index<newData.length;index++){
    //         if (categories.find(categories => categories.type === newData[index].typeOfInteraction)){
    //             categories.find(categories => categories.type === newData[index].typeOfInteraction).count++;
    //         }
    //         else{
    //             let newCategory = {"type":newData[index].typeOfInteraction,"count":1};
    //             categories.push(newCategory);
    //         }
    //     }
    function sortByKey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
    duration = sortByKey(newData, 'durationInSeconds');

    console.log(duration[duration.length-1].durationInSeconds);
    var x = d3.scaleLinear()
    .domain([0, duration[duration.length-1].durationInSeconds])
    .range([0, 1200]); 

    // Show the axis that corresponds to this scale
    viz.call(d3.axisBottom(x));
    viz.selectAll("circle").data(duration).enter().append('circle')
                                            .attr("cx", randomX)
                                            .attr("cy", randomY)
                                            // .attr("cx", posX)
                                            // .attr("cy", posY)
                                            .attr("r", getRadius)
                                            .attr("fill",getColor)
                                            .style("stroke-width",getReactionWidth)
                                            .attr("stroke",(d,i)=>{
                                                let strokeColor='';
                                                console.log(d.typeOfInteraction);
                                                if (d.reaction!="No particular reaction"){
                                                    strokeColor="red"
                                                }
                                                return strokeColor})
                                            .style("stroke-dasharray", getReactionDash)
                                            .style("margin"," 0 20px 20px")
                                            // .style("box-shadow","inset 0 10px 0 red")
                                            .style("opacity","0.7")  
    ;
}

// function getTitle(d,i){
//     console.log(d);
//     return d.type;
// }
// function getWhom(d,i){
//     let directions = ["inset 0 10px 0 black","inset -10px 0 0 black","inset 0 -10px 0 black","inset 10px 0 0 black","inset -7.5px 7.5px 0 black","inset 7.5px 7.5px 0 black"];
//     let who = ["Delivery Driver","Receptionist","Security Guard","Cashier","Staff worker","Random Man"];
//     let direction;
//     who.forEach(item =>{
//         if (d.withWhom == item){
//             direction=directions[who.indexOf(item)]
//         }
//     })
//     return direction
// }
function getColor(d,i){
    let colors = ["lightgreen","white","aqua","teal","lightblue","yellow","lightpink"];
    let interactions = ["Deliveries","Health Code","Security Check","I needed something","Purchase","Hand outs","Directions"]
    let color;
    interactions.forEach(item =>{
        if (d.typeOfInteraction == item){
            color=colors[interactions.indexOf(item)]
        }
    })
    return color
}
function getReactionWidth(d,i){
    let reactionsControl = ['','','',2,10];
    let index=0;
    reactions.forEach(item =>{
        // console.log(reactions.indexOf(item));
        if (d.reaction == item){
            index=reactionsControl[reactions.indexOf(item)]
        }
    })
    return index
}
function getReactionDash(d,i){
    let reactionsControl = ["none","1,1","10,2","none","none"];
    let index;
    reactions.forEach(item =>{
        if (d.reaction == item){
            index=reactionsControl[reactions.indexOf(item)]
        }
    })
    return index
}

function randomX(d, i){
    // return Math.random()*1200;
    return (i+1)*(i+2)*6;
}
function randomY(d, i){
    // return 400;
    return Math.random()*600;
}
// function posX(d, i){
//     console.log("d3 is passing in " + d);
//     return 50+i*60;
// }
// function posY(d, i){
//     console.log("d3 is passing in " + d);
//     return 50+i*i*3;
// }
// function innerpos(d,i){
//     console.log("d3 is passing in " + d);
//     return 50+40*i;
// }
// function branchAngle(d, i){
//     console.log("d3 is passing in " + d);
//     return String("M400,600 L"+(i+1)*100+","+ 550);
// }
function getRadius(d, i){
    console.log("d3 is passing in " + d);
    return d.durationInSeconds*3.5;
}


d3.json('data.json').then(gotData);








// function getTypes(d, i){
//     console.log("d3 is passing in " + d.typeOfInteraction);
//     categories += d.typeOfInteraction;
//     return categories;
// }

    
    // for (let index=0;index<newData.length;index++){
    //     if (categories.find(categories => categories.type === newData[index].typeOfInteraction)){
    //         categories.find(categories => categories.type === newData[index].typeOfInteraction).count++;
    //         // if (categories.find(categories => categories.type === newData[index].typeOfInteraction).new){
    //         //     categories.find(categories => categories.type === newData[index].typeOfInteraction).new2=(newData[index]);
    //         // }
    //         // else{
    //         //     categories.find(categories => categories.type === newData[index].typeOfInteraction).new=(newData[index]);
    //         // }
    //         // // categories.find(categories => categories.type === newData[index].typeOfInteraction).info.push(newData[index])
    //     }
    //     else{
    //         let newCategory = {"type":newData[index].typeOfInteraction,"count":1,"info":[]};
    //         newCategory.info = newData[index];
    //         categories.push(newCategory);
    //     }
    // }
    // for (let index=0;index<newData.length;index++){
    //     if (people.find(people => people.who === newData[index].withWhom)){
    //         people.find(people => people.who === newData[index].withWhom).count++;
    //     }
    //     else{
    //         let newPerson = {"type":newData[index].withWhom,"count":1};
    //         people.push(newPerson);
    //     }
    // }

    // for (let index=0;index<newData.length;index++){
    //     if (categories.find(categories => categories.who === newData[index].withWhom)){
    //         categories.find(categories => categories.who === newData[index].withWhom).count++;
    //     }
    //     else{
    //         let newPerson = {"type":newData[index].withWhom,"count":1};
    //         categories.push(newPerson);
    //     }
    // }
    // console.log(categories);


    // viz.selectAll("path").data(filteredData).enter().append("path")
    //                                         .attr("d", branchAngle)
    //                                         .attr("stroke","white")
    //                                         .attr("fill","none");
                                            // .attr("category",getTitle)
            // .selectAll("path").data(people).enter().append('path')
            //                                     .attr("d", branchAngle) 
            //                                     .attr("cy", 0) 
            //                                     .attr("r", 2)
            //                                     .attr("fill","white")
            //                                     .attr("category",getTitle)
            // ;
    

    // //working
    // viz.selectAll("circle").data(categories).enter().append('circle')
    //                                         .attr("cx", pos)
    //                                         .attr("cy", pos) 
    //                                         .attr("r", getRadius)
    //                                         .attr("fill","white")
    //                                         .attr("category",getTitle)
    //         // .selectAll("circle").data(people).enter().append('circle')
    //         //                                 .attr("cx", innerpos)
    //         //                                 .attr("cy", innerpos) 
    //         //                                 .attr("r", getRadius)
    //         //                                 .attr("fill","white")
    //         //                                 .attr("category",getTitle)
    // ;
    // viz.selectAll("circle").data(people).enter().append('circle')
    //                                         .attr("cx", innerpos)
    //                                         .attr("cy", innerpos) 
    //                                         .attr("r", 20)
    //                                         .attr("fill","#D4E6FF")
    //                                         .attr("category",getTitle)
    // ;
