function Groups(initialGroups) {

    this.groups = initialGroups || [];
}

Groups.prototype = {

    /*
        Returns TRUE if the supplied groups are currently displayed
        Returns FALSE if a supplied group does not exist or if it is not currently displayed
    */
    areDisplayed : function (groups) {

        let result = true;

        for(var i = groups.indexOfFirstGroup; i <= groups.indexOfLastGroup; i++) {
            //  if any group doesn't exist, set to false and break out of loop
            if(!this.groups[i] || !this.groups[i].displayed) {
                result = false;
                break;
            }
        }
        return result;
    },

    /*

        initialGroups is an array of arrays
    */

    initialiseGroups : function (initialGroups) {

        this.groups = initialGroups.map(groupData => {

            return {
                data : groupData,
                displayed : true
            };
        });

        return this.groups;

    },

    /*
        set active groups' 'displayed' property to TRUE
        If groups does not exist, create it.
    */
    updateActiveGroups : function (activeGroups) {
        for(let i = 0; i <= Math.max(activeGroups.indexOfLastGroup, this.groups.length -1); i++) {

            if(!this.groups[i]) {
                this.groups[i] = {};
            }

            if(i < activeGroups.indexOfFirstGroup || i > activeGroups.indexOfLastGroup) {
                this.groups[i].displayed = false;
            } else {
                this.groups[i].displayed = true;
            }
        }
    },

    groupArraysAreEqual : function (groupsArrayA, groupArrayB ) {



    },
};

Groups.factory = function () {
    return function () {
        return new Groups();
    }
}

Groups.factory.inject = [];