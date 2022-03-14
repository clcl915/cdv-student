// import { getColor, getPath } from './back-script.js';
// console.log( getColor() );
let w = 2400; //front back 1200
let h = 800;
let leafPaths=["M1.69,0V-11.91A10.83,10.83,0,0,0,5.6-11c6.4-.42,8.83-3.73,9.19-8.55.12-.95-9.38.45-9.37-.15s9.38-4.72,9.2-5.74a27,27,0,0,0-1.32-4.75c-.2-.55-7.77,3.94-8,3.37C5-27.59,12-33.41,11.55-34.19A53.48,53.48,0,0,0,8.81-39c-.3-.48-6.14,5.56-6.47,5.07S7-41.72,6.52-42.38C4.77-44.83,2.72-47.44.3-50.25l-.22-.26-.23.26C-2-48.11-3.63-46.07-5.08-44.14c-.36.48,3.1,6.54,2.76,7s-4.48-4.64-4.79-4.18A61,61,0,0,0-11-34.93c-.32.61,7.6,7.66,7.33,8.25-.42.88-9-4.72-9.33-3.89a22.35,22.35,0,0,0-1.62,11c0,.53,10.71-.08,10.68.45S-14.21-17-14-16.52c1.09,3.13,3.66,5.18,8.6,5.5a10.83,10.83,0,0,0,3.91-.89V0H2.28","M9.88-26.79c2.35-.59,6.44-2.69,11-2.35.42,13.4-6.29,19.65-18.88,20V0H-1.76V-9.14c-7.92.08-21-3.38-19-19.92,3-.56,7.66,2,10.53,2.25A49.21,49.21,0,0,1,0-49.46C5.25-43.24,9.62-34.24,9.88-26.79Z","M1.74,0h-2l.09-9.36c-4.06.06-16.06-13.27-14.43-18.21.38-1.16,5.47,4.2,5.82,3.79.81-1-3.65-11.26-2.57-11.37.64-.64,3.33,3.3,4,2.94s-.86-8.08,0-9,2.93,2.6,3.6,2.68c1.57.18,2-10,3.85-12.11l.23-.25.23.25c1.74,1,3.85,10.21,4.22,13.45.09.8,2.39-3.59,3.06-3.24.94.5-.19,8.16.09,8.2,1.76.25,3-4.33,4-2.89,1.28,2-3.25,10.89-1.87,11,.62.06,3.65-4,4.49-2.8C17.08-23,3.78-8.74,1.71-9.34Z","M-4.78-49.53c-2.83,1.41-.38,10,2.84,18,.19.42-.22.5-.49.36-3.24-1.6-9.3-12.65-11.17-7.75C-15.86-33-1.25-27.76-1.75-26.39c.07.93.73,8.82.75,9.75-.22.87-4.81-10.39-8.5-8.09C-12.95-22.59-.09-9.56-.71-9.49V.18L1.41.2l.07-8.73C1-8.35,18.55-19,12.21-24c-3-1.51-10.63,9.89-10.63,9.89,0-.47.29-12.74.29-12.74C4-28.62,16.49-39.9,9.06-43.41c-5.15-2.44-5.89,8.37-7.43,12a.26.26,0,0,1-.5-.12C1.42-42.83-.8-50.92-4.78-49.53Z","M-1-.31H.18C.59-6.91,1.66-14.16,5.5-17.39c4.79-4.71,13.29-5.16,13.44-9.22,0-1.46-.79-2.21-1.54-3.35C16-32,8.6-38,6.25-38a1.11,1.11,0,0,0-.5.12c-1.86.91-4.34,3.53-4.56,6-.48,5.3-2.13,3.3-2.4-.29-.18-2.38-1.17-5.18-2.78-6A1.2,1.2,0,0,0-5.12-38c-2.43,1.43-10.83,3.14-13.34,7.21a4.24,4.24,0,0,0,0,4.4A37.63,37.63,0,0,0-6.66-16.31c4.93,2.56,4.54,12.25,4.54,16Z","M1.61,0V-11.91A10.89,10.89,0,0,0,5.52-11c6.41-.42,8.84-3.73,9.19-8.55C15.64-26.67,12.47-36,.23-50.25L0-50.51l-.23.26C-12.47-36-15.64-26.67-14.71-19.57c.35,4.82,2.78,8.13,9.19,8.55a10.89,10.89,0,0,0,3.91-.89V0H2.2"]

let viz = d3.select("#container")
  .append("svg")
    .attr("class", "viz")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "#07573a")
;
function transformData(dataToBeTransformed){
    let groupedData = d3.group(dataToBeTransformed, function(datapoint){
        return datapoint.typeOfInteraction;
    })
    console.log(groupedData)
    let normalArrayVersion = Array.from(groupedData);
    console.log("normalArrayV",normalArrayVersion);
    return normalArrayVersion

}
function getTypeData(d, i){
    return d[1]
}
function createPosPoints(a,rangeX,step){
    return Array.apply(null,Array((rangeX[1]-rangeX[0])/step|0 + 1))
    .map(function(d,i){
			var x = rangeX[0]+i*step;
            var xSqrt = Math.sqrt(x);
			return [x,a*xSqrt];
    })
}
function createNegPoints(a,rangeX,step){
    return Array.apply(null,Array((rangeX[1]-rangeX[0])/step|0 + 1))
    .map(function(d,i){
			var x = rangeX[0]+i*step;
            var xSqrt = Math.sqrt(Math.abs(x));
			return [x,a*xSqrt];
    })
}
function createStraightLine(rangeX,step){
    return Array.apply(null,Array((rangeX[1]-rangeX[0])/step|0 + 1))
    .map(function(d,i){
			var x = rangeX[0]+i*step;
			return [0,x];
    })
}

function gotData(incomingData){
    console.log("the incoming data is:" , incomingData);
    let transformedData = transformData(incomingData);
    console.log("transformedData", transformedData)
    transformedData = transformedData.sort((x,y)=>{
        return d3.descending(x[1].length,y[1].length)
    });
    let maxDuration = d3.max(incomingData, (d,i)=>{return d.durationInSeconds;}); 
    // console.log("maxD",maxDuration);
    let scaleFactor = d3.scaleLinear().domain([0,maxDuration]).range([0.7,3]);

    let base = viz.append("g")
        .attr("transform","translate(" + w/2+","+ h+")")
        .attr("x",w/2)
        .attr("y",h)
    ;
    let branchGroup = base.selectAll(".branchGroup").data(transformedData).enter()
            .append("g")
            .attr("class","branchGroup")
            // .attr("transform","translate(0,100) scale(1,-1)")
            .attr("transform",(d,i)=>{
                let translateLR=[50,-50,30,-30,20,-20,10,-10,0];
                return "translate("+translateLR[i]+",0) scale(1,-1)"
            })
    ;
    let branches = branchGroup.append("path")
                    .attr("class","branches")
                    .attr("stroke-width","3")
                    // .attr("stroke","#f1fff7")
                    .attr("stroke",(d,i)=>{
                        console.log(d[1]);
                        return getColor(d[1][0]);
                    })
                    .attr("fill","transparent")
                    .attr("d",(d,i)=>{
                        if (i%2 == 0){
                            if (i>0){
                                var points = createPosPoints(10*(i),[0,1400],0.5);
                            }
                            else{
                                var points = createPosPoints(10,[0,1400],0.5);
                            }
                            return "M"+points.slice(0,Math.max(1,points.length|0)).join("L");
                        }
                        else{
                            if (i!=1){
                                var points = createNegPoints(10*(i-1),[-1400,0],0.5);
                            }
                            else{
                                var points = createNegPoints(10,[-1400,0],0.5);
                            }
                            return "M"+points.slice(0,Math.max(1,points.length|0)).join("L");
                        }
                        // before change to data
                        // if (i != transformedData.length-1){}
                        // else{
                        //     var points = createStraightLine([0,1400],0.5);
                        //     return "M"+points.slice(0,Math.max(1,points.length|0)).join("L");
                        // }
                    })
    ;
    let leaves = branchGroup.selectAll(".branchleaf").data(getTypeData).enter().append("path")
            .attr("class","branchleaf")
            .attr("stroke-width","2")
            .attr("stroke",(d,i)=>{
                return getColor(d);
            })
            .attr("fill",(d,i)=>{
                return getColor(d);
            })
            .attr("transform", (d,i,j)=>{
                let scaleF = scaleFactor(d.durationInSeconds);
                let parentIndex= Array.prototype.indexOf.call(d3.select(j[i]).node().parentNode.parentNode.children, d3.select(j[i]).node().parentNode);
                let x,y,rotateFactor;
                if (parentIndex%2 == 0){
                    x=((i+1)*(70-parentIndex*5));
                    let xSqrt = Math.sqrt(x);
                    // console.log(xSqrt);
                    if (parentIndex!=0){
                        y=(10*parentIndex)*xSqrt;
                        rotateFactor = 10+5*parentIndex;
                    }
                    else{
                        // y=10*xSqrt-3;
                        y= (i%2==0) ? 10*xSqrt+0.5:10*xSqrt-1; 
                        rotateFactor= (i%2==0) ? -10:40; 
                    }
                    // scaleF = (i%2==0) ? -0.9:0.9; 
                    scaleF = (i%2==0) ? -scaleF : scaleF; 
                    // console.log(x,y,scaleF,rotateFactor);
                }
                else{
                    x=-((i+1)* (70-(parentIndex-1)*5));
                    // console.log(x)
                    let xSqrt = Math.sqrt(Math.abs(x));
                    if (parentIndex!=1){
                        y=(10*(parentIndex-1))*xSqrt;
                        rotateFactor = -10-5*(parentIndex-1);
                    }
                    else{
                        y= (i%2==0) ? 10*xSqrt+1:10*xSqrt-1; 
                        rotateFactor= (i%2==0) ? 10:-40; 
                    }
                    // scaleF = (i%2==0) ? -0.9:0.9; 
                    scaleF = (i%2==0) ? -scaleF : scaleF; 
                    // console.log(x,y,scaleF,rotateFactor);
                }
                // if (parentIndex != transformedData.length-1){}
                // else{
                //     x=0;
                //     y=600+i*100;
                //     rotateFactor= (i%2==0) ? -70:70; 
                //     scaleF = (i%2==0) ? -scaleF : scaleF; 
                // }
                return "translate(" +  x + "," + y + ") scale(" + scaleF + ") rotate(" + rotateFactor+")";

            })
            .attr("d",(d,i)=>{
                return getPath(d);
            })
    ;
    let innerleaves = branchGroup.selectAll(".innerleaves").data(getTypeData).enter().append("g")
        .attr("class","innerleaves")    
        .style("fill", "#07573a") 
        .html(getInner)
        .attr("transform",(d,i,j)=>{
            // console.log(d);
            // return "scale(-1,1)";
            // return "scale(" + scaleFactor(d.durationInSeconds)+ ")"
            let scaleF = scaleFactor(d.durationInSeconds);
            // console.log(d.durationInSeconds,scaleF)
            let parentIndex= Array.prototype.indexOf.call(d3.select(j[i]).node().parentNode.parentNode.children, d3.select(j[i]).node().parentNode);
            let x,y,rotateFactor,flipX;
            if (parentIndex%2 == 0){
                x=((i+1)* (70-parentIndex*5));
                let xSqrt = Math.sqrt(x);
                // console.log(xSqrt);
                if (parentIndex!=0){
                    y=(10*parentIndex)*xSqrt;
                    rotateFactor = 5*parentIndex+10;
                }
                else{
                    // y=10*xSqrt-3;
                    y= (i%2==0) ? 10*xSqrt+2:10*xSqrt-2; 
                    rotateFactor= (i%2==0) ? -10:40; 
                }
                scaleF = (i%2==0) ? -scaleF : scaleF; 
                // flipX = (i%2==0) ? '' : "scale(1,-1)"; 
                // console.log(x,y,rotateFactor,"evenodd",scaleF);
            }
            else{
                x=-((i+1)*(70-(parentIndex-1)*5));
                // console.log(x)
                let xSqrt = Math.sqrt(Math.abs(x));
                if (parentIndex!=1){
                    y=(10*(parentIndex-1))*xSqrt;
                    rotateFactor = -10-5*(parentIndex-1);
                }
                else{
                    y= (i%2==0) ? 10*xSqrt+2:10*xSqrt-2; 
                    rotateFactor= (i%2==0) ? 10:-40; 
                }
                scaleF = (i%2==0) ?-scaleF:scaleF; 
                // flipX = (i%2==0) ? "" : "scale(1,-1)"; 
                // console.log(x,y,rotateFactor,"evenodd",scaleF);
            }
            // if (parentIndex != transformedData.length-1){}
            // else{
            //     x=0;
            //     y=600+i*100;
            //     rotateFactor= (i%2==0) ? -70:70; 
            //     scaleF = (i%2==0) ? -scaleF : scaleF; 
            // }
            return "translate(" +  x + "," + y + ")" + " scale("+scaleF+") rotate("+rotateFactor+")"

        })

        let key = base.append("g").attr("class","key").attr("transform","translate("+w/2.5+","+ 0+")");
        let keyBG = key.append("path")
        .attr("d","M1.69,0V-11.91A10.83,10.83,0,0,0,5.6-11c6.4-.42,8.83-3.73,9.19-8.55.12-.95-9.38.45-9.37-.15s9.38-4.72,9.2-5.74a27,27,0,0,0-1.32-4.75c-.2-.55-7.77,3.94-8,3.37C5-27.59,12-33.41,11.55-34.19A53.48,53.48,0,0,0,8.81-39c-.3-.48-6.14,5.56-6.47,5.07S7-41.72,6.52-42.38C4.77-44.83,2.72-47.44.3-50.25l-.22-.26-.23.26C-2-48.11-3.63-46.07-5.08-44.14c-.36.48,3.1,6.54,2.76,7s-4.48-4.64-4.79-4.18A61,61,0,0,0-11-34.93c-.32.61,7.6,7.66,7.33,8.25-.42.88-9-4.72-9.33-3.89a22.35,22.35,0,0,0-1.62,11c0,.53,10.71-.08,10.68.45S-14.21-17-14-16.52c1.09,3.13,3.66,5.18,8.6,5.5a10.83,10.83,0,0,0,3.91-.89V0H2.28")
        .attr("fill","white")
        .attr("x",0)
        .attr("y",0)
        .attr("transform","translate("+0+","+ h/2.5+")"+ "scale(20) rotate(15)")
        .attr("opacity","0.05")
        ;  
        let keyText = key.append("g")
                .attr("class","keyText")
                .attr("transform","translate("+100+","+ -230+")")
        ;
        keyText.append("text")
            .text("KEY")
            .attr("fill","white")
            .style("text-wrap","wrap")
            .attr("font-size","small")
            .attr("transform","translate("+-60+","+ 0+")")
            .style("opacity",1)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central") 
        ; 
        let colorG = keyText.append("g")
                    .attr("class","colorG")
                    .attr("transform","translate("+-240+","+ 30+")")
                    .attr("width","30")
        ;
        let eachColor = colorG.selectAll(".colors").data(keyColors).enter().append("g");
        eachColor.append("circle")
                .attr("cx",(d,i)=>{
                    return i*50
                })
                .attr("cy",0)
                .attr("r",8)
                .attr("fill",(d,i)=>{
                    return d.color
                })
        ;
        eachColor.append("g")
                    .attr("transform",(d,i)=>{
                        return "translate("+i*50+","+ 0+")"
                    })
                        .append("text")
                            .attr("y",20)
                            .attr("x",(d,i)=>{
                                return i*50
                            })
                            .attr("text-anchor", "middle")
                            .each(function(d) {
                                var arr = d.type.split(" ");
                                d3.select(this).selectAll(null)
                                .data(arr)
                                .enter()
                                .append("tspan")
                                .attr("x",0)
                                .attr("text-anchor", "middle")
                                .attr("dy", function(d, i) {
                                    return "1.2em"
                                })
                                .text(String)
                            })

                            .attr("font-size","x-small")
        ;
        let keypaths = keyText.append("g")
            .attr("class","keyPaths")
            .attr("transform","translate("+-240+","+ 120+")")
            .attr("width","30")
        ;
        let eachPath= keypaths.selectAll(".keypaths").data(keyPaths).enter().append("g").attr("transform",(d,i)=>{
            return "translate("+i*70+","+ 0+")"
        });
        eachPath.append("path")
                    .attr("d",(d,i)=>{
                        return d.path;
                    })
                    .attr("transform","scale(0.3)")
                    .attr("fill","white")
        ;
        eachPath.append("text")
                    .attr("y",10)
                    .attr("x",0)
                    .attr("text-anchor", "middle")
                    .attr("font-size","x-small")
                    .text((d,i)=>{
                        return d.who
                    })
        ;
        let keyinners = keyText.append("g")
            .attr("class","keyinners")
            .attr("transform","translate("+-240+","+ 170+")")
            .attr("width","30")
        ;
        let eachInner= keyinners.selectAll(".keyinners").data(keyInners).enter().append("g")
                .attr("transform",(d,i)=>{
                    return "translate("+i*70+","+ 0+")"
                })
        ;
        eachInner.append("g")
                    .attr("fill","white")
                    .attr("transform","scale(0.3)")
                    .html((d,i)=>{
                        return d.path
                    })
        ;
        eachInner.append("text")
                    .attr("y",10)
                    .attr("x",0)
                    .attr("text-anchor", "middle")
                    .attr("font-size","x-small")
                    .text((d,i)=>{
                        return d.reaction
                    })
        ;
        let keysize = keyText.append("g")
                    .attr("class","keysize")
                    .attr("transform","translate("+-50+","+ 210+")")
                    .append("text")
                        .text("size of leaf = duration of interaction in seconds")
                        .attr("text-anchor", "middle")
                        .attr("font-size","x-small")
;            
;

}
d3.json("data.json").then(gotData);

let keyColors = [
    {
        type:"Purchase",
        color : "#55cbcd"
    },
    {
        type: "Deliveries",
        color:"#ff968a"
    },
    {
        type: "Health Code",
        color:"#b6cfb6"
    },    
    {
        type: "I needed something",
        color:"#f3b0c3"
    },
    {
        type: "Security Check",
        color:"#68b6ef"
    },
    {
        type: "Hand outs",
        color:"#7f65ce"
    },
    {
        type: "They needed something",
        color:"#af777e"
    },
    { 
        type: "Confirmation",
        color:"#ffeeba"}  
    ];
let keyPaths = [
    {
        who:"Staff Worker",
        path : "M1.69,0V-11.91A10.83,10.83,0,0,0,5.6-11c6.4-.42,8.83-3.73,9.19-8.55.12-.95-9.38.45-9.37-.15s9.38-4.72,9.2-5.74a27,27,0,0,0-1.32-4.75c-.2-.55-7.77,3.94-8,3.37C5-27.59,12-33.41,11.55-34.19A53.48,53.48,0,0,0,8.81-39c-.3-.48-6.14,5.56-6.47,5.07S7-41.72,6.52-42.38C4.77-44.83,2.72-47.44.3-50.25l-.22-.26-.23.26C-2-48.11-3.63-46.07-5.08-44.14c-.36.48,3.1,6.54,2.76,7s-4.48-4.64-4.79-4.18A61,61,0,0,0-11-34.93c-.32.61,7.6,7.66,7.33,8.25-.42.88-9-4.72-9.33-3.89a22.35,22.35,0,0,0-1.62,11c0,.53,10.71-.08,10.68.45S-14.21-17-14-16.52c1.09,3.13,3.66,5.18,8.6,5.5a10.83,10.83,0,0,0,3.91-.89V0H2.28"
    },
    {
        who: "Security Guard",
        path:"M9.88-26.79c2.35-.59,6.44-2.69,11-2.35.42,13.4-6.29,19.65-18.88,20V0H-1.76V-9.14c-7.92.08-21-3.38-19-19.92,3-.56,7.66,2,10.53,2.25A49.21,49.21,0,0,1,0-49.46C5.25-43.24,9.62-34.24,9.88-26.79Z"
    },
    {
        who: "Delivery Driver",
        path:"M1.74,0h-2l.09-9.36c-4.06.06-16.06-13.27-14.43-18.21.38-1.16,5.47,4.2,5.82,3.79.81-1-3.65-11.26-2.57-11.37.64-.64,3.33,3.3,4,2.94s-.86-8.08,0-9,2.93,2.6,3.6,2.68c1.57.18,2-10,3.85-12.11l.23-.25.23.25c1.74,1,3.85,10.21,4.22,13.45.09.8,2.39-3.59,3.06-3.24.94.5-.19,8.16.09,8.2,1.76.25,3-4.33,4-2.89,1.28,2-3.25,10.89-1.87,11,.62.06,3.65-4,4.49-2.8C17.08-23,3.78-8.74,1.71-9.34Z"
    },    
    {
        who: "Receptionist",
        path:"M-4.78-49.53c-2.83,1.41-.38,10,2.84,18,.19.42-.22.5-.49.36-3.24-1.6-9.3-12.65-11.17-7.75C-15.86-33-1.25-27.76-1.75-26.39c.07.93.73,8.82.75,9.75-.22.87-4.81-10.39-8.5-8.09C-12.95-22.59-.09-9.56-.71-9.49V.18L1.41.2l.07-8.73C1-8.35,18.55-19,12.21-24c-3-1.51-10.63,9.89-10.63,9.89,0-.47.29-12.74.29-12.74C4-28.62,16.49-39.9,9.06-43.41c-5.15-2.44-5.89,8.37-7.43,12a.26.26,0,0,1-.5-.12C1.42-42.83-.8-50.92-4.78-49.53Z"

    },
    {
        who:  "Random Person",
        path:"M-1-.31H.18C.59-6.91,1.66-14.16,5.5-17.39c4.79-4.71,13.29-5.16,13.44-9.22,0-1.46-.79-2.21-1.54-3.35C16-32,8.6-38,6.25-38a1.11,1.11,0,0,0-.5.12c-1.86.91-4.34,3.53-4.56,6-.48,5.3-2.13,3.3-2.4-.29-.18-2.38-1.17-5.18-2.78-6A1.2,1.2,0,0,0-5.12-38c-2.43,1.43-10.83,3.14-13.34,7.21a4.24,4.24,0,0,0,0,4.4A37.63,37.63,0,0,0-6.66-16.31c4.93,2.56,4.54,12.25,4.54,16Z"

    },
    {
        who: "Driver",
        path:"M1.61,0V-11.91A10.89,10.89,0,0,0,5.52-11c6.41-.42,8.84-3.73,9.19-8.55C15.64-26.67,12.47-36,.23-50.25L0-50.51l-.23.26C-12.47-36-15.64-26.67-14.71-19.57c.35,4.82,2.78,8.13,9.19,8.55a10.89,10.89,0,0,0,3.91-.89V0H2.2"
    }
];
let keyInners = [
    {
        reaction:"Hurry hurry",
        path :`  <path class="cls-1" d="M19.25-53.5v-2.3C16.16-56.37,4.41-50.26.74-47.08v-3.33H-.74v3.33c-3.67-3.18-15.42-9.2-18.51-8.63v2.3C-16.16-54-4.41-48-.74-44.79v2C-4.41-46-16.16-52-19.25-51.44v2.2c3.09-.57,14.84,5.44,18.51,8.62v2.09c-3.67-3.19-15.42-9.2-18.51-8.63v2.42c3.09-.57,14.84,5.44,18.51,8.63v2c-3.67-3.18-15.42-9.19-18.51-8.63v2.26C-16.16-41.06-4.41-35-.74-31.86v1.5C-4.41-33.54-16.16-39.55-19.25-39v2c3.09-.57,14.84,5.45,18.51,8.63v1.74c-3.67-3.18-15.42-9.19-18.51-8.62v1.82C-16.16-34-4.41-28-.74-24.81V-23c-3.67-3.19-15.42-9.2-18.51-8.63v1.86c3.09-.57,14.84,5.45,18.51,8.63v2.24c-3.67-3.18-15.42-9.19-18.51-8.62v1.82c3.09-.57,14.84,5.44,18.51,8.62v1.92c-3.67-3.19-15.42-8.71-18.51-8.15v1.72c3.09-.57,14.84,5.44,18.51,8.63v2.14C-4.41-14-16.16-20-19.25-19.42v1.72c3.09-.57,14.84,5.44,18.51,8.62V0H.74V-9.08c3.67-3.18,15.42-9.28,18.51-8.71v-1.72C16.16-20.08,4.41-14,.74-10.8v-2.14c3.67-3.19,15.42-9.29,18.51-8.72v-1.72C16.16-23.94,4.41-17.84.74-14.66v-2.4c3.67-3.18,15.42-9.28,18.51-8.71v-1.82C16.16-28.16,4.41-22.06.74-18.88v-2.24c3.67-3.18,15.42-9.29,18.51-8.72V-31.7C16.16-32.27,4.41-26.17.74-23v-1.83C4.41-28,16.16-34.09,19.25-33.53v-1.81C16.16-35.91,4.41-29.81.74-26.63v-1.74c3.67-3.18,15.42-9.29,18.51-8.72v-2C16.16-39.64,4.41-33.54.74-30.36v-1.5C4.41-35,16.16-41.15,19.25-40.58v-2.26C16.16-43.4,4.41-37.3.74-34.12v-2c3.67-3.19,15.42-9.29,18.51-8.72v-2.42C16.16-47.82,4.41-41.72.74-38.53v-2.09c3.67-3.18,15.42-9.28,18.51-8.71v-2.2C16.16-52.1,4.41-46,.74-42.82v-2C4.41-48,16.16-54.07,19.25-53.5Z"/>`
    },
    {
        reaction:"I felt bad",
        path:` <path class="cls-1" d="M-9.3-33.23c2.58,0,2.32-3.68,0-3.68A1.84,1.84,0,1,0-9.3-33.23Z" />
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
    },
    {
        reaction: "Pleasant",
        path:`<path class="cls-1" d="M18.21-47.07l-.72-.71a.3.3,0,0,0-.41,0L1.33-32a.3.3,0,0,1-.51-.2V-50.12a.29.29,0,0,0-.29-.29h-1a.29.29,0,0,0-.29.29v17.89a.29.29,0,0,1-.5.2l-15.81-15.8a.28.28,0,0,0-.41,0l-.72.71a.31.31,0,0,0,0,.42l16.9,16.89a.29.29,0,0,1,0,.42L-18.15-12.55a.29.29,0,0,0,0,.42l.71.71a.28.28,0,0,0,.41,0L-1.27-27.17a.29.29,0,0,1,.5.21V-.29A.29.29,0,0,0-.48,0h1A.29.29,0,0,0,.82-.29V-27a.3.3,0,0,1,.51-.21L17-11.47a.3.3,0,0,0,.41,0l.71-.72a.28.28,0,0,0,0-.41L1.36-29.39a.31.31,0,0,1,0-.42L18.21-46.65A.31.31,0,0,0,18.21-47.07Z"/>`
    },    
    {
        reaction: "Feeling thankful",
        path:`<path class="cls-1" d="M-1.07-1.17v-58a1.08,1.08,0,1,1,2.14,0v58A1.07,1.07,0,1,1-1.07-1.17Z"/>`
    },
    {
        reaction: "Huh?",
        path:`<path class="cls-1" d="M-1.07-73.72V-10.9a1.08,1.08,0,1,0,2.14,0V-73.72C1.07-75.42-1.07-75.44-1.07-73.72Z" />
        <path class="cls-1" d="M-4.46-73.72V-10.9a1.08,1.08,0,1,0,2.13,0V-73.72C-2.33-75.42-4.46-75.44-4.46-73.72Z" />
        <path class="cls-1" d="M-7.86-73.72V-10.9a1.08,1.08,0,1,0,2.13,0V-73.72C-5.73-75.42-7.86-75.44-7.86-73.72Z" />
        <path class="cls-1" d="M2.33-73.72V-10.9a1.08,1.08,0,1,0,2.13,0V-73.72C4.46-75.42,2.33-75.44,2.33-73.72Z" />
        <path class="cls-1" d="M5.73-73.72V-10.9a1.08,1.08,0,1,0,2.13,0V-73.72C7.86-75.42,5.73-75.44,5.73-73.72Z" />
    `
    },
    {
        reaction: "Annoyed",
        path:`  <path class="cls-1" d="M11.73-58.91a1,1,0,0,0-1.24.88L1-11.53V-59.19a1.1,1.1,0,0,0-1-1.17,1.1,1.1,0,0,0-1,1.17v47.66L-10.49-58a1,1,0,0,0-1.24-.88,1.18,1.18,0,0,0-.77,1.41L-1.91-9.6-.33-.81H.29l1.6-8.74L12.5-57.5A1.18,1.18,0,0,0,11.73-58.91Z"/>`
    }
];