import React, { useEffect } from 'react'
import { Text, View as RNView } from 'react-native'
import { S_TitleText, S_TitleView } from '../tabs/HomeTablStyle'
import { Button } from 'react-native-elements'
import * as NFCProxy from '../../components/NFCProxy'
import BleManager from 'react-native-ble-manager'

const Bluetooth = () => {
    useEffect(() => {
        BleManager.start({ showAlert: false }).then(() => {
            // Success code
            console.log('Module initialized')
        })
    })

    const onBleScan = () => {
        BleManager.scan([], 5, true).then((device) => {
            // Success code

            console.log('Scan started')
            console.log(JSON.stringify(device), '@@')
        })
    }
    const stopBleScan = () => {
        BleManager.stopScan().then(() => {
            // Success code
            console.log('Scan stopped')
        })
    }
    const connectBle = () => {
        BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
            // Success code
            console.log('Connected peripherals: ' + peripheralsArray.length)
        })
    }

    const retrieveConnected = () => {
        BleManager.getConnectedPeripherals([]).then((results) => {
            console.log(results)
        })
    }

    return (
        <RNView>
            <S_TitleView>
                <S_TitleText>Bluetooth 연결</S_TitleText>
            </S_TitleView>
            <Button
                buttonStyle={{ height: 50, marginHorizontal: 25 }}
                onPress={() => {
                    onBleScan()
                }}
                title="Connect"
            />
            <Button
                buttonStyle={{ height: 50, marginHorizontal: 25 }}
                onPress={() => {
                    stopBleScan()
                }}
                title="stop"
            />
            <Button
                buttonStyle={{ height: 50, marginHorizontal: 25 }}
                onPress={() => {
                    retrieveConnected()
                }}
                title="test"
            />
        </RNView>
    )
}

export default Bluetooth
