describe('groups', () => {

	let groups;

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