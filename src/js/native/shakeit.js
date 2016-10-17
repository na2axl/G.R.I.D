/* **************************************************
 * G.R.I.D : shakeit.js v2.1.0
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

    ShakeIt.VERSION = '2.1.0';

    ShakeIt.DEFAULTS = {
        animation: "horizontal",
        speed: 50,
        intensity: 0,
        onFinish: null,
        stopBefore: true
    };

    ShakeIt.prototype.setAnimation = function(anim) {
        this.options.animation = anim || this.options.animation;
        return this;
    };

    ShakeIt.prototype.setSpeed = function(speed) {
        this.options.speed = speed || this.options.speed;
        return this;
    };

    ShakeIt.prototype.setIntensity = function(intensity) {
        this.options.intensity = intensity || this.options.intensity;
        return this;
    };

    ShakeIt.prototype.setStopBefore = function(stop) {
        this.options.stopBefore = stop || this.options.stopBefore;
        return this;
    };

    ShakeIt.prototype.onFinish = function(callback) {
        this.options.onFinish = callback || this.options.onFinish;
        return this;
    };

    ShakeIt.prototype.shake = function(anim) {
        var that = this;
        var n = {}, r = {}, p = {};
        var side = '';

        anim = anim || this.options.animation;

        if (anim === "horizontal") {
            side = 'left';
        }
        else if (anim === "vertical") {
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

        if (typeof args[0] === 'object') {
            var options  = args[0];
            var params   = $.extend({}, ShakeIt.DEFAULTS, typeof options === 'object' && options);
            if ($('body').find(params.element || this).length < 1) {
                return;
            }

            return $(params.element || this).each(function () {
                $(this).data('grid.shakeIt', (new ShakeIt(this, params)));
            });
        }
        else if (typeof args[0] === 'string') {
            data && data[args[0]]((!(typeof args[1] === 'undefined')) ? args[1] : void 0);
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

} (jQuery);
