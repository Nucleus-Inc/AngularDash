class Setup
  setupTr: (element, repeatString) ->
    tbody = element.find "tbody"
    tr = tbody.find "tr"
    tr.attr("ng-repeat", repeatString)
    tbody
