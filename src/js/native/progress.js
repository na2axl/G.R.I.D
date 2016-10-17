/* **************************************************
 * G.R.I.D : progress.js v2.1.0
 * **************************************************
 * Copyright 2015-2016 Centers Technologies
 * Licensed under MIT http://opensource.org/licenses/MIT
 * *************************************************/

+function ($) {
    'use strict';

    // ------------------------------------------------------------
    // CLASS DEFINITION
    // ------------------------------------------------------------
    var Progress = function Progress(element, options) {
        var that = this;

        this.$element = $(element);
        this.options  = options;
        this.finish   = false;
        this.interval = null;

        this.setDelay();

        this.animate();
    };

    Progress.VERSION = '2.1.0';

    Progress.DEFAULTS = {
        element: '.grid-progress',
        delay: 1500,
        width: null,
        color: null,
        onEmpty: null,
        onFull: null,
        onFinish: null
    };

    Progress.prototype.setDelay = function(delay) {
        delay = delay || this.options.delay;

        if (delay < 1500) {
            delay = 1500;
        }

        this.options.delay = delay;

        return this;
    };

    Progress.prototype.setColor = function(color) {
        this.options.color = color || this.options.color;
        return this;
    };

    Progress.prototype.setWidth = function(width) {
        this.options.width = width || this.options.width;
        return this;
    };

    Progress.prototype.animate = function() {
        this.finish = false;

        if (this.options.color) {
            this.$element.css({
                "background-color": this.options.color,
            });
        }
        if (this.options.width) {
            this.$element.css({
                width: this.options.width
            });
        }

        this.finish = true;

        this.setInterval();

        return this;
    };

    Progress.prototype.setInterval = function(delay) {
        var that = this;

        this.setDelay(delay);

        this.interval = setInterval(function() {
            if (that.finish) {
                that.callback();
            }
        }, this.options.delay);

        return this;
    };

    Progress.prototype.onFull = function(callback) {
        this.options.onFull = callback || this.options.onFull;
        return this;
    };

    Progress.prototype.onEmpty = function(callback) {
        this.options.onEmpty = callback || this.options.onEmpty;
        return this;
    };

    Progress.prototype.onFinish = function(callback) {
        this.options.onFinish = callback || this.options.onFinish;
        return this;
    };

    Progress.prototype.callback = function() {
        var f = this.$element.parent('.grid-progress-bar').width();
        var b = this.$element.width();

        if (this.options.onEmpty && b === 0) {
            this.options.onEmpty();
        }

        if (this.options.onFull) {
            if (f === b) {
                this.options.onFull();
            }
        }

        if (this.options.onFinish && this.finish) {
            this.options.onFinish();
        }

        clearInterval(this.interval);
    };

    // ------------------------------------------------------------
    // PLUGIN DEFINITION
    // ------------------------------------------------------------
    function Plugin() {
        var args = arguments;
        var data = $(this).data('grid.progress');
        args[0]  = args[0] || {};

        if (typeof args[0] === 'object') {
            var options  = args[0];
            var params   = $.extend({}, Progress.DEFAULTS, typeof options == 'object' && options);
            if ($('body').find(params.element || this).length < 1) {
                return;
            }

            return $(params.element || this).each(function () {
                $(this).data('grid.progress', (data = new Progress(this, params)));
            });
        }
        else if (typeof args[0] === 'string') {
            data && data[args[0]]((!(typeof args[1] === 'undefined')) ? args[1] : void 0);
        }
    }

    var old = $.grid.progress || $.fn.progress;

    // G.R.I.D jQuery Global Var
    // ------------------------------------------------------------
    $.grid.progress             = Plugin;
    $.grid.progress.Constructor = Progress;

    // Progress jQuery Extension
    // ------------------------------------------------------------
    $.fn.progress               = Plugin;
    $.fn.progress.Constructor   = Progress;

    // ------------------------------------------------------------
    // NO CONFLICT
    // ------------------------------------------------------------
    $.grid.progress.noConflict  = function() {
        $.grid.progress = old;
        return this;
    };

} (jQuery);
