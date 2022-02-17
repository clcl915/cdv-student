
let data = [
    {
        "timestamp": "2022-02-10T02:37:18.560Z",
        "verySaltyFish": 5,
        "durian": 5,
        "centuryEgg": 1,
        "friedOreos": 3,
        "螺蛳粉": 3
    },
    {
        "timestamp": "2022-02-10T02:37:21.224Z",
        "verySaltyFish": 2,
        "durian": 4,
        "centuryEgg": 2,
        "friedOreos": 4,
        "螺蛳粉": 2
    },
    {
        "timestamp": "2022-02-10T02:37:22.235Z",
        "verySaltyFish": 5,
        "durian": 2,
        "centuryEgg": 1,
        "friedOreos": 3,
        "螺蛳粉": 3
    },
    {
        "timestamp": "2022-02-10T02:37:23.531Z",
        "verySaltyFish": 2,
        "durian": 3,
        "centuryEgg": 1,
        "friedOreos": 5,
        "螺蛳粉": 1
    },
    {
        "timestamp": "2022-02-10T02:37:31.955Z",
        "verySaltyFish": 4,
        "durian": 2,
        "centuryEgg": 1,
        "friedOreos": 4,
        "螺蛳粉": 2
    },
    {
        "timestamp": "2022-02-10T02:37:36.563Z",
        "verySaltyFish": 1,
        "durian": 5,
        "centuryEgg": 3,
        "friedOreos": 5,
        "螺蛳粉": 1
    },
    {
        "timestamp": "2022-02-10T02:37:39.947Z",
        "verySaltyFish": 4,
        "durian": 3,
        "centuryEgg": 5,
        "friedOreos": 4,
        "螺蛳粉": 3
    }
]

function averageData(data){
  let newData = [];
  let keys = Object.keys(data[ data.length-1 ]);
  for(let i = 0; i < keys.length; i++){
    let key = keys[i];
    let sum = 0;
    let num = 0;
    for(let j = 0; j < data.length; j++){
      let datum = data[j];
      if(key in datum){
        sum += datum[key];
        num++;
      }
    }
    let avg = sum/num;
    if(!isNaN(avg)){
      let newDataPoint = {"name": key, "average": avg, 'numMeasurements': num};
      newData.push(newDataPoint);
    }
  }
  return newData;
}

let transformedData = averageData(data);
console.log(transformedData);

let container = document.getElementById("container");

for(let i = 0; i < transformedData.length; i++){
  let datapoint = transformedData[i];
  let food = datapoint.name;
  let average = datapoint.average;

  let bar = document.createElement("div");
  bar.className = "bar";
  bar.style.width = (average * 30) + "px";
  let barname = document.createElement("p");
  barname.innerHTML = food;
  bar.appendChild(barname);
  container.appendChild(bar);
}