import React from "react";
import {Button, Icon, List, ListItem, Text, View} from 'native-base';
import machineStore, {
    buyCheapMachine,
    buyGoodMachine,
    buyNormalMachine,
    Machine,
    MachineState
} from "../store/MachineStore";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../store/RootReducer";
import {MONTH_TIME, ScoreState} from "../store/ScoreStore";
import {TicketState} from "../store/TicketStore";


function ScoreScreen() {


    return (
        <View style={{flexDirection: "column", justifyContent: 'space-between'}}>
            <ScoreView/>
        </View>
    );
}


function ScoreView() {
    const score: ScoreState = useSelector((state: RootState) => state.scoreState);
    const tickets: TicketState = useSelector((state: RootState) => state.ticketState);

    return <View>
        <Text>Total Months played: {score.month}</Text>
        <View>
            <View style={{position: "absolute", backgroundColor: "#333", height: 7, width: 100}}/>
            <View style={{
                position: "absolute",
                backgroundColor: "#888",
                height: 5,
                width: 98 * score.monthTimer / MONTH_TIME,
                left: 1,
                top: 1,
            }}/>
        </View>
        <Text>Current Score: {score.score}</Text>
        <Text>Last month score: {score.lastMonthScore}</Text>
        {renderHeartCounter(0)}
        {renderHeartCounter(1)}
        {renderHeartCounter(2)}
        {renderHeartCounter(3)}
        {renderHeartCounter(4)}
        {renderHeartCounter(5)}
        <Text>Tickets (last month): {score.lastMonthHappiness.tickets}</Text>
        <Text>Tickets (total): {tickets.totalTicketCount}</Text>
    </View>;

    function renderHeartCounter(hearts) {
        const count = score.lastMonthHappiness[hearts];
        if (count === undefined) return null;
        return <View style={{flexDirection: "row", alignContent: "center"}}>
            <Icon name={"heart"}/><Text>x{hearts}: {count}</Text>
        </View>
    }

}


export default ScoreScreen;