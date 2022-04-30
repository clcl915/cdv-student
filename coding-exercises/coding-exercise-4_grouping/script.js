let viz = d3.select("#vizContainer").append("div").classed("svg-container", true)
                .append("svg")
                    .attr("id", "viz")
                    .attr("viewBox","0 0 700 600")
                    .attr("preserveAspectRatio","xMidYMid meet")
                    .classed("svg-content-responsive", true)
                    .append("g")
                    .attr("width", 700)
                    .attr("height", 600);
;
let keyBeanSize = d3.select(".keyBeanSize").append("div").classed("key-container", true)
                .append("svg")
                    .attr("id", "keyBeanSize")
                    .attr("viewBox","0 0 380 75")
                    .attr("preserveAspectRatio","xMidYMid meet")
                    .classed("svg-content-responsive", true)
                    .append("g")
                    .attr("width", 380)
                    .attr("height", 75)
;
let keyBeanColor = d3.select(".keyBeanColor").append("div").classed("key-container", true)
                .append("svg")
                    .attr("id", "keyBeanColor")
                    .attr("viewBox","0 0 380 75")
                    .attr("preserveAspectRatio","xMidYMid meet")
                    .classed("svg-content-responsive", true)
                    .append("g")
                    .attr("width", 380)
                    .attr("height", 75)
;
let keyBeanAroma = d3.select(".keyBeanAroma").append("div").classed("key-container", true)
                .append("svg")
                    .attr("id", "keyBeanAroma")
                    .attr("viewBox","0 0 380 75")
                    .attr("preserveAspectRatio","xMidYMid meet")
                    .classed("svg-content-responsive", true)
                    .append("g")
                    .attr("width", 380)
                    .attr("height", 75)
;
let div = d3.select("body").append("div")
     .style("opacity", 0);

function getText(d,i){
    return d.cafeName;
}
function getColor(d,i){
    let color="";
    switch (d.district){
        case "Changning":
            color = "#D7C38E";
            break;
        case "Huangpu":
            color="#D7AA66";
            break;
        case "Jingan":
            color="#CF7C48";
            break;
        case "Pudong":
            color="#B56A40";
            break;
        case "Putuo":
            color="#382E2D";
            break;
        case "Xuhui":
            color="#794E3B";
            break;
    }
    return color;
}
function getSize(d,i){
    let scaleFactor =1;
    let translateY =0;
    switch (d.cafeSize){
        case "Tiny":
            scaleFactor=0.3;
            translateY = 150 ;
            break;
        case "Small":
            scaleFactor=0.5;
            translateY = 70 ;
            break;
        case "Medium":
            scaleFactor=0.8;
            translateY = 25;
            break;
        case "Large":
            scaleFactor=1;
            translateY = 10 ;
            break;
    }
    return "scale("+scaleFactor+") translate(0,"+translateY+")";
}
function getAromaPosition(d,i){
    let translateY =0;
    switch (d.cafeSize){
        case "Tiny":
            translateY = 30 ;
            break;
        case "Small":
            translateY = 20 ;
            break;
        case "Medium":
            translateY = 10;
            break;
        case "Large":
            translateY = 0 ;
            break;
    }
    return "translate(0,"+translateY+")";
}
function getSpecial(d,i){
    let special='';
    switch (d.anythingSpecial){
        case "Dough":
            special='*';
            break;
        case "Cakes":
            special='#';
            break;
        case "BAGELS!":
            special='o';
            break;
        case "Animals":
            special='+';
            break;
        case "Paw":
            special='!';
            break;
        default:
            special="";
            break;
    }
    return special
    
}
function getAroma1(d,i){
    return d.goodSeatsForWorking == "Yes" ? ("brown") : ("none");
}
function getAroma2(d,i){
    return d.goodSeatsForWorking == "Meh" ? ("brown") : ("none");
}
function getAroma3(d,i){
    return d.goodSeatsForWorking == "Yes" ? ("brown") : ("none");
}
function gotData(incomingData){
    console.log("the incoming data is:" , incomingData)
    //Grouping
    let datagroups = viz.selectAll(".dataGroup").data(incomingData).enter().append("g")
                                                        .attr("class","dataGroup")
                                                        .attr("width", 50)
                                                        .attr("height",50)
                                                        
                                                        // .on('mouseover', function (d, i) {
                                                        //     d3.select(this).transition()
                                                        //         .duration('50')
                                                        //         .attr('opacity', '.5');
                                                        //     div.transition()
                                                        //         .duration(50)
                                                        //         .style("opacity", 1);
                                                        //     div.html(cafename)
                                                        //         .style("left", (d3.event.pageX + 10) + "px")
                                                        //         .style("top", (d3.event.pageY - 15) + "px");
                                                        // })
                                                        // .on('mouseout', function (d, i) {
                                                        //         d3.select(this).transition()
                                                        //             .duration('50')
                                                        //             .attr('opacity', '1')
                                                        //         div.transition()
                                                        //             .duration('50')
                                                        //             .style("opacity", 0);
                                                        //         });
    ;

    //AROMA
    let aromas = datagroups.append("g").attr("class","aromaPaths").attr("transform",getAromaPosition);
    aromas.append("path")
            .attr("d","M-7,-15 Q3,-6 -7,-4  T-7,5")
            .attr("stroke",getAroma1)
            .attr("fill","none")
            .attr("stroke-width",2)
    ;
    aromas.append("path")
            .attr("d","M0,-15 Q10,-6 0,-4  T0,5")
            .attr("stroke",getAroma2)
            .attr("fill","none")
            .attr("stroke-width",2)
    ;
    aromas.append("path")
            .attr("d","M7,-15 Q17,-6 7,-4  T7,5")
            .attr("stroke",getAroma3)
            .attr("fill","none")
            .attr("stroke-width",2)
    ;


    //BEANS
    //Referenced http://bl.ocks.org/jessihamel/9648495 for using custom svgs
    let bean = datagroups.append("g")
                .attr("class","beanSVG")
                .attr("alignment-baseline","baseline")
                .attr("x",0)
                .attr("y",0)
                .style("display","block")
                .style("margin","auto")
                .attr("fill",getColor)
                .attr("transform",getSize)
    ;
    bean.append("g").attr("transform","scale(0.1) translate(-250,0)")
            .append("g")
                .append("path")
                    .attr("d","M309.426,419.204c0-81.04-31.684-120.468-65.224-162.212c-32.436-40.368-65.968-82.092-65.968-164.304c0-29.456,4.164-54.984,12.828-78.848c-78.608,34.504-135.28,129.908-135.28,241.992c0,141.072,89.744,255.832,200.048,255.832c13.532,0,26.744-1.748,39.524-5.032c-0.5-2.22-0.388-4.608,0.484-6.896C304.982,475.656,309.426,449.316,309.426,419.204z");
    bean.append("g").attr("transform","scale(0.1) translate(-250,0)")
            .append("g")
                .append("path")
                    .attr("d","M255.83,0c-11.832,0-23.408,1.4-34.68,3.928c-0.124,0.328-0.208,0.664-0.364,0.988c-12.656,26.08-18.552,53.968-18.552,87.768c0,73.764,28.112,108.752,60.664,149.256c33.064,41.148,70.528,87.772,70.528,177.256c0,28.572-3.724,54.196-11.304,77.964c77.816-35.064,133.76-129.976,133.76-241.336C455.886,114.764,366.142,0,255.83,0z");    
    // bean.attr("viewBox", "0 0 500 500");

    //SPECIALS
    datagroups.append("text")
                .text(getSpecial)
                .attr("text-anchor", "end") 
                .attr("x",25)
                .attr("font-weight","bolder")
                .attr("font-size","large")
                .attr("dominant-baseline", "central") 
                .attr("fill","brown")
    ;

    datagroups.append("text")
                .text(getText)
                .attr("x",0)
                .attr("width",20)
                .style("text-wrap","wrap")
                .attr("font-size","xx-small")
                .attr("y",75)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central") 
    datagroups.attr("transform",(d,i)=>{
        let x=(i%7 * 100)+ 50;
        let y=(Math.floor(i/7)*110)+70;
        return "translate(" + x + "," + y + ")"
    });

}


d3.json("data.json").then(gotData)

// KEY - BEAN SIZE
function getSizeText(d,i){
    let sizes = ["tiny","smol","med","large"]
    return sizes[i]
}
let keyBeanSizeContainer =  keyBeanSize.append("g");

let sizebean = keyBeanSizeContainer.selectAll(".sizes").data(d3.range(4)).enter().append("g").attr("class","sizes");
let sizebeanContainer = sizebean.append("g").attr("x",0)
        .attr("y",0)
        .style("display","block")
        .style("margin","auto")
        .attr("fill","#D7C38E")
        .attr("transform", (d,i)=>{
            let sizes = [0.3,0.5,0.8,1]
            let x= [10,50,100,160]
            let y= [35,25,10,0]
            return "translate(" +  x[i] + "," + y[i] + ") scale(" + sizes[i] +") "
        })
;
sizebeanContainer.append("g").attr("transform",("scale(0.1) translate(-250,0)"))
.append("g")
    .append("path")
        .attr("d","M309.426,419.204c0-81.04-31.684-120.468-65.224-162.212c-32.436-40.368-65.968-82.092-65.968-164.304c0-29.456,4.164-54.984,12.828-78.848c-78.608,34.504-135.28,129.908-135.28,241.992c0,141.072,89.744,255.832,200.048,255.832c13.532,0,26.744-1.748,39.524-5.032c-0.5-2.22-0.388-4.608,0.484-6.896C304.982,475.656,309.426,449.316,309.426,419.204z");
sizebeanContainer.append("g").attr("transform","scale(0.1) translate(-250,0)")
.append("g")
    .append("path")
        .attr("d","M255.83,0c-11.832,0-23.408,1.4-34.68,3.928c-0.124,0.328-0.208,0.664-0.364,0.988c-12.656,26.08-18.552,53.968-18.552,87.768c0,73.764,28.112,108.752,60.664,149.256c33.064,41.148,70.528,87.772,70.528,177.256c0,28.572-3.724,54.196-11.304,77.964c77.816-35.064,133.76-129.976,133.76-241.336C455.886,114.764,366.142,0,255.83,0z");    
sizebean.append("text").text(getSizeText).attr("x",0)
.attr("width",20)
.style("text-wrap","wrap")
.attr("font-size","small")
.attr("y",0)
.attr("transform",(d,i)=>{
    let x= [10,50,100,160]
    return "translate(" + x[i] + ",60)"
})
.attr("text-anchor", "middle")
.attr("dominant-baseline", "central") 

// KEY - BEAN COLOR
function getKeyBeanColor(d,i){
    let colors = ["#D7C38E","#D7AA66","#CF7C48","#B56A40","#382E2D","#794E3B"];
    return colors[i]
}
function getKeyBeanDistrict(d,i){
    let districts = ["Changgning", "Huangpu","Jingan","Pudong","Putuo","Xuhui"]
    return districts[i]
}
let keyBeanColorContainer =  keyBeanColor.append("g");

let colorbean = keyBeanColorContainer.selectAll(".colors").data(d3.range(6)).enter().append("g").attr("class","colors");
let colorbeanContainer = colorbean.append("g").attr("x",0)
        .attr("y",0)
        .style("display","block")
        .style("margin","auto")
        .attr("fill",getKeyBeanColor)
        .attr("transform", (d,i)=>{
            let x= 30+(60*i)
            let y= 0
            return "translate(" +  x + "," + y + ")" 
        })
;
colorbeanContainer.append("g").attr("transform",("scale(0.08) translate(-250,0)"))
.append("g")
    .append("path")
        .attr("d","M309.426,419.204c0-81.04-31.684-120.468-65.224-162.212c-32.436-40.368-65.968-82.092-65.968-164.304c0-29.456,4.164-54.984,12.828-78.848c-78.608,34.504-135.28,129.908-135.28,241.992c0,141.072,89.744,255.832,200.048,255.832c13.532,0,26.744-1.748,39.524-5.032c-0.5-2.22-0.388-4.608,0.484-6.896C304.982,475.656,309.426,449.316,309.426,419.204z");
colorbeanContainer.append("g").attr("transform","scale(0.08) translate(-250,0)")
.append("g")
    .append("path")
        .attr("d","M255.83,0c-11.832,0-23.408,1.4-34.68,3.928c-0.124,0.328-0.208,0.664-0.364,0.988c-12.656,26.08-18.552,53.968-18.552,87.768c0,73.764,28.112,108.752,60.664,149.256c33.064,41.148,70.528,87.772,70.528,177.256c0,28.572-3.724,54.196-11.304,77.964c77.816-35.064,133.76-129.976,133.76-241.336C455.886,114.764,366.142,0,255.83,0z");    
colorbeanContainer.append("text").text(getKeyBeanDistrict).attr("x",0)
    .attr("width",20)
    .style("text-wrap","wrap")
    .attr("font-size","small")
    .attr("y",0)
    .attr("fill","black")
    .attr("transform","translate(0,60)")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
; 

// KEY - BEAN AROMA
function getKeyBeanAromas(d,i){
    let aromas=["no","meh","yes"]
    return aromas[i]
}
let keyBeanAromaContainer =  keyBeanAroma.append("g");
let aromabean = keyBeanAromaContainer.selectAll(".aromas").data(d3.range(3)).enter().append("g").attr("class","aromas");
let aromabeanContainer = aromabean.append("g").attr("x",0)
        .attr("y",0)
        .style("display","block")
        .style("margin","auto")
        .attr("transform", (d,i)=>{
            let x= 20+(60*i)
            let y= 30
            return "translate(" +  x + "," + y + ")" 
        })
;
aromabeanContainer.append("path")
    .attr("d","M-7,-15 Q3,-6 -7,-4  T-7,5")
    .attr("stroke",(d,i)=>{
        let firstAroma = ["none","none","brown"]
        return firstAroma[i]
    })
    .attr("fill","none")
    .attr("stroke-width",2)
;
aromabeanContainer.append("path")
    .attr("d","M0,-15 Q10,-6 0,-4  T0,5")
    .attr("stroke",(d,i)=>{
        let secondAroma = ["none","brown","none"]
        return secondAroma[i]
    })
    .attr("fill","none")
    .attr("stroke-width",2)
;
aromabeanContainer.append("path")
    .attr("d","M7,-15 Q17,-6 7,-4  T7,5")
    .attr("stroke",(d,i)=>{
        let thirdAroma = ["none","none","brown"]
        return thirdAroma[i]
    })
    .attr("fill","none")
    .attr("stroke-width",2)
;
aromabeanContainer.append("text").text(getKeyBeanAromas).attr("x",0)
    .attr("width",20)
    .style("text-wrap","wrap")
    .attr("font-size","small")
    .attr("y",0)
    .attr("fill","black")
    .attr("transform","translate(0,20)")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
; 

function showKey(){
  var key = document.getElementById("key");
  key.classList.toggle("show");
}
document.getElementById("back").addEventListener("click",()=>{
    window.location.href = 'https://www.cindygli.com'
})