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
    
}

