import { Platform } from 'react-native'

import NfcManager, {
    NfcTech,
    Ndef,
    NfcEvents,
    NfcError,
} from 'react-native-nfc-manager'
import * as Revent from 'revent-lib'

const withAndroidPrompt = (fn) => {
    async function wrapper() {
        try {
            if (Platform.OS === 'android') {
                Revent.getProxy('androidPrompt').update({
                    visible: true,
                    message: 'Ready to scan NFC',
                })
            }

            const resp = await fn.apply(null, arguments)

            if (Platform.OS === 'android') {
                Revent.getProxy('androidPrompt').update({
                    visible: true,
                    message: 'Completed',
                })
            }

            return resp
        } catch (ex) {
            throw ex
        } finally {
            if (Platform.OS === 'android') {
                setTimeout(() => {
                    Revent.getProxy('androidPrompt').update({
                        visible: false,
                    })
                }, 800)
            }
        }
    }

    return wrapper
}

const readTag = withAndroidPrompt(async () => {
    let tag = null
    try {
        await NfcManager.requestTechnology([NfcTech.Ndef])
        tag = await NfcManager.getTag()

        tag.ndefStatus = await NfcManager.ndefHandler.getNdefStatus()
        if (Platform.OS === 'ios') {
            await NfcManager.setAlertMessageIOS('Success')
        }
    } catch (ex) {
        // for tag reading, we don't actually need to show any error
    } finally {
        NfcManager.cancelTechnologyRequest()
    }

    return tag
})

const init = async () => {
    const supported = await NfcManager.isSupported()
    if (supported) {
        await NfcManager.start()
    }
    return supported
}

const isEnabled = async () => {
    return NfcManager.isEnabled()
}

export { init, isEnabled, readTag }
