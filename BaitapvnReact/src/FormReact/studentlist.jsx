import { useSelector, useDispatch } from "react-redux";
import { deleteStudent, setEditingStudent } from "./slice";
import { useState } from "react";

export default function StudentList() {
  const students = useSelector((state) => state.student.students);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  const handleEdit = (id) => {
    const studentToEdit = students.find((student) => student.id === id);
    dispatch(setEditingStudent(studentToEdit)); // Cập nhật Redux store với sinh viên đang chỉnh sửa
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Lọc danh sách sinh viên theo từ khóa tìm kiếm
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Thanh tìm kiếm */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="block w-full px-4 py-2 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tìm kiếm sinh viên..."
        />
      </div>

      <div className="relative overflow-x-auto mt-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Họ và Tên</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Mã Sinh Viên</th>
              <th className="px-6 py-3">Số Điện Thoại</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr
                key={student.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{student.name}</td>
                <td className="px-6 py-4">{student.email}</td>
                <td className="px-6 py-4">{student.studentId}</td>
                <td className="px-6 py-4">{student.phone}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(student.id)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-900 mr-2"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
