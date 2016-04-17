/* **************************************************
 * G.R.I.D : slider.js v2.0.0
 * **************************************************
 * Copyright 2015-2016 Centers Technologies
 * Licensed under MIT http://opensource.org/licenses/MIT
 * *************************************************/

+function ($) {
    'use strict';

    // ------------------------------------------------------------
    // CLASS DEFINITION
    // ------------------------------------------------------------
    var Slider = function Slider(element, options) {
        this.$element     = $(element);
        this.options      = options;
        this.$slider      = this.$element.find('ul');
        this.$slides      = this.$slider.children('li');
        this.slideCount   = this.$slides.length;
        this.$canvas      = null;
        this.prevIndex    = 0;
        this.currIndex    = 0;
        this.nextIndex    = 0;
        this.responsiveW  = 0;
        this.responsiveR  = 0;
        this.responsiveH  = 0;
        this.interval     = null;
        this.paused       = false;

        if (this.options.timeOut < 1000) {
            this.options.timeOut = 1000;
        }

        this.options.pauseHover && !GRID.isTouchScreen() && this.$element
            .on('mouseenter.grid.slider', $.proxy(this.pause, this))
            .on('mouseleave.grid.slider', $.proxy(this.resume, this));

        this.start();
    }

    Slider.VERSION  = '2.0.0';

    Slider.DEFAULTS = {
        width:       1500,
        height:      500,
        animSpeed:   500,
        animType:    'fade',
        timeOut:     10000,
        useCaptions: true,
        responsive:  true,
        pauseHover:  true
    };

    Slider.prototype.start = function() {
        var that = this;

        this.$slides.addClass('simpleSlider-slide');

        if (this.options.responsive) {
            this.set_responsive();
        }
        else {
            this.set_static();
        }

        if (this.options.useCaptions) {
            this.create_captions();
        }

        if (this.options.animType == 'fade') {
            this.prepare_fade_anim();
        }
        else if (this.options.animType == 'push-left' ||
                 this.options.animType == 'push-right' ||
                 this.options.animType == 'push-down' ||
                 this.options.animType == 'push-up') {

            this.prepare_push_anim();
        }
        else if (this.options.animType == 'slide-left' ||
                 this.options.animType == 'slide-right' ||
                 this.options.animType == 'slide-down' ||
                 this.options.animType == 'slide-up') {

            this.prepare_slide_anim();
        }
        else if (this.options.animType == 'zoom-in' ||
                 this.options.animType == 'zoom-out') {

            this.prepare_zoom_anim();
        }
        else {
            this.prepare_none_anim();
        }

        this.reset_positions();

        this.create_links();

        this.reset_timer();
    };

    Slider.prototype.reset_timer = function() {
        this.pause();
        this.resume();
    };

    Slider.prototype.resume = function() {
        var that = this;

        this.interval = setInterval(function() {
            that.show_next();
        }, this.options.timeOut);

        this.paused = false;
    };

    Slider.prototype.pause = function() {
        this.interval = clearInterval(this.interval);

        this.paused = true;
    };

    Slider.prototype.reset_positions  = function() {
        this.$slider.css({
            top: 'unset',
            left: 'unset',
            right: 'unset',
            bottom: 'unset'
        });
        this.$slides.css({
            top: 'unset',
            left: 'unset',
            right: 'unset',
            bottom: 'unset'
        });
    };

    Slider.prototype.reset_dimensions = function(width, height) {
        this.$slides.css({
            'height'        : height,
            'width'         : width
        });
        this.$slides.find('img').css({
            'height'        : height,
            'width'         : width
        });
        this.$slider.css({
            'height'        : height,
            'width'         : width
        });
    };

    Slider.prototype.set_responsive = function() {
        var that = this;

        this.responsiveW = this.$element.outerWidth(),
        this.responsiveR = this.responsiveW / this.options.width,
        this.responsiveH = this.responsiveR * this.options.height;
        this.reset_dimensions('100%', this.responsiveH);
        if(this.responsiveW < this.options.width){
            this.reset_dimensions(this.responsiveW, this.responsiveH);
        }
        $(window).on('load.grid.slider', function(){
            that.responsiveW = that.$element.outerWidth(),
            that.responsiveR = that.responsiveW / that.options.width,
            that.responsiveH = that.responsiveR * that.options.height;
            that.reset_dimensions('100%', that.responsiveH);
            that.reset_dimensions(that.responsiveW, that.responsiveH);
            that.$canvas && that.$canvas.css({
                'width'     : that.responsiveW,
                'height'    : that.responsiveH,
                'overflow'  : 'hidden',
                'position'  : 'relative'
            });
            if (that.options.animType == 'push-left') {
                that.$slider.css({
                    'width'     : that.responsiveW * that.slideCount ,
                    'height'    : that.responsiveH,
                    'left'      : 0
                });
            }
            else if (that.options.animType == 'push-right') {
                that.$slider.css({
                    'width'     : that.responsiveW * that.slideCount,
                    'height'    : that.responsiveH,
                    'right'     : that.responsiveW * (that.slideCount - 1)
                });
            }
            else if (that.options.animType == 'push-up') {
                that.$slider.css({
                    'width'     : that.responsiveW,
                    'height'    : that.responsiveH * that.slideCount,
                    'top'       : 0
                });
            }
            else if (that.options.animType == 'push-down') {
                that.$slider.css({
                    'width'     : that.responsiveW,
                    'height'    : that.responsiveH * that.slideCount,
                    'bottom'    : that.responsiveH * (that.slideCount - 1)
                });
            }
        }).on('resize.grid.slider', function() {
            $(window).trigger('load.grid.slider');
        });
    };

    Slider.prototype.set_static = function() {
        this.reset_dimensions(this.options.width, this.options.height);
    };

    Slider.prototype.create_links = function() {
        this.$slides.find('img').each(function() {
            var $i   = $(this);
            var link = $i.attr('data-link');
            if (link) {
                $i.wrap('<a href="'+link+'"></a>');
            }
        });
    };

    Slider.prototype.create_captions = function() {
        this.$slides.find('img').each(function() {
            var $i      = $(this);
            var caption = $i.attr('alt');
            if (caption) {
                $i.parent().find('.simpleSlider-caption').length || $i.after('<p class="simpleSlider-caption">'+caption+'</p>');
            }
        });
    };

    Slider.prototype.init_go_next = function() {
        this.prevIndex = this.slideCount - 1;
        this.currIndex = 0;
        this.nextIndex = this.currIndex + 1;
    };

    Slider.prototype.init_go_previous = function() {
        this.prevIndex = this.slideCount - 2;
        this.currIndex = this.slideCount - 1;
        this.nextIndex = this.currIndex - 1;
    };

    Slider.prototype.prepare_fade_anim = function() {
        this.$slides.show(0);

        this.$slides.css({
            'display'       : 'block'
        });

        this.$slides.each(function(index) {
            var $s = $(this);
            if (index > 0) {
                $s.hide(0);
            }
        });

        this.init_go_next();
    };

    Slider.prototype.prepare_push_anim = function() {
        if (this.options.animType == 'push-left' || this.options.animType == 'push-up') {
            this.init_go_next();
        }
        else if (this.options.animType == 'push-right' || this.options.animType == 'push-down') {
            this.init_go_previous();
        }

        var wrapper  = this.$element.find('.simpleSlider-wrapper');
        this.$canvas = (wrapper.length > 0) ? wrapper : $('<div></div>');
        this.$canvas.attr('class', 'simpleSlider-'+this.options.animType+'-wrapper simpleSlider-wrapper');

        if(this.options.responsive && (this.responsiveW < this.options.width)){
            if (this.options.animType == 'push-left') {
                this.$canvas.css({
                    'width'     : this.responsiveW,
                    'height'    : this.responsiveH,
                    'overflow'  : 'hidden',
                    'position'  : 'relative'
                });

                this.$slider.css({
                    'width'     : this.responsiveW * this.slideCount,
                    'height'    : this.responsiveH,
                    'left'      : 0
                });
            }
            else if (this.options.animType == 'push-right') {
                this.$canvas.css({
                    'width'     : this.responsiveW,
                    'height'    : this.responsiveH,
                    'overflow'  : 'hidden',
                    'position'  : 'relative'
                });

                this.$slider.css({
                    'width'     : this.responsiveW * this.slideCount,
                    'height'    : this.responsiveH,
                    'right'     : this.responsiveW * (this.slideCount - 1)
                });
            }
            else if (this.options.animType == 'push-up') {
                this.$canvas.css({
                    'width'     : this.responsiveW,
                    'height'    : this.responsiveH,
                    'overflow'  : 'hidden',
                    'position'  : 'relative'
                });

                this.$slider.css({
                    'width'     : this.responsiveW,
                    'height'    : this.responsiveH * this.slideCount,
                    'top'       : 0
                });
            }
            else if (this.options.animType == 'push-down') {
                this.$canvas.css({
                    'width'     : this.responsiveW,
                    'height'    : this.responsiveH,
                    'overflow'  : 'hidden',
                    'position'  : 'relative'
                });

                this.$slider.css({
                    'width'     : this.responsiveW,
                    'height'    : this.responsiveH * this.slideCount,
                    'bottom'    : this.responsiveH * (this.slideCount - 1)
                });
            }
        }
        else {

            if (this.options.animType == 'push-left') {
                this.$canvas.css({
                    'width'     : this.options.width,
                    'height'    : this.options.height,
                    'overflow'  : 'hidden',
                    'position'  : 'relative'
                });

                this.$slider.css({
                    'width'     : this.options.width * this.slideCount,
                    'height'    : this.options.height,
                    'left'      : 0
                });
            }

            else if (this.options.animType == 'push-right') {
                this.$canvas.css({
                    'width'     : this.options.width,
                    'height'    : this.options.height,
                    'overflow'  : 'hidden',
                    'position'  : 'relative'
                });

                this.$slider.css({
                    'width'     : this.options.width * this.slideCount,
                    'height'    : this.options.height,
                    'right'     : this.options.width * (this.slideCount - 1)
                });
            }

            else if (this.options.animType == 'push-up') {
                this.$canvas.css({
                    'width'     : this.options.width,
                    'height'    : this.options.height,
                    'overflow'  : 'hidden',
                    'position'  : 'relative'
                });

                this.$slider.css({
                    'width'     : this.options.width,
                    'height'    : this.options.height * this.slideCount,
                    'top'       : 0
                });
            }

            else if (this.options.animType == 'push-down') {
                this.$canvas.css({
                    'width'     : this.options.width,
                    'height'    : this.options.height,
                    'overflow'  : 'hidden',
                    'position'  : 'relative'
                });

                this.$slider.css({
                    'width'     : this.options.width,
                    'height'    : this.options.height * this.slideCount,
                    'bottom'    : this.options.height * (this.slideCount - 1)
                });
            }
        }

        if (this.options.animType == 'push-left' || this.options.animType == 'push-up') {
            this.$slides.css({
                'float'         : 'left',
                'position'      : 'relative',
                'display'       : 'list-item'
            });
        }
        else if (this.options.animType == 'push-right' || this.options.animType == 'push-down') {
            this.$slides.css({
                'float'         : 'right',
                'position'      : 'relative',
                'display'       : 'list-item'
            });
        }

        this.$canvas.prependTo(this.$element);
        this.$slider.appendTo(this.$canvas);
    };

    Slider.prototype.prepare_slide_anim = function() {
        var that = this;

        if (this.options.animType == 'slide-left' || this.options.animType == 'slide-up') {
            this.$slides.css({
                'float'         : 'left',
                'position'      : 'absolute',
                'top'           : 0,
                'display'       : 'list-item'
            });
        }
        else if (this.options.animType == 'slide-right' || this.options.animType == 'slide-down') {
            this.$slides.css({
                'float'         : 'right',
                'position'      : 'absolute',
                'top'           : 0,
                'display'       : 'list-item'
            });
        }

        this.$slides.show(0);

        this.$slides.each(function(index) {
            var $s = $(this);
            $s.css('z-index', that.slideCount - index);
            if (index > 1) {
                $s.hide(0);
            }
        });

        this.init_go_next();
    };

    Slider.prototype.prepare_zoom_anim = function() {
        this.$slides.show(0);

        this.$slides.each(function(index) {
            var $s = $(this);
            if (index > 0) {
                $s.hide(0);
            }
        });

        this.init_go_next();
    };

    Slider.prototype.prepare_none_anim = function() {
        this.$slides.show(0);

        this.$slides.each(function(index) {
            var $s = $(this);
            if (index > 0) {
                $s.hide(0);
            }
        });

        this.init_go_next();
    };

    Slider.prototype.go_next = function() {
        if (this.nextIndex < this.slideCount - 1) {
            this.currIndex++;
            this.prevIndex = this.currIndex - 1;
        }
        else {
            this.currIndex = -1;
            this.prevIndex = this.slideCount - 1;
        }
        this.nextIndex = this.currIndex + 1;
    };

    Slider.prototype.go_previous = function() {
        if (this.nextIndex > 0) {
            this.currIndex--;
            this.prevIndex = this.currIndex - 1;
        }
        else {
            this.currIndex = this.slideCount;
            this.prevIndex = 0;
        }
        this.nextIndex = this.currIndex - 1;
    };

    Slider.prototype.show_next = function() {
        var that = this,
            slideH,
            slideW;
        if (that.options.responsive) {
            slideW = that.responsiveW;
            slideH = that.responsiveH;
        }
        else {
            slideW = that.options.width;
            slideH = that.options.height;
        }
        if (that.options.animType == 'fade') {
            that.$slides.eq(that.currIndex).fadeOut(that.options.animSpeed, function() {
                that.$slides.eq(that.nextIndex).fadeIn(that.options.animSpeed, function() {
                    that.go_next();
                });
            });
        }
        else if (that.options.animType == 'push-left') {
            that.$slider.animate({'left': -that.nextIndex * slideW }, that.options.animSpeed, function(){
                that.go_next();
            });
        }
        else if (that.options.animType == 'push-right') {
            that.$slider.animate({'right': that.nextIndex * slideW }, that.options.animSpeed, function(){
                that.go_previous();
            });
        }
        else if (that.options.animType == 'push-up') {
            that.$slider.animate({'top': -that.nextIndex * slideH }, that.options.animSpeed, function(){
                that.go_next();
            });
        }
        else if (that.options.animType == 'push-down') {
            that.$slider.animate({'bottom': that.nextIndex * slideH }, that.options.animSpeed, function(){
                that.go_previous();
            });
        }
        else if (that.options.animType == 'slide-left') {
            that.$slides.eq(that.nextIndex).css({'display': 'list-item'});
            that.$slides.eq(that.currIndex).animate({'left': -slideW }, that.options.animSpeed, function(){
                var z = that.$slides.eq(that.currIndex).css('z-index');
                that.$slides.eq(that.currIndex).css({'display': 'none', 'z-index': that.$slides.eq(that.nextIndex).css('z-index')});
                that.$slides.eq(that.nextIndex).css('z-index', z);
                that.$slides.eq(that.currIndex).animate({'left': 0 }, that.options.animSpeed);
                that.go_next();
            });
        }
        else if (that.options.animType == 'slide-right') {
            that.$slides.eq(that.nextIndex).css({'display': 'list-item'});
            that.$slides.eq(that.currIndex).animate({'right': -slideW }, that.options.animSpeed, function(){
                var z = that.$slides.eq(that.currIndex).css('z-index');
                that.$slides.eq(that.currIndex).css({'display': 'none', 'z-index': that.$slides.eq(that.nextIndex).css('z-index')});
                that.$slides.eq(that.nextIndex).css('z-index', z);
                that.$slides.eq(that.currIndex).animate({'right': 0 }, that.options.animSpeed);
                that.go_next();
            });
        }
        else if (that.options.animType == 'slide-up') {
            that.$slides.eq(that.nextIndex).css({'display': 'list-item'});
            that.$slides.eq(that.currIndex).animate({'top': -slideH }, that.options.animSpeed, function(){
                var z = that.$slides.eq(that.currIndex).css('z-index');
                that.$slides.eq(that.currIndex).css({'display': 'none', 'z-index': that.$slides.eq(that.nextIndex).css('z-index')});
                that.$slides.eq(that.nextIndex).css('z-index', z);
                that.$slides.eq(that.currIndex).animate({'top': 0 }, that.options.animSpeed);
                that.go_next();
            });
        }
        else if (that.options.animType == 'slide-down') {
            that.$slides.eq(that.nextIndex).css({'display': 'list-item'});
            that.$slides.eq(that.currIndex).animate({'bottom': -slideH }, that.options.animSpeed, function(){
                var z = that.$slides.eq(that.currIndex).css('z-index');
                that.$slides.eq(that.currIndex).css({'display': 'none', 'z-index': that.$slides.eq(that.nextIndex).css('z-index')});
                that.$slides.eq(that.nextIndex).css('z-index', z);
                that.$slides.eq(that.currIndex).animate({'bottom': 0 }, that.options.animSpeed);
                that.go_next();
            });
        }
        else if (that.options.animType == 'zoom-in') {
            that.$slides.eq(that.currIndex).find('img:first-child').animate({'height': 2 * slideH, 'width': 2 * slideW, 'top': '-50%', 'left': '-50%'}, that.options.animSpeed);
            that.$slides.eq(that.currIndex).fadeOut(that.options.animSpeed, function() {
                that.$slides.eq(that.nextIndex).fadeIn(that.options.animSpeed, function() {
                    that.$slides.eq(that.currIndex).find('img:first-child').animate({'height': slideH, 'width': slideW, 'top': 0, 'left': 0}, that.options.animSpeed);
                    that.go_next();
                });
            });
        }
        else if (that.options.animType == 'zoom-out') {
            that.$slides.eq(that.currIndex).find('img:first-child').animate({'height': 0, 'width': 0, 'top': '50%'}, that.options.animSpeed);
            that.$slides.eq(that.currIndex).fadeOut(that.options.animSpeed, function() {
                that.$slides.eq(that.nextIndex).fadeIn(that.options.animSpeed, function() {
                    that.$slides.eq(that.currIndex).find('img:first-child').animate({'height': slideH, 'width': slideW, 'top': 0}, that.options.animSpeed);
                    that.go_next();
                });
            });
        }
        else {
            that.$slides.eq(that.currIndex).css('display', 'none');
            that.$slides.eq(that.nextIndex).css('display', 'block');
            that.go_next();
        }
    };

    // ------------------------------------------------------------
    // PLUGIN DEFINITION
    // ------------------------------------------------------------
    function Plugin(options) {
        var params   = $.extend({}, Slider.DEFAULTS, typeof options == 'object' && options);
        var $wrapper = $(params.wrapper || this);

        return $wrapper.each(function() {
            $(this).data('grid.slider', (new Slider(this, params)));
        });
    }

    var old = $.grid.slider || $.fn.slider;

    // G.R.I.D jQuery Global Var
    // ------------------------------------------------------------
    $.grid.slider             = Plugin;
    $.grid.slider.Constructor = Slider;

    // ShakeIt jQuery Extension
    // ------------------------------------------------------------
    $.fn.slider               = Plugin;
    $.fn.slider.Constructor   = Slider;

    // ------------------------------------------------------------
    // NO CONFLICT
    // ------------------------------------------------------------
    $.grid.slider.noConflict  = function() {
        $.grid.slider = old;
        return this;
    };

}(jQuery);