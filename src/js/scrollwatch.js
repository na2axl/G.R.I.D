/* **************************************************
 * G.R.I.D : scrollwatch.js v2.0.0
 * **************************************************
 * Copyright 2015-2016 Centers Technologies
 * Licensed under MIT http://opensource.org/licenses/MIT
 * *************************************************/

+function ($) {
    'use strict';

    // ------------------------------------------------------------
    // CLASS DEFINITION
    // ------------------------------------------------------------
    var ScrollWatch = function ScrollWatch(element, options) {
        this.$element     = $(element);
        this.options      = options;
        this.onTriggered  = false;
        this.offTriggered = false;
        this.watching     = false;

        this._init();
    };

    ScrollWatch.VERSION = '2.0.0';

    ScrollWatch.DEFAULTS = {
        delay: 0,
        offset: 10,
        anchor: 'top',
        on: null,
        off: null
    };

    ScrollWatch.prototype._init = function() {
        var that = this;
        $(window).on('scroll.grid.scrollwatch', function() {
            that._trigger();
        }).trigger('scroll.grid.scrollwatch');
    };

    ScrollWatch.prototype._trigger = function() {
        var that = this;
        var offsetTop = 0;
        var offsetBottom = 0;

        offsetTop    = $(window).scrollTop() - this.$element.offset().top + $(window).height() - this.options.offset;
        offsetBottom = offsetTop - ($(window).height() + this.$element.outerHeight()) + this.options.offset;

        if ((offsetTop > 0 && offsetTop < $(window).height()) || (offsetBottom < 0 && offsetBottom > -$(window).height())) {
            this.watching = true;
            this.offTriggered = false;
            if (!this.onTriggered) {
                this.options.on && setTimeout(this.options.on, this.options.delay);
                this.onTriggered  = true;
            }
        }

        switch (this.options.anchor) {
            default:
            case 'top':
                if (offsetBottom >= 0) {
                    this.watching = false;
                    this.onTriggered = false;
                    if (!this.offTriggered) {
                        this.options.off && setTimeout(this.options.off, this.options.delay);
                        this.offTriggered = true;
                    }
                }
            break;

            case 'bottom':
                if (offsetTop <= 0) {
                    this.watching = false;
                    this.onTriggered = false;
                    if (!this.offTriggered) {
                        this.options.off && setTimeout(this.options.off, this.options.delay);
                        this.offTriggered = true;
                    }
                }
            break;
        }
    };

    // ------------------------------------------------------------
    // PLUGIN DEFINITION
    // ------------------------------------------------------------
    function Plugin(options) {
        var params   = $.extend({}, ScrollWatch.DEFAULTS, typeof options == 'object' && options);
        var $wrapper = $(params.element);

        return $wrapper.each(function () {
            $(this).data('grid.scrollwatch', (new ScrollWatch(this, params)));
        });
    }

    var old = $.grid.scrollwatch || $.fn.scrollwatch;

    // G.R.I.D jQuery Global Var
    // ------------------------------------------------------------
    $.grid.scrollwatch             = Plugin;
    $.grid.scrollwatch.Constructor = ScrollWatch;

    // ShakeIt jQuery Extension
    // ------------------------------------------------------------
    $.fn.scrollwatch               = Plugin;
    $.fn.scrollwatch.Constructor   = ScrollWatch;

    // ------------------------------------------------------------
    // NO CONFLICT
    // ------------------------------------------------------------
    $.grid.scrollwatch.noConflict  = function() {
        $.grid.scrollwatch = old;
        return this;
    };

}(jQuery);