class PageSequence
  constructor: (@lowerBound = 0, @upperBound = 1, start = 0, @length = 1) ->
    throw "sequence is too long" if @length > (@upperBound - @lowerBound)
    @data = @generate(start)

  generate: (start) ->
    if start > (@upperBound - @length)
      start = @upperBound - @length
    else if start < @lowerBound
      start = @lowerBound
    x for x in [start..(parseInt(start) + parseInt(@length) - 1)]

  resetParameters: (lowerBound, upperBound, length) ->
    @lowerBound = lowerBound
    @upperBound = upperBound
    @length = length
    throw "sequence is too long" if @length > (@upperBound - @lowerBound)
    @data = @generate(@data[0])

  relocate: (distance) ->
    newStart = @data[0] + distance
    @data = @generate(newStart, newStart + @length)

  realignGreedy: (page) ->
    if page < @data[0]
      newStart = page
      @data = @generate(newStart)
    else if page > @data[@length - 1]
      newStart = page - (@length - 1)
      @data = @generate(newStart)

  realignGenerous: (page) ->
