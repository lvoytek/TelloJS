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
var droneControlMode = false;
var videoMode = false;
var browserName = ""

const controllerMap = 
{
	"chrome" : 
	{
		"connect"	: 9,
		"takeoff" 	: 0,
		"land"		: 1,
		"videoOn"	: 4,
		"videoOff"	: 5,
		"ccw"		: 6,
		"cw"		: 7,
		"flipf"		: 12,
		"flipb"		: 13,
		"flipl"		: 14,
		"flipr"		: 15,
		"axislr"	: 0,
		"axisbf"	: 1,
		"axisyaw"	: 2,
		"axisdu"	: 3
	},

	"firefox" :
	{
		"connect"	: 7,
		"takeoff" 	: 0,
		"land"		: 1,
		"videoOn"	: 4,
		"videoOff"	: 5,
		"ccw"		: 6,
		"cw"		: 7,
		"flipf"		: 12,
		"flipb"		: 13,
		"flipl"		: 14,
		"flipr"		: 15,
		"axislr"	: 0,
		"axisbf"	: 1,
		"axisyaw"	: 2,
		"axisdu"	: 3 
	},

};

$(document).ready(function () {
	
	if(navigator.userAgent.includes("Chromium") || navigator.userAgent.includes("Chrome"))
		browserName = "chrome";
	else if(navigator.userAgent.includes("Mozilla"))
		browserName = "firefox";

	navigator.userAgent
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
			if (droneControlMode === false && button.id == controllerMap[browserName].connect) {
				connectDrone();
				droneControlMode = true;
			} else {
				droneController(button.id);
			}
		}

		if(droneControlMode)
			sendCurrentControl(gamepad.axes);
	}

	var prevAxisVals = [0, 0, 0, 0];

	//Modify gamepad axes input to get reasonable values for sending to drone
	function sendCurrentControl(axes)
	{
		lrVal = axes[controllerMap[browserName].axislr] * 100;
		bfVal = axes[controllerMap[browserName].axisbf] * -100;
		yawVal = axes[controllerMap[browserName].axisyaw] * 100;
		duVal = axes[controllerMap[browserName].axisdu] * -100;

		if(Math.abs(lrVal - prevAxisVals[0]) > 2 || Math.abs(bfVal - prevAxisVals[1]) > 2 || Math.abs(yawVal - prevAxisVals[2]) > 2 || Math.abs(duVal - prevAxisVals[3]) > 2)
		{
			activeChannelInterface(lrVal, bfVal, duVal, yawVal);
			prevAxisVals = [lrVal, bfVal, yawVal, duVal];
		}
	}

	function isPressed({ button: { pressed } }) {
		return !!pressed;
	}

	function droneController(buttonID) {
		let on = null;

		switch (buttonID) {
			case controllerMap[browserName].takeoff:
				takeOff();
				break;
			case controllerMap[browserName].land:
				landDrone();
				break;
			case controllerMap[browserName].videoOn:
				if (!videoMode) {
					videoOn();
				}
				break;
			case controllerMap[browserName].videoOff:
				if (videoMode) {
					videoOff();
				}
				break;
			case controllerMap[browserName].ccw:
				rotateCCW(30);
				break;
			case controllerMap[browserName].cw:
				rotateCW(30);
				break;
			case controllerMap[browserName].flipf:
				flipForward();
				break;
			case controllerMap[browserName].flipb:
				flipBackward();
				break;
			case controllerMap[browserName].flipl:
				flipLeft();
				break;
			case controllerMap[browserName].flipr:
				flipRight();
				break;
			default:
				break;
		}
	}
	/*
	Here's the drone command stuff. 
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
});

function videoOn() {
	let success = activateVideo();

	if (success == 0) {
		alert("Video failed.");
	} else if(success == -1) {
		alert("Drone not found.");
	}

	videoMode = true;
}

function videoOff() {
	let success = deactivateVideo();

	if (success == 0) {
		alert("Video failed.");
	} else if (success == -1) {
		alert("Drone not found.");
	}

	videoMode = false;
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
