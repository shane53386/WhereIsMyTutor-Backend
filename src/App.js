import "./App.css";
import firebase from "./firebase";
import { useState, useEffect } from "react";

function App() {
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

	return (
		<div className="App">
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
			</div>
		</div>
	);
}

export default App;
