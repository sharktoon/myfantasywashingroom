import {createSlice, PayloadAction} from "redux-starter-kit";

export type Tenant = {
    id: string
    name: string
    picture: any
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

const tenant01: Tenant = {
    dirt: 0,
    dirtHappinessLimit: 3,
    dirtIncrease: 0.1,
    dirtTicketLimit: 10,
    dryChoiceBase: 0,
    dryChoiceRange: 0,
    happiness: 0,
    id: "01",
    machineId: undefined,
    name: "Lena",
    picture: require("../../assets/characters/Tex_AnimeAva_01.png"),
};

const tenant02: Tenant = {
    dirt: 0,
    dirtHappinessLimit: 4,
    dirtIncrease: 0.15,
    dirtTicketLimit: 10,
    dryChoiceBase: 0,
    dryChoiceRange: 0,
    happiness: 0,
    id: "02",
    machineId: undefined,
    name: "Julia",
    picture: require("../../assets/characters/Tex_AnimeAva_02.png"),
};

const tenant03: Tenant = {
    dirt: 0,
    dirtHappinessLimit: 2,
    dirtIncrease: 0.05,
    dirtTicketLimit: 10,
    dryChoiceBase: 0,
    dryChoiceRange: 0,
    happiness: 0,
    id: "03",
    machineId: undefined,
    name: "Regina",
    picture: require("../../assets/characters/Tex_AnimeAva_03.png"),
};

const initialState = {
    tenants: [tenant01, tenant02, tenant03]
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
                tenant => tenant.machineId = action.payload.machineId
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
        resetHappiness(state, action: PayloadAction<string>) {
            actOnTenant(
                state,
                action.payload,
                tenant => tenant.happiness = 0
            );
        },
        reduceDirt(state, action: PayloadAction<string>) {
            actOnTenant(
                state,
                action.payload,
                tenant => tenant.dirt= tenant.dirt * 0.9
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
        if (tenant.machineId) return;
        tenant.dirt += tenant.dirtIncrease * dt;
        if (tenant.dirt < tenant.dirtHappinessLimit) {
            tenant.happiness += dt;
        }
    });
}

export default tenantStore;