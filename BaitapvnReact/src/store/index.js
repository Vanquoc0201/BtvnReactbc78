import {configureStore} from "@reduxjs/toolkit"
import bookingTicketReducer from "./../BookingTicket/slice"
export const store = configureStore({
    reducer: {
        // Add your child reducer here
        bookingTicketReducer,
    }
});
