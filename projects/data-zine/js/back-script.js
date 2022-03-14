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

function getInner(d,i){
    let inner='';
    switch (d.reaction){
        case "Hurry hurry":
            inner=`  <path class="cls-1" d="M19.25-53.5v-2.3C16.16-56.37,4.41-50.26.74-47.08v-3.33H-.74v3.33c-3.67-3.18-15.42-9.2-18.51-8.63v2.3C-16.16-54-4.41-48-.74-44.79v2C-4.41-46-16.16-52-19.25-51.44v2.2c3.09-.57,14.84,5.44,18.51,8.62v2.09c-3.67-3.19-15.42-9.2-18.51-8.63v2.42c3.09-.57,14.84,5.44,18.51,8.63v2c-3.67-3.18-15.42-9.19-18.51-8.63v2.26C-16.16-41.06-4.41-35-.74-31.86v1.5C-4.41-33.54-16.16-39.55-19.25-39v2c3.09-.57,14.84,5.45,18.51,8.63v1.74c-3.67-3.18-15.42-9.19-18.51-8.62v1.82C-16.16-34-4.41-28-.74-24.81V-23c-3.67-3.19-15.42-9.2-18.51-8.63v1.86c3.09-.57,14.84,5.45,18.51,8.63v2.24c-3.67-3.18-15.42-9.19-18.51-8.62v1.82c3.09-.57,14.84,5.44,18.51,8.62v1.92c-3.67-3.19-15.42-8.71-18.51-8.15v1.72c3.09-.57,14.84,5.44,18.51,8.63v2.14C-4.41-14-16.16-20-19.25-19.42v1.72c3.09-.57,14.84,5.44,18.51,8.62V0H.74V-9.08c3.67-3.18,15.42-9.28,18.51-8.71v-1.72C16.16-20.08,4.41-14,.74-10.8v-2.14c3.67-3.19,15.42-9.29,18.51-8.72v-1.72C16.16-23.94,4.41-17.84.74-14.66v-2.4c3.67-3.18,15.42-9.28,18.51-8.71v-1.82C16.16-28.16,4.41-22.06.74-18.88v-2.24c3.67-3.18,15.42-9.29,18.51-8.72V-31.7C16.16-32.27,4.41-26.17.74-23v-1.83C4.41-28,16.16-34.09,19.25-33.53v-1.81C16.16-35.91,4.41-29.81.74-26.63v-1.74c3.67-3.18,15.42-9.29,18.51-8.72v-2C16.16-39.64,4.41-33.54.74-30.36v-1.5C4.41-35,16.16-41.15,19.25-40.58v-2.26C16.16-43.4,4.41-37.3.74-34.12v-2c3.67-3.19,15.42-9.29,18.51-8.72v-2.42C16.16-47.82,4.41-41.72.74-38.53v-2.09c3.67-3.18,15.42-9.28,18.51-8.71v-2.2C16.16-52.1,4.41-46,.74-42.82v-2C4.41-48,16.16-54.07,19.25-53.5Z"/>`;
            break;
        case "I felt bad":
            inner=` <path class="cls-1" d="M-9.3-33.23c2.58,0,2.32-3.68,0-3.68A1.84,1.84,0,1,0-9.3-33.23Z" />
            <path class="cls-1" d="M3.84-33.23c2.58,0,2.32-3.68,0-3.68A1.84,1.84,0,1,0,3.84-33.23Z" />
            <path class="cls-1" d="M-1.24-42.25c2.58,0,2.32-3.67,0-3.67A1.84,1.84,0,1,0-1.24-42.25Z" />
            <path class="cls-1" d="M-5.61-30a1.84,1.84,0,1,0,0,3.67C-3-26.33-3.29-30-5.61-30Z" 
            <path class="cls-1" d="M9.31-26.59c2.59,0,2.32-3.67,0-3.67A1.84,1.84,0,1,0,9.31-26.59Z" />
            <path class="cls-1" d="M2.27-26.33a.92.92,0,1,0,0,1.84A.92.92,0,1,0,2.27-26.33Z" />
            <path class="cls-1" d="M3.65-41.33a.92.92,0,0,0,0-1.84A.92.92,0,1,0,3.65-41.33Z" 
            <path class="cls-1" d="M2.27-39.25a.92.92,0,1,0,0-1.83A.92.92,0,1,0,2.27-39.25Z" />
            <path class="cls-1" d="M-2.17-33.23a.92.92,0,1,0,0,1.83A.92.92,0,1,0-2.17-33.23Z" 
            <path class="cls-1" d="M15.07-25.41a.92.92,0,1,0,0,1.84A.92.92,0,0,0,15.07-25.41Z" />
            <path class="cls-1" d="M19-28.63a.92.92,0,1,0,0,1.84A.92.92,0,0,0,19-28.63Z" />
            <path class="cls-1" d="M9.3-22.66C7-22.66,6.72-19,9.3-19A1.84,1.84,0,1,0,9.3-22.66Z" />
            <path class="cls-1" d="M18.11-17.85c-2.32,0-2.58,3.68,0,3.68A1.84,1.84,0,1,0,18.11-17.85Z" />
            <path class="cls-1" d="M21.8-26.59c-2.32,0-2.58,3.67,0,3.67A1.84,1.84,0,1,0,21.8-26.59Z" />
            <path class="cls-1" d="M-3.84-22.66c-2.32,0-2.58,3.68,0,3.68A1.84,1.84,0,1,0-3.84-22.66Z" />
            <path class="cls-1" d="M5.61-15.75c-2.32,0-2.58,3.67,0,3.67A1.84,1.84,0,1,0,5.61-15.75Z" />
            <path class="cls-1" d="M-9.31-16c-2.32,0-2.59,3.67,0,3.67A1.84,1.84,0,1,0-9.31-16Z" />
            <path class="cls-1" d="M-2.27-12.08a.92.92,0,1,0,0,1.84A.92.92,0,1,0-2.27-12.08Z" />
            <path class="cls-1" d="M-9.31-21.74a.92.92,0,1,0,0-1.83A.92.92,0,1,0-9.31-21.74Z" />
            <path class="cls-1" d="M-14.66-13c2.32,0,2.58,3.68,0,3.68A1.84,1.84,0,1,1-14.66-13Z" />
            <path class="cls-1" d="M-21.12-16a.92.92,0,0,1,0,1.84A.92.92,0,1,1-21.12-16Z" />
            <path class="cls-1" d="M-14.66-18.74a.92.92,0,1,1,0-1.84A.92.92,0,0,1-14.66-18.74Z" />
            <path class="cls-1" d="M2.17-19a.92.92,0,1,0,0,1.83A.92.92,0,1,0,2.17-19Z" />
        `
            break;
        case "Pleasant":
            inner=`<path class="cls-1" d="M18.21-47.07l-.72-.71a.3.3,0,0,0-.41,0L1.33-32a.3.3,0,0,1-.51-.2V-50.12a.29.29,0,0,0-.29-.29h-1a.29.29,0,0,0-.29.29v17.89a.29.29,0,0,1-.5.2l-15.81-15.8a.28.28,0,0,0-.41,0l-.72.71a.31.31,0,0,0,0,.42l16.9,16.89a.29.29,0,0,1,0,.42L-18.15-12.55a.29.29,0,0,0,0,.42l.71.71a.28.28,0,0,0,.41,0L-1.27-27.17a.29.29,0,0,1,.5.21V-.29A.29.29,0,0,0-.48,0h1A.29.29,0,0,0,.82-.29V-27a.3.3,0,0,1,.51-.21L17-11.47a.3.3,0,0,0,.41,0l.71-.72a.28.28,0,0,0,0-.41L1.36-29.39a.31.31,0,0,1,0-.42L18.21-46.65A.31.31,0,0,0,18.21-47.07Z"/>`
            break;
        case "Feeling thankful":
            inner=`<path class="cls-1" d="M-1.07-1.17v-58a1.08,1.08,0,1,1,2.14,0v58A1.07,1.07,0,1,1-1.07-1.17Z"/>`
            break;
        case "Huh?":
            inner=`<path class="cls-1" d="M-1.07-73.72V-10.9a1.08,1.08,0,1,0,2.14,0V-73.72C1.07-75.42-1.07-75.44-1.07-73.72Z" />
            <path class="cls-1" d="M-4.46-73.72V-10.9a1.08,1.08,0,1,0,2.13,0V-73.72C-2.33-75.42-4.46-75.44-4.46-73.72Z" />
            <path class="cls-1" d="M-7.86-73.72V-10.9a1.08,1.08,0,1,0,2.13,0V-73.72C-5.73-75.42-7.86-75.44-7.86-73.72Z" />
            <path class="cls-1" d="M2.33-73.72V-10.9a1.08,1.08,0,1,0,2.13,0V-73.72C4.46-75.42,2.33-75.44,2.33-73.72Z" />
            <path class="cls-1" d="M5.73-73.72V-10.9a1.08,1.08,0,1,0,2.13,0V-73.72C7.86-75.42,5.73-75.44,5.73-73.72Z" />
        `
            break;
        case "Annoyed":
            inner=`  <path class="cls-1" d="M11.73-58.91a1,1,0,0,0-1.24.88L1-11.53V-59.19a1.1,1.1,0,0,0-1-1.17,1.1,1.1,0,0,0-1,1.17v47.66L-10.49-58a1,1,0,0,0-1.24-.88,1.18,1.18,0,0,0-.77,1.41L-1.91-9.6-.33-.81H.29l1.6-8.74L12.5-57.5A1.18,1.18,0,0,0,11.73-58.91Z"/>`;
            break;
        case "Errrrrrr":
            inner='!';
            break;
        case "Hahaha":
            inner='!';
            break;
        default:
            inner = ""
            break;
    }
    return inner
    
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
    innerleaf.attr("clip-path", "url(#clip)");
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