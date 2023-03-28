function SearchCourse(courseList, searchParam) {
    let list = courseList.filter(course => course.course_id.includes(searchParam) || course.course_name.includes(searchParam));
    return list;
}

export default SearchCourse;