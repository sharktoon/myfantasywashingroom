import {combineReducers} from "redux";
import machineStore from "./MachineStore";
import tenantStore from "./TenantStore";
import ticketStore from "./TicketStore";
import financeStore from "./FinanceStore";
import scoreStore from "./ScoreStore";

const rootReducer = combineReducers({
    machineState: machineStore.reducer,
    tenantState: tenantStore.reducer,
    ticketState: ticketStore.reducer,
    financeState: financeStore.reducer,
    scoreState: scoreStore.reducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;