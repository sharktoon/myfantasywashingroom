import React from "react";
import {Button, Text, Thumbnail, View} from "native-base";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "../store/RootReducer";
import tenantStore, {Tenant} from "../store/TenantStore";
import {StyleSheet} from "react-native";

require("../../assets/characters/Tex_AnimeAva_01.png");
require("../../assets/characters/Tex_AnimeAva_02.png");

const TenantScreenStyles = StyleSheet.create({
    screen: {justifyContent: "space-between"}
});

function TenantScreen() {
    const tenants = useSelector((state: RootState) => state.tenantState.tenants);
    const dispatch = useDispatch();

    return (
        <View style={TenantScreenStyles.screen}>
            <View>
                {tenants.map(t => <TenantDisplay tenant={t} key={t.id}/>)}
            </View>
            <View>
                <Button onPress={() => dispatch(tenantStore.actions.getRandomTenant())}>
                    <Text>New tenant</Text>
                </Button>
            </View>
        </View>
    );
}

type TenantDisplayProps = {
    tenant: Tenant
}

const tenantStyles = StyleSheet.create({
    row: {flexDirection: "row", borderStyle: "solid", borderColor: "black", borderWidth: 1},
    infoBox: {flexDirection: "column", width: 200},
    smallText: {fontSize: 9},
});

function TenantDisplay(props: TenantDisplayProps) {
    return <View key={props.tenant.id} style={tenantStyles.row}>
        <Thumbnail square source={props.tenant.picture}/>
        <View style={tenantStyles.infoBox}>
            <Text>{props.tenant.name}</Text>
            <View style={{width: Math.min(200, props.tenant.dirt * 20), height: 3, backgroundColor: "#a0522d"}}/>
            <View style={{width: Math.min(200, props.tenant.happiness), height: 3, backgroundColor: "#20b2aa"}}/>
            {renderAction()}
        </View>
    </View>;

    function renderAction() {
        if (props.tenant.machineId) {
            return <Text>uses {props.tenant.machineId}</Text>
        } else if (props.tenant.dirt >= props.tenant.dirtTicketLimit * 0.9) {
            return <Text>angry</Text>
        } else if (props.tenant.dirt >= props.tenant.dirtHappinessLimit * 0.9) {
            return <Text>looks for...</Text>
        }
        return null;
    }
}

export default TenantScreen;