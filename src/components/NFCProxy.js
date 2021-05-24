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

const init = async () => {
    const supported = await NfcManager.isSupported()
    console.log(supported, 'test')
    if (supported) {
        await NfcManager.start()
    }
    return supported
}

const isEnabled = async () => {
    return NfcManager.isEnabled()
}

export { init, isEnabled }
