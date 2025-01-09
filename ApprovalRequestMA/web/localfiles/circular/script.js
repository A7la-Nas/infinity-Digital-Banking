
/**
 ** Returns a progress bar for the current value.
 ** Author : Pranabesh Singh
 ** Date : 2022-12-01
 ** Version : 1.0
 ** Understanding :
 ** 1. Include the script in your HTML file.
 ** 2. Call the function with the last value, the current value and the max value.
 ** 3. The function returns a progress bar.
 ** 4. You can use the returned value to display the progress bar.
 ** 5. You can also use the returned value to update the progress bar.
 **
 ** Keep all the files mentioned in the same folder.
 ** usage : /index.html?lastValue=20&newValue=40&maxValue=100
 ** Restriction : The last value must be less than the new value and the new value must be less than the max value.
*/

let progressBar = document.querySelector(".circular-progress");
let valueContainer = document.querySelector(".value-container");
let progressValue = 0;
let oldValue = 29;
let currentValue = 69;
let progressEndValue = 420;
const params = new URLSearchParams(window.location.search);
let hasData = 0;
if (params.has("lastValue")) {
    oldValue = Number(params.get("lastValue"));
    hasData++;
}
if (params.has("newValue")) {
    currentValue = Number(params.get("newValue"));
    hasData++;
}
if (params.has("maxValue")) {
    progressEndValue = Number(params.get("maxValue"));
    hasData++;
}
if (hasData != 3) {
    console.log("not enough data");
} else if (!(oldValue <= progressEndValue)) {
    console.log("old value is greater than max value");
} else if (!(currentValue <= progressEndValue)) {
    console.log("new value is greater than max value");
} else if (!(oldValue <= currentValue)) {
    console.log("old value is greater than new value");
} else if (!(oldValue >= 0)) {
    console.log("old value is less than 0");
} else if (!(maxValue > 0)) {
    console.log("max value is less than or equal to 0");
} else if (!(currentValue >= 0)) {
    console.log("old value is less than 0");
} else {
    progressValue = oldValue;
    let slowness = 30;
    let multiplier = 360 / progressEndValue;

    let colorCompleted = "#2a9e05";
    let colorRemaining = "#c6c6c8";

    progressBar.style.background = `conic-gradient(
  colorCompleted ${oldValue * multiplier}deg,
  colorRemaining ${oldValue * multiplier}deg
  )`;
    valueContainer.textContent = `${currentValue} of ${progressEndValue}`;
    let progress = setInterval(() => {
        if (progressValue == currentValue) {
            clearInterval(progress);
        }
        else {
            progressValue++;
            progressBar.style.background = `conic-gradient(
  colorCompleted ${progressValue * multiplier}deg,
  colorRemaining ${progressValue * multiplier}deg
  )`;
        }
    }, slowness);
}

/**
 ** Required CSS
 body {
  background: #ffffff;
 }

.circular-progress {
  position: relative;
  height: 48px;
  width: 48px;
  border-radius: 100%;
  display: grid;
  place-items: center;
}

.circular-progress:before {
  content: "";
  position: absolute;
  height: 43px;
  width: 43px;
  background-color: #ffffff;
  border-radius: 50%;
}

.value-container {
  position: relative;
  font-size: 11px;
  color: #727272;
}

// body.background & .circular-progress:before is for the background of the progress bar
// .value-container is for the text inside the progress bar
// .circular-progress is for the progress bar itself
// .circular-progress:before is for the white background of the progress bar

*/

/**
 ** Required HTML
 <!DOCTYPE html>
<html lang="en">

<head>
  <link rel="stylesheet" href="./style.css">
</head>

<body>
  <div class="circular-progress">
    <div class="value-container">- of -</div>
  </div>
  <script src="./script.js"></script>
</body>

</html>
 */