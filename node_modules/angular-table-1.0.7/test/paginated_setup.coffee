describe "angular-table", () ->
  describe "paginated setup", () ->

    configName = "table_config"
    listName = "myList"

    stepBack  = '‹'
    stepAhead = '›'
    jumpBack  = '«'
    jumpAhead = '»'
    first      = 'First'
    last       = 'Last'

    setups = [{
        template: "paginated_setup.html"
        variableNames: {
          itemsPerPage: "#{configName}.itemsPerPage",
          maxPages:      "#{configName}.maxPages",
          sortContext:   "#{configName}.sortContext",
          fillLastPage: "#{configName}.fillLastPage"
        }
      }]

    for setup in setups
      do (setup) ->
        describe "complete configuration hardcoded #{setup.template}", () ->
          beforeEach () ->
            @comp = new TemplateCompiler(setup.template)

            @element = @comp.prepareElement((scope) ->
              scope[listName] = [
                {name: "i"}, {name: "g"}, {name: "h"}, {name: "j"}, {name: "k"}, {name: "l"}
                {name: "a"}, {name: "b"}, {name: "c"}, {name: "d"}, {name: "e"}, {name: "f"},
                {name: "m"}
              ]

              scope[configName] = {
                currentPage: 0,
                itemsPerPage: 3,
                maxPages: 2,
                sortContext: 'global',
                fillLastPage: true
              }
            )

            table = new TableGUI(@element)
            pagination = new PaginationGUI(@element)
            @gui = new GUI(table, pagination, @comp.scope, setup.variableNames)

          it "allows to select pages", () ->
            expect(@gui.pagination.pages).toEqual([1, 2])
            expect(@gui.pagination.currentPage).toEqual(1)

            @gui.alterScope((scopeWrapper, vars) ->
              scopeWrapper.set(vars.itemsPerPage, 4)
              scopeWrapper.set(vars.maxPages, 4)
            )

            expect(@gui.table.rows).toEqual([['a'], ['b'], ['c'], ['d']])
            expect(@gui.pagination.pages).toEqual([1, 2, 3, 4])

            @gui.clickPagination(2)

            expect(@gui.table.rows).toEqual([['e'], ['f'], ['g'], ['h']])
            expect(@gui.pagination.currentPage).toEqual(2)

            @gui.clickPagination(4)

            expect(@gui.table.rows).toEqual([['m'], ['&nbsp;'], ['&nbsp;'], ['&nbsp;']])
            expect(@gui.pagination.currentPage).toEqual(4)

          it "allows to step back and forth", () ->
            expect(@gui.table.rows).toEqual([['a'], ['b'], ['c']])
            expect(@gui.pagination.currentPage).toEqual(1)
            expect(@gui.pagination.pages).toEqual([1, 2])

            @gui.clickPagination(stepAhead)

            expect(@gui.table.rows).toEqual([['d'], ['e'], ['f']])
            expect(@gui.pagination.currentPage).toEqual(2)
            expect(@gui.pagination.pages).toEqual([1, 2])

            @gui.clickPagination(stepAhead)

            expect(@gui.table.rows).toEqual([['g'], ['h'], ['i']])
            expect(@gui.pagination.currentPage).toEqual(3)
            expect(@gui.pagination.pages).toEqual([2, 3])

            @gui.clickPagination(stepAhead)
            @gui.clickPagination(stepAhead)

            # we reached the end of the pagination by now

            expect(@gui.table.rows).toEqual([['m'], ['&nbsp;'], ['&nbsp;']])
            expect(@gui.pagination.currentPage).toEqual(5)
            expect(@gui.pagination.pages).toEqual([4, 5])

            @gui.clickPagination(stepAhead)

            expect(@gui.table.rows).toEqual([['m'], ['&nbsp;'], ['&nbsp;']])
            expect(@gui.pagination.currentPage).toEqual(5)
            expect(@gui.pagination.pages).toEqual([4, 5])

            @gui.clickPagination(stepBack)

            expect(@gui.table.rows).toEqual([['j'], ['k'], ['l']])
            expect(@gui.pagination.currentPage).toEqual(4)
            expect(@gui.pagination.pages).toEqual([4, 5])

            @gui.clickPagination(stepBack)

            expect(@gui.table.rows).toEqual([['g'], ['h'], ['i']])
            expect(@gui.pagination.currentPage).toEqual(3)
            expect(@gui.pagination.pages).toEqual([3, 4])

          it "allows to jump back and forth", () ->
            expect(@gui.table.rows).toEqual([['a'], ['b'], ['c']])
            expect(@gui.pagination.currentPage).toEqual(1)
            expect(@gui.pagination.pages).toEqual([1, 2])

            @gui.clickPagination(jumpAhead)

            expect(@gui.table.rows).toEqual([['g'], ['h'], ['i']])
            expect(@gui.pagination.currentPage).toEqual(3)
            expect(@gui.pagination.pages).toEqual([2, 3])

            @gui.clickPagination(jumpAhead)

            # we reached the end of the pagination by now

            expect(@gui.table.rows).toEqual([['m'], ['&nbsp;'], ['&nbsp;']])
            expect(@gui.pagination.currentPage).toEqual(5)
            expect(@gui.pagination.pages).toEqual([4, 5])

            @gui.clickPagination(jumpAhead)

            expect(@gui.table.rows).toEqual([['m'], ['&nbsp;'], ['&nbsp;']])
            expect(@gui.pagination.currentPage).toEqual(5)
            expect(@gui.pagination.pages).toEqual([4, 5])

            @gui.clickPagination(stepBack)

            expect(@gui.table.rows).toEqual([['j'], ['k'], ['l']])
            expect(@gui.pagination.currentPage).toEqual(4)
            expect(@gui.pagination.pages).toEqual([4, 5])

            @gui.clickPagination(jumpBack)

            expect(@gui.table.rows).toEqual([['d'], ['e'], ['f']])
            expect(@gui.pagination.currentPage).toEqual(2)
            expect(@gui.pagination.pages).toEqual([2, 3])

            @gui.clickPagination(jumpBack)

            expect(@gui.table.rows).toEqual([['a'], ['b'], ['c']])
            expect(@gui.pagination.currentPage).toEqual(1)
            expect(@gui.pagination.pages).toEqual([1, 2])

          it "allows to set a sort context", () ->
            @gui.alterScope((scopeWrapper, vars) ->
              scopeWrapper.set(vars.itemsPerPage, 4)
              scopeWrapper.set(vars.sortContext, "global")
            )

            expect(@gui.table.rows).toEqual([['a'], ['b'], ['c'], ['d']])

            @gui.table.sort(0)

            expect(@gui.table.rows).toEqual([['m'], ['l'], ['k'], ['j']])

            @gui.alterScope((scopeWrapper, vars) ->
              scopeWrapper.set(vars.sortContext, "page")
            )

            expect(@gui.table.rows).toEqual([['j'], ['i'], ['h'], ['g']])

            @gui.table.sort(0)

            expect(@gui.table.rows).toEqual([['g'], ['h'], ['i'], ['j']])

          it "shows an empty table if fill-last-page is true and the list is empty", () ->
            @gui.clickPagination(2)

            expect(@gui.table.rows).toEqual [['d'], ['e'], ['f']]
            expect(@gui.pagination.currentPage).toEqual 2

            @gui.alterScope((scopeWrapper, vars) ->
              scopeWrapper.set(vars.itemsPerPage, 3)
              scopeWrapper.set(vars.fillLastPage, true)
              scopeWrapper.set(listName, [])
            )

            expect(@gui.table.rows).toEqual [['&nbsp;'], ['&nbsp;'], ['&nbsp;']]
            expect(@gui.pagination.pages).toEqual [1]
            expect(@gui.pagination.currentPage).toEqual 1

          it "reloads the table if the entries change but the length doesn't", () ->
            expect(@gui.table.rows).toEqual([['a'], ['b'], ['c']])
            @gui.alterScope((scopeWrapper, vars) ->
              list = scopeWrapper.get(listName)
              list.splice(6, 1) # delete the 6th element in the list which is "a"
              list.push({name: "A"})
            )
            expect(@gui.table.rows).toEqual([['A'], ['b'], ['c']])

          describe "the maximum pages setting", () ->
            for val in [undefined, null]
              it "shows all pages if maxPages is undefined or null", () ->

                @gui.alterScope((scopeWrapper, vars) ->
                  scopeWrapper.set(vars.maxPages, val)
                )

                expect(@gui.pagination.pages).toEqual([1, 2, 3, 4, 5])
                expect(@gui.pagination.representation).toEqual(
                  ['First', '‹', '1', '2', '3', '4', '5', '›', 'Last'])

            it "shows a subsection of pages if maximum pages is smaller than total pages", () ->
              @gui.alterScope((scopeWrapper, vars) ->
                scopeWrapper.set(vars.maxPages, 3)
              )

              expect(@gui.pagination.pages).toEqual([1, 2, 3])
              expect(@gui.pagination.representation).toEqual(
                  [ 'First', '«', '‹', '1', '2', '3', '›', '»', 'Last' ])

          describe "heavy interaction", () ->
            it "updates when the length of the list changes", () ->
              @gui.alterScope((scopeWrapper, vars) ->
                scopeWrapper.set(vars.itemsPerPage, 3)
                scopeWrapper.set(vars.maxPages, 2)
                scopeWrapper.set(listName, [{name: 'z'}])
              )

              expect(@gui.table.rows).toEqual [['z'], ['&nbsp;'], ['&nbsp;']]

              @gui.alterScope((scopeWrapper, vars) ->
                scopeWrapper.get(listName).push({name: 'a'})
              )

              expect(@gui.table.rows).toEqual [['a'], ['z'], ['&nbsp;']]
              expect(@gui.pagination.representation).toEqual ['First', '‹', '1', '›', 'Last']
              expect(@gui.pagination.pages).toEqual [1]

              @gui.alterScope((scopeWrapper, vars) ->
                scopeWrapper.get(listName).push({name: 'x'})
                scopeWrapper.get(listName).push({name: 'b'})
              )

              expect(@gui.table.rows).toEqual [['a'], ['b'], ['x']]
              expect(@gui.pagination.representation).toEqual ['First', '‹', '1', '2', '›', 'Last']
              expect(@gui.pagination.pages).toEqual [1, 2]

              @gui.clickPagination(2)

              expect(@gui.table.rows).toEqual [['z'], ['&nbsp;'], ['&nbsp;']]

              @gui.alterScope((scopeWrapper, vars) ->
                scopeWrapper.get(listName).push({name: 'c'})
                scopeWrapper.get(listName).push({name: 'y'})
                scopeWrapper.get(listName).push({name: 'u'})
              )

              expect(@gui.table.rows).toEqual [['u'], ['x'], ['y']]
              expect(@gui.pagination.representation).toEqual(
                  [ 'First', '«', '‹', '1', '2', '›', '»', 'Last' ])

              @gui.clickPagination(stepAhead)

              expect(@gui.table.rows).toEqual [['z'], ['&nbsp;'], ['&nbsp;']]
              expect(@gui.pagination.representation).toEqual(
                  [ 'First', '«', '‹', '2', '3', '›', '»', 'Last' ])


            it "updates when ever a configuration parameter changes", () ->
              @gui.alterScope((scopeWrapper, vars) ->
                scopeWrapper.set(vars.itemsPerPage, 5)
                scopeWrapper.set(vars.maxPages, 4)
              )

              @gui.clickPagination(stepAhead)

              expect(@gui.pagination.currentPage).toEqual 2
              expect(@gui.table.rows).toEqual([['f'], ['g'], ['h'], ['i'], ['j']])
              expect(@gui.pagination.pages).toEqual([1, 2, 3])

              @gui.alterScope((scopeWrapper, vars) ->
                scopeWrapper.set(vars.maxPages, 2)
              )

              expect(@gui.pagination.currentPage).toEqual 2
              expect(@gui.table.rows).toEqual([['f'], ['g'], ['h'], ['i'], ['j']])
              expect(@gui.pagination.pages).toEqual([1, 2])

              @gui.alterScope((scopeWrapper, vars) ->
                scopeWrapper.set(vars.maxPages, 1)
              )

              expect(@gui.pagination.currentPage).toEqual 2
              expect(@gui.table.rows).toEqual([['f'], ['g'], ['h'], ['i'], ['j']])
              expect(@gui.pagination.pages).toEqual([2])

              @gui.alterScope((scopeWrapper, vars) ->
                scopeWrapper.set(vars.itemsPerPage, 2)
              )

              expect(@gui.pagination.currentPage).toEqual 2
              expect(@gui.table.rows).toEqual([['c'], ['d']])
              expect(@gui.pagination.pages).toEqual([2])

              @gui.alterScope((scopeWrapper, vars) ->
                scopeWrapper.set(vars.itemsPerPage, 3)
              )

              expect(@gui.pagination.currentPage).toEqual 2
              expect(@gui.table.rows).toEqual([['d'], ['e'], ['f']])
              expect(@gui.pagination.pages).toEqual([2])

              @gui.clickPagination(stepAhead)

              expect(@gui.pagination.currentPage).toEqual 3
              expect(@gui.table.rows).toEqual([['g'], ['h'], ['i']])
              expect(@gui.pagination.pages).toEqual([3])

              @gui.clickPagination(stepAhead)
              @gui.clickPagination(stepAhead)

              expect(@gui.table.rows).toEqual([['m'], ['&nbsp;'], ['&nbsp;']])
              expect(@gui.pagination.currentPage).toEqual(5)
              expect(@gui.pagination.pages).toEqual([5])

              @gui.alterScope((scopeWrapper, vars) ->
                scopeWrapper.set(vars.maxPages, 3)
              )

              expect(@gui.table.rows).toEqual([['m'], ['&nbsp;'], ['&nbsp;']])
              expect(@gui.pagination.currentPage).toEqual(5)
              expect(@gui.pagination.pages).toEqual([3, 4, 5])

              @gui.clickPagination(jumpBack)

              expect(@gui.pagination.currentPage).toEqual 2
              expect(@gui.table.rows).toEqual([['d'], ['e'], ['f']])
              expect(@gui.pagination.pages).toEqual([2, 3, 4])

              @gui.alterScope((scopeWrapper, vars) ->
                scopeWrapper.set(vars.maxPages, 4)
              )

              expect(@gui.pagination.currentPage).toEqual 2
              expect(@gui.table.rows).toEqual([['d'], ['e'], ['f']])
              expect(@gui.pagination.pages).toEqual([2, 3, 4, 5])

              @gui.alterScope((scopeWrapper, vars) ->
                scopeWrapper.set(vars.itemsPerPage, 6)
              )

              expect(@gui.pagination.currentPage).toEqual 2
              expect(@gui.table.rows).toEqual([['g'], ['h'], ['i'], ['j'], ['k'], ['l']])
              expect(@gui.pagination.pages).toEqual([1, 2, 3])

              @gui.alterScope((scopeWrapper, vars) ->
                scopeWrapper.set(vars.itemsPerPage, 2)
                scopeWrapper.set(vars.maxPages, 2)
              )

              @gui.clickPagination(jumpAhead)

              expect(@gui.pagination.currentPage).toEqual 4

              @gui.clickPagination(jumpAhead)

              expect(@gui.pagination.currentPage).toEqual 6

              @gui.clickPagination(jumpAhead)

              expect(@gui.pagination.currentPage).toEqual 7

              @gui.alterScope((scopeWrapper, vars) ->
                scopeWrapper.set(vars.itemsPerPage, 6)
                scopeWrapper.set(vars.maxPages, 4)
              )

              expect(@gui.table.rows).toEqual([['m'], ['&nbsp;'], ['&nbsp;'], ['&nbsp;'], ['&nbsp;'], ['&nbsp;']])
              expect(@gui.pagination.currentPage).toEqual(3)
              expect(@gui.pagination.pages).toEqual([1, 2, 3])
