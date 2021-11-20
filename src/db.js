
const link = "http://f150-2001-fb1-9c-a6a2-dc57-e723-4960-da1e.ngrok.io"
export const getTutor = async () => {
    var x = null
	await fetch(`${link}/tutor`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};

export const getStudent = async () => {
    var x = null
	await fetch(`${link}/student`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};

export const getCourseInfo = async (obj) => {
    var x = null
    console.log("21",obj)
	await fetch(`${link}/course/info?tutorUsername=${obj.tutorUsername}&courseId=${obj.courseId}`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};

export const getStudentStat = async (obj) => {
    var x = null
	await fetch(`${link}/student/status?studentUsername=${obj.studentUsername}&courseId=${obj.courseId}`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};

export const getReview = async (obj) => {
    var x = null
	await fetch(`${link}/review?courseId=${obj.courseId}`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};

export const getMember = async (obj) => {
    var x = null
	await fetch(`${link}/member?courseId=${obj.courseId}`)
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
	await fetch(`${link}/enrollment/course?courseId=${obj.courseId}`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};

export const acceptEnrollment = async (obj) => {
    var x = null
    console.log(obj)
	await fetch(`${link}/enrollment/manage?enrollmentId=${obj.enrollmentId}&accept=${obj.accept}`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};

export const deleteCourse = async (obj) => {
    var x = null
	await fetch(`${link}/course/delete?courseId=${obj.courseId}`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};


export const enroll = async (obj) => {
    var x = null
	await fetch(`${link}/enrollment/enroll?studentUsername=${obj.studentUsername}&courseId=${obj.courseId}`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};

export const cancelEnrollment = async (obj) => {
    var x = null
	await fetch(`${link}/enrollment/cancel?studentUsername=${obj.studentUsername}&courseId=${obj.courseId}`)
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
