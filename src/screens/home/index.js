import React, { useEffect, useState } from 'react'
import { S_TitleText, S_TitleView } from '../tabs/HomeTablStyle'
import { Alert, View as RNView } from 'react-native'
import SwitchSelector from 'react-native-switch-selector'
import { colorSet } from '../../styles/colors'
import NfcManager, { NfcEvents } from 'react-native-nfc-manager'
import { Button } from 'react-native-elements'
import * as NFCProxy from '../../components/NFCProxy'

const HomeScreen = (props) => {
    const { navigation } = props
    const [supported, setSupported] = React.useState(null)
    const [enabled, setEnabled] = React.useState(null)
    // const [isConnect, setIsConnect] = useState(false)
    useEffect(() => {
        async function initNfc() {
            try {
                setSupported(await NFCProxy.init())
                setEnabled(await NFCProxy.isEnabled())
            } catch (ex) {
                Alert.alert('ERROR', 'fail to init NFC', [{ text: 'OK' }])
            }
        }
        initNfc()
    })
    return (
        <RNView>
            <S_TitleView>
                <S_TitleText>NFC연결</S_TitleText>
            </S_TitleView>
            <Button
                buttonStyle={{ height: 50, marginHorizontal: 25 }}
                onPress={async () => {
                    const tag = await NFCProxy.readTag()
                    if (tag) {
                        navigation.navigate('TagDetail', { tag })
                    } else {
                        console.log('Fail Read Tag')
                    }
                }}
                title="Connect"
            />
        </RNView>
    )
}

export default HomeScreen
