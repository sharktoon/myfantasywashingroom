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
const tenant04: Tenant = {
    dirt: 0,
    dirtHappinessLimit: 4,
    dirtIncrease: 0.2,
    dirtTicketLimit: 10,
    dryChoiceBase: 0,
    dryChoiceRange: 0,
    happiness: 0,
    id: "04",
    machineId: undefined,
    name: "Lucy",
    picture: require("../../assets/characters/Tex_AnimeAva_04.png"),
};
const tenant05: Tenant = {
    dirt: 0,
    dirtHappinessLimit: 1,
    dirtIncrease: 0.1,
    dirtTicketLimit: 10,
    dryChoiceBase: 0,
    dryChoiceRange: 0,
    happiness: 0,
    id: "05",
    machineId: undefined,
    name: "Susanne",
    picture: require("../../assets/characters/Tex_AnimeAva_05.png"),
};
const tenant06: Tenant = {
    dirt: 0,
    dirtHappinessLimit: 7,
    dirtIncrease: 0.2,
    dirtTicketLimit: 10,
    dryChoiceBase: 0,
    dryChoiceRange: 0,
    happiness: 0,
    id: "06",
    machineId: undefined,
    name: "Harry",
    picture: require("../../assets/characters/Tex_AnimeAva_06.png"),
};
const tenant07: Tenant = {
    dirt: 0,
    dirtHappinessLimit: 4,
    dirtIncrease: 0.15,
    dirtTicketLimit: 10,
    dryChoiceBase: 0,
    dryChoiceRange: 0,
    happiness: 0,
    id: "07",
    machineId: undefined,
    name: "Arsatius",
    picture: require("../../assets/characters/Tex_AnimeAva_07.png"),
};
const tenant08: Tenant = {
    dirt: 0,
    dirtHappinessLimit: 9,
    dirtIncrease: 0.3,
    dirtTicketLimit: 10,
    dryChoiceBase: 0,
    dryChoiceRange: 0,
    happiness: 0,
    id: "08",
    machineId: undefined,
    name: "Achim",
    picture: require("../../assets/characters/Tex_AnimeAva_08.png"),
};
const tenant09: Tenant = {
    dirt: 0,
    dirtHappinessLimit: 7,
    dirtIncrease: 0.25,
    dirtTicketLimit: 10,
    dryChoiceBase: 0,
    dryChoiceRange: 0,
    happiness: 0,
    id: "09",
    machineId: undefined,
    name: "Freddie",
    picture: require("../../assets/characters/Tex_AnimeAva_09.png"),
};
const tenant10: Tenant = {
    dirt: 0,
    dirtHappinessLimit: 5,
    dirtIncrease: 0.15,
    dirtTicketLimit: 10,
    dryChoiceBase: 0,
    dryChoiceRange: 0,
    happiness: 0,
    id: "10",
    machineId: undefined,
    name: "Cora",
    picture: require("../../assets/characters/Tex_AnimeAva_10.png"),
};
const tenant11: Tenant = {
    dirt: 0,
    dirtHappinessLimit: 2,
    dirtIncrease: 0.2,
    dirtTicketLimit: 10,
    dryChoiceBase: 0,
    dryChoiceRange: 0,
    happiness: 0,
    id: "11",
    machineId: undefined,
    name: "Florinda",
    picture: require("../../assets/characters/Tex_AnimeAva_11.png"),
};
const tenant12: Tenant = {
    dirt: 0,
    dirtHappinessLimit: 6,
    dirtIncrease: 0.3,
    dirtTicketLimit: 10,
    dryChoiceBase: 0,
    dryChoiceRange: 0,
    happiness: 0,
    id: "12",
    machineId: undefined,
    name: "Marie",
    picture: require("../../assets/characters/Tex_AnimeAva_12.png"),
};

const tenant13: Tenant = {
    dirt: 0,
    dirtHappinessLimit: 6,
    dirtIncrease: 0.35,
    dirtTicketLimit: 10,
    dryChoiceBase: 0,
    dryChoiceRange: 0,
    happiness: 0,
    id: "13",
    machineId: undefined,
    name: "Pauline",
    picture: require("../../assets/characters/Tex_AnimeAva_13.png"),
};
const tenant14: Tenant = {
    dirt: 0,
    dirtHappinessLimit: 4,
    dirtIncrease: 0.1,
    dirtTicketLimit: 10,
    dryChoiceBase: 0,
    dryChoiceRange: 0,
    happiness: 0,
    id: "14",
    machineId: undefined,
    name: "Miriam",
    picture: require("../../assets/characters/Tex_AnimeAva_14.png"),
};
const tenant15: Tenant = {
    dirt: 0,
    dirtHappinessLimit: 4,
    dirtIncrease: 0.6,
    dirtTicketLimit: 10,
    dryChoiceBase: 0,
    dryChoiceRange: 0,
    happiness: 0,
    id: "15",
    machineId: undefined,
    name: "Mellie",
    picture: require("../../assets/characters/Tex_AnimeAva_15.png"),
};
const tenant16: Tenant = {
    dirt: 0,
    dirtHappinessLimit: 7,
    dirtIncrease: 0.25,
    dirtTicketLimit: 10,
    dryChoiceBase: 0,
    dryChoiceRange: 0,
    happiness: 0,
    id: "16",
    machineId: undefined,
    name: "Fritz",
    picture: require("../../assets/characters/Tex_AnimeAva_16.png"),
};
const tenant17: Tenant = {
    dirt: 0,
    dirtHappinessLimit: 7,
    dirtIncrease: 0.9,
    dirtTicketLimit: 10,
    dryChoiceBase: 0,
    dryChoiceRange: 0,
    happiness: 0,
    id: "17",
    machineId: undefined,
    name: "Rob",
    picture: require("../../assets/characters/Tex_AnimeAva_17.png"),
};
const tenant18: Tenant = {
    dirt: 0,
    dirtHappinessLimit: 3,
    dirtIncrease: 0.15,
    dirtTicketLimit: 10,
    dryChoiceBase: 0,
    dryChoiceRange: 0,
    happiness: 0,
    id: "18",
    machineId: undefined,
    name: "Zoë",
    picture: require("../../assets/characters/Tex_AnimeAva_18.png"),
};
const tenant19: Tenant = {
    dirt: 0,
    dirtHappinessLimit: 4,
    dirtIncrease: 0.15,
    dirtTicketLimit: 10,
    dryChoiceBase: 0,
    dryChoiceRange: 0,
    happiness: 0,
    id: "19",
    machineId: undefined,
    name: "Stefanie",
    picture: require("../../assets/characters/Tex_AnimeAva_19.png"),
};
const tenant20: Tenant = {
    dirt: 0,
    dirtHappinessLimit: 6,
    dirtIncrease: 0.25,
    dirtTicketLimit: 10,
    dryChoiceBase: 0,
    dryChoiceRange: 0,
    happiness: 0,
    id: "20",
    machineId: undefined,
    name: "Hubert",
    picture: require("../../assets/characters/Tex_AnimeAva_20.png"),
};
const initialState = {
    tenants: [],
    availableTenants: [tenant01, tenant02, tenant03, tenant04, tenant05, tenant06, tenant07, tenant08, tenant09, tenant10,
        tenant11, tenant12, tenant14, tenant15, tenant16, tenant17, tenant18, tenant19, tenant20,],
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
        getRandomTenant(state) {
            if (state.availableTenants.length <= 0) return;

            const tenant = state.availableTenants.splice(Math.floor(Math.random() * state.availableTenants.length), 1);
            if (tenant.length > 0 && tenant[0]) {
                state.tenants.push(tenant[0]);
            }
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
                tenant => tenant.dirt = tenant.dirt * 0.9
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