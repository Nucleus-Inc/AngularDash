class configurationVariableNames
  constructor: (@configObjectName) ->
    @itemsPerPage = "#{@configObjectName}.itemsPerPage"
    @sortContext = "#{@configObjectName}.sortContext"
    @fillLastPage = "#{@configObjectName}.fillLastPage"
    @maxPages = "#{@configObjectName}.maxPages"
    @currentPage = "#{@configObjectName}.currentPage"
    @orderBy = "#{@configObjectName}.orderBy"
    @paginatorLabels = "#{@configObjectName}.paginatorLabels"
