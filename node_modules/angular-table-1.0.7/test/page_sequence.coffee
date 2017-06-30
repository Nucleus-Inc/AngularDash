describe "angular-table", () ->
  describe "PageSequence", () ->
    it "is constructed from upperBound, lowerBound, start and length paramters", () ->
      sequence = new PageSequence(0, 10, 0, 5)
      expect(sequence.data).toEqual [0, 1, 2, 3, 4]

      sequence = new PageSequence(0, 10, 4, 3)
      expect(sequence.data).toEqual [4, 5, 6]

      sequence = new PageSequence(0, 5, 3, 4)
      expect(sequence.data).toEqual [1, 2, 3, 4]

    it "throws an exception when length does not fit into lower and upper bounds", () ->
      expect(() -> new PageSequence(0, 2, 0, 3)).toThrow()

    it "s parameters can be reset", () ->
      sequence = new PageSequence(0, 10, 4, 3)
      expect(sequence.data).toEqual [4, 5, 6]

      sequence.resetParameters(0, 6, 3)
      expect(sequence.data).toEqual [3, 4, 5]

    it "relocates by a given distance and wont underrun or exceed a given boundary", () ->
      sequence = new PageSequence(0, 7, 0, 3)
      expect(sequence.data).toEqual [0, 1, 2]

      sequence.relocate(1)
      expect(sequence.data).toEqual [1, 2, 3]

      sequence.relocate(2)
      expect(sequence.data).toEqual [3, 4, 5]

      sequence.relocate(2)
      expect(sequence.data).toEqual [4, 5, 6]

    describe "realignment", () ->
      it "does not realign if the given page is in the current sequence scope", () ->
        sequence = new PageSequence(0, 7, 2, 3)
        expect(sequence.data).toEqual [2, 3, 4]

        sequence.realignGreedy(2)
        expect(sequence.data).toEqual [2, 3, 4]

        sequence.realignGreedy(4)
        expect(sequence.data).toEqual [2, 3, 4]

      it "realigns greedy", () ->
        sequence = new PageSequence(0, 7, 2, 3)
        expect(sequence.data).toEqual [2, 3, 4]

        sequence.realignGreedy(6)
        expect(sequence.data).toEqual [4, 5, 6]

        # expect(() -> sequence.realignGreedy(7)).toThrow()

        sequence.realignGreedy(4)
        expect(sequence.data).toEqual [4, 5, 6]

        sequence.realignGreedy(1)
        expect(sequence.data).toEqual [1, 2, 3]

        sequence.realignGreedy(0)
        expect(sequence.data).toEqual [0, 1, 2]

        # expect(() -> sequence.realignGreedy(-1)).toThrow()
