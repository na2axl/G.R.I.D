/* **************************************************
 * G.R.I.D : affix.js v2.1.0
 * **************************************************
 * Copyright 2015-2016 Centers Technologies
 * Licensed under MIT http://opensource.org/licenses/MIT
 * **************************************************
 * Inspired by Affix 3.3.5
 * Developed by the Bootstrap Team
 * Licensed under MIT https://github.com/twbs/bootstrap/blob/master/LICENSE
 * *************************************************/


+function($) {
    'use strict';

    // ------------------------------------------------------------
    // CLASS DEFINITION
    // ------------------------------------------------------------
    var Affix = function(element, options) {
        this.options = options;
        this.$element = $(element);
        this.affixed = null;
        this.unpin = null;
        this.pinnedOffset = null;

        this.$target = $(this.options.target)
            .on('scroll.grid.affix', $.proxy(this.checkPosition, this))
            .on('click.grid.affix', $.proxy(this.checkPositionWithEventLoop, this));

        this.checkPosition();
    };

    Affix.VERSION = '2.1.0';

    Affix.RESET = 'affix affix-top affix-bottom';

    Affix.DEFAULTS = {
        offset: 0,
        target: window,
        top: 0,
        bottom: 0
    };

    Affix.prototype.detach = function () {
        this.$element.removeClass(Affix.RESET);
        this.$target
            .off('scroll.grid.affix')
            .off('click.grid.affix');
    };

    Affix.prototype.getState = function(scrollHeight, height, offsetTop, offsetBottom) {
        var scrollTop = this.$target.scrollTop();
        var position = this.$element.offset();
        var targetHeight = this.$target.height();

        if (offsetTop !== null && this.affixed === 'top') return scrollTop < offsetTop ? 'top' : false;

        if (this.affixed === 'bottom') {
            if (offsetTop !== null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom';
            return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom';
        }

        var initializing = this.affixed === null;
        var collideTop = initializing ? scrollTop : position.top;
        var collideHeight = initializing ? targetHeight : height;

        if (offsetTop !== null && scrollTop <= offsetTop) return 'top';
        if (offsetBottom !== null && (collideTop + collideHeight >= scrollHeight - offsetBottom)) return 'bottom';

        return false;
    };

    Affix.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(Affix.RESET).addClass('affix');
        var scrollTop = this.$target.scrollTop();
        var position = this.$element.offset();
        return (this.pinnedOffset = position.top - scrollTop);
    };

    Affix.prototype.checkPositionWithEventLoop = function() {
        setTimeout($.proxy(this.checkPosition, this), 1);
    };

    Affix.prototype.checkPosition = function() {
        if (!this.$element.is(':visible')) return;

        var height = this.$element.outerHeight();
        var offset = this.options.offset;
        var offsetTop = offset.top;
        var offsetBottom = offset.bottom;
        var scrollHeight = Math.max($(document).outerHeight(), $(document.body).outerHeight());

        if (typeof offset !== 'object') offsetBottom = offsetTop = offset;
        if (typeof offsetTop === 'function') offsetTop = offset.top(this.$element);
        if (typeof offsetBottom === 'function') offsetBottom = offset.bottom(this.$element);

        var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);

        if (this.affixed !== affix) {
            if (this.unpin !== null) this.$element.css('top', '');

            var affixType = 'affix' + (affix ? '-' + affix : '');
            var e = $.Event(affixType + '.grid.affix');

            this.$element.trigger(e);

            if (e.isDefaultPrevented()) return;

            this.affixed = affix;
            this.unpin = affix === 'bottom' ? this.getPinnedOffset() : null;

            this.$element
                .removeClass(Affix.RESET)
                .addClass(affixType)
                .trigger(affixType.replace('affix', 'affixed') + '.grid.affix');
        }

        if (affix === 'bottom') {
            this.$element.offset({
                top: scrollHeight - height - offsetBottom
            });
        }
    };

    Affix.prototype.setTop = function(top) {
        if (!(typeof top === 'undefined')) {
            this.options.offset.top = bottom;
        }
    };

    Affix.prototype.setBottom = function(bottom) {
        if (!(typeof bottom === 'undefined')) {
            this.options.offset.bottom = bottom;
        }
    };

    // ------------------------------------------------------------
    // PLUGIN DEFINITION
    // ------------------------------------------------------------
    function Plugin() {
        var args = arguments;
        var data = $(this).data('grid.affix');
        args[0]  = args[0] || {};

        if (typeof args[0] === 'object') {
            var options  = args[0];
            var params   = $.extend({}, Affix.DEFAULTS, options);
            if ($('body').find(params.element || this).length < 1) {
                return;
            }

            return $(params.element || this).each(function () {
                $(this).data('grid.affix', (data = new Affix(this, params)));
            });
        }
        else if (typeof args[0] === 'string') {
            data && data[args[0]]((!(typeof args[1] === 'undefined')) ? args[1] : void 0);
        }
    }

    var old = $.grid.affix || $.fn.affix;

    // G.R.I.D jQuery Global Var
    // ------------------------------------------------------------
    $.grid.affix             = Plugin;
    $.grid.affix.Constructor = Affix;

    // Affix jQuery Extension
    // ------------------------------------------------------------
    $.fn.affix               = Plugin;
    $.fn.affix.Constructor   = Affix;

    // ------------------------------------------------------------
    // NO CONFLICT
    // ------------------------------------------------------------
    $.grid.affix.noConflict = function() {
        $.grid.affix = old;
        return this
    };

} (jQuery);
