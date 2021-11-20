import "./App.css";
import firebase from "./firebase";
import * as db from './db.js'
import { useState, useEffect } from "react";

const App = () => {
	const ref = firebase.firestore().collection("courses");

	const [data, setData] = useState([]);

	useEffect(() => {
		getCourse();
	}, []);

	function getCourse() {
		ref.onSnapshot((querySnapShot) => {
			const courses = [];
			querySnapShot.forEach((res) => {
				const cinfo = res.data();
				cinfo.courseId = res.id;
				courses.push(cinfo);
			});
			setData(courses);
      console.log(courses);
		});
	}

	function searchCourse() {}

	function deleteCourse(id) {
		ref.doc(id).delete();
	}

	function addCourse() {
		const ncourse = {
			courseName: "Calculus II",
			subject: "Mathematics",
			lesson: ["A", "B"],
			price: 18000,
		};
		ref.add(ncourse);
	}
	/* --------------------- sql ---------------------------- */
	const [coureInfo_tUsername,setCoureInfo_tUsername] = useState()
  const [coureInfo_cId,setCoureInfo_Cid] = useState()

  const [studentStat_sUsername,setStudentStat_sUsername] = useState()
  const [studentStat_cId,setStudentStat_cId] = useState()
  
  const [review_cId,setReview_cId] = useState()

  const [member_cId,setMember_cId] = useState()

  const [courseEnrollment_cId,setCourseEnrollment_cId] = useState()
  
  const [acceptEnrollment_eId, setAcceptEnrollment_eId] = useState()
  const [acceptEnrollment_accept, setAcceptEnrollment_accept] = useState()
  
  const [deleteCourse_cId,setDeleteCourse_cId] = useState()
  
  const [enroll_sUsername,setEnroll_sUsername] = useState()
  const [enroll_cId,setEnroll_cId] = useState()
  
  const [cancelEnrollment_sUsername,setCancelEnrollment_sUsername] = useState()
  const [cancelEnrollment_cId,setCancelEnrollment_cId] = useState()
  
  //ok
  function getTutor(){
    db.getTutor()
    .then(res=>{
      console.log(res)
    })
  }
  //ok
  function getStudent(){
    db.getStudent()
    .then(res=>{
      console.log(res)
    })
  }

  function getCourseInfo(){
    db.getCourseInfo({tutorUsername : coureInfo_tUsername
      , courseId : coureInfo_cId})
    .then(res=>{
      console.log(res)
    })
  }

  function getStudentStat(){
    db.getStudentStat({studentUsername : studentStat_sUsername
      , courseId : studentStat_cId })
    .then(res=>{
      console.log(res)
    })
  }

  function getReview(){
    db.getReview({courseId : review_cId})
    .then(res=>{
      console.log(res)
    })
  }

  function getMember(){
    db.getMember({courseId : member_cId})
    .then(res=>{
      console.log(res)
    })
  }

  
  function getCourseEnrollment(){
    db.getCourseEnrollment({ courseId : courseEnrollment_cId})
    .then(res=>{
      console.log(res)
    })
  }
  
  function accept(){
    db.acceptEnrollment({enrollmentId : acceptEnrollment_eId
      , accept : true} )
    .then(res=>{
      console.log(res)
    })
  }

  function reject(){
    db.acceptEnrollment({enrollmentId : acceptEnrollment_eId
      , accept : false})
    .then(res=>{
      console.log(res)
    })
  }

  function deleteCourse(){
    db.deleteCourse({courseId : deleteCourse_cId})
    .then(res=>{
      console.log(res)
    })
  }

  function enroll(){
    db.enroll({studentUsername : enroll_sUsername
      , courseId : enroll_cId})
    .then(res=>{
      console.log(res)
    })
  }

  function cancelEnrollment(){
    db.cancelEnrollment({studentUsername : cancelEnrollment_sUsername
      , courseId : cancelEnrollment_cId})
    .then(res=>{
      console.log(res)
    })
  }
  

	return (
		<div className="App">

      		<header className="App-header">
			<h1>Courses</h1>
			<button onClick={getCourse}>Get course</button>
			<button onClick={addCourse}>Add course</button>
			{/* <button onClick={searchCourse}>Search course</button> */}
			<div>
				{data.map((course) => {
					return (
						<div key={course.key}>
							<img src={course.imageURL} width={300} />
							<h2>{course.courseName}</h2>
							<h4>{course.subject}</h4>
							<h4>
								{course.lesson.forEach((lesson) => {
									return <h4>{lesson}</h4>;
								})}
							</h4>
							<button
								onClick={() => {
									deleteCourse(course.key);
								}}
							>
								Delete
							</button>
							<div>
								---------------------------------------------
							</div>
						</div>
					);
				})}
				---------------------------------------------
				---------------------------------------------
				<button onClick={getTutor}>
            getTutor
        </button>

        <button onClick={getStudent}>
            getStudent
        </button>

        <div>
        courseInfo
        <br/>
          <label>
            tUsername:
            <input type="text" value={coureInfo_tUsername} 
              onChange={e => setCoureInfo_tUsername(e.target.value)} />
          </label>
          <label>
          cId:
            <input type="text" value={coureInfo_cId} 
              onChange={e => setCoureInfo_Cid(e.target.value)} />
          </label>
          <button onClick={getCourseInfo}>
            getCourseInfo
          </button>
        </div>

        <div>
          studentStat
          <br/>
          <label>
            sUsername:
            <input type="text" value={studentStat_sUsername} 
              onChange={e => setStudentStat_sUsername(e.target.value)} />
          </label>
          <label>
          cId:
            <input type="text" value={studentStat_cId} 
              onChange={e => setStudentStat_cId(e.target.value)} />
          </label>
          <button onClick={getStudentStat}>
          getStudentStat
          </button>
        </div>

        <div>
          review
          <br/>
          <label>
          review_cId:
            <input type="text" value={review_cId} 
              onChange={e => setReview_cId(e.target.value)} />
          </label>
          <button onClick={getReview}>
            getReview
          </button>
        </div>

      <div>
        member
        <br/>
        <label>
          cId:
          <input type="text" value={member_cId} 
            onChange={e => setMember_cId(e.target.value)} />
        </label>
        <button onClick={getMember}>
          getMember
        </button>
      </div>
        
      <div>
          courseEnrollment
          <br/>
          <label>
          cId,:
            <input type="text" value={courseEnrollment_cId} 
              onChange={e => setCourseEnrollment_cId(e.target.value)} />
          </label>
          
        <button onClick={getCourseEnrollment}>
          getCourseEnrollment
        </button>
        </div>

        <div>
          acceptEnrollment
          <br/>
          <br/>
          <label>
            eId:
            <input type="text" value={acceptEnrollment_eId} 
              onChange={e => setAcceptEnrollment_eId(e.target.value)} />
          </label>
          <button onClick={accept}>
            accept
          </button>
          <button onClick={reject}>
            reject
          </button>
        </div>
        
      <div>
        deleteCourse
        <br/>
        <label>
          cId:
          <input type="text" value={deleteCourse_cId} 
            onChange={e => setDeleteCourse_cId(e.target.value)} />
        </label>

        <button onClick={deleteCourse}>
          deleteCourse
        </button>
      </div>

      <div>
        enroll
        <br/>
      <label>
        cId:
        <input type="text" value={enroll_cId} 
          onChange={e => setEnroll_cId(e.target.value)} />
      </label>
      <label>
      sUsername:
        <input type="text" value={enroll_sUsername} 
          onChange={e => setEnroll_sUsername(e.target.value)} />
      </label>
      <button onClick={enroll}>
        enroll
      </button>
      </div>

      <div>
      cancelEnrollment
      <br/>
      <label>
      sUsername:
        <input type="text" value={cancelEnrollment_sUsername} 
          onChange={e => setCancelEnrollment_sUsername(e.target.value)} />
      </label>
      <label>
      cId:
        <input type="text" value={cancelEnrollment_cId} 
          onChange={e => setCancelEnrollment_cId(e.target.value)} />
      </label>
      <button onClick={cancelEnrollment}>
        cancelEnrollment
      </button>
      </div>
			</div>
			</header>
		</div>
	);
}

export default App;
