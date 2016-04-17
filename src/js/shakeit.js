/* **************************************************
 * G.R.I.D : shakeit.js v2.0.0
 * **************************************************
 * Copyright 2015-2016 Centers Technologies
 * Licensed under MIT http://opensource.org/licenses/MIT
 * *************************************************/

+function ($) {
    'use strict';

    // ------------------------------------------------------------
    // CLASS DEFINITION
    // ------------------------------------------------------------
    var ShakeIt = function ShakeIt(element, options) {
        var that = this;

        this.$element = $(element);
        this.options  = options;

        if (this.options.stopBefore) {
            this.$element
            .stop()
            .css({
                top: 0,
                left: 0
            });
        }

        this.shake();
    };

    ShakeIt.VERSION = '2.0.0';

    ShakeIt.DEFAULTS = {
        animation: "horizontal",
        speed: 50,
        intensity: 0,
        onFinish: null,
        stopBefore: true
    };

    ShakeIt.prototype.set_anim = function(anim) {
        anim = anim || this.options.animation;
        this.options.animation = anim;
        return this;
    };

    ShakeIt.prototype.set_speed = function(speed) {
        speed = speed || this.options.speed;
        this.options.speed = speed;
        return this;
    };

    ShakeIt.prototype.set_intensity = function(intensity) {
        intensity = intensity || this.options.intensity;
        this.options.intensity = intensity;
        return this;
    };

    ShakeIt.prototype.set_stopBefore = function(stop) {
        stop = stop || this.options.stopBefore;
        this.options.stopBefore = stop;
        return this;
    };

    ShakeIt.prototype.onFinish = function(callback) {
        callback = callback || this.options.onFinish;
        this.options.onFinish = callback;
        return this;
    };

    ShakeIt.prototype.shake = function(anim) {
        var that = this;
        var n = {}, r = {}, p = {};
        var side = '';

        anim = anim || this.options.animation;

        if (anim == "horizontal") {
            side = 'left';
        }
        else if (anim == "vertical") {
            side = 'top';
        }

        n[side] = "-" + that.options.intensity;
        p[side] = that.options.intensity;
        r[side] = 0;

        that.$element.animate(n,
            that.options.speed,
            function() {
                that.$element.animate(p,
                    that.options.speed,
                    function() {
                        that.$element.animate(n,
                            that.options.speed,
                            function() {
                                that.$element.animate(p,
                                    that.options.speed,
                                    function() {
                                        that.$element.animate(r,
                                            that.options.speed,
                                            function() {
                                                that.options.onFinish && that.options.onFinish();
                                            }
                                        );
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );

        return this;
    };

    // ------------------------------------------------------------
    // PLUGIN DEFINITION
    // ------------------------------------------------------------
    function Plugin() {
        var args = arguments;
        var data = $(this).data('grid.shakeIt');
        args[0]  = args[0] || {};

        if (typeof args[0] == 'object') {
            var options  = args[0];
            var params   = $.extend({}, ShakeIt.DEFAULTS, typeof options == 'object' && options);
            var $wrapper = $(params.element || this);

            return $wrapper.each(function () {
                $(this).data('grid.shakeIt', (new ShakeIt(this, params)));
            });
        }
        else if (typeof args[0] == 'string') {
            if (typeof args[1] != 'undefined') {
                data && data[args[0]](args[1]);
            }
            else {
                data && data[args[0]]();
            }
        }
    }

    var old = $.grid.shakeIt || $.fn.shakeIt;

    // G.R.I.D jQuery Global Var
    // ------------------------------------------------------------
    $.grid.shakeIt             = Plugin;
    $.grid.shakeIt.Constructor = ShakeIt;

    // ShakeIt jQuery Extension
    // ------------------------------------------------------------
    $.fn.shakeIt               = Plugin;
    $.fn.shakeIt.Constructor   = ShakeIt;

    // ------------------------------------------------------------
    // NO CONFLICT
    // ------------------------------------------------------------
    $.grid.shakeIt.noConflict  = function() {
        $.grid.shakeIt = old;
        return this;
    };

}(jQuery);