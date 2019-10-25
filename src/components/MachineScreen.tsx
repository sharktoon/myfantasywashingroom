import React from "react";
import {Text, View} from 'native-base';
import {Machine, MachineState} from "../store/MachineStore";
import {useSelector} from "react-redux";
import {RootState} from "../store/RootReducer";


function MachineScreen() {

    const machines: Machine[] = useSelector((state: RootState) => state.machineState.machines);

    return (
        <View>
            <FinanceView/>
            <TicketCountView/>
            {machines.map((m: Machine) => <MachineDisplay key={m.id} machine={m}/>)}
        </View>
    );

}

function FinanceView() {
    const finance = useSelector((state:RootState) => state.financeState.money);
    return <Text>{finance.toFixed(2)}</Text>
}

function TicketCountView() {
    const ticketCount = useSelector((state:RootState) => state.ticketState.tickets.length);

    return <Text>Tickets: {ticketCount}</Text>
}

type MachineDisplayProps = {
    machine: Machine
}

function MachineDisplay(props: MachineDisplayProps) {
    return <View>
        <Text>{props.machine.type}-{props.machine.id}</Text>
        <Text>{props.machine.inUse ? "running" : "idle"}</Text>
    </View>
}


export default MachineScreen;