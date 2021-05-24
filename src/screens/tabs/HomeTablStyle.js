import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import { fontSizeSet } from '../../styles/size'
import { Text } from 'react-native-elements'

const screenWidth = Dimensions.get('screen').width
export const S_HomeView = styled.View`
    height: 100%;
    width: ${screenWidth}px;
    background-color: #ffffff;
    align-items: center;
`
S_HomeView.displayName = 'S_HomeView'
export const S_TitleView = styled.View`
    padding: 25px 0 10px;
    width: 100%;
`
S_TitleView.displayName = 'S_TitleView'

export const S_TitleText = styled(Text)`
    font-size: ${fontSizeSet.base}px;
    font-weight: bold;
    padding: 0 15px;
`
S_TitleText.displayName = 'S_TitleText'
