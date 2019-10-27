import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {StyleSheet} from 'react-native';
import MachineScreen from "./src/components/MachineScreen";
import store, {AppDispatch} from "./src/store/Store";
import gameTick from "./src/store/GameTick";
import TenantScreen from "./src/components/TenantScreen";
import {Button, Container, Content, Footer, FooterTab, Header, Icon} from "native-base";
import {AppLoading} from "expo";
import * as Font from "expo-font";
import ScoreScreen from "./src/components/ScoreScreen";

enum ScreenChoice {
    machine,
    tenant,
    others,
}

let gameRunning = true;

export default function App() {
    const [ready, setReady] = useState(false);
    const [screenChoice, setScreenChoice] = useState(ScreenChoice.machine);

    useEffect(() => {
        if (ready) {
            GameLoop(store.dispatch);
            return () => gameRunning = false;
        }
    }, [ready]);


    async function loadFonts() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        });
        setReady(true);
    }

    useEffect(() => {
        loadFonts().then(console.log, console.error);
    }, []);

    if (!ready) {
        return <AppLoading/>;
    }

    return (
        <Provider store={store}>
            <Container>
                <Header>

                </Header>
                <Content>
                    {screenChoice === ScreenChoice.machine && <MachineScreen/>}
                    {screenChoice === ScreenChoice.tenant && <TenantScreen/>}
                    {screenChoice === ScreenChoice.others && <ScoreScreen/>}
                </Content>
                {MyFooter()}
            </Container>
        </Provider>
    );

    function MyFooter() {
        return <Footer>
            <FooterTab>
                <Button onPress={() => setScreenChoice(ScreenChoice.machine)}>
                    <Icon name={"partly-sunny"}/>
                </Button>
                <Button onPress={() => setScreenChoice(ScreenChoice.tenant)}>
                    <Icon name={"beer"}/>
                </Button>
                <Button onPress={() => setScreenChoice(ScreenChoice.others)}>
                    <Icon name={"cog"}/>
                </Button>
            </FooterTab>
        </Footer>
    }
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
