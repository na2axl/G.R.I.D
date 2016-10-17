###
# G.R.I.D : alert.js v2.1.0
# **************************************************
# Copyright 2015-2016 Centers Technologies
# Licensed under MIT http://opensource.org/licenses/MIT
###

(($) ->
  'use strict'

  # ------------------------------------------------------------
  # CLASS DEFINITION
  # ------------------------------------------------------------
  class Alert
    constructor: (element, @options) ->
      @$wrapper = $(element)
      @options  = options
      @$text    = null
      @$alert   = null
      @$close   = null
    
      @options.text and @show()

    Alert.VERSION = '2.1.0'

    Alert.DEFAULTS =
      element: undefined
      type: 'info'
      text: null
      speed: 500
      animation: 'fade'
      intensity: '20px'
      cleanBefore: yes
      position: 'before'
      withClose: no
      hideAfter: no
      timeOut: 5000
      onOpen: null
      onHide: null

    _init: ->
      @$text = $('<span class="grid-alert-test"></span>').html @options.text
      @$alert = $('<div class="grid-alert"></div>').addClass(@options.type).append @$text
      return

    setType: (type) ->
      @options.type = type or @options.type
      return @

    setText: (text) ->
      @options.text = text or @options.text
      return @

    setSpeed: (speed) ->
      @options.speed = speed or @options.speed
      return @

    setAnimation: (anim) ->
      @options.animation = anim or @options.animation
      return @

    setIntensity: (intensity) ->
      @options.intensity = intensity or @options.intensity
      return @

    setCleanBefore: (clean) ->
      @options.cleanBefore = clean or @options.cleanBefore
      return @

    setPosition: (position) ->
      @options.position = position or @options.position
      return @

    setWithClose: (close) ->
      @options.withClose = close or @options.withClose
      return @

    setHideAfter: (hide) ->
      @options.hideAfter = hide or @options.hideAfter
      return @

    setTimeout: (timeOut) ->
      @options.timeOut = timeOut or @options.timeOut
      return @

    onOpen: (callback) ->
      @options.onOpen = callback or @options.onOpen
      return @

    onHide: (callback) ->
      @options.onHide = callback or @options.onHide
      return @

    close: ->
      @$wrapper.fadeOut @options.speed, @options.onHide
      return @

    shake: (anim) ->
      that = @
      n = {}
      r = {}
      p = {}
      side = ''

      anim = anim or @options.animation

      if anim is 'shake-horizontal'
        side = 'left'
      else if anim is 'shake-vertical'
        side = 'top'

      n[side] = '-' + @options.intensity
      p[side] = @options.intensity
      r[side] = 0

      that.$wrapper.animate(n,
        that.options.speed,
        () ->
          that.$wrapper.animate(p,
            that.options.speed,
            () ->
              that.$wrapper.animate(n,
                that.options.speed,
                () ->
                  that.$wrapper.animate(p,
                    that.options.speed,
                    () ->
                      that.$wrapper.animate(r,
                        that.options.speed,
                        () ->
                          that.options.onFinish and that.options.onFinish()
                          return
                      )
                      return
                  )
                  return
              )
              return
          )
          return
      )

      return @

    show: ->
      that = @

      @_init()

      if @options.withClose
        (@$alert.find('.grid-alert-close').length > 0) or (@$close = $('<span class="grid-alert-close"></span>').prependTo @$alert )
        @$close.on 'click.grid.alert', $.proxy this.close, this

      if @options.type is 'loading'
        (@$alert.find('.grid-alert-loader').length > 0) or ($('<span class="grid-alert-loader"></span>').prependTo @$alert)

      @$wrapper.fadeOut 'fast', ->
        that.$wrapper.empty() if that.options.cleanBefore is true
        that.$wrapper.prepend(that.$alert) if that.options.position is 'before'
        that.$wrapper.append(that.$alert) if that.options.position is 'after'
        that.$wrapper.fadeIn(that.options.speed, that.options.onOpen) if that.options.animation is 'fade'
        if that.options.animation is 'shake-horizontal' or that.options.animation is 'shake-vertical'
          that.$wrapper.fadeIn 'fast', ->
            that.shake()
            that.options.onOpen and that.options.onOpen()
            return
        if that.options.hideAfter is yes
          clearTimeout(hide_alert)
          hide_alert = setTimeout(->
            that.close()
            return
          , that.options.timeOut)
          return
      return @

  # ------------------------------------------------------------
  # PLUGIN DEFINITION
  # ------------------------------------------------------------
  Plugin = (mode, params...) ->
    data = $(this).data 'grid.alert'
    mode = mode || {}

    if typeof mode is 'object'
      options = mode
      params = $.extend {}, Alert.DEFAULTS, options

      if $('body').find(params.element or @).length < 1
        return

      $wrapper = $ params.element or @
      return $wrapper.each ->
        $(@).data 'grid.alert', (data = new Alert this, params)
        return
    else if typeof mode is 'string'
      data and data[mode].apply(data, params)

    return

  old = $.grid.alert or $.fn.alert

  # G.R.I.D jQuery Global Var
  # ------------------------------------------------------------
  $.grid.alert             = Plugin
  $.grid.alert.Constructor = Alert

  # Alert jQuery Extension
  # ------------------------------------------------------------
  $.fn.alert               = Plugin
  $.fn.alert.Constructor   = Alert

  # ------------------------------------------------------------
  # NO CONFLICT
  # ------------------------------------------------------------
  $.grid.alert.noConflict = ->
    $.grid.alert = old
    return @

  return
)(jQuery)