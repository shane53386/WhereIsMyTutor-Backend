import "./App.css";
import firebase from "./firebase";
import { useState, useEffect } from "react";

function App() {
	const ref = firebase.firestore().collection("courses");

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
			description: "ไม่ลง ไม่รู้"
		};
		ref.doc("ApjDLlL0CoQR5ipP4IVE").update(ncourse);
	}

	function deleteCourse(id) {
		ref.doc(id).delete();
	}

	return (
		<div className="App">
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
			<button onClick={()=>getCourseByTutor("John")}>Get course by tutor</button>
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
			</div>
		</div>
	);
}

export default App;
