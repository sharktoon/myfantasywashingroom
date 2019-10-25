import {combineReducers} from "redux";
import machineStore from "./MachineStore";
import tenantStore from "./TenantStore";
import ticketStore from "./TicketStore";
import financeStore from "./FinanceStore";

const rootReducer = combineReducers({
    machineState: machineStore.reducer,
    tenantState: tenantStore.reducer,
    ticketState: ticketStore.reducer,
    financeState: financeStore.reducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;