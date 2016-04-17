/* **************************************************
 * G.R.I.D : g.r.i.d.js v2.0.0
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
        if (typeof plugin == 'object') {
            for (var p in plugin) {
                $element.removeData('grid.'+p);
            }
        }
        else if (typeof plugin == 'string') {
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
        var msViewportStyle = document.createElement('style')
        msViewportStyle.appendChild(
            document.createTextNode(
                '@-ms-viewport{width:auto!important}'
            )
        )
        document.querySelector('head').appendChild(msViewportStyle)
    }

    var g = {

        breakPoints: {
            mobile: 480,
            tablet: 1024,
        },

        init : function (options) {
            var defaults = {
                breakPoints: {
                    mobile: g.breakPoints.mobile,
                    tablet: g.breakPoints.tablet
                }
            };

            var params = $.extend({}, defaults, options);

            g.breakPoints = params.breakPoints;

            var $window   = $(window),
                $body     = $(document.body);

            $body.addClass('is-loading');

            $window.on('load.grid', function() {
                $body.removeClass('is-loading');
            });
        },

        is: function(screen) {
            if ($(document.body).outerWidth() <= g.breakPoints[screen]) {
                return true;
            } else {
                return false;
            }
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
                p = 'transition';

            if(typeof s[p] == 'string') {return true; }

            v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
            p = p.charAt(0).toUpperCase() + p.substr(1);
            for(var i=0; i<v.length; i++) {
                if(typeof s[v[i] + p] == 'string') { return true; }
            }
            return false;
        }

    };

    return g;

}();

(this, function() {
    return GRID;
});
