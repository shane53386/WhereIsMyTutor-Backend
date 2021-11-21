import "./App.css";
import firebase from "./firebase";
import { useState, useEffect } from "react";

function App() {
	const ref = firebase.firestore().collection("courses");

	const enrollCol = ["Eid","Cid","Susername"]
	const enrollmentCol = ["Enrollment_id","Verify_date","Image_url","Request_date","Verify_status","Sid"]
	const reviewCol = ["Cid","Review_id","Rating","Content","Susername"]
	const memberCol = ["Cid","Susername"]
	const allCol = [userCol,studentCol,tutorCol,enrollCol,enrollmentCol,reviewCol,memberCol]
	const allLabel = ["USER","STUDENT","TUTOR",'ENROLL','ENROLLMENT','REVIEW','MEMBER']
  const [data, setData] = useState([]);
	const [keyword, setKeyword] = useState("");
	const [searchResult, setSearchResult] = useState([]);

	const config = {
		search: keyword, // -> courseName, tutorName, lessonList
		subject: "",
		min: 0, // default is 0
		max: 20000, // “All” = -1
		courseDay: "Mixed", // "Weekend", "Weekday", "Mixed"
		learningType: "Offline", //"Online", "Offline", "Mixed"
		sortType: "Date", // “Date”, “Price”
		isAscending: true,
	};

	useEffect(() => {
		getCourse();
	}, []);

	function getCourse() {
		ref.onSnapshot((querySnapShot) => {
			const courses = [];
			querySnapShot.forEach((res) => {
				const cinfo = res.data();
				// cinfo.courseId = res.id;
				courses.push(cinfo);
			});
			setSearchResult(courses);
			setData(courses);
		});
	}

	function searchCourse(config) {
		// console.log(config.search);
		const order = config.isAscending ? "asc" : "desc";
		const result = data.filter((course) => {
			return (
				(course.courseName.toLowerCase().includes(keyword) ||
					course.lesson.find((e) =>
						e.toLowerCase().includes(keyword)
					) ||
					course.tutorUsername.toLowerCase().includes(keyword)) &&
				course.price >= config.min &&
				course.price <= (config.max == -1 ? Infinity : config.max) &&
				course.subject == config.subject &&
				course.learningType == config.learningType &&
				findCourseDay(course.timeSlot) == config.courseDay
			);
		});
		result.sort(function (a, b) {
			const type = config.sortType;
			const isAscending = config.isAscending;
			if (type == "Price" && isAscending) {
				return a.price - b.price;
			} else if (type == "Price" && !isAscending) {
				return b.price - a.price;
			} else if (type == "Date" && isAscending) {
				return a.createDate - b.createDate;
			} else if (type == "Date" && !isAscending) {
				return b.createDate - a.createDate;
			}
		});
		setSearchResult(result);
	}

  function findCourseDay(timeSlot) {
		// const timeSlot = { Sunday: [] };
		const weekEnd = ["Sunday", "Saturday"];
		const weekDay = [
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
		];
		const day = Object.keys(timeSlot);
		if (
			day.some(
				(d) =>
					weekEnd.includes(d) && day.some((d) => weekDay.includes(d))
			)
		)
			return "Mixed";
		else if (
			day.some(
				(d) =>
					!weekEnd.includes(d) && day.some((d) => weekDay.includes(d))
			)
		)
			return "Weekday";
		else if (
			day.some(
				(d) =>
					weekEnd.includes(d) && day.some((d) => !weekDay.includes(d))
			)
		)
			return "Weekend";
	}

	function deleteCourse(id) {
		ref.doc(id).delete();
	}
  function updateCourse(courseId, courseInfo) {
		const ncourse = {
			courseName: "Calculus III",
			subject: "Mathematics",
			lesson: ["A"],
			price: 20000,
			learningType: "Online",
			tutorUsername: "Jack",
			timeSlot: {
				Monday: [{ start: "09:00", end: "12:00" }],
				Sunday: [{ start: "09:00", end: "12:00" }],
			},
		};
		ref.doc(courseId).update(courseInfo);
	}

	async function getCourseById(courseId) {
		const doc = await ref.doc(courseId).get();
		setSearchResult([doc.data()]);
		return doc.data();
	}

	async function getCourseByTutor(tutorUsername) {
		const courses = [];
		const snapshot = await ref
			.where("tutorUsername", "==", tutorUsername)
			.get();
		snapshot.forEach((doc) => {
			courses.push(doc.data());
		});
		setSearchResult(courses);
		return courses;
	}


	async function addCourse(courseInfo) {
		const ncourse = {
			courseName: "Calculus III",
			subject: "Mathematics",
			lesson: ["A"],
			price: 20000,
			learningType: "Online",
			tutorUsername: "Jack",
			timeSlot: {
				Monday: [{ start: "09:00", end: "12:00" }],
				Sunday: [{ start: "09:00", end: "12:00" }],
			},
		};
		const res = await ref.add(ncourse);
		ref.doc(res.id).update({ courseId: res.id, createDate: new Date() });
	}

	function searchCourse(config) {
		console.log(config);
		const result = data.filter((course) => {
			return (
				(course.courseName.toLowerCase().includes(keyword) ||
					course.lesson.find((e) =>
						e.toLowerCase().includes(keyword)
					) ||
					course.tutorUsername.toLowerCase().includes(keyword)) &&
				course.price >= config.min &&
				course.price <= (config.max == -1 ? Infinity : config.max) &&
				(config.subject == ""
					? true
					: course.subject == config.subject) &&
				course.learningType == config.learningType &&
				findCourseDay(course.timeSlot) == config.courseDay
			);
		});
		result.sort(function (a, b) {
			const type = config.sortType;
			const isAscending = config.isAscending;
			if (type == "Price" && isAscending) {
				return a.price - b.price;
			} else if (type == "Price" && !isAscending) {
				return b.price - a.price;
			} else if (type == "Date" && isAscending) {
				return a.createDate - b.createDate;
			} else if (type == "Date" && !isAscending) {
				return b.createDate - a.createDate;
			}
		});
		console.log(result);
		setSearchResult(result);
	}

	function findCourseDay(timeSlot) {
		// const timeSlot = { Sunday: [] };
		const weekEnd = ["Sunday", "Saturday"];
		const weekDay = [
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
		];
		const day = Object.keys(timeSlot);
		if (
			day.some(
				(d) =>
					weekEnd.includes(d) && day.some((d) => weekDay.includes(d))
			)
		)
			return "Mixed";
		else if (
			day.some(
				(d) =>
					!weekEnd.includes(d) && day.some((d) => weekDay.includes(d))
			)
		)
			return "Weekday";
		else if (
			day.some(
				(d) =>
					weekEnd.includes(d) && day.some((d) => !weekDay.includes(d))
			)
		)
			return "Weekend";
	}

	function updateCourse(courseId, courseInfo) {
		const ncourse = {
			// courseName: "Calculus III",
			// subject: "Mathematics",
			// lesson: ["A"],
			// price: 20000,
			// learningType: "Online",
			// tutorUsername: "John",
			// timeSlot: {
			// 	Monday: [{ start: "09:00", end: "12:00" }],
			// 	Sunday: [{ start: "09:00", end: "12:00" }],
			// },
			capacity: 50,
			courseHour: 24,
			description: "ไม่ลง ไม่รู้",
		};
		ref.doc("ApjDLlL0CoQR5ipP4IVE").update(ncourse);
	}

	function deleteCourse(id) {
		ref.doc(id).delete();
	}

	return (
		<div className="App">

      		<header className="App-header">
          <h1>Courses</h1>
			<input
				type="text"
				style={{
					width: "20rem",
					background: "#F2F1F9",
					border: "none",
					padding: "0.5rem",
				}}
				value={keyword}
				placeholder={"search course"}
				onChange={(e) =>
					setKeyword(e.target.value.trim().toLowerCase())
				}
			/>
			<br />
			<button onClick={() => getCourseById("58SrhQcdtP4wvTVqxOX8")}>
				Get
			</button>
			<button onClick={getCourse}>Get course</button>
			<button onClick={() => searchCourse(config)}>Search course</button>
			<button onClick={addCourse}>Add course</button>
			<button onClick={updateCourse}>Update course</button>
			<button onClick={() => getCourseById("58SrhQcdtP4wvTVqxOX8")}>
				Get course by ID
			</button>
			<button onClick={() => getCourseByTutor("John")}>
				Get course by tutor
			</button>
			<hr />
			<div>
				<ul>
					{searchResult.map((course) => {
						return (
							<li key={course.courseId}>
								<img src={course.imageURL} width={300} />
								<h2>{course.courseName}</h2>
								<h4>{course.subject}</h4>
								<h4>{course.learningType}</h4>
								<h4>{course.price}</h4>
								<h4>
									{course.lesson.map((lesson) => {
										return <span>{lesson} </span>;
									})}
								</h4>
								<h4>{course.tutorUsername}</h4>
								<button
									onClick={() => {
										deleteCourse(course.courseId);
									}}
								>
									Delete
								</button>
								<hr />
							</li>
						);
					})}
				</ul>

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
      </header>
		</div>
	);
}

export default App;
