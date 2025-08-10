import { useEffect, useState } from 'react';
import api from '../services/api';

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  useEffect(()=>{
    async function load(){
      const { data } = await api.get('/course?topic=react&sort=price_asc&search=react&page=1&limit=10');
      setCourses(data);
    }
    load();
  }, []);
  return (
    <div>
      {courses.map(c => <div key={c.id}>{c.title} - {c.price}</div>)}
    </div>
  );
}
