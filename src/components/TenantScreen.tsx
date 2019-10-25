import React from "react";
import {View, Text, Thumbnail, ProgressBar} from "native-base";
import {useSelector} from 'react-redux';
import {RootState} from "../store/RootReducer";
import {Tenant} from "../store/TenantStore";
import {ActivityIndicator, StyleSheet} from "react-native";
import {supportsOrientationLockAsync} from "expo/build/ScreenOrientation/ScreenOrientation";

require("../../assets/characters/Tex_AnimeAva_01.png");
require("../../assets/characters/Tex_AnimeAva_02.png");

function TenantScreen() {
    const tenants = useSelector((state: RootState) => state.tenantState.tenants);

    return (
        <View>
            {tenants.map(t => <TenantDisplay tenant={t} key={t.id}/>)}
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
            {props.tenant.machineId && <Text>using {props.tenant.machineId}</Text>}
        </View>
    </View>;
}

export default TenantScreen;