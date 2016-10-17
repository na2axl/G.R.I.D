/* **************************************************
 * G.R.I.D : alert.js v2.1.0
 * **************************************************
 * Copyright 2015-2016 Centers Technologies
 * Licensed under MIT http://opensource.org/licenses/MIT
 * *************************************************/

+function ($) {
    'use strict';

    // ------------------------------------------------------------
    // CLASS DEFINITION
    // ------------------------------------------------------------
    var Alert = function Alert(element, options) {
        this.$wrapper = $(element);
        this.options  = options;
        this.$text    = null;
        this.$alert   = null;
        this.$close   = null;

        this.options.text && this.show();
    };

    Alert.VERSION  = '2.1.0';

    Alert.DEFAULTS = {
        element: undefined,
        type: "info",
        text: null,
        speed: 500,
        animation: "fade",
        intensity: "20px",
        cleanBefore: true,
        position: "before",
        withClose: false,
        hideAfter: false,
        timeOut: 5000,
        onOpen: null,
        onHide: null
    };

    Alert.prototype._init = function() {
        this.$text  = $('<span class="grid-alert-text"></span>').html(this.options.text);
        this.$alert = $('<div class="grid-alert"></div>').addClass('grid-alert-' + this.options.type).append(this.$text);
    };

    Alert.prototype.setType = function(type) {
        this.options.type = type || this.options.type;
        return this;
    };

    Alert.prototype.setText = function(text) {
        this.options.text = text || this.options.text;
        return this;
    };

    Alert.prototype.setSpeed = function(speed) {
        this.options.speed = speed || this.options.speed;
        return this;
    };

    Alert.prototype.setAnimation = function(anim) {
        this.options.animation = anim || this.options.animation;
        return this;
    };

    Alert.prototype.setIntensity = function(intensity) {
        this.options.intensity = intensity || this.options.intensity;
        return this;
    };

    Alert.prototype.setCleanBefore = function(clean) {
        this.options.cleanBefore = clean || this.options.cleanBefore;
        return this;
    };

    Alert.prototype.setPosition = function(position) {
        this.options.position = position || this.options.position;
        return this;
    };

    Alert.prototype.setWithClose = function(close) {
        this.options.withClose = close || this.options.withClose;
        return this;
    };

    Alert.prototype.setHideAfter = function(hide) {
        this.options.hideAfter = hide || this.options.hideAfter;
        return this;
    };

    Alert.prototype.setTimeOut = function(timeOut) {
        this.options.timeOut = timeOut || this.options.timeOut;
        return this;
    };

    Alert.prototype.onOpen = function(callback) {
        this.options.onOpen = callback || this.options.onOpen;
        return this;
    };

    Alert.prototype.onHide = function(callback) {
        this.options.onHide = callback || this.options.onHide;
        return this;
    };

    Alert.prototype.close = function() {
        this.$wrapper.fadeOut(this.options.speed, this.options.onHide);
        return this;
    };

    Alert.prototype.shake = function(anim) {
        var that = this;
        var n = {}, r = {}, p = {};
        var side = '';

        anim = anim || this.options.animation;

        if (anim == "shake-horizontal") {
            side = 'left';
        }
        else if (anim == "shake-vertical") {
            side = 'top';
        }

        n[side] = "-" + this.options.intensity;
        p[side] = this.options.intensity;
        r[side] = 0;

        this.$wrapper.animate(n,
            this.options.speed,
            function() {
                that.$wrapper.animate(p,
                    that.options.speed,
                    function() {
                        that.$wrapper.animate(n,
                            that.options.speed,
                            function() {
                                that.$wrapper.animate(p,
                                    that.options.speed,
                                    function() {
                                        that.$wrapper.animate(r,
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

    Alert.prototype.show  = function() {
        var hide_alert;

        this._init();

        if (this.options.withClose) {
            (this.$alert.find('.grid-alert-close').length > 0) || (this.$close = $('<span class="grid-alert-close"></span>').prependTo(this.$alert));
            this.$close.on('click.grid.alert', $.proxy(this.close, this));
        }

        if (this.options.type === "loading") {
            (this.$alert.find('.grid-alert-loader').length > 0) || ($('<span class="grid-alert-loader"></span>').prependTo(this.$alert));
        }

        this.$wrapper.fadeOut('fast', (function(that) {
            return function() {
                if (that.options.cleanBefore === true) {
                    that.$wrapper.empty();
                }

                if (that.options.position === "before") {
                    that.$wrapper.prepend(that.$alert);
                }
                else if (that.options.position === "after") {
                    that.$wrapper.append(that.$alert);
                }

                if (that.options.animation === "fade") {
                    that.$wrapper.fadeIn( that.options.speed, that.options.onOpen );
                }
                else if (that.options.animation === "shake-horizontal" || that.options.animation === "shake-vertical") {
                    that.$wrapper.fadeIn('fast', function() {
                        that.shake();
                        that.options.onOpen && that.options.onOpen();
                    });
                }

                if (that.options.hideAfter === true) {
                    clearTimeout(hide_alert);
                    hide_alert = setTimeout(function() {
                        that.close();
                    }, that.options.timeOut);
                }
            }
        })(this));

        return this;
    };

    // ------------------------------------------------------------
    // PLUGIN DEFINITION
    // ------------------------------------------------------------
    function Plugin() {
        var args = arguments;
        var data = $(this).data('grid.alert');
        args[0]  = args[0] || {};

        if (typeof args[0] === 'object') {
            var options  = args[0];
            var params   = $.extend({}, Alert.DEFAULTS, options);
            if ($('body').find(params.element || this).length < 1) {
                return;
            }

            return $(params.element || this).each(function () {
                $(this).data('grid.alert', (data = new Alert(this, params)));
            });
        }
        else if (typeof args[0] === 'string') {
            data && data[args[0]]((!(typeof args[1] === 'undefined')) ? args[1] : void 0);
        }
    }

    var old = $.grid.alert || $.fn.alert;

    // G.R.I.D jQuery Global Var
    // ------------------------------------------------------------
    $.grid.alert             = Plugin;
    $.grid.alert.Constructor = Alert;

    // Alert jQuery Extension
    // ------------------------------------------------------------
    $.fn.alert               = Plugin;
    $.fn.alert.Constructor   = Alert;

    // ------------------------------------------------------------
    // NO CONFLICT
    // ------------------------------------------------------------
    $.grid.alert.noConflict  = function() {
        $.grid.alert = old;
        return this;
    };

} (jQuery);
