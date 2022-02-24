let categoryBranch = "M400,600 L500,500";
let categories = [];
let people = [];
let leafPath = "M400,280 C 350,270 350,210 400,200 C 450,210 450,270 400,280";
let viz= d3.select("#viz-container")
            .append("svg")
                .attr("id","viz")
                .attr("width",800)
                .attr("height",600)
;

d3.json('data.json').then(gotData);

function gotData(newData){
    console.log(newData);
    console.log(newData[0].typeOfInteraction);
    for (let index=0;index<newData.length;index++){
        if (categories.find(categories => categories.type === newData[index].typeOfInteraction)){
            categories.find(categories => categories.type === newData[index].typeOfInteraction).count++;
            if (categories.find(categories => categories.type === newData[index].typeOfInteraction).new){
                categories.find(categories => categories.type === newData[index].typeOfInteraction).new2=(newData[index]);
            }
            else{
                categories.find(categories => categories.type === newData[index].typeOfInteraction).new=(newData[index]);
            }
            // categories.find(categories => categories.type === newData[index].typeOfInteraction).info.push(newData[index])
        }
        else{
            let newCategory = {"type":newData[index].typeOfInteraction,"count":1,"info":[]};
            newCategory.info = newData[index];
            categories.push(newCategory);
        }
    }
    for (let index=0;index<newData.length;index++){
        if (people.find(people => people.who === newData[index].withWhom)){
            people.find(people => people.who === newData[index].withWhom).count++;
        }
        else{
            let newPerson = {"type":newData[index].withWhom,"count":1};
            people.push(newPerson);
        }
    }
    // for (let index=0;index<newData.length;index++){
    //     if (categories.find(categories => categories.who === newData[index].withWhom)){
    //         categories.find(categories => categories.who === newData[index].withWhom).count++;
    //     }
    //     else{
    //         let newPerson = {"type":newData[index].withWhom,"count":1};
    //         categories.push(newPerson);
    //     }
    // }
    console.log(categories);
    // viz.selectAll("circle").data(newData).enter().append('circle')
    //                                         .attr("cx", xPos)
    //                                         .attr("cy", 400)
    //                                         .attr("r", getRadius)
    //                                         .attr("fill","white");
    // ;
    // viz.selectAll("path").data(categories).enter().append('path')
    //                                         .attr("d", branchAngle)
    //                                         .attr("stroke","white")
    //                                         .attr("fill","none")
    //                                         .attr("category",getTitle)
    //         .selectAll("path").data(people).enter().append('path')
    //                                             .attr("d", branchAngle) 
    //                                             .attr("cy", 0) 
    //                                             .attr("r", 2)
    //                                             .attr("fill","white")
    //                                             .attr("category",getTitle)
    // ;
    // ;
    viz.selectAll("circle").data(categories).enter().append('circle')
                                            .attr("cx", pos)
                                            .attr("cy", pos) 
                                            .attr("r", getRadius)
                                            .attr("fill","white")
                                            .attr("category",getTitle)
            // .selectAll("circle").data(people).enter().append('circle')
            //                                 .attr("cx", innerpos)
            //                                 .attr("cy", innerpos) 
            //                                 .attr("r", getRadius)
            //                                 .attr("fill","white")
            //                                 .attr("category",getTitle)
    ;
    viz.selectAll("circle").data(people).enter().append('circle')
                                            .attr("cx", innerpos)
                                            .attr("cy", innerpos) 
                                            .attr("r", 20)
                                            .attr("fill","#D4E6FF")
                                            .attr("category",getTitle)
    ;

}
function getTitle(d,i){
    console.log(d);
    return d.type;
}
function pos(d, i){
    console.log("d3 is passing in " + d);
    return 80+i*80;
}
function innerpos(d,i){
    console.log("d3 is passing in " + d);
    return 50+40*i;
}
function branchAngle(d, i){
    console.log("d3 is passing in " + d);
    return String("M400,600 L"+(i+1)*100+","+ 550/d.count);
}
function getRadius(d, i){
    console.log("d3 is passing in " + d);
    return d.count*20;
}
// function getTypes(d, i){
//     console.log("d3 is passing in " + d.typeOfInteraction);
//     categories += d.typeOfInteraction;
//     return categories;
// }