import {createSlice, PayloadAction} from "redux-starter-kit";

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
};

export type MachineState = {
    machines: Machine[]
}

const initialState: MachineState = {
    machines: []
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
                machine.willFail = Math.random() > machine.failureRiskBase + machine.failureRiskIncrease * machine.cycles;
            }
        },
        deactivateMachine(state, action: PayloadAction<string>) {
            const machine = state.machines.find(m => m.id === action.payload);
            if(machine) {
                machine.inUse = false;
            }
        },
    }
});

function tickMachine(state: MachineState,action: PayloadAction<number>) {
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

export default machineStore;