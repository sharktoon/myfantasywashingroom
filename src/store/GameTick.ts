import {AppThunk} from "./Store";
import tenantStore from "./TenantStore";
import machineStore, {Machine} from "./MachineStore";
import ticketStore from "./TicketStore";
import financeStore from "./FinanceStore";
import scoreStore, {MONTH_TIME} from "./ScoreStore";

const PRICE = 2.00;

export default function gameTick(): AppThunk {
    return (dispatch, getState) => {
        const dt = 0.1;
        dispatch(scoreStore.actions.timeStep(dt));

        const state = getState();

        if (state.scoreState.monthTimer >= MONTH_TIME) {
            const tenantHappiness = [0, 0, 0, 0, 0, 0];
            state.tenantState.tenants.forEach(tenant => ++tenantHappiness[Math.floor(tenant.happiness)]);
            dispatch(scoreStore.actions.score(tenantHappiness));
        }

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
                const machine: Machine = doneMachines.find(machine => machine.id === tenant.machineId);
                if (machine) {
                    dispatch(tenantStore.actions.releaseMachine({tenantId: tenant.id, machineId: machine.id}));
                    if (machine.willFail) {
                        dispatch(tenantStore.actions.reduceHappiness(tenant.id));
                        dispatch(tenantStore.actions.reduceDirt(tenant.id));
                        dispatch(ticketStore.actions.addTicket({tenantId: tenant.id, reason: "Laundry is not clean!"}));
                    } else {
                        dispatch(tenantStore.actions.resetDirt(tenant.id));
                    }

                    dispatch(machineStore.actions.deactivateMachine(machine.id));
                }
            } else if (tenant.dirt > tenant.dirtTicketLimit) {
                dispatch(tenantStore.actions.resetDirt(tenant.id));
                dispatch(tenantStore.actions.reduceHappiness(tenant.id));
                dispatch(ticketStore.actions.addTicket({tenantId: tenant.id, reason: "Couldn't find machine."}));
            } else if (tenant.dirt > tenant.dirtHappinessLimit) {
                if (freeMachines.length > 0) {
                    const index = Math.floor(freeMachines.length * Math.random());
                    const chosenMachine = freeMachines.splice(index, 1)[0];
                    dispatch(tenantStore.actions.selectMachine({tenantId: tenant.id, machineId: chosenMachine.id}));
                    dispatch(financeStore.actions.earn(PRICE));
                    dispatch(machineStore.actions.activateMachine({
                        machineId: chosenMachine.id,
                        duration: 5 + 0.1 * tenant.dirt + 5 * Math.random(),
                    }));
                }
            }
        });
    }
}