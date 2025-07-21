/**
 * @author Kory Nunn / http://korynunn.com
 *
 * A simple library for converting device orientation and motion events to
 * something a little easier to work with.
 *
 * alpha: rotation around z-axis
 * beta: rotation around x-axis
 * gamma: rotation around y-axis
 *
 *
 * Copyright 2014 Kory Nunn
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Motion = factory();
    }
}(this, function() {
    'use strict';

    var M,
        _listeners = {},
        _publicListeners = {},
        _motionData = {},
        _orientationData = {},
        _calibrationData = {},
        _isCalibrating = false,
        _calibrationTimeout,
        _calibrationInterval,
        _isSupported = !! window.DeviceMotionEvent && !! window.DeviceOrientationEvent,
        _isRunning = false,
        /**
         * @private
         */
        _deviceMotionHandler = function(event) {

            // if we are calibrating, don't do anything else
            if (_isCalibrating) {
                return;
            }

            _motionData.acceleration = event.acceleration;
            _motionData.accelerationIncludingGravity = event.accelerationIncludingGravity;
            _motionData.rotationRate = event.rotationRate;
            _motionData.interval = event.interval;
            _motionData.timeStamp = event.timeStamp;

            // fire the motion event
            _trigger('motion', _motionData);
        },
        /**
         * @private
         */
        _deviceOrientationHandler = function(event) {

            // if we are calibrating, we need to get the first few readings and average them out
            if (_isCalibrating) {

                //if we have nothing to compare to, this is the first reading
                if (!_calibrationData.alpha) {
                    _calibrationData.alpha = event.alpha;
                    _calibrationData.beta = event.beta;
                    _calibrationData.gamma = event.gamma;
                    return;
                }

                _calibrationData.alpha = (event.alpha + _calibrationData.alpha) / 2;
                _calibrationData.beta = (event.beta + _calibrationData.beta) / 2;
                _calibrationData.gamma = (event.gamma + _calibrationData.gamma) / 2;

                return;
            }


            _orientationData.alpha = event.alpha - _calibrationData.alpha;
            _orientationData.beta = event.beta - _calibrationData.beta;
            _orientationData.gamma = event.gamma - _calibrationData.gamma;
            _orientationData.timeStamp = event.timeStamp;

            // fire the orientation event
            _trigger('orientation', _orientationData);
        },
        /**
         * @private
         */
        _start = function() {

            if (_isRunning) {
                return;
            }

            // add the listeners
            window.addEventListener('devicemotion', _deviceMotionHandler);
            window.addEventListener('deviceorientation', _deviceOrientationHandler);

            _isRunning = true;
        },
        /**
         * @private
         */
        _stop = function() {

            if (!_isRunning) {
                return;
            }

            // remove the listeners
            window.removeEventListener('devicemotion', _deviceMotionHandler);
            window.removeEventListener('deviceorientation', _deviceOrientationHandler);

            _isRunning = false;
        },
        /**
         * @private
         */
        _on = function(event, callback) {

            // create a new listener array for this event, if we don't have one
            if (!_listeners[event]) {
                _listeners[event] = [];
            }

            // add the listener to the array
            _listeners[event].push(callback);

        },
        /**
         * @private
         */
        _off = function(event, callback) {

            // if we have no listeners for this event, do nothing
            if (!_listeners[event]) {
                return;
            }

            // if a specific callback is passed, remove it
            if (callback) {
                _listeners[event].splice(_listeners[event].indexOf(callback), 1);
            } else {
                // otherwise, remove all listeners for this event
                _listeners[event] = [];
            }
        },
        /**
         * @private
         */
        _trigger = function(event, data) {

            // if we have no listeners for this event, do nothing
            if (!_listeners[event]) {
                return;
            }

            // otherwise, trigger all of the listeners for this event
            for (var i = 0; i < _listeners[event].length; i++) {
                _listeners[event][i](data);
            }
        },
        /**
         * @private
         */
        _init = function() {

            // do an initial calibration
            M.calibrate();

            // create the public listener methods
            for (var event in _listeners) {
                _publicListeners[event] = (function(event) {
                    return function(callback) {
                        _on(event, callback);
                    };
                }(event));
            }

        };


    M = {
        /**
         * The raw motion data from the device
         * @property
         */
        motion: _motionData,
        /**
         * The raw orientation data from the device
         * @property
         */
        orientation: _orientationData,
        /**
         * Is the device supported?
         * @property
         */
        isSupported: _isSupported,
        /**
         * Is the library currently listening for events?
         * @property
         */
        isRunning: function() {
            return _isRunning;
        },
        /**
         * Calibrate the device orientation
         * @method
         */
        calibrate: function(timeout) {

            // default timeout to 1 second
            timeout = timeout || 1000;

            // if we are already calibrating, do nothing
            if (_isCalibrating) {
                return;
            }

            _isCalibrating = true;

            // clear any previous calibration data
            _calibrationData = {};

            // start listening for events
            _start();


            // stop calibrating after a second
            _calibrationTimeout = setTimeout(function() {
                _isCalibrating = false;

                //if we have no listeners, stop listening for events
                if (!_listeners.motion && !_listeners.orientation) {
                    _stop();
                }

            }, timeout);

        },
        /**
         * Add a listener for a specific event
         * @method
         */
        on: _on,
        /**
         * Remove a listener for a specific event
         * @method
         */
        off: _off,
        /**
         * start listening for events
         * @method
         */
        start: _start,
        /**
         * stop listening for events
         * @method
         */
        stop: _stop
    };

    _init();

    return M;

}));
