import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import MachineScreen from "./src/components/MachineScreen";
import store, {AppDispatch} from "./src/store/Store";
import gameTick from "./src/store/GameTick";
import TenantScreen from "./src/components/TenantScreen";

let gameRunning = true;

export default function App() {

    useEffect(() => {
        GameLoop(store.dispatch);
        return () => gameRunning = false;
    }, [false]);

    return (
        <Provider store={store}>
            <View style={styles.container}>
                <MachineScreen/>
                <Text>Open up App.tsx to start working on your app!</Text>

                <TenantScreen/>
            </View>
        </Provider>
    );
}

function GameLoop(dispatch: AppDispatch) {
    requestAnimationFrame(loop);

    function loop() {
        if (!gameRunning) return;
        dispatch(gameTick());
        requestAnimationFrame(loop);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
