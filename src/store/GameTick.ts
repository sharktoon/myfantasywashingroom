import {AppThunk} from "./Store";
import tenantStore from "./TenantStore";
import machineStore from "./MachineStore";

export default function gameTick(): AppThunk {
    return (dispatch, getState) => {
        const dt = 0.016;
        const state = getState();

        console.log('t');

        dispatch(machineStore.actions.tickMachine(dt));
        dispatch(tenantStore.actions.tickTenant(dt));

        let freeMachines = [];
        let doneMachines = [];
        state.machineState.machines.forEach(machine => {
            if (!machine.inUse) {
                freeMachines.push(machine);
            } else if (machine.remainingTime <= 0) {
                doneMachines.push(machine);
            }
        });

        state.tenantState.tenants.forEach(tenant => {
            if (tenant.machineId) {
                const machine = doneMachines.find(machine => machine.id === tenant.machineId);
                if (machine) {
                    dispatch(tenantStore.actions.releaseMachine({tenantId: tenant.id, machineId: machine.id}));
                    dispatch(machineStore.actions.deactivateMachine(machine.id));
                }
            } else if (tenant.dirt > tenant.dirtTicketLimit) {
                dispatch(tenantStore.actions.resetDirt(tenant.id));
            } else if (tenant.dirt > tenant.dirtHappinessLimit) {
                if (freeMachines.length > 0) {
                    const index = Math.floor(freeMachines.length * Math.random());
                    const chosenMachine = freeMachines.splice(index, 1)[0];
                    dispatch(tenantStore.actions.selectMachine({tenantId: tenant.id, machineId: chosenMachine.id}));
                    dispatch(machineStore.actions.activateMachine({
                        machineId: chosenMachine.id,
                        duration: 5 + 0.1 * tenant.dirt + 5 * Math.random(),
                    }));
                }
            }
        });
    }
}