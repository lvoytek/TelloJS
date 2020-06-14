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

function takeOff() {
  let success = takeoff();

  if (success == 1) {
    alert("Take off!");
  } else if (success == 0) {
    alert("Take off failed.");
  } else {
    alert("Drone not found.");
  }
}

function landDrone() {
  let success = land();

  if (success == 1) {
    alert("Landing!");
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
    alert("Take off failed.");
  } else {
    alert("Drone not found.");
  }
}

function down() {
  let success = flyDown(20);

  if (success == 1) {
  } else if (success == 0) {
    alert("Take off failed.");
  } else {
    alert("Drone not found.");
  }
}

function forward() {
  let success = flyForward(20);

  if (success == 1) {
  } else if (success == 0) {
    alert("Take off failed.");
  } else {
    alert("Drone not found.");
  }
}

function back() {
  let success = flyBackward(20);

  if (success == 1) {
  } else if (success == 0) {
    alert("Take off failed.");
  } else {
    alert("Drone not found.");
  }
}

function left() {
  let success = flyLeft();

  if (success == 1) {
  } else if (success == 0) {
    alert("Take off failed.");
  } else {
    alert("Drone not found.");
  }
}

function right() {
  let success = flyRight(20);

  if (success == 1) {
  } else if (success == 0) {
    alert("Take off failed.");
  } else {
    alert("Drone not found.");
  }
}
