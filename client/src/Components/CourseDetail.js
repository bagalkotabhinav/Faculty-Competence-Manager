import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import Context from '../Context';

const CourseDetail = () => {
  const context = useContext(Context.Context);
  let courseDetail = useState('');
  const [course, setCourseDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const authUser = context.authenticatedUser;

  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response => setCourseDetail(response.data))
      .catch(error => console.log('Error fetching and parsing course', error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (course) {
    courseDetail = <div className="wrap">
      <h2>Course Detail</h2>
      <div className="main--flex">
        <div>
          <h3 className="course--detail--title">Course</h3>
          <h4 className="course--name">{course.title}</h4>
          {course.User
            ? (<p>By {course.User.firstName} {course.User.lastName}</p>)
            : null
          }
          <ReactMarkdown>{course.description}</ReactMarkdown>
        </div>
        <div>
          <h3 className="course--detail--title">Estimated Time</h3>
          <p>{course.estimatedTime}</p>

          <h3 className="course--detail--title">Materials Needed</h3>
          <ul className="course--detail--list">
            <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
          </ul>
        </div>
      </div>
    </div>
  } else {
    courseDetail = null;
  }

  const handleDelete = (event) => {
    event.preventDefault();
    context.data.deleteCourse(id, authUser.emailAddress, authUser.password)
      .then(errors => {
        if (errors.length) {
          setErrors(errors);
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        console.error(error);
        navigate('/error');
      });
  }


  return (
    isLoading ?
      <h2>Loading ...</h2>
      : <div>
        <div className="actions--bar">
          <div className="wrap">
            {authUser && (authUser.id === course.User.id) ?
              <Link to={`/courses/${id}/update`} className="button">Update Course</Link>
              : null
            }
            {authUser && (authUser.id === course.User.id) ?
              <a className="button" onClick={handleDelete}>Delete Course</a>
              : null
            }
            <Link to='/' className="button button-secondary">Return to List</Link>
          </div>
        </div>
        {courseDetail}
      </div>
  )

}

export default CourseDetail;
