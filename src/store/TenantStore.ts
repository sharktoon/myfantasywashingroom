import {createSlice, PayloadAction} from "redux-starter-kit";

export type Tenant = {
    id: string
    name: string
    picture: number
    happiness: number
    machineId: string | null

    dirt: number
    dirtIncrease: number
    dirtTicketLimit: number
    dirtHappinessLimit: number
    dryChoiceBase: number
    dryChoiceRange: number
}

export type TenantState = {
    tenants: Tenant[]
}

export type TenantPicksMachine = {
    tenantId: string
    machineId: string
}

const initialState = {
    tenants: []
};

const tenantStore = createSlice({
    name: "TenantStore",
    initialState,
    reducers: {
        tickTenant,
        selectMachine(state, action: PayloadAction<TenantPicksMachine>) {
            actOnTenant(
                state,
                action.payload.tenantId,
                tenant => tenant.machineId = action.payload.tenantId
            );
        },
        releaseMachine(state, action: PayloadAction<TenantPicksMachine>) {
            actOnTenant(
                state,
                action.payload.tenantId,
                tenant => {
                    if (tenant.machineId === action.payload.machineId) {
                        tenant.machineId = null
                    }
                }
            )
        },
        moveIn(state, action: PayloadAction<Tenant>) {
            const tenant = action.payload;
            state.tenants.push(tenant);
        },
        leave(state, action: PayloadAction<string>) {
            const index = state.tenants.findIndex(tenant => tenant.id === action.payload);
            if (index >= 0) {
                state.tenants.splice(index, 1);
            }
        },
        resetDirt(state, action: PayloadAction<string>) {
            actOnTenant(
                state,
                action.payload,
                tenant => tenant.dirt = 0
            );
        },
    },
});

function actOnTenant(state: TenantState, tenantId: string, f: (tenant: Tenant) => void) {
    const tenant: Tenant[] = state.tenants.filter(tenant => tenant.id === tenantId);
    if (tenant.length > 0) {
        return f(tenant[0]);
    } else {
        return false;
    }
}

function tickTenant(state: TenantState, action: PayloadAction<number>) {
    const dt = action.payload;
    state.tenants.forEach(tenant => {
        tenant.dirt += tenant.dirtIncrease * dt;
        if (tenant.dirt < tenant.dirtHappinessLimit) {
            tenant.happiness += dt;
        }
    });
}

export default tenantStore;