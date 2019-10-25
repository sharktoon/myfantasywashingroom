import React from "react";
import {Text, View} from 'native-base';
import {Machine, MachineState} from "../store/MachineStore";
import {useSelector} from "react-redux";
import {RootState} from "../store/RootReducer";


function MachineScreen() {

    const machines: Machine[] = useSelector((state: RootState) => state.machineState.machines);

    return (
        <View>
            {machines.map((m: Machine) => <MachineDisplay key={m.id} machine={m}/>)}
        </View>
    );

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