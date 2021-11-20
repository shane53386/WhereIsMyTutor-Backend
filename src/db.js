

export const getTutor = async () => {
    var x = null
	await fetch(`http://localhost:3001/tutor`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};

export const getStudent = async () => {
    var x = null
	await fetch(`http://localhost:3001/student`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};

export const getCourseInfo = async (obj) => {
    var x = null
    console.log("21",obj)
	await fetch(`http://localhost:3001/course/info?tutorUsername=${obj.tutorUsername}&courseId=${obj.courseId}`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};

export const getStudentStat = async (obj) => {
    var x = null
	await fetch(`http://localhost:3001/student/status?studentUsername=${obj.studentUsername}&courseId=${obj.courseId}`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};

export const getReview = async (obj) => {
    var x = null
	await fetch(`http://localhost:3001/review?courseId=${obj.courseId}`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};

export const getMember = async (obj) => {
    var x = null
	await fetch(`http://localhost:3001/member?courseId=${obj.courseId}`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};
/*
export const getStudentEnrollment = async (sUsername) => {
    var x = null
	await fetch(`http://localhost:3000/enrollment/student?susername=${sUsername}`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};
*/
export const getCourseEnrollment = async (obj) => {
    var x = null
	await fetch(`http://localhost:3001/enrollment/course?courseId=${obj.courseId}`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};

export const acceptEnrollment = async (obj) => {
    var x = null
    console.log(obj)
	await fetch(`http://localhost:3001/enrollment/manage?enrollmentId=${obj.enrollmentId}&accept=${obj.accept}`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};

export const deleteCourse = async (obj) => {
    var x = null
	await fetch(`http://localhost:3001/course/delete?courseId=${obj.courseId}`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};


export const enroll = async (obj) => {
    var x = null
	await fetch(`http://localhost:3001/enrollment/enroll?studentUsername=${obj.studentUsername}&courseId=${obj.courseId}`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};

export const cancelEnrollment = async (obj) => {
    var x = null
	await fetch(`http://localhost:3001/enrollment/cancel?studentUsername=${obj.studentUsername}&courseId=${obj.courseId}`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};

/*
export const isAlreadyEnroll = async (susername,cid) => {
    var x = null
	await fetch(`http://localhost:3000/enrollment/checkEnrolled?cid=${cid}&susername=${susername}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data[0]['count(*)'] == 0)
            x = false
        else
            x = true
    });
   return x
};
*/
