import {createSlice, PayloadAction} from "redux-starter-kit";
import {AppThunk} from "./Store";
import financeStore from "./FinanceStore";

export type Machine = {
    id: string
    type: 'wash' | 'dry'
    cycles: number
    speed: number
    failureRiskBase: number
    failureRiskIncrease: number
    inUse: boolean
    remainingTime: number
    willFail: boolean
    price: number
};

export type MachineState = {
    machines: Machine[]
}

const machineCheap: Machine = {
    cycles: 0,
    failureRiskBase: 0.01,
    failureRiskIncrease: 0.001,
    id: "",
    inUse: false,
    remainingTime: 0,
    speed: 0.75,
    type: "wash",
    willFail: false,
    price: 50,
};

const machineNormal: Machine = {
    cycles: 0,
    failureRiskBase: 0.001,
    failureRiskIncrease: 0.0001,
    id: "",
    inUse: false,
    remainingTime: 0,
    speed: 1,
    type: "wash",
    willFail: false,
    price: 100,
};

const machineGood: Machine = {
    cycles: 0,
    failureRiskBase: 0,
    failureRiskIncrease: 0.00001,
    id: "",
    inUse: false,
    remainingTime: 0,
    speed: 1,
    type: "wash",
    willFail: false,
    price: 200,
};

const w1: Machine = {
    cycles: 0,
    failureRiskBase: 0.3,
    failureRiskIncrease: 0.001,
    id: "W1",
    inUse: false,
    remainingTime: 0,
    speed: 0.5,
    type: "wash",
    willFail: false,
    price: 1000,
};

const initialState: MachineState = {
    machines: [w1]
};

type MachineActivation = {
    machineId: string
    duration: number
}

const machineStore = createSlice({
    name: "MachineStore",
    initialState,
    reducers: {
        tickMachine,
        activateMachine(state, action: PayloadAction<MachineActivation>) {
            const machine = state.machines.find(m => m.id === action.payload.machineId);
            if (machine) {
                machine.inUse = true;
                ++machine.cycles;
                machine.remainingTime = action.payload.duration;
                machine.willFail = Math.random() < Math.min(0.7, machine.failureRiskBase + machine.failureRiskIncrease * machine.cycles);
            }
        },
        deactivateMachine(state, action: PayloadAction<string>) {
            const machine = state.machines.find(m => m.id === action.payload);
            if (machine) {
                machine.inUse = false;
            }
        },
        addMachine(state, action: PayloadAction<Machine>) {
            addMachine(state, action.payload);
        },
        addCheapMachine(state) {
            addMachine(state, machineCheap);
        },
        addNormalMachine(state) {
            addMachine(state, machineNormal);
        },
        addGoodMachine(state) {
            addMachine(state, machineGood);
        },
    }
});

function addMachine(state: MachineState, blueprint: Machine) {
    const machine = {...blueprint};

    let lastId = "W0";
    if (state.machines.length > 0) {
        lastId = state.machines[state.machines.length - 1].id;
    }
    machine.id = "W" + (Number.parseInt(lastId.substr(1)) + 1);

    state.machines.push(machine);
}

function tickMachine(state: MachineState, action: PayloadAction<number>) {
    const dt = action.payload;
    state.machines.forEach(machine => {
        if (machine.inUse) {
            machine.remainingTime -= machine.speed * dt;

            if (machine.willFail && Math.random() < 0.01) {
                machine.remainingTime = 0;
            }
        }
    });
}

export function buyCheapMachine():AppThunk {
    return buyMachine(machineCheap);
}
export function buyNormalMachine():AppThunk {
    return buyMachine(machineCheap);
}
export function buyGoodMachine():AppThunk {
    return buyMachine(machineCheap);
}

function buyMachine(blueprint: Machine): AppThunk {
    return (dispatch, getState) => {
        const state = getState();
        if (state.financeState.money < blueprint.price) return;

        dispatch(financeStore.actions.spend(blueprint.price));
        dispatch(machineStore.actions.addMachine(blueprint));
    }
}

export default machineStore;