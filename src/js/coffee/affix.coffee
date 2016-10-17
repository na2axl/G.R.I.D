###
# G.R.I.D : affix.js v2.1.0
# **************************************************
# Copyright 2015-2016 Centers Technologies
# Licensed under MIT http://opensource.org/licenses/MIT
# **************************************************
# Inspired by Affix 3.3.5
# Developed by the Bootstrap Team
# Licensed under MIT https://github.com/twbs/bootstrap/blob/master/LICENSE
###

(($) ->
  'use strict'

  # ------------------------------------------------------------
  # CLASS DEFINITION
  # ------------------------------------------------------------
  class Affix
    constructor: (element, @options) ->
      @$element = $ element
      @affixed = null
      @unpin = null
      @pinnedOffset = null

      @$target = $ @options.target
        .on 'scroll.grid.affix', $.proxy @checkPosition, this
        .on 'click.grid.affix', $.proxy @checkPositionWithEventLoop, this

      @checkPosition()

    Affix.VERSION = '2.1.0'

    Affix.RESET = 'affix affix-top affix-bottom'

    Affix.DEFAULTS =
      offset: 0,
      target: window,
      top: 0,
      bottom: $('body').outerHeight !0

    detach: ->
      @$element.removeClass(Affix.RESET)
      @$target
        .off 'scroll.grid.affix'
        .off 'scroll.grid.affix'
      return
      
    getState: (scrollHeight, height, offsetTop, offsetBottom) ->
      scrollTop = @$target.scrollTop()
      position = @$element.offset()
      targetHeight = @$target.height()

      return (if scrollTop < offsetTop then 'top' else false) if offsetTop? and @affixed is 'top'

      if @affixed is 'bottom'
        return (if scrollTop + @unpin <= position.top then false else 'bottom') if offsetTop?
        return (if scrollTop + targetHeight <= scrollHeight - offsetBottom then false else 'bottom')

      initializing = @affixed is null
      collideTop  = if initializing then scrollTop else position.top
      collideHeight = if initializing then targetHeight else height
      
      return 'top' if offsetTop isnt null and scrollTop <= offsetTop
      return 'bottom' if offsetBottom isnt null and (collideTop + collideHeight >= scrollHeight - offsetBottom)

      return off

    getPinnedOffset: ->
      return @pinnedOffset if @pinnedOffset
      @$element.removeClass Affix.RESET
        .addClass 'affix'
      scrollTop = @$target.scrollTop()
      position  = @$element.offset()
      return (@pinnedOffset = position.top - scrollTop)

    checkPositionWithEventLoop: ->
      setTimeout $.proxy(@checkPosition, this), 1
      return

    checkPosition: ->
      return no if not @$element.is ':visible'

      height = @$element.outerHeight()
      offset = @options.offset
      offsetTop = offset.top
      offsetBottom = offset.bottom
      scrollHeight = Math.max $(document).outerHeight(), $(document.body).outerHeight()

      if typeof offset isnt 'object' then offsetBottom = offsetTop = offset
      if typeof offsetTop is 'function' then offsetTop = offset.top @$element
      if typeof offsetBottom is 'function' then offsetBottom = offset.bottom @$element

      affix = @getState scrollHeight, height, offsetTop, offsetBottom
      
      if @affixed isnt affix
        if @unpin isnt null then @$element.css 'top', ''
        
        affixType = 'affix' + (if affix then '-' + affix else '')
        e = $.Event affixType + '.grid.affix'

        @$element.trigger e

        return off if e.isDefaultPrevented()

        @affixed = affix
        @unpin = if affix is 'bottom' then @getPinnedOffset() else null

        @$element
          .removeClass Affix.RESET
          .addClass affixType
          .trigger affixType.replace('affix', 'affixed') + '.grid.affix'

      if affix is 'bottom'
        @$element.offset({
          top: scrollHeight - height - offsetBottom
        })

      return

    setTop: (top) ->
      @options.offset.top = top if top isnt undefined
      return
      
    setBottom: (bottom) ->
      @options.offset.bottom = bottom if bottom isnt undefined
      return


  # ------------------------------------------------------------
  # PLUGIN DEFINITION
  # ------------------------------------------------------------
  Plugin = (mode, params...) ->
    data = $(this).data 'grid.affix'
    mode = mode || {}

    if typeof mode is 'object'
      options = mode
      params = $.extend {}, Affix.DEFAULTS, options

      if $('body').find(params.element or @).length < 1
        return

      $wrapper = $ params.element or @
      return $wrapper.each ->
        $(@).data 'grid.affix', (data = new Affix this, params)
        return
    else if typeof mode is 'string'
      data and data[mode].apply(data, params)

    return

  old = $.grid.affix or $.fn.affix

  # G.R.I.D jQuery Global Var
  # ------------------------------------------------------------
  $.grid.affix             = Plugin
  $.grid.affix.Constructor = Affix

  # Alert jQuery Extension
  # ------------------------------------------------------------
  $.fn.affix               = Plugin
  $.fn.affix.Constructor   = Affix

  # ------------------------------------------------------------
  # NO CONFLICT
  # ------------------------------------------------------------
  $.grid.affix.noConflict = ->
    $.grid.affix = old
    return @

  return
)(jQuery)