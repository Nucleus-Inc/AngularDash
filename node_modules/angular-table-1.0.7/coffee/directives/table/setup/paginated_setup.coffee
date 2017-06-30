class PaginatedSetup extends Setup
  constructor: (@configurationVariableNames) ->
    @repeatString = "item in sortedAndPaginatedList"

  compile: (element) ->
    tbody = @setupTr(element, @repeatString)

    tds = element.find("td")
    tdString = ""
    for td in tds
      tdString += "<td><span>&nbsp;</span></td>"

    # TODO
    fillerTr = angular.element(document.createElement("tr"))
    fillerTr.attr("ng-show", @configurationVariableNames.fillLastPage)
    fillerTr.html(tdString)
    fillerTr.attr("ng-repeat", "item in fillerArray")

    tbody.append(fillerTr)

    return

  link: ($scope, $element, $attributes, $filter) ->
    cvn = @configurationVariableNames

    w = new ScopeConfigWrapper($scope, cvn, $attributes.atList)

    getSortedAndPaginatedList = (list, currentPage, itemsPerPage, orderBy, sortContext, predicate, descending, $filter) ->
      if list
        val = list
        fromPage  = itemsPerPage * currentPage - list.length
        if sortContext == "global"
          val = $filter(orderBy)(val, predicate, descending)
          val = $filter("limitTo")(val, fromPage)
          val = $filter("limitTo")(val, itemsPerPage)
        else
          val = $filter("limitTo")(val, fromPage)
          val = $filter("limitTo")(val, itemsPerPage)
          val = $filter(orderBy)(val, predicate, descending)

        return val
      else
        return []

    getFillerArray = (list, currentPage, numberOfPages, itemsPerPage) ->
      itemsPerPage = parseInt(itemsPerPage)
      if list.length <= 0
        x for x in [0..itemsPerPage - 1]
      else if currentPage == numberOfPages - 1
        itemCountOnLastPage = list.length % itemsPerPage
        if itemCountOnLastPage != 0
          fillerLength = itemsPerPage - itemCountOnLastPage - 1
          x for x in [(list.length)..(list.length + fillerLength)]
        else
          []

    update = () ->
      $scope.sortedAndPaginatedList = getSortedAndPaginatedList(
        w.getList(),
        w.getCurrentPage(),
        w.getItemsPerPage(),
        w.getOrderBy(),
        w.getSortContext(),
        $scope.predicate,
        $scope.descending,
        $filter
      )

      nop = Math.ceil(w.getList().length / w.getItemsPerPage())

      $scope.fillerArray = getFillerArray(
        w.getList(),
        w.getCurrentPage(),
        nop,
        w.getItemsPerPage()
      )

    $scope.$watch(cvn.currentPage, () ->
      update()
    )

    $scope.$watch(cvn.itemsPerPage, () ->
      update()
    )

    $scope.$watch(cvn.sortContext, () ->
      update()
    )

    $scope.$watchCollection($attributes.atList, () ->
      update()
    )

    $scope.$watch("#{$attributes.atList}.length", () ->
      $scope.numberOfPages = Math.ceil(w.getList().length / w.getItemsPerPage())
      update()
    )

    $scope.$watch("predicate", () ->
      update()
    )

    $scope.$watch("descending", () ->
      update()
    )
