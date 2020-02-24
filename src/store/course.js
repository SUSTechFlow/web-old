const cidFilter = cidPatterns => {
    return (course) => {
        if (cidPatterns.length === 0)
            return true;
        const patterns = cidPatterns.map(cidLabel => {
            cidLabel = '[A-Z]+' + cidLabel;
            return new RegExp(cidLabel.replace('XXX', '...').replace('XX', '..'))
        });
        return patterns.reduce((pre, pattern) => pre || course.cid.search(pattern) !== -1, false)
    }
};
const rateFilter = requiredRatings => course => course.ratings >= requiredRatings * 5;
const searchFilter = searchStr => course => course.cid.includes(searchStr.toUpperCase()) || course.name.includes(searchStr) || (course.cid + ' ' + course.name).includes(searchStr);
const facultyFilter = selectedFaculty => course => (selectedFaculty.length === 0) || selectedFaculty.includes(course.faculty);

const course = {
    state: {
        faculty: [],
        courseList: [],
        cidLabels: [],
        requiredRatings: 0,
        searchStr: '',
        selectedFaculty: [],
        filters: {
            cidFilter: () => true,
            rateFilter: () => true,
            searchFilter: () => true,
            facultyFilter: () => true
        }
    },
    mutations: {
        setFaculty(state, newFaculty) {
            state.faculty = newFaculty;
        },
        setCourseList(state, newCourseList) {
            state.courseList = newCourseList;
        },
        setCidLabels(state, cidLabels) {
            state.cidLabels = cidLabels;
            state.filters.cidFilter = cidFilter(cidLabels);
        },
        setSelectedFaculty(state, selectedFaculty) {
            state.selectedFaculty = selectedFaculty;
            state.filters.facultyFilter = facultyFilter(selectedFaculty);
        },
        setRequiredRatings(state, requiredRatings) {
            state.requiredRatings = requiredRatings;
            state.filters.rateFilter = rateFilter(requiredRatings);
        },
        setSearchStr(state, searchStr) {
            state.searchStr = searchStr;
            if (searchStr === '')
                state.filters.searchFilter = () => true;
            state.filters.searchFilter = searchFilter(searchStr);
        },
    },
    getters: {
        shownCourseList: (state, getters) => {
            let res = state.courseList;
            const filters = state.filters;
            for (const f in filters) {
                res = res.filter(filters[f]);
            }
            return res;
        },
        searchCandidate: (state, getters) => {
            return getters.shownCourseList.map(course => course.cid + ' ' + course.name).slice(0, 5)
        }
    }
};
export default course