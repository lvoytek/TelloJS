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
 * CommandSender.js
 * This file contains functions that send packets to the drone in order to control it. 
 */


/*
 * Base command sending function used by all other functions in this file
 *
 * returns:
 *      "ok" on command success
 *      Some error code or "error" on failure
 */
function sendPacket(command)
{
	$.get("http://localhost:3000/dronecmd/run", {cmd : command}, function (data, textStatus, jqXHR) {
		return data.status;
	});

	return "ok";
}

/*
 * Checks if drone is available on the network and if so has it enter SDK mode
 * 
 * returns:
 *      1  on successful activation
 *      0  on failure to set SDK mode
 *      -1 on drone not available
 */
function activateDrone()
{
	let activateStatus = sendPacket("command");

	return 1;
}

/*
 * Attempts a drone takeoff
 *
 * returns:
 *      1  on success
 *      0  on command failure
 *      -1 on drone not available
 */
function takeoff()
{
	let activateStatus = sendPacket("takeoff");

	return 1;
}

/*
 * Attempts to land the drone
 *
 * returns:
 *      1  on success
 *      0  on command failure
 *      -1 on drone not available
 */
function land()
{
	let activateStatus = sendPacket("land");

	return 1;
}

/*
 * Attempts to turn on the UDP video stream
 *
 * returns:
 *      1  on success
 *      0  on command failure
 *      -1 on drone not available
 */
function activateVideo()
{
	let activateStatus = sendPacket("streamon");
	
	return 1;
}

/*
 * Attempts to turn off the UDP video stream
 *
 * returns:
 *      1  on success
 *      0  on command failure
 *      -1 on drone not available
 */
function deactivateVideo()
{
	let activateStatus = sendPacket("streamoff");

	return 1;
}

/*
 * Activate emergency kill switch for all motors
 *
 * returns:
 *      1  on success
 *      0  on command failure
 *      -1 on drone not available
 */
function kill()
{
	let activateStatus = sendPacket("emergency");

	return 1;
}

/*
 * Attempts to fly the drone upward by a given distance in cm
 * Any integer amount from 20 to 500 is valid
 * 
 * returns:
 *      1  on success
 *      0  on command failure
 *      -1 on drone not available
 */
function flyUp(distance)
{
	let integerDistance = Math.round(distance);

	if(integerDistance < 20)
		integerDistance = 20;
	else if(integerDistance > 500)
		integerDistance = 500;

	let activateStatus = sendPacket("up " + integerDistance);

	return 1;
}

/*
 * Attempts to fly the drone downward by a given distance in cm
 * Any integer amount from 20 to 500 is valid
 * 
 * returns:
 *      1  on success
 *      0  on command failure
 *      -1 on drone not available
 */
function flyDown(distance)
{
	let integerDistance = Math.round(distance);

	if(integerDistance < 20)
		integerDistance = 20;
	else if(integerDistance > 500)
		integerDistance = 500;

	let activateStatus = sendPacket("down " + integerDistance);

	return 1;
}

/*
 * Attempts to fly the drone leftward by a given distance in cm
 * Any integer amount from 20 to 500 is valid
 * 
 * returns:
 *      1  on success
 *      0  on command failure
 *      -1 on drone not available
 */
function flyLeft(distance)
{
	let integerDistance = Math.round(distance);

	if(integerDistance < 20)
		integerDistance = 20;
	else if(integerDistance > 500)
		integerDistance = 500;

	let activateStatus = sendPacket("left " + integerDistance);

	return 1;
}


/*
 * Attempts to fly the drone rightward by a given distance in cm
 * Any integer amount from 20 to 500 is valid
 * 
 * returns:
 *      1  on success
 *      0  on command failure
 *      -1 on drone not available
 */
function flyRight(distance)
{
	let integerDistance = Math.round(distance);

	if(integerDistance < 20)
		integerDistance = 20;
	else if(integerDistance > 500)
		integerDistance = 500;

	let activateStatus = sendPacket("right " + integerDistance);

	return 1;
}

/*
 * Attempts to fly the drone forward by a given distance in cm
 * Any integer amount from 20 to 500 is valid
 * 
 * returns:
 *      1  on success
 *      0  on command failure
 *      -1 on drone not available
 */
function flyForward(distance)
{
	let integerDistance = Math.round(distance);

	if(integerDistance < 20)
		integerDistance = 20;
	else if(integerDistance > 500)
		integerDistance = 500;

	let activateStatus = sendPacket("forward " + integerDistance);

	return 1;
}

/*
 * Attempts to fly the drone backward by a given distance in cm
 * Any integer amount from 20 to 500 is valid
 * 
 * returns:
 *      1  on success
 *      0  on command failure
 *      -1 on drone not available
 */
function flyBackward(distance)
{
	let integerDistance = Math.round(distance);

	if(integerDistance < 20)
		integerDistance = 20;
	else if(integerDistance > 500)
		integerDistance = 500;

	let activateStatus = sendPacket("back " + integerDistance);

	return 1;
}

/*
 * Attempts to rotate the drone clockwise by a given number of degrees
 * Any integer amount from 1 to 3600 is valid
 * 
 * returns:
 *      1  on success
 *      0  on command failure
 *      -1 on drone not available
 */
function rotateCW(degrees)
{
	let integerDegrees = Math.round(degrees);

	if(integerDegrees < 1)
		integerDegrees = 1;
	else if(integerDegrees > 3600)
		integerDegrees = 3600;

	let activateStatus = sendPacket("cw " + integerDegrees);

	return 1;
}

/*
 * Attempts to rotate the drone counter-clockwise by a given number of degrees
 * Any integer amount from 1 to 3600 is valid
 * 
 * returns:
 *      1  on success
 *      0  on command failure
 *      -1 on drone not available
 */
function rotateCCW(degrees)
{
	let integerDegrees = Math.round(degrees);

	if(integerDegrees < 1)
		integerDegrees = 1;
	else if(integerDegrees > 3600)
		integerDegrees = 3600;

	let activateStatus = sendPacket("ccw " + integerDegrees);

	return 1;
}

/*
 * Attempts to flip the drone forward
 * 
 * returns:
 *      1  on success
 *      0  on command failure
 *      -1 on drone not available
 */
function flipForward(degrees)
{
	let activateStatus = sendPacket("flip f");

	return 1;
}

/*
 * Attempts to flip the drone backward
 * 
 * returns:
 *      1  on success
 *      0  on command failure
 *      -1 on drone not available
 */
function flipBackward(degrees)
{
	let activateStatus = sendPacket("flip b");

	return 1;
}

/*
 * Attempts to flip the drone leftward
 * 
 * returns:
 *      1  on success
 *      0  on command failure
 *      -1 on drone not available
 */
function flipLeft(degrees)
{
	let activateStatus = sendPacket("flip l");

	return 1;
}

/*
 * Attempts to flip the drone rightward
 * 
 * returns:
 *      1  on success
 *      0  on command failure
 *      -1 on drone not available
 */
function flipRight(degrees)
{
	let activateStatus = sendPacket("flip r");

	return 1;
}

/*
 * Use four channels to set active speeds in each direction
 * Best used with joysticks or other hardware control interfaces
 * Each channel takes in a relative integer value from -100 to 100
 * Parameters:
 * 	lr - left/right speed
 *  bf - backward/forward speed
 *  du - down/up speed
 * 	yaw - ccw/cw speed
 * 
 * Does not return anything for speed, assumes this command is sent often enough
 * to not care if it sometimes fails
 */
function activeChannelInterface(lr, bf, du, yaw)
{
	let intLR = Math.round(lr);
	let intBF = Math.round(bf);
	let intDU = Math.round(du);
	let intYaw = Math.round(yaw);

	intLR = Math.min(Math.max(-100, intLR), 100);
	intBF = Math.min(Math.max(-100, intBF), 100);
	intDU = Math.min(Math.max(-100, intDU), 100);
	intYaw = Math.min(Math.max(-100, intYaw), 100);

	sendPacket("rc " + intLR + " " + intBF + " " + intDU + " " + intYaw);
}