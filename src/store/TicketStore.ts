import {createSlice, PayloadAction} from "redux-starter-kit";

type Ticket = {
    id?: number
    tenantId: string
    reason: string
    machineId?: string
}

export type TicketState = {
    tickets: Ticket[]
    oldTickets: Ticket[]
    totalTicketCount: number
}

const initialState: TicketState = {
    tickets: [],
    oldTickets: [],
    totalTicketCount: 0,
};

const ticketStore = createSlice({
    name: "TicketStore",
    initialState,
    reducers: {
        addTicket(state, action: PayloadAction<Ticket>) {
            const ticket = action.payload;
            ticket.id = state.tickets.length;
            state.tickets.push(ticket);
            ++state.totalTicketCount;
        },
        storeTickets(state) {
            state.oldTickets = state.tickets;
            state.tickets = []
        },
    }
});

export default ticketStore;