import "./App.css";
import firebase from "./firebase";
import * as db from './db.js'
import { useState, useEffect } from "react";


const App = () => {
	const ref = firebase.firestore().collection("courses");
	const userCol = ["Username","Password","Email","Display_name","Profile_picture_url","Firstname","Lastname","Birthday"]
	const studentCol = ["Username","Education_level"]
	const tutorCol = ["Username","Citizen_id","Citizen_image_url","bank_account","Account_type","Sid"]

	const enrollCol = ["Eid","Cid","Susername"]
	const enrollmentCol = ["Enrollment_id","Verify_date","Image_url","Request_date","Verify_status","Sid"]
	const reviewCol = ["Cid","Review_id","Rating","Content","Susername"]
	const memberCol = ["Cid","Susername"]
	const allCol = [userCol,studentCol,tutorCol,enrollCol,enrollmentCol,reviewCol,memberCol]
	const allLabel = ["USER","STUDENT","TUTOR",'ENROLL','ENROLLMENT','REVIEW','MEMBER']
	const [data, setData] = useState([]);

	useEffect(() => {
		getCourse();
	}, []);

	function getCourse() {
		/*ref.onSnapshot((querySnapShot) => {
			const courses = [];
			querySnapShot.forEach((res) => {
				const cinfo = res.data();
				cinfo.courseId = res.id;
				courses.push(cinfo);
			});
			setData(courses);
      console.log(courses);
		});*/
	}

	function searchCourse() {}

	function deleteCourse(id) {
		//ref.doc(id).delete();
	}

	function addCourse() {
		const ncourse = {
			courseName: "Calculus II",
			subject: "Mathematics",
			lesson: ["A", "B"],
			price: 18000,
		};
		//ref.add(ncourse);
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
  
  const [user,setUser] = useState([])
  const [student,setStudent] = useState()
  const [tutor,setTutor] = useState()
  const [enroll_,setEnroll_] = useState()
  const [enrollment,setEnrollment] = useState()
  const [review,setReview] = useState()
  const [member,setMember] = useState()	
  const [change,setChange] = useState(true)
  const allTable = [user,student,tutor,enroll_,enrollment,review,member]
  //ok
  function getTutor(){
    db.getTutor()
    .then(res=>{
      console.log(res)
	  setChange(!change)
    })
  }
  //ok
  function getStudent(){
    db.getStudent()
    .then(res=>{
      console.log(res)
	  setChange(!change)
    })
  }

  function getCourseInfo(){
    db.getCourseInfo({tutorUsername : coureInfo_tUsername
      , courseId : coureInfo_cId})
    .then(res=>{
      console.log(res)
	  setChange(!change)
    })
  }

  function getStudentStat(){
    db.getStudentStat({studentUsername : studentStat_sUsername
      , courseId : studentStat_cId })
    .then(res=>{
      console.log(res)
	  setChange(!change)
    })
  }

  function getReview(){
    db.getReview({courseId : review_cId})
    .then(res=>{
      console.log(res)
	  setChange(!change)
    })
  }

  function getMember(){
    db.getMember({courseId : member_cId})
    .then(res=>{
      console.log(res)
	  setChange(!change)
    })
  }

  
  function getCourseEnrollment(){
    db.getCourseEnrollment({ courseId : courseEnrollment_cId})
    .then(res=>{
      console.log(res)
	  setChange(!change)
    })
  }
  
  function accept(){
    db.acceptEnrollment({enrollmentId : acceptEnrollment_eId
      , accept : true} )
    .then(res=>{
      console.log(res)
	  setChange(!change)
    })
  }

  function reject(){
    db.acceptEnrollment({enrollmentId : acceptEnrollment_eId
      , accept : false})
    .then(res=>{
      console.log(res)
	  setChange(!change)
    })
  }

  function deleteCourse(){
    db.deleteCourse({courseId : deleteCourse_cId})
    .then(res=>{
      console.log(res)
	  setChange(!change)
    })
  }

  function enroll(){
    db.enroll({studentUsername : enroll_sUsername
      , courseId : enroll_cId})
    .then(res=>{
      console.log(res)
	  setChange(!change)
    })
  }

  function cancelEnrollment(){
    db.cancelEnrollment({studentUsername : cancelEnrollment_sUsername
      , courseId : cancelEnrollment_cId})
    .then(res=>{
      console.log(res)
	  setChange(!change)
    })
  }
  
  /*-------------------for show -------------------*/

  useEffect( () =>{
	db.showUser()
	.then(res=>setUser([...res]))
	db.showEnroll()
	.then(res=>setEnroll_([...res]))
	db.showEnrollment()
	.then(res=>setEnrollment([...res]))
	db.showStudent()
	.then(res=>setStudent([...res]))
	db.showTutor()
	.then(res=>setTutor([...res]))
	db.showMember()
	.then(res=>setMember([...res]))
	db.showReview()
	.then(res=>setReview([...res]))



  },[change])
 
function genUser(col,val,label){
	return (
		<div>
			<br/>
		<b>{label}</b> 
			<br/>
			<table>
				<tr>
				{col.map(element => {
					return (<th>{element}</th>	)
				})
				}
				</tr>
				{val && val.map((value,key)=>{
					return (<tr>
							{col.map(element => {
								return (<td>{value[element]}</td>	)
							})
							}
						</tr>)


				})}
			</table>
			</div>
	)

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
				---------------------------------------------<br/>
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

				<br/>
				----------------------------------------------------
				<br/>
			{allCol.map((value,i)=>{
				return (genUser(allCol[i],allTable[i],allLabel[i]))
				
			})
			}
			</header>
		</div>
	);
}

export default App;
