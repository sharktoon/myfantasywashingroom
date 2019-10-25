import {combineReducers} from "redux";
import machineStore from "./MachineStore";
import tenantStore from "./TenantStore";

const rootReducer = combineReducers({
    machineState: machineStore.reducer,
    tenantState: tenantStore.reducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;