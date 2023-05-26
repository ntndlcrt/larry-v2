import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
    appId: 'com.larry.app',
    appName: 'Larry',
    webDir: 'out',
    server: {
        androidScheme: 'https',
    },
}

export default config
