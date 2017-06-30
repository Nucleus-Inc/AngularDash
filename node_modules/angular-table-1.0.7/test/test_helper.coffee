getChildrenFor = (element, selector) ->
  element[0].querySelectorAll(selector)

extractVisibleElements = (elements) ->
  _.reject(elements, (element) ->
    angular.element(element).hasClass("ng-hide")
  )

extractHtmlToArray = (elements) ->
  _.map(elements, (element) ->
    angular.element(element).html()
  )

class ScopeWrapper
  constructor: (@scope) ->

  set: (expression, value) ->
    @scope.$eval("#{expression}=#{JSON.stringify(value)}")

  get: (expression) ->
    @scope.$eval("#{expression}")

class TemplateCompiler
  constructor: (templateName) ->
    @templateName = templateName
    module("angular-table")
    module("test/templates/#{@templateName}")

  loadTemplate: (templateName, template_cache) ->
    angular.element(template_cache.get(templateName))

  compileTemplate: ($compile, $rootScope, $templateCache, callback) ->
    element = null

    element = @loadTemplate("test/templates/#{@templateName}", $templateCache)
    callback($rootScope)
    element = $compile(element)($rootScope)
    $rootScope.$digest()

    @scope = $rootScope

    return element

  prepareElement: (callback) ->
    element = null
    thiz = @
    inject ($compile, $rootScope, $templateCache) ->
      element = thiz.compileTemplate($compile, $rootScope, $templateCache, callback)
    return element

class TableGUI
  constructor: (@element) ->
    @reload()

  reload: () ->
    @rows = _.map(@element.find("tr"), (row) ->
      _.map(angular.element(row).find("td"), (cell) ->
        angular.element(cell).find("span").html()
      )
    )
    @rows.shift() if @rows[0].length == 0

  sort: (i) ->
    click(@element.find("th")[i])
    @reload()

class PaginationGUI
  constructor: (@element) ->
    @reload()

  reload: () ->
    lis = @element.find("li")
    lis = extractVisibleElements(lis)
    as = (angular.element(li).find("a") for li in lis)

    @buttons = {}
    (@buttons[a.html()] = a[0]) for a in as

    @representation = (key for key, val of @buttons)

    @pages = []
    for p in @representation
      n = parseInt(p)
      @pages.push(n) if !isNaN(n)

    @currentPage = _.find(lis, (li) -> angular.element(li).hasClass("active"))
    @currentPage = parseInt(angular.element(@currentPage).find("a").html())

  click: (button) ->
    click(@buttons[button])
    @reload()

class GUI
  constructor: (@table, @pagination, @scope, @variableNames) ->

  reload: () ->
    @table.reload() if @table?
    @pagination.reload() if @pagination?

  alterScope: (f) ->
    f(new ScopeWrapper(@scope), @variableNames)
    @scope.$digest()
    @reload()

  clickPagination: (button) ->
    throw "no pagination element available" unless @pagination?
    @pagination.click(button)
    @table.reload()

click = (el) ->
  ev = document.createEvent("MouseEvent")
  ev.initMouseEvent("click", true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0, null)
  el.dispatchEvent(ev)
  return

# currently untested
# - enabled/disabled buttons
# - fill last page
