###
# G.R.I.D : g.r.i.d.js v2.0.1
# -----------------------------------------------------
# Copyright 2015-2016 Centers Technologies
# Licensed under MIT http://opensource.org/licenses/MIT
###

# ------------------------------------------------------------
# G.R.I.D jQuery GLOBAL VARIABLE
# Used to handle G.R.I.D jQuery Plugins.
# ------------------------------------------------------------
jQuery.grid =
  detach: (element, plugin) ->
    $element = jQuery element
    if typeof plugin is 'object'
      for p of plugin
        $element[p] 'detach'
        $element.removeData 'grid.' + p
    else if typeof plugin is 'string'
      $element[plugin] 'detach'
      $element.removeData 'grid.' + plugin
    return

# ------------------------------------------------------------
# G.R.I.D GLOBAL VARIABLE
# Used to define breakpoints, check viewport's size and some
# device and browser parameters (touchscreen, CSS transitions)
# ------------------------------------------------------------
GRID = (() ->
  'use strict'

  # Check if the device has a mouse.
  # First we'll assume the device has no mouse until we
  # detect any mouse movement
  deviceHasMouse = false
  $('body').one 'mousemove', () ->
    deviceHasMouse = true
    return

  # Compatibility for devices running Windows Phone 8 with IE 10.
  if navigator.userAgent.match /IEMobile\/10\.0/
    msViewportStyle = document.createElement 'style'
    msViewportStyle.appendChild document.createTextNode '@-ms-viewport{width:auto!important}'
    document.querySelector('head').appendChild msViewportStyle

  g =
    breakPoints:
      mobile: 480
      tablet_narrow: 768
      tablet_wide: 1024

    onBreakPointChangeCallbacks:
      mobile: []
      tablet_narrow: []
      tablet_wide: []

    init: (options) ->
      defaults =
        breakPoints:
          mobile: g.breakPoints.mobile
          tablet_narrow: g.breakPoints.tablet_narrow
          tablet_wide: g.breakPoints.tablet_wide

      g.params = $.extend {}, defaults, options

      g.breakPoints = g.params.breakPoints

      $window = $ window
      $body   = $ document.body

      $body.addClass 'grid-is-loading'

      $window.on 'load.grid', ->
        $body.removeClass 'grid-is-loading'
        return

      $window.on 'resize.grid', ->
        $html = $ 'html'
        lp = $html.data 'grid.lastBreakPoint'
        cp = (->
          for point of g.params.breakPoints
            if g.is point
              ret = point
              break
          return ret
        )()
        if lp isnt cp
          $html.data 'grid.lastBreakPoint', cp
          g.onBreakPointChangeCallbacks[cp].forEach (cb) ->
            cb()
            return
          return
      return

    onBreakPointChange: (screen, callback) ->
      g.onBreakPointChangeCallbacks[screen].push(callback)
      return

    is: (screen) ->
      $(document.body).outerWidth() <= g.params.breakPoints[screen]

    isTouchScreen: ->
      'ontouchstart' in window

    isPureTouchScreen: ->
      !deviceHasMouse and g.isTouchScreen()

    browserSupportsTransitions: ->
      b = document.body or document.documentElement
      s = b.style
      p = 'transition'
      v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms']

      return yes if typeof s[p] is 'string'

      p = p.charAt(0).toUpperCase() + p.substr 1

      return yes for renderer in v when typeof s[renderer + p] is 'string'

      no

  g)()