import data from "./danhSachGhe.json";
import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    listSeat: data,
    listSeatSelected: [],
}
const findIndexSeat = (data, numberSeat) =>{
    return data.findIndex((seat)=> seat.soGhe === numberSeat)
}
const bookingTicketSlice = createSlice({
    name: "bookingTicketSlice",
    initialState,
    reducers: {
        setSeatSelected: (state,action) =>{
            const {payload} = action;
            const index = findIndexSeat(state.listSeatSelected, payload.soGhe)
            const listSeatSelectedClone = [...state.listSeatSelected];
            if(index !==-1){
                // remove seat
                listSeatSelectedClone.splice(index,1)
            } else{
                // push seat
                listSeatSelectedClone.push(payload)
            }
            // update
            state.listSeatSelected = listSeatSelectedClone
        }
    }
})
export const {setSeatSelected} = bookingTicketSlice.actions
export default bookingTicketSlice.reducer;