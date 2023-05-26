import Sonar from './_files/sonar.svg'
import Shopping from './_files/shopping.svg'
import Exchanging from './_files/exchanging.svg'
import Teamwork from './_files/teamwork.svg'
import Coffee from './_files/coffee.svg'

export default function Larry({ svgId }: { svgId: string | undefined }) {
    switch (svgId) {
        case 'sonar':
            return <Sonar />
        case 'shopping':
            return <Shopping />
        case 'exchanging':
            return <Exchanging />
        case 'teamwork':
            return <Teamwork />
        case 'coffee':
            return <Coffee />
        default:
            return <Coffee />
    }
}
