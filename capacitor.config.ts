import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
    appId: 'com.larry.app',
    appName: 'larry',
    webDir: 'out',
    server: {
        androidScheme: 'https',
    },
}

export default config
