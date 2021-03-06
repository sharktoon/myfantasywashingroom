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


function MachineScreen() {

    const dispatch = useDispatch();
    const machines: Machine[] = useSelector((state: RootState) => state.machineState.machines);

    return (
        <View style={{flexDirection: "column", justifyContent: 'space-between'}}>
            <List>
                {machines.map((m: Machine) => <ListItem key={m.id}><MachineDisplay key={m.id} machine={m}/></ListItem>)}
            </List>
            <View>
                <FinanceView/>
                <TicketCountView/>
                <Button onPress={() => dispatch(buyCheapMachine())}>
                    <Text>Buy cheap machine (50.00)</Text>
                </Button>
                <Button onPress={() => dispatch(buyNormalMachine())}>
                    <Text>Buy solid machine (100.00)</Text>
                </Button>
                <Button onPress={() => dispatch(buyGoodMachine())}>
                    <Text>Buy expensive machine (200.00)</Text>
                </Button>
            </View>
        </View>
    );

}

function FinanceView() {
    const finance = useSelector((state: RootState) => state.financeState.money);
    return <Text>{finance.toFixed(2)}</Text>
}

function TicketCountView() {
    const ticketCount = useSelector((state: RootState) => state.ticketState.tickets.length);

    return <Text>Tickets: {ticketCount}</Text>
}

type MachineDisplayProps = {
    machine: Machine
}

function MachineDisplay(props: MachineDisplayProps) {
    return <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: -1, flexDirection: 'column', minWidth: 0, minHeight: 0}}>
            <Icon style={{flex: 1}} name={'washing-machine'} type={'MaterialCommunityIcons'}/>
        </View>
        <View style={{flex: 3, flexDirection: 'column'}}>
            <Text>{props.machine.type}-{props.machine.id}</Text>
            <Text>{props.machine.inUse ? "running" : "idle"}</Text>
            <Text>Tickets: {props.machine.ticketCount}</Text>
        </View>
    </View>
}


export default MachineScreen;