import React from 'react'
import { SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar'
import { colorSet } from '../../styles/colors'
import { S_HomeView } from './HomeTablStyle'
import HomeScreen from '../home'

const HomeTab = (props) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#fff',
                paddingTop: Constants.statusBarHeight,
            }}
        >
            <StatusBar style="dark" backgroundColor={colorSet.white} />
            <S_HomeView>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ width: '100%' }}
                >
                    <TouchableOpacity activeOpacity={1}>
                        <HomeScreen {...props} />
                    </TouchableOpacity>
                </ScrollView>
            </S_HomeView>
        </SafeAreaView>
    )
}

export default HomeTab
