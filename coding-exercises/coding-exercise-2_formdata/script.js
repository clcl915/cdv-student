const d = new Date();
let day = d.getDay();

let container = document.getElementById('container');
let graph = document.getElementById('graph');
let toggleButton = document.getElementById("toggleMode");
let title = document.getElementById("title");
let label = document.getElementById("label");
let daysContainer = document.getElementById("days");
let bars = document.querySelectorAll(".bar");
let data = [
    {
        "timestamp": "2022-02-16T07:31:15.994Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-15T17:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-16T01:00:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T18:30:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T04:30:00.000Z"
    },
    {
        "timestamp": "2022-02-16T07:33:21.643Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-15T18:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-16T02:00:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T19:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T03:30:00.000Z"
    },
    {
        "timestamp": "2022-02-16T07:35:46.037Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-15T16:30:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-16T01:00:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T19:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T03:00:00.000Z"
    },
    {
        "timestamp": "2022-02-16T07:49:24.971Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-16T15:30:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-16T01:30:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T17:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T03:00:00.000Z"
    },
    {
        "timestamp": "2022-02-16T07:51:39.127Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-15T19:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-16T00:00:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T21:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T04:30:00.000Z"
    },
    {
        "timestamp": "2022-02-16T08:54:57.996Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-15T17:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-16T01:30:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T19:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T03:00:00.000Z"
    },
    {
        "timestamp": "2022-02-16T09:04:50.070Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-15T17:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-16T01:00:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T18:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T03:00:00.000Z"
    },
    {
        "timestamp": "2022-02-16T09:42:41.453Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-15T16:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-16T00:00:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T18:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T04:00:00.000Z"
    },
    {
        "timestamp": "2022-02-16T10:08:51.344Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-15T18:30:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-16T02:30:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T19:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T04:00:00.000Z"
    },
    {
        "timestamp": "2022-02-16T12:37:12.783Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-16T15:30:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-15T23:30:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-16T03:30:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T00:30:00.000Z"
    },
    {
        "timestamp": "2022-02-16T12:59:16.913Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-16T15:30:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-16T00:15:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T17:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T01:42:00.000Z"
    },
    {
        "timestamp": "2022-02-16T13:07:18.864Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-15T19:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-16T04:00:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T19:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T04:00:00.000Z"
    },
    {
        "timestamp": "2022-02-16T14:21:11.486Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-15T18:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-16T02:00:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T18:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T01:00:00.000Z"
    },
    {
        "timestamp": "2022-02-16T14:33:15.854Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-15T18:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-15T23:30:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T19:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T03:30:00.000Z"
    },
    {
        "timestamp": "2022-02-16T14:58:15.417Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-15T19:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-16T01:45:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T19:30:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T03:00:00.000Z"
    },
    {
        "timestamp": "2022-02-16T15:00:12.794Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-16T15:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-15T23:00:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T18:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T05:00:00.000Z"
    },
    {
        "timestamp": "2022-02-16T15:16:11.789Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-16T06:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-16T00:00:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T18:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T01:00:00.000Z"
    },
    {
        "timestamp": "2022-02-16T15:23:47.040Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-15T17:30:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-16T02:30:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T19:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T02:00:00.000Z"
    },
    {
        "timestamp": "2022-02-16T15:30:35.881Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-15T17:30:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-16T00:30:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T19:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T03:00:00.000Z"
    },
    {
        "timestamp": "2022-02-16T15:36:41.254Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-15T18:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-16T00:00:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T21:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T05:00:00.000Z"
    },
    {
        "timestamp": "2022-02-16T16:05:54.425Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-15T16:40:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-16T01:45:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T18:38:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T02:15:00.000Z"
    },
    {
        "timestamp": "2022-02-16T17:34:33.373Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-15T17:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-16T02:30:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T18:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T03:00:00.000Z"
    },
    {
        "timestamp": "2022-02-16T18:22:30.929Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-16T15:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-16T00:30:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T16:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T01:00:00.000Z"
    },
    {
        "timestamp": "2022-02-16T21:08:07.549Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-16T14:30:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-15T21:00:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-16T15:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-15T22:30:00.000Z"
    },
    {
        "timestamp": "2022-02-16T21:43:49.640Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-15T18:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-16T00:00:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T19:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T03:00:00.000Z"
    },
    {
        "timestamp": "2022-02-16T22:27:57.225Z",
        "whatTimeDoYouUsuallyGoToBedWeekday": "2022-02-15T18:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekday": "2022-02-16T02:00:00.000Z",
        "whatTimeDoYouUsuallyGoToBedWeekends": "2022-02-15T18:00:00.000Z",
        "whatTimeDoYouUsuallyWakeUpWeekends": "2022-02-16T02:00:00.000Z"
    }
]
// console.log(Object.keys(data[ data.length-1])[1]);
// // console.log(new Date(data[0].whatTimeDoYouUsuallyGoToBedWeekday.toUTCString().substring(17,22)));
// console.log(new Date(data[0].whatTimeDoYouUsuallyGoToBedWeekday).toUTCString());
// console.log(new Date(data[0].whatTimeDoYouUsuallyGoToBedWeekday).toLocaleTimeString());
// console.log(new Date(data[0].whatTimeDoYouUsuallyGoToBedWeekday).toLocaleTimeString(navigator.language, {
//     hour: '2-digit',
//     minute:'2-digit'
//   }));
function toLocalTime(data){
    let newData = [];
    let keys = Object.keys(data[ data.length-1 ]);

    for(let i = 0; i < keys.length; i++){
        let key = keys[i];
        let convertedTimes=[];
        for(let j = 0; j < data.length; j++){
            let datum = data[j];
            // console.log(datum[key])
            if(key in datum){
                let newTime = (new Date(datum[key]).toLocaleTimeString(navigator.language, {
                    hour: '2-digit',
                    minute:'2-digit'
                  }));
                if (convertedTimes.find(convertedTimes => convertedTimes.time === newTime)){
                    // console.log("it has");
                    convertedTimes.find(convertedTimes => convertedTimes.time === newTime).num++;
                }
                else{
                    let newConvertedTimeData = {"time":newTime,"num":1};
                    convertedTimes.push(newConvertedTimeData);
                }
            }
        }
        console.log(convertedTimes);
        convertedTimes.sort(function (a, b) {
            return a.time.localeCompare(b.time);
        });
        console.log(convertedTimes);
        let newDataPoint = {"name": key, "times": convertedTimes};
        newData.push(newDataPoint);
    }
    return newData;
}
console.log(toLocalTime(data));
let convertedData = toLocalTime(data);

// for(let i = 0; i < convertedData.length; i++){
//     let datapoint = convertedData[i];
//     let time = datapoint.name;
//     // let average = datapoint.average;
  
//     let bar = document.createElement("div");
//     bar.className = "bar";
//     bar.style.width = 30 + "px";
//     let barname = document.createElement("p");
//     barname.innerHTML = time;
//     bar.appendChild(barname);
//     container.appendChild(bar);
// }

function showGraph(index){
    graph.innerHTML = "";
    label.innerHTML = convertedData[index].name;
    for(let i = 0; i < convertedData[index].times.length; i++){
        let time = convertedData[index].times[i].time;
        let barContainer = document.createElement("div");
        let bar = document.createElement("div");
        bar.className = "bar";
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        let barname = document.createElement("p");
        barname.innerHTML = convertedData[index].times[i].time;
        let barnum = document.createElement("p");
        barnum.innerHTML = convertedData[index].times[i].num;
        bar.appendChild(barname);
        if (isMobile) {
            bar.style.width = (convertedData[index].times[i].num * 30) + "px";
            barContainer.appendChild(bar);
            barContainer.appendChild(barnum);
        }
        else{
            bar.style.height = (convertedData[index].times[i].num * 30) + "px";
            barContainer.appendChild(barnum);
            barContainer.appendChild(bar);
        }
        
        graph.appendChild(barContainer);
    }
}

toggleButton.addEventListener("click",toggleDayNight);

for (var item of document.querySelectorAll("#days span")) {
    item.addEventListener("click", function (evt) {
        daysContainer.children[day].classList.remove("today");
        daysContainer.children[day].classList.remove("todayNight");
        day = Array.prototype.indexOf.call(daysContainer.children, this);
        this.classList.add("today");
        if (day > 0 && day <6){
            if (container.className == "sleepTime"){
                daysContainer.children[day].classList.toggle("todayNight");
                console.log("showing graph 1");
                showGraph(1)
            }
            else{
                console.log("showing graph 2");
                showGraph(2)
            }
        }
        else {
            if (container.className == "sleepTime"){
                daysContainer.children[day].classList.toggle("todayNight");
                console.log("showing graph 3");
                showGraph(3)
            }
            else{
                console.log("showing graph 4");
                showGraph(4)
            }
        }
    }, false);
};

// default settings
function highlightToday(){
    daysContainer.children[day].classList.add("today");
}
highlightToday();
showGraph(2);

function toggleDayNight() {
    container.classList.toggle("sleepTime");
    toggleButton.classList.toggle("sleepTime");
    for (var item of document.querySelectorAll(".bar")) {
        item.classList.toggle("sleepTime");
    }
    toggleContext(toggleButton,"🌙","☀️");
    toggleContext(title,"wakey times","sleepy times");
    daysContainer.children[day].classList.toggle("todayNight");
    if (day > 0 && day <6){
        if (container.className == "sleepTime"){
            showGraph(1)
        }
        else{
            showGraph(2)
        }
    }
    else {
        if (container.className == "sleepTime"){
            showGraph(3)
        }
        else{
            showGraph(4)
        }
    }
}

function toggleContext(element, text1, text2){
    if (element.innerHTML == text1) {
        element.innerHTML = text2;
    } else if (element.innerHTML == text2) {
        element.innerHTML = text1;
    } else {
        null
    }
}

