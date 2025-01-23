import { useDispatch, useSelector } from "react-redux";
import { addStudent, setEditingStudent, updateStudent } from "./slice";
import { useState, useEffect } from "react";
import StudentList from "./studentlist";

export default function FormReact() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.student.students);
  const [duplicateStudentIdError, setDuplicateStudentIdError] = useState("");
  const editingStudent = useSelector((state) => state.student.editingStudent);
  const error = useSelector((state) => state.student.error);
  const [form, setForm] = useState({
    email: "",
    name: "",
    studentId: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    name: "",
    studentId: "",
    phone: "",
  });

  useEffect(() => {
    if (editingStudent) {
      setForm({
        email: editingStudent.email,
        name: editingStudent.name,
        studentId: editingStudent.studentId,
        phone: editingStudent.phone,
      });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleErrors = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    if (!value.trim()) {
      newErrors[name] = "This field is required";
    } else {
      newErrors[name] = "";
      switch (name) {
        case "email":
          const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (!value.match(regexEmail)) {
            newErrors[name] = "Email is invalid";
          }
          break;
        case "name":
          const regexName =
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
          if (!value.match(regexName)) {
            newErrors[name] = "Name is invalid";
          }
          break;
        case "phone":
          const regexPhone = /^[0-9]{10}$/;
          if (!value.match(regexPhone)) {
            newErrors[name] = "Phone number is invalid";
          }
          break;
        default:
          break;
      }
    }
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (
      form.email &&
      form.name &&
      form.studentId &&
      form.phone &&
      !Object.values(errors).some((err) => err !== "")
    ) {
      // Kiểm tra mã sinh viên có bị trùng không
      const isStudentIdExist = students.some(
        (student) => student.studentId === form.studentId
      );
  
      if (isStudentIdExist) {
        setDuplicateStudentIdError("Mã sinh viên đã tồn tại!");
      } else {
        setDuplicateStudentIdError(""); // Reset lỗi nếu không trùng
        if (editingStudent) {
          dispatch(updateStudent({ ...form, id: editingStudent.id }));
          dispatch(setEditingStudent(null)); // Reset trạng thái editingStudent
          resetForm(); // Reset form sau khi cập nhật
        } else {
          if (!error) {
            dispatch(addStudent({ ...form, id: Date.now() }));
            resetForm(); // Reset form sau khi thêm mới
          } else {
            alert("Có lỗi khi thêm sinh viên: " + error);
          }
        }
      }
    } else {
      alert("Vui lòng điền đầy đủ thông tin hợp lệ!");
    }
  };
  

  const resetForm = () => {
    setForm({ email: "", name: "", studentId: "", phone: "" });
    setErrors({ email: "", name: "", studentId: "", phone: "" });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-3xl font-bold my-5">Quản lý thông tin sinh viên</h1>
      <div className="p-5 rounded-lg">
        <h2 className="text-white text-2xl mb-3">
          {editingStudent ? "Chỉnh sửa thông tin sinh viên" : "Thêm thông tin sinh viên"}
        </h2>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleErrors} // Kiểm tra lỗi khi trường input mất focus
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Vui lòng nhập Email"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleErrors} // Kiểm tra lỗi khi trường input mất focus
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Họ và Tên"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="studentId"
              value={form.studentId}
              onChange={handleChange}
              onBlur={handleErrors} // Kiểm tra lỗi khi trường input mất focus
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Mã Sinh Viên"
            />
            {errors.studentId && <p className="text-red-500 text-xs">{errors.studentId}</p>}
            {duplicateStudentIdError && (
          <p className="text-red-500 text-xs">{duplicateStudentIdError}</p>
        )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleErrors} // Kiểm tra lỗi khi trường input mất focus
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Số điện thoại"
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {editingStudent ? "Cập nhật sinh viên" : "Thêm sinh viên"}
          </button>
        </form>
      </div>
      <StudentList />
    </div>
  );
}