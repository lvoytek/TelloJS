/*
 * Copyright (c) 2020 Lena Voytek, Lucas Boje
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 * Tello.js
 * This is the main JavaScript file that uses functions from the other js files
 * to associate GUI items with drone commands.
 */

const refreshRate = 100;
const output = document.getElementById("output");
var droneControlMode = false;

setInterval(controllerStart, refreshRate);

function controllerStart() {
  const gamepads = navigator.getGamepads();
  const gamepad = gamepads[0];

  // Escape if no gamepad was found
  if (!gamepad) {
    console.log("No gamepad found.");
    return;
  }

  // Filter out only the buttons which are pressed
  const pressedButtons = gamepad.buttons
    .map((button, id) => ({ id, button }))
    .filter(isPressed);

  for (const button of pressedButtons) {
    console.log(button);
    if (droneControlMode === false && button.id == 9) {
      connectDrone();
      droneControlMode = true;
    } else {
      droneController(button.id);
    }
  }
}

function isPressed({ button: { pressed } }) {
  return !!pressed;
}

function log(message) {
  const date = new Date().toISOString();
  output.innerHTML += `${date}: ${message}\n`;
}

function droneController(buttonID) {
  switch (buttonID) {
    case 0:
      takeOff();
      //log("Takeoff!");
      break;
    case 1:
      landDrone();
      //log("Landing.");
      break;
    case 5:
      let on = document.getElementById("videoOn");
      if (on.style.display == "inline") {
        videoOn();
      } else {
        videoOff();
      }
      break;

    default:
      //log(`Button ${buttonID} was pressed.`);
      break;
  }
}
/*


Here's the drone command stuff. Hook it up later.



*/
function connectDrone() {
  let connectionStatus = activateDrone();

  if (connectionStatus == 1) {
    let connectButton = document.getElementById("connectDrone");
    let commands = document.getElementById("droneCommands");
    commands.style.display = "inline";
    connectButton.style.display = "none";
  } else if (connectionStatus == 0) {
    alert("Connection failed.");
  } else {
    alert("Drone not found.");
  }
}

function videoOn() {
  let success = activateVideo();

  if (success == 1) {
    let on = document.getElementById("videoOn");
    let off = document.getElementById("videoOff");

    on.style.display = "none";
    off.style.display = "inline";
  } else if (connectionStatus == 0) {
    alert("Video failed.");
  } else {
    alert("Drone not found.");
  }
}

function videoOff() {
  let success = deactivateVideo();

  if (success == 1) {
    let on = document.getElementById("videoOn");
    let off = document.getElementById("videoOff");

    on.style.display = "inline";
    off.style.display = "none";
  } else if (connectionStatus == 0) {
    alert("Video failed.");
  } else {
    alert("Drone not found.");
  }
}

function takeOff() {
  let success = takeoff();

  if (success == 1) {
  } else if (success == 0) {
    alert("Take off failed.");
  } else {
    alert("Drone not found.");
  }
}

function landDrone() {
  let success = land();

  if (success == 1) {
  } else if (success == 0) {
    alert("Landing failed.");
  } else {
    alert("Drone not found.");
  }
}

function up() {
  let success = flyUp(20);

  if (success == 1) {
  } else if (success == 0) {
    alert("Up failed.");
  } else {
    alert("Drone not found.");
  }
}

function down() {
  let success = flyDown(20);

  if (success == 1) {
  } else if (success == 0) {
    alert("Down failed.");
  } else {
    alert("Drone not found.");
  }
}

function forward() {
  let success = flyForward(20);

  if (success == 1) {
  } else if (success == 0) {
    alert("Forward failed.");
  } else {
    alert("Drone not found.");
  }
}

function back() {
  let success = flyBackward(20);

  if (success == 1) {
  } else if (success == 0) {
    alert("Back failed.");
  } else {
    alert("Drone not found.");
  }
}

function left() {
  let success = flyLeft(20);

  if (success == 1) {
  } else if (success == 0) {
    alert("Left failed.");
  } else {
    alert("Drone not found.");
  }
}

function right() {
  let success = flyRight(20);

  if (success == 1) {
  } else if (success == 0) {
    alert("Right failed.");
  } else {
    alert("Drone not found.");
  }
}

function clockwise() {
  let success = rotateCW(10);

  if (success == 1) {
  } else if (success == 0) {
    alert("Clockwise rotation failed.");
  } else {
    alert("Drone not found.");
  }
}

function counterClockwise() {
  let success = rotateCCW(10);

  if (success == 1) {
  } else if (success == 0) {
    alert("Counter clockwise rotation failed.");
  } else {
    alert("Drone not found.");
  }
}
