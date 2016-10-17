/* **************************************************
 * G.R.I.D : carousel.js v2.1.0
 * **************************************************
 * Copyright 2015-2016 Centers Technologies
 * Licensed under MIT http://opensource.org/licenses/MIT
 * *************************************************/

+function ($) {
    'use strict';

    // ------------------------------------------------------------
    // CLASS DEFINITION
    // ------------------------------------------------------------
    var Carousel = function Carousel(element, options) {
        this.$element    = $(element);
        this.options     = options;
        this.$wrapper    = $('<div class="grid-carousel-wrapper"></div>');
        this.$forward    = $('<span class="grid-carousel-forward"></span>');
        this.$backward   = $('<span class="grid-carousel-backward"></span>');
        this.$reel       = this.$element.children('.grid-carousel-reel');
        this.$items      = this.$reel.children('.grid-carousel-item');
        this.pos         = 0;
        this.leftLimit   = 0;
        this.rightLimit  = 0;
        this.itemWidth   = 0;
        this.reelWidth   = 0;
        this.timerId     = 0;
        this.onTriggered = false;
        this.currentItem = 0;

        this.options.controlHover || this.$element.addClass('grid-carousel-controls-not-hover');

        this._init();
    };

    Carousel.VERSION  = '2.1.0';

    Carousel.DEFAULTS = {
        speed: 4,
        fadeIn: true,
        fadeDelay: 250,
        controlHover: true,
        slideOn: 'mouseover',
        pushItem: 1
    };

    Carousel.prototype.setSpeed = function(speed) {
        this.options.speed = speed || this.options.speed;
        this._init();
        return this;
    };

    Carousel.prototype.setFadeIn = function(fadeIn) {
        this.options.fadeIn = fadeIn || this.options.fadeIn;
        this._init();
        return this;
    };

    Carousel.prototype.setFadeDelay = function(fadeDelay) {
        this.options.fadeDelay = fadeDelay || this.options.fadeDelay;
        this._init();
        return this;
    };

    Carousel.prototype.setControlHover = function(controlHover) {
        this.options.controlHover = controlHover || this.options.controlHover;
        this._init();
        return this;
    };

    Carousel.prototype.setSlideOn = function(slideOn) {
        this.options.slideOn = slideOn || this.options.slideOn;
        this._init();
        return this;
    };

    Carousel.prototype._init = function() {
        var that = this;

        this.$forward
            .appendTo(this.$element)
            .hide();

        this.$backward
            .appendTo(this.$element)
            .hide();

        this.$reel.wrap(this.$wrapper);

        if (this.options.fadeIn) {
            this.$items.addClass('grid-carousel-items-is-loading');
            $(window).on('scroll.grid.carousel', $.proxy(this._checkVisible, this)).trigger('scroll.grid.carousel');
        }

        if (this.options.slideOn === 'mouseover') {
            this.$forward
                .on('mouseenter.grid.carousel', $.proxy(this.slideRight, this))
                .on('mouseleave.grid.carousel', function() {
                    window.clearInterval(that.timerId);
                });

            this.$backward
                .on('mouseenter.grid.carousel', $.proxy(this.slideLeft, this))
                .on('mouseleave.grid.carousel', function() {
                    window.clearInterval(that.timerId);
                });
        }
        else if (this.options.slideOn === 'click') {
            this.$forward
                .on('click.grid.carousel', $.proxy(this.pushRight, this));

            this.$backward
                .on('click.grid.carousel', $.proxy(this.pushLeft, this));
        }

        this._initEvents();
    };

    Carousel.prototype._initEvents = function () {
        var that = this;

        this.reelWidth = this.$reel[0].scrollWidth;
        this._onChange();
        this._update();

        $(window).on('resize.grid.carousel', function () {
            that.reelWidth = that.$reel[0].scrollWidth;
            that._onChange();
            that._update();
        });
    };

    Carousel.prototype._update = function () {
        this.rightLimit = (- 1 * this.reelWidth) + this.$element.width();
        this.leftLimit = 0;
        this._updatePos(0);
    };


    Carousel.prototype._updatePos = function (pos) {
        this.pos = (typeof pos === 'undefined') ? this.pos : pos;
        this.$reel.animate({'left': this.pos}, this.options.speed);
    };


    Carousel.prototype._onChange = function () {
        if (GRID.isPureTouchScreen()) {
            this.$reel
                .css('overflow-y', 'hidden')
                .css('overflow-x', 'scroll')
                .scrollLeft(0);
            this.$forward.hide();
            this.$backward.hide();
        }
        else {
            this.$reel
                .css('overflow', 'visible')
                .scrollLeft(0);
            this.$forward.show();
            this.$backward.show();
        }
    };

    Carousel.prototype._checkVisible = function() {
        var that         = this;
        var offsetTop    = $(window).scrollTop() - this.$element.offset().top + $(window).height() - 50;
        var offsetBottom = offsetTop - ($(window).height() + this.$element.outerHeight()) + 50;

        if ((offsetTop > 0 && offsetTop < $(window).height()) || (offsetBottom < 0 && offsetBottom > -$(window).height())) {
            if (!this.onTriggered) {
                var timerId,
                    limit = this.$items.length - Math.ceil(this.$element.outerWidth(!0) / this.itemWidth);

                timerId = setInterval(function () {
                    var x  = that.$items.filter('.grid-carousel-items-is-loading'),
                        xf = x.first();
                    if (x.length <= limit) {
                        window.clearInterval(timerId);
                        that.$items.removeClass('grid-carousel-items-is-loading');
                        return ;
                    }
                    xf.removeClass('grid-carousel-items-is-loading');
                }, that.options.fadeDelay);
                this.onTriggered  = true;
            }
        }
    };

    Carousel.prototype.slideLeft = function () {
        var that = this;

        this.timerId = window.setInterval(function() {
            that.pos += that.options.speed;

            if (that.pos >= that.leftLimit) {
                window.clearInterval(that.timerId);
                that.pos = that.leftLimit;
            }

            that._updatePos();
        }, 10);

        return this;
    };

    Carousel.prototype.slideRight = function () {
        var that = this;

        this.timerId  = window.setInterval(function() {
            that.pos -= that.options.speed;

            if (that.pos <= that.rightLimit) {
                window.clearInterval(that.timerId);
                that.pos  = that.rightLimit;
            }

            that._updatePos();
        }, 10);

        return this;
    };

    Carousel.prototype.pushLeft = function () {
        var itemWidth = this.$items.eq(this.currentItem).outerWidth(!0);
        this.pos += (itemWidth + 3) * this.options.pushItem;

        if (this.pos >= this.leftLimit) {
            this.pos  = this.leftLimit;
        }
        else {
            this.currentItem += this.options.pushItem;
        }

        this._updatePos();

        return this;
    };


    Carousel.prototype.pushRight = function () {
        var itemWidth = this.$items.eq(this.currentItem).outerWidth(!0);
        this.pos -= (itemWidth + 3) * this.options.pushItem;

        if (this.pos <= this.rightLimit) {
            this.pos  = this.rightLimit;
        }
        else {
            this.currentItem -= this.options.pushItem;
        }

        this._updatePos();

        return this;
    };

    // ------------------------------------------------------------
    // PLUGIN DEFINITION
    // ------------------------------------------------------------
    function Plugin() {
        var args = arguments;
        var data = $(this).data('grid.carousel');
        args[0]  = args[0] || {};

        if (typeof args[0] === 'object') {
            var options  = args[0];
            var params   = $.extend({}, Carousel.DEFAULTS, options);
            if ($('body').find(params.element || this).length < 1) {
                return;
            }

            return $(params.element || this).each(function () {
                $(this).data('grid.carousel', (data = new Carousel(this, params)));
            });
        }
        else if (typeof args[0] === 'string') {
            data && data[args[0]]((!(typeof args[1] === 'undefined')) ? args[1] : void 0);
        }
    }

    var old = $.grid.carousel || $.fn.carousel;

    // G.R.I.D jQuery Global Var
    // ------------------------------------------------------------
    $.grid.carousel             = Plugin;
    $.grid.carousel.Constructor = Carousel;

    // Carousel jQuery Extension
    // ------------------------------------------------------------
    $.fn.carousel               = Plugin;
    $.fn.carousel.Constructor   = Carousel;

    // ------------------------------------------------------------
    // NO CONFLICT
    // ------------------------------------------------------------
    $.grid.carousel.noConflict  = function() {
        $.grid.carousel = old;
        return this;
    };

} (jQuery);
