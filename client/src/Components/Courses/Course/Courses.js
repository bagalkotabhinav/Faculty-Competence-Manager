// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Context from '../../../Context';
// import Loading from '../../Loading';

// const Courses = () => {
//   const context = useContext(Context.Context);
//   let [courses] = useState('');
//   let [papers] = useState('');
//   const [data, setData] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   let navigate = useNavigate();

//   useEffect(() => {
//     context.data.getCourses()
//       .then((response) => {
//         setData(response);
//       })
//       .catch((error) => {
//         console.error('Error fetching and parsing data', error);
//         navigate('/error');
//       })
//       .finally(() => setIsLoading(false));
//   }, [navigate, context.data]);

//   if (data.length) {
//     courses = data.map((course) => {
//       return <Link to={`/courses/${course.id}`} className="course--module course--link" key={course.id}>
//         <h2 className="course--label">Course</h2>
//         <h3 className="course--title">{course.title}</h3>
//       </Link>
//     });
//   }

//   useEffect(() => {
//     context.data.getPapers()
//       .then((response) => {
//         setData(response);
//       })
//       .catch((error) => {
//         console.error('Error fetching and parsing data', error);
//         navigate('/error');
//       })
//       .finally(() => setIsLoading(false));
//   }, [navigate, context.data]);

//   if (data.length) {
//     papers = data.map((paper) => {
//       return <Link to={`/papers/${paper.id}`} className="course--module course--link" key={paper.id}>
//         <h2 className="course--label">Paper</h2>
//         <h3 className="course--title">{paper.title}</h3>
//       </Link>
//     });
//   }


//   return (
//     isLoading ?
//       <Loading />
//       : <div className="wrap main--grid">
//         {courses}
//         <Link to='/courses/create' className="course--module course--add--module">
//           <span className="course--add--title">
//             <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
//               viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
//             New Course
//           </span>
//         </Link>

//         {papers}
//         <Link to='/papers/create' className="course--module course--add--module">
//           <span className="course--add--title">
//             <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
//               viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
//             New Paper
//           </span>
//         </Link>
//       </div>
//   );
// }

// export default Courses;


import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Context from '../../../Context';
import Loading from '../../Loading';

const Courses = () => {
  const context = useContext(Context.Context);
  const [courses, setCourses] = useState([]);
  const [papers, setPapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authUser = context.authenticatedUser;

  let navigate = useNavigate();

  useEffect(() => {
    // Fetch courses
    context.data.getCourses()
      .then((response) => {
        // setCourses(response);
        const filteredCourses = response.filter(course => course.userId === authUser.id);
        setCourses(filteredCourses);
      })
      .catch((error) => {
        console.error('Error fetching courses', error);
        navigate('/error');
      });
  }, [navigate, context.data, authUser.id]);

  useEffect(() => {
    // Fetch papers
    context.data.getPapers()
      .then((response) => {
        // Filter papers by userId
        const filteredPapers = response.filter(paper => paper.User.id === authUser.id);
        setPapers(filteredPapers);
      })
      .catch((error) => {
        console.error('Error fetching papers', error);
        navigate('/error');
      })
      .finally(() => setIsLoading(false));
  }, [navigate, context.data, authUser.id]);
  

  return (
    isLoading ?
      <Loading />
      : <div className="wrap main--grid">
        {/* Display Courses */}
        {courses.map((course) => (
          <Link to={`/courses/${course.id}`} className="course--module course--link" key={course.id}>
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
          </Link>
        ))}
        {/* Display Papers */}
        {papers.map((paper) => (
          <Link to={`/papers/${paper.id}`} className="course--module course--link" key={paper.id}>
            <h2 className="course--label">Paper</h2>
            <h3 className="course--title">{paper.title}</h3>
          </Link>
        ))}

        
        <Link to='/courses/create' className="course--module course--add--module">
          <span className="course--add--title">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
            New Course
          </span>
        </Link>
        <Link to='/papers/create' className="course--module course--add--module">
          <span className="course--add--title">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
            New Paper
          </span>
        </Link>
      </div>
  );
}

export default Courses;
