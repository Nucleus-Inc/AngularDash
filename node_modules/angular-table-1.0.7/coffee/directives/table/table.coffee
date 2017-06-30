class Table
  constructor: (@element, @tableConfiguration, @configurationVariableNames) ->

  constructHeader: () ->
    tr = angular.element(document.createElement("tr"))
    for i in @tableConfiguration.columnConfigurations
      tr.append(i.renderHtml())
    return tr

  setupHeader: () ->
    thead = @element.find("thead")
    if thead
      header = @constructHeader()
      tr = angular.element(thead).find("tr")
      tr.remove()
      thead.append(header)

  getSetup: () ->
    if @tableConfiguration.paginated
      return new PaginatedSetup(@configurationVariableNames)
    else
      return new StandardSetup(@configurationVariableNames, @tableConfiguration.list)
    return

  compile: () ->
    @setupHeader()
    @setup = @getSetup()
    @setup.compile(@element)

  setupInitialSorting: ($scope) ->
    for bd in @tableConfiguration.columnConfigurations
      if bd.initialSorting
        throw "initial-sorting specified without attribute." if not bd.attribute
        $scope.predicate = bd.attribute
        $scope.descending = bd.initialSorting == "desc"

  post: ($scope, $element, $attributes, $filter) ->
    @setupInitialSorting($scope)

    if not $scope.getSortIcon
      $scope.getSortIcon = (predicate, currentPredicate, descending) ->
        return "glyphicon glyphicon-minus" if predicate != $scope.predicate
        if descending then "glyphicon glyphicon-chevron-down" else "glyphicon glyphicon-chevron-up"

    @setup.link($scope, $element, $attributes, $filter)
