/* **************************************************
 * G.R.I.D : g.r.i.d.js v2.1.0
 * **************************************************
 * Copyright 2015-2016 Centers Technologies
 * Licensed under MIT http://opensource.org/licenses/MIT
 * *************************************************/

// ------------------------------------------------------------
// G.R.I.D jQuery GLOBAL VARIABLE
// Used to handle G.R.I.D jQuery Plugins.
// ------------------------------------------------------------
jQuery.grid = {
    detach: function(element, plugin) {
        var $element = jQuery(element);
        if (typeof plugin === 'object') {
            for (var p in plugin) {
                $element[p]('detach');
                $element.removeData('grid.'+p);
            }
        }
        else if (typeof plugin === 'string') {
            $element[plugin]('detach');
            $element.removeData('grid.'+plugin);
        }
    }
};

// ------------------------------------------------------------
// G.R.I.D GLOBAL VARIABLE
// Used to define breakpoints, check viewport's size and some
// device and browser parameters (touchscreen, CSS transitions)
// ------------------------------------------------------------
var GRID = function () {
    "use strict";

	// Check if the device has a mouse.
	// First we'll assume the device has no mouse until we
	// detect any mouse movement
	var deviceHasMouse = false;
	$('body').one('mousemove', function() {
		deviceHasMouse = true;
	});

    // Compatibility for devices running Windows Phone 8
    // with IE 10.
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement('style');
        msViewportStyle.appendChild(
            document.createTextNode(
                '@-ms-viewport{width:auto!important}'
            )
        );
        document.querySelector('head').appendChild(msViewportStyle)
    }

    var g = {

        breakPoints: {
            mobile: 480,
            tablet_narrow: 768,
            tablet_wide: 1024
        },

        onBreakPointChangeCallbacks: {
            mobile: [],
            tablet_narrow: [],
            tablet_wide: []
        },

        init : function (options) {
            var defaults = {
                breakPoints: {
                    mobile: g.breakPoints.mobile,
                    tablet_narrow: g.breakPoints.tablet_narrow,
                    tablet_wide: g.breakPoints.tablet_wide
                }
            };

            g.params = $.extend({}, defaults, options);

            g.breakPoints = g.params.breakPoints;

            var $window   = $(window),
                $body     = $(document.body);

            $body.addClass('grid-is-loading');

            $window.on('load.grid', function() {
                $body.removeClass('grid-is-loading');
            });

            $window.on('resize.grid', function() {
                var $html = $('html');
                var lp = $html.data('grid.lastBreakPoint');
                var cp = (function() {
                    var ret;
                    for (var point in g.params.breakPoints) {
                        if (g.params.breakPoints.hasOwnProperty(point)) {
                            if (g.is(point)) {
                                ret = point;
                                break;
                            }
                        }
                    }
                    return ret;
                })();

                if (lp !== cp) {
                    $html.data('grid.lastBreakPoint', cp);
                    g.onBreakPointChangeCallbacks[cp].forEach(function (cb) {
                        cb();
                    });
                }
            });
        },

        onBreakPointChange: function(screen, callback) {
            g.onBreakPointChangeCallbacks[screen].push(callback);
        },

        is: function(screen) {
            return ($(document.body).outerWidth() <= g.params.breakPoints[screen]);
        },

        isTouchScreen: function() {
            return !!('ontouchstart' in window);
        },

        isPureTouchScreen: function() {
            return (!deviceHasMouse && g.isTouchScreen());
        },

        browserSupportsTransitions: function() {
            var b = document.body || document.documentElement,
                s = b.style,
                p = 'transition',
                v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'];

            if(typeof s[p] === 'string') { return true; }

            p = p.charAt(0).toUpperCase() + p.substr(1);
            for(var i = 0, l = v.length; i < l; i++) {
                if(typeof s[v[i] + p] === 'string') { return true; }
            }
            return false;
        }

    };

    return g;

}();