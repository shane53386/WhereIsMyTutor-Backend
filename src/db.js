
const link = "https://bff3-2001-fb1-9f-abca-bcf3-5df2-682d-fe72.ngrok.io"
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
    var l = [{tutorUsername : "mek",courseId : '10000'} , {tutorUsername : "kem",courseId : '10000'}
,{tutorUsername : "kem",courseId : '1000'},{tutorUsername : "kem",courseId : '1000'},{tutorUsername : "kem",courseId : '1000'}
,{tutorUsername : "kem",courseId : '1000'},{tutorUsername : "kem",courseId : '1000'},{tutorUsername : "kem",courseId : '1000'}
,{tutorUsername : "kem",courseId : '1000'},{tutorUsername : "kem",courseId : '1000'},{tutorUsername : "kem",courseId : '1000'}]
    var tList = [] ; var cList = []
    l.forEach(e=>{
        tList.push(e.tutorUsername)
        cList.push(e.courseId)
    })
    var tutorUsername = tList.join(',')
    var coursId = cList.join(',')
	await fetch(`http://localhost:3001/course/info?tutorUsername=${tutorUsername}&courseId=${coursId}`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};

export const getStudentStat = async (obj) => {
    var x = null
	await fetch(`${link}/student/status?studentUsername=${obj.studentUsername}&courseId=${obj.courseId}`)
    .then(response => response.json())
    .then(data => x = data);
    if (x.length == 0) return "NotEnroll"
    if (x[0]["Verify_status"] == 'Accept') return "Accepted"
   return "Waiting"
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
    console.log(obj)
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

export const showUser= async () => {
    var x = null
	await fetch(`${link}/user/show`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};

export const showEnroll = async () => {
    var x = null
	await fetch(`${link}/enroll/show`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};
export const showEnrollment = async () => {
    var x = null
	await fetch(`${link}/enrollment/show`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};
export const showReview = async () => {
    var x = null
	await fetch(`${link}/review/show`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};
export const showMember = async () => {
    var x = null
	await fetch(`${link}/member/show`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};
export const showTutor = async () => {
    var x = null
	await fetch(`${link}/tutor/show`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};
export const showStudent = async () => {
    var x = null
	await fetch(`${link}/student/show`)
    .then(response => response.json())
    .then(data => x = data);
   return x
};