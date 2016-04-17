/* **************************************************
 * G.R.I.D : alert.js v2.0.0
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
        this.element  = element;
        this.$wrapper = $(element);
        this.options  = options;
        this.$text    = null;
        this.$alert   = null;
        this.$close   = null;
        this.$loader  = null;

        this.options.text && this.show();
    };

    Alert.VERSION  = '2.0.0';

    Alert.DEFAULTS = {
        type: "info",
        text: null,
        speed: 500,
        anim: "fade",
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
        this.$text  = $('<span class="text"></span>').html(this.options.text);
        this.$alert = $('<div class="alert"></div>').addClass(this.options.type).append(this.$text);
    };

    Alert.prototype.set_type = function(type) {
        type = type || this.options.type;
        this.options.type = type;
        return this;
    };

    Alert.prototype.set_text = function(text) {
        text = text || this.options.text;
        this.options.text = text;
        return this;
    };

    Alert.prototype.set_speed = function(speed) {
        speed = speed || this.options.speed;
        this.options.speed = speed;
        return this;
    };

    Alert.prototype.set_anim = function(anim) {
        anim = anim || this.options.anim;
        this.options.anim = anim;
        return this;
    };

    Alert.prototype.set_intensity = function(intensity) {
        intensity = intensity || this.options.intensity;
        this.options.intensity = intensity;
        return this;
    };

    Alert.prototype.set_cleanBefore = function(clean) {
        clean = clean || this.options.cleanBefore;
        this.options.cleanBefore = clean;
        return this;
    };

    Alert.prototype.set_position = function(position) {
        position = position || this.options.position;
        this.options.position = position;
        return this;
    };

    Alert.prototype.set_withClose = function(close) {
        close = close || this.options.withClose;
        this.options.withClose = close;
        return this;
    };

    Alert.prototype.set_hideAfter = function(hide) {
        hide = hide || this.options.hideAfter;
        this.options.hideAfter = hide;
        return this;
    };

    Alert.prototype.set_timeOut = function(timeOut) {
        timeOut = timeOut || this.options.timeOut;
        this.options.timeOut = timeOut;
        return this;
    };

    Alert.prototype.onOpen = function(callback) {
        callback = callback || this.options.onOpen;
        this.options.onOpen = callback;
        return this;
    };

    Alert.prototype.onHide = function(callback) {
        callback = callback || this.options.onHide;
        this.options.onHide = callback;
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

        anim = anim || this.options.anim;

        if (anim == "shake-horizontal") {
            side = 'left';
        }
        else if (anim == "shake-vertical") {
            side = 'top';
        }

        n[side] = "-" + that.options.intensity;
        p[side] = that.options.intensity;
        r[side] = 0;

        that.$wrapper.animate(n,
            that.options.speed,
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
        var that = this;

        this._init();

        if (this.options.withClose) {
            (this.$alert.find('.close').length > 0) || (this.$close = $('<span class="close"></span>').prependTo(this.$alert));
            this.$close.on('click.grid.alert', $.proxy(this.close, this));
        }

        if (this.options.type == "loading") {
            (this.$alert.find('.loader').length > 0) || (this.$loader = $('<span class="loader"></span>').prependTo(this.$alert));
        }

        this.$wrapper.fadeOut('fast', function() {
            if (that.options.cleanBefore == true) {
                that.$wrapper.empty();
            }

            if (that.options.position == "before") {
                that.$wrapper.prepend(that.$alert);
            }
            else if (that.options.position == "after") {
                that.$wrapper.append(that.$alert);
            }

            if (that.options.anim == "fade") {
                that.$wrapper.fadeIn( that.options.speed, that.options.onOpen );
            }
            else if (that.options.anim == "shake-horizontal" || that.options.anim == "shake-vertical") {
                that.$wrapper.fadeIn('fast', function() {
                    that.shake();
                    that.options.onOpen && that.options.onOpen();
                });
            }

            if (that.options.hideAfter == true) {
                clearTimeout(hide_alert);
                hide_alert = setTimeout(function() {
                    that.close();
                }, that.options.timeOut);
            }

        });

        return this;
    };

    // ------------------------------------------------------------
    // PLUGIN DEFINITION
    // ------------------------------------------------------------
    function Plugin() {
        var args = arguments;
        var data = $(this).data('grid.alert');
        args[0]  = args[0] || {};

        if (typeof args[0] == 'object') {
            var options  = args[0];
            var params   = $.extend({}, Alert.DEFAULTS, options);
            var $wrapper = $(params.container || this);

            return $wrapper.each(function() {
                $(this).data('grid.alert', (data = new Alert(this, params)));
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

}(jQuery);