import {createSlice, PayloadAction} from "redux-starter-kit";

const SCORE_BASE = 2;
const SCORE_PER_TICKET = -5;
export const MONTH_TIME = 30;

type MonthlyHappiness = {
    tenants: number[]
    tickets: number
};

export type ScoreState = {
    score: number,
    month: number,
    monthTimer: number,
    lastMonthScore: number,
    lastMonthHappiness: MonthlyHappiness,
}

const initialState: ScoreState = {
    score: 0,
    month: 0,
    monthTimer: 0,
    lastMonthScore: 0,
    lastMonthHappiness: {tenants: [], tickets: 0,},
};

const scoreStore = createSlice({
    name: "ScoreStore",
    initialState,
    reducers: {
        score(state: ScoreState, action: PayloadAction<MonthlyHappiness>) {
            let monthScore = 0;
            for (let i = 1; i < action.payload.tenants.length; ++i) {
                monthScore += action.payload.tenants[i] * Math.pow(SCORE_BASE, i - 1);
            }
            monthScore += action.payload.tickets * SCORE_PER_TICKET;

            state.score += Math.max(0, monthScore);
            state.lastMonthScore = monthScore;
            state.lastMonthHappiness = action.payload;
            state.monthTimer -= MONTH_TIME;
            ++state.month;
        },
        timeStep(state: ScoreState, action: PayloadAction<number>) {
            state.monthTimer += action.payload;
        },
    }
});

export default scoreStore;