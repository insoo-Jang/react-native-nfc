import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { SCREEN } from './constants'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { BluetoothTab, HomeTab } from '../screens/tabs'
import { NavigationContainer } from '@react-navigation/native'
import TagDetailTab from '../screens/tabs/TagDetailTab'
import { Platform, View } from 'react-native'
import { iconSizeSet } from '../styles/size'
import { colorSet } from '../styles/colors'
import { Icon } from 'react-native-elements'

const BottomTabStack = createMaterialTopTabNavigator()
const MainStack = createStackNavigator()
const RootStack = createStackNavigator()

const BackIcon = () => (
    <View style={{ marginLeft: Platform.OS === 'ios' ? 15 : 0 }}>
        <Icon
            name="chevron-left"
            type="font-awesome"
            // size={iconSizeSet.xl}
            // hitSlop={{
            //     top: 15,
            //     left: 15,
            //     bottom: 15,
            //     right: 15,
            // }}
        />
    </View>
)
const BottomTabNavigation = () => {
    return (
        <BottomTabStack.Navigator
            // tabBar={(props) => <BottomTabBar {...props} />}
            swipeEnabled={false}
            tabBarPosition={'bottom'}
        >
            <BottomTabStack.Screen name={SCREEN.Nfc} component={HomeTab} />

            {/*<BottomTabStack.Screen*/}
            {/*    name={SCREEN.Bluetooth}*/}
            {/*    component={BluetoothTab}*/}
            {/*/>*/}
        </BottomTabStack.Navigator>
    )
}
const MainNavigation = () => {
    return (
        <MainStack.Navigator>
            <MainStack.Screen name={SCREEN.Home} component={HomeTab} />
            <MainStack.Screen
                name={SCREEN.TagDetail}
                component={TagDetailTab}
                options={({ route }) => ({
                    title: ' ',
                    headerBackImage: BackIcon,
                    headerBackTitleVisible: false,
                    headerTintColor: colorSet.normalTextColor,
                    headerStyle: {
                        shadowColor: 'transparent',
                        shadowOpacity: 0,
                        elevation: 0,
                        borderBottomWidth: 1,
                        borderBottomColor: colorSet.borderColor,
                    },
                    headerTitleAlign: 'center',
                })}
            />
            {/*<MainStack.Screen name={SCREEN.TagDetail} component={tagDetail} />*/}
        </MainStack.Navigator>
    )
}
const RootNavigation = () => {
    return (
        <RootStack.Navigator headerMode="none" mode="modal">
            <RootStack.Screen
                name={SCREEN.Main}
                component={MainNavigation}
                options={{ animationEnabled: false }}
            />
        </RootStack.Navigator>
    )
}

function AppNavigator(props) {
    return (
        <NavigationContainer>
            <RootNavigation />
        </NavigationContainer>
    )
}

export default AppNavigator
