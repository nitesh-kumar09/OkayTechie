import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";
import { UserData } from "./UserContext";

const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [mycourse, setMyCourse] = useState([]);
  const { isAuth } = UserData();

  async function fetchCourses() {
    try {
      const { data } = await axios.get(`${server}/api/course/all`);
      setCourses(data.courses);
    } catch (error) {
      console.error("Courses fetch error:", error);
    }
  }

  async function fetchCourse(id) {
    try {
      const { data } = await axios.get(`${server}/api/course/${id}`);
      setCourse(data.course);
    } catch (error) {
      console.error("Course fetch error:", error);
    }
  }

  async function fetchMyCourse() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found for fetching my courses");
      return;
    }

    try {
      const { data } = await axios.get(`${server}/api/mycourse`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMyCourse(data.courses);
    } catch (error) {
      console.error("My courses fetch error:", error);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (isAuth) {
      fetchMyCourse();
    }
  }, [isAuth]);

  return (
    <CourseContext.Provider
      value={{
        courses,
        fetchCourses,
        fetchCourse,
        course,
        mycourse,
        fetchMyCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const CourseData = () => useContext(CourseContext);
