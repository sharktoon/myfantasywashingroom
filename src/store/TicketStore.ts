import {createSlice, PayloadAction} from "redux-starter-kit";

type Ticket = {
    id?: number
    tenantId: string
    reason: string
}

type TicketState = {
    tickets: Ticket[]
}

const initialState: TicketState = {
    tickets: []
};

const ticketStore = createSlice({
    name: "TicketStore",
    initialState,
    reducers: {
        addTicket(state, action: PayloadAction<Ticket>) {
            const ticket = action.payload;
            ticket.id = state.tickets.length;
            state.tickets.push(ticket);
        },
    }
});

export default ticketStore;