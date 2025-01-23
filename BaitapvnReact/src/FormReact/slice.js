// studentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  editingStudent: null,
  error: null, // Thêm state để lưu thông báo lỗi
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      const existingStudent = state.students.find(
        (student) => student.studentId === action.payload.studentId
      );

      if (existingStudent) {
        state.error = "Mã sinh viên đã tồn tại!";
      } else {
        state.students.push(action.payload);
        state.error = null; // Reset lỗi nếu thêm thành công
      }
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );
    },
    setEditingStudent: (state, action) => {
      state.editingStudent = action.payload;
    },
    updateStudent: (state, action) => {
      const index = state.students.findIndex(
        (student) => student.id === action.payload.id
      );
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
  },
});

export const { addStudent, deleteStudent, setEditingStudent, updateStudent } =
  studentSlice.actions;

export default studentSlice.reducer;
