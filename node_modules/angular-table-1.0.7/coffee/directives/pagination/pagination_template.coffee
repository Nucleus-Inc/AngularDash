paginationTemplate = "
<div style='margin: 0px;'>
  <ul class='pagination'>
    <li ng-class='{disabled: getCurrentPage() <= 0}'>
      <a href='' ng-click='stepPage(-numberOfPages)'>{{getPaginatorLabels().first}}</a>
    </li>

    <li ng-show='showSectioning()' ng-class='{disabled: getCurrentPage() <= 0}'>
      <a href='' ng-click='jumpBack()'>{{getPaginatorLabels().jumpBack}}</a>
    </li>

    <li ng-class='{disabled: getCurrentPage() <= 0}'>
      <a href='' ng-click='stepPage(-1)'>{{getPaginatorLabels().stepBack}}</a>
    </li>

    <li ng-class='{active: getCurrentPage() == page}' ng-repeat='page in pageSequence.data'>
      <a href='' ng-click='goToPage(page)' ng-bind='page + 1'></a>
    </li>

    <li ng-class='{disabled: getCurrentPage() >= numberOfPages - 1}'>
      <a href='' ng-click='stepPage(1)'>{{getPaginatorLabels().stepAhead}}</a>
    </li>

    <li ng-show='showSectioning()' ng-class='{disabled: getCurrentPage() >= numberOfPages - 1}'>
      <a href='' ng-click='jumpAhead()'>{{getPaginatorLabels().jumpAhead}}</a>
    </li>

    <li ng-class='{disabled: getCurrentPage() >= numberOfPages - 1}'>
      <a href='' ng-click='stepPage(numberOfPages)'>{{getPaginatorLabels().last}}</a>
    </li>
  </ul>
</div>"
