angular.module("angular-table").directive "atPagination", [() ->
  restrict: "E"
  scope: true
  replace: true
  template: paginationTemplate

  link: ($scope, $element, $attributes) ->
    cvn = new configurationVariableNames($attributes.atConfig)
    w = new ScopeConfigWrapper($scope, cvn, $attributes.atList)

    keepInBounds = (val, min, max) ->
      val = Math.max(min, val)
      Math.min(max, val)

    getNumberOfPages = () ->
      $scope.numberOfPages

    setNumberOfPages = (numberOfPages) ->
      $scope.numberOfPages = numberOfPages

    update = (reset) ->
      if w.getList()
        if w.getList().length > 0
          newNumberOfPages = Math.ceil(w.getList().length / w.getItemsPerPage())
          setNumberOfPages(newNumberOfPages)
          if $scope.showSectioning()
            pagesToDisplay = w.getMaxPages()
          else
            pagesToDisplay = newNumberOfPages

          $scope.pageSequence.resetParameters(0, newNumberOfPages, pagesToDisplay)
          # TODO warum ist die reihenfolge der folgenden beiden aufrufe irrelevant?
          w.setCurrentPage(keepInBounds(w.getCurrentPage(), 0, getNumberOfPages() - 1))
          $scope.pageSequence.realignGreedy(w.getCurrentPage())
        else
          setNumberOfPages(1)
          $scope.pageSequence.resetParameters(0, 1, 1)
          w.setCurrentPage(0)
          $scope.pageSequence.realignGreedy(0)

    $scope.showSectioning = () ->
      w.getMaxPages() && getNumberOfPages() > w.getMaxPages()

    $scope.getCurrentPage = () ->
      w.getCurrentPage()

    $scope.getPaginatorLabels = () ->
        w.getPaginatorLabels()

    $scope.stepPage = (step) ->
      step = parseInt(step)
      w.setCurrentPage(keepInBounds(w.getCurrentPage() + step, 0, getNumberOfPages() - 1))
      $scope.pageSequence.realignGreedy(w.getCurrentPage())

    $scope.goToPage = (page) ->
      w.setCurrentPage(page)

    $scope.jumpBack = () ->
      $scope.stepPage(-w.getMaxPages())

    $scope.jumpAhead = () ->
      $scope.stepPage(w.getMaxPages())

    $scope.pageSequence = new PageSequence()

    $scope.$watch cvn.itemsPerPage, () ->
      update()

    $scope.$watch cvn.maxPages, () ->
      update()

    $scope.$watch $attributes.atList, () ->
      update()

    $scope.$watch "#{$attributes.atList}.length", () ->
      update()

    update()
]
