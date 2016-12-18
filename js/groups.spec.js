describe('groups', () => {

	let groups;

	describe('updateActiveGroups()', () => {
		let result,
    		data;
		beforeEach(() => {
			data = [
				{},
				{},
				{},
				{ displayed : true },
				{ displayed : true },
				{ displayed : true },
				{},
				{}
			];

			groups = new Groups(data);

	    	groups.updateActiveGroups({
				indexOfFirstGroup : 4,
				indexOfLastGroup : 9
			});

			result = groups.groups;

		});
	    it('should update display property of groups', () => {
			expect(result.length).toBe(10);
			expect(result[0].displayed).toBe(false);
			expect(result[1].displayed).toBe(false);
			expect(result[2].displayed).toBe(false);
			expect(result[3].displayed).toBe(false);
			expect(result[4].displayed).toBe(true);
			expect(result[5].displayed).toBe(true);
			expect(result[6].displayed).toBe(true);
			expect(result[7].displayed).toBe(true);
			expect(result[8].displayed).toBe(true);
			expect(result[9].displayed).toBe(true);
	    });
	});

	describe('areDisplayed()', () => {
		let result,
			data;
		beforeEach(() => {
			data = [
				{},
				{},
				{},
				{ displayed : true },
				{ displayed : true },
				{ displayed : true },
				{},
				{},
				{}
			];
			groups = new Groups(data);
		});

		describe('When groups passed are displayed', () => {
			beforeEach(() => {
				result = groups.areDisplayed({
					indexOfFirstGroup : 3,
					indexOfLastGroup : 5
				});
			});
			it('should return TRUE', () => {
				expect(result).toBe(true);
			});
		});

		describe('When some groups passed are not displayed', () => {
			beforeEach(() => {
				result = groups.areDisplayed({
					indexOfFirstGroup : 2,
					indexOfLastGroup : 3
				});
			});
			it('should return FALSE', () => {
				expect(result).toBe(false);
			});
		});
		/*
			The idea is that as long as all groups within the active region are being displayed
			that's fine. If some groups are displayed that are outside the active region, we are
			not bothered about that - eventually these will be swapped out
		*/
		describe('When some groups are displayed that are not passed', () => {
			beforeEach(() => {
				result = groups.areDisplayed({
					indexOfFirstGroup : 4,
					indexOfLastGroup : 5
				});
			});
			it('should return TRUE', () => {
				expect(result).toBe(true);
			});
		});

		describe('When only one group is passed', () => {
			beforeEach(() => {
				result = groups.areDisplayed({
					indexOfFirstGroup : 4,
					indexOfLastGroup : 4
				});
			});
			it('should return TRUE', () => {
				expect(result).toBe(true);
			});
		});
	});
});