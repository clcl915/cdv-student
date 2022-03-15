// let width = document.querySelector("#vizContainer").clientWidth;
// let height = document.querySelector("#vizContainer").clientHeight;
// let infobutton=document.querySelector("#infoButton");
// document.querySelector("#infoContent").style.display='none';
// infobutton.addEventListener('click',()=>{
//     console.log('yes')
//     document.querySelector("#infoContent").style.display=((document.querySelector("#infoContent").style.display == 'none') ? 'flex' : 'none')
// })
let width = 1000;
let height = 800;
let viz = d3.select("#vizContainer")
                .append("svg")
                    .attr("id", "viz")
                    .attr("width", width)
                    .attr("height", height)
;
function getText(d,i){
    if (d.notes != "n/a"){
        notes = d.notes;
    }
    return "<tspan x='0' dy='1.2em'>" + d.durationInSeconds + "s </tspan>" + "<tspan x='0' dy='1.2em'>" +d.withWhom + "</tspan>"+ "<tspan x='0' dy='1.2em'>" +notes+ "</tspan>";
}

function gotData(incomingData){
    console.log("the incoming data is:" , incomingData)
    //Grouping
    let datagroups = viz.selectAll(".dataGroup").data(incomingData).enter().append("g")
                                                        .attr("class","dataGroup")
                                                        .attr("width", 50)
                                                        .attr("height",50)
                                                        .on('mouseover', function (d, i) {
                                                            d3.select(this).selectAll('#context').style("opacity",1)
                                                        })
                                                        .on('mouseout', function (d, i) {
                                                            d3.select(this).selectAll('#context').style("opacity",0)
                                                        })
    ;
    let maxDuration = d3.max(incomingData, (d,i)=>{return d.durationInSeconds;}); 
    let scaleFactor = d3.scaleLinear().domain([0,maxDuration]).range([0.5,1.8]);

    let leaf = datagroups.append("g")
                .attr("class","leafSVG")
                // .html(texture)
                .attr("alignment-baseline","baseline")
                .attr("x",0)
                .attr("y",0)
                .style("display","block")
                .style("margin","auto")
                .attr("transform",(d,i)=>{
                    return "scale(" + scaleFactor(d.durationInSeconds)+ ")"
                })
                .attr("fill",getColor)
                    .append("path")
                    .attr("d",getPath)
                    .attr("opacity",0.7)
    ;
    let innerleaf = datagroups.append("g")
                // .append("path")
                // // .attr("fill","gray")
                .attr("transform",(d,i)=>{
                    return "scale(" + scaleFactor(d.durationInSeconds)+ ")"
                })
                // .attr("d",getInner)
                // .style("stroke-width","5")
                // .style("fill", "#5e5e5e") 
                .style("fill", "#07573a") 
                .html(getInner)
    ;            

    let clip = datagroups.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("path").attr("d",getPath)
    ;
    innerleaf.attr("clip-path", (d,i)=>{
        console.log(d.reaction)
        if (d.reaction != "Errrrrrr"){
            return "url(#clip)"
        }
        else{
            return ""
        }
    })
    ;
    let context = datagroups.append("text")
        .html(getText)
        .attr("id", "context")
        .attr("x",0)
        .attr("width",20)
        .attr("fill","white")
        .style("text-wrap","wrap")
        .attr("font-size","xx-small")
        .attr("y",10)
        .style("opacity",0)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central") 
    ;

    datagroups.attr("transform",(d,i)=>{
        let x=(i%10 * 100)+ 50;
        let y=(Math.floor(i/10)*105)+90;
        return "translate(" + x + "," + y + ")"
    });

}


d3.json("data.json").then(gotData);
// export {getColor, getPath };
// let texture = `<path class="cls-1" d="M21.63-25.3,18.76-20l-3.39,7.84L.5-10.7V-42.61l10.33-1.88a7.56,7.56,0,0,0,4.5-2.64l.88-1.06a8,8,0,0,0,1-1.53l2.48-5.15-.9-.43-2.48,5.14a6.55,6.55,0,0,1-.85,1.33l-.88,1.06a6.55,6.55,0,0,1-3.91,2.3L.5-43.63V-65.76h-1V-54l-6.32-4-1.11-3.34-1,.32,1.23,3.67L-.5-52.84v33.13l-11.1-1.43-4.66-8-2.41-6.36-.94.36,2.45,6.43,4.94,8.54L-.5-18.7V0h1V-9.7l15.55-1.52,3.61-8.34,2.85-5.26Z" transform="translate(19.61 65.76)"/>
// <path class="cls-1" d="M7.41-32.88S4-28.43,8.6-29.77,13.19-36,13.19-36Z" transform="translate(19.61 65.76)"/>`