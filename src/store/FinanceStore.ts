import {createSlice, PayloadAction} from "redux-starter-kit";


type FinanceState = {
    money: number
}

const initialState: FinanceState ={
    money: 0
};

const financeStore = createSlice({
    name: "financeStore",
    initialState,
    reducers: {
        earn(state, action: PayloadAction<number>) {
            state.money += action.payload;
        },
        spend(state, action: PayloadAction<number>) {
            state.money -= action.payload;
        },
    }
});

export default financeStore;