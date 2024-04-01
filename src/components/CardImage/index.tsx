import React from 'react'
import type { Card } from '~/types/card'

import Clubs2Svg from '~/assets/cards/clubs_2.svg?react'
import Clubs3Svg from '~/assets/cards/clubs_3.svg?react'
import Clubs4Svg from '~/assets/cards/clubs_4.svg?react'
import Clubs5Svg from '~/assets/cards/clubs_5.svg?react'
import Clubs6Svg from '~/assets/cards/clubs_6.svg?react'
import Clubs7Svg from '~/assets/cards/clubs_7.svg?react'
import Clubs8Svg from '~/assets/cards/clubs_8.svg?react'
import Clubs9Svg from '~/assets/cards/clubs_9.svg?react'
import Clubs10Svg from '~/assets/cards/clubs_10.svg?react'
import ClubsAceSvg from '~/assets/cards/clubs_ace.svg?react'
import ClubsJackSvg from '~/assets/cards/clubs_jack.svg?react'
import ClubsKingSvg from '~/assets/cards/clubs_king.svg?react'
import ClubsQueenSvg from '~/assets/cards/clubs_queen.svg?react'
import Diamonds2Svg from '~/assets/cards/diamonds_2.svg?react'
import Diamonds3Svg from '~/assets/cards/diamonds_3.svg?react'
import Diamonds4Svg from '~/assets/cards/diamonds_4.svg?react'
import Diamonds5Svg from '~/assets/cards/diamonds_5.svg?react'
import Diamonds6Svg from '~/assets/cards/diamonds_6.svg?react'
import Diamonds7Svg from '~/assets/cards/diamonds_7.svg?react'
import Diamonds8Svg from '~/assets/cards/diamonds_8.svg?react'
import Diamonds9Svg from '~/assets/cards/diamonds_9.svg?react'
import Diamonds10Svg from '~/assets/cards/diamonds_10.svg?react'
import DiamondsAceSvg from '~/assets/cards/diamonds_ace.svg?react'
import DiamondsJackSvg from '~/assets/cards/diamonds_jack.svg?react'
import DiamondsKingSvg from '~/assets/cards/diamonds_king.svg?react'
import DiamondsQueenSvg from '~/assets/cards/diamonds_queen.svg?react'
import Hearts2Svg from '~/assets/cards/hearts_2.svg?react'
import Hearts3Svg from '~/assets/cards/hearts_3.svg?react'
import Hearts4Svg from '~/assets/cards/hearts_4.svg?react'
import Hearts5Svg from '~/assets/cards/hearts_5.svg?react'
import Hearts6Svg from '~/assets/cards/hearts_6.svg?react'
import Hearts7Svg from '~/assets/cards/hearts_7.svg?react'
import Hearts8Svg from '~/assets/cards/hearts_8.svg?react'
import Hearts9Svg from '~/assets/cards/hearts_9.svg?react'
import Hearts10Svg from '~/assets/cards/hearts_10.svg?react'
import HeartsAceSvg from '~/assets/cards/hearts_ace.svg?react'
import HeartsJackSvg from '~/assets/cards/hearts_jack.svg?react'
import HeartsKingSvg from '~/assets/cards/hearts_king.svg?react'
import HeartsQueenSvg from '~/assets/cards/hearts_queen.svg?react'
import Spades2Svg from '~/assets/cards/spades_2.svg?react'
import Spades3Svg from '~/assets/cards/spades_3.svg?react'
import Spades4Svg from '~/assets/cards/spades_4.svg?react'
import Spades5Svg from '~/assets/cards/spades_5.svg?react'
import Spades6Svg from '~/assets/cards/spades_6.svg?react'
import Spades7Svg from '~/assets/cards/spades_7.svg?react'
import Spades8Svg from '~/assets/cards/spades_8.svg?react'
import Spades9Svg from '~/assets/cards/spades_9.svg?react'
import Spades10Svg from '~/assets/cards/spades_10.svg?react'
import SpadesAceSvg from '~/assets/cards/spades_ace.svg?react'
import SpadesJackSvg from '~/assets/cards/spades_jack.svg?react'
import SpadesKingSvg from '~/assets/cards/spades_king.svg?react'
import SpadesQueenSvg from '~/assets/cards/spades_queen.svg?react'
import CardBackSvg from '~/assets/cards/back.svg?react'

type CardImageProps = {
  card?: Card
}

const CardImage = ({ card }: CardImageProps) => {
  if (!card) {
    return <CardBackSvg />
  }
  switch (card.face) {
    case 'club':
      switch (card.value) {
        case 1:
          return <ClubsAceSvg />
        case 2:
          return <Clubs2Svg />
        case 3:
          return <Clubs3Svg />
        case 4:
          return <Clubs4Svg />
        case 5:
          return <Clubs5Svg />
        case 6:
          return <Clubs6Svg />
        case 7:
          return <Clubs7Svg />
        case 8:
          return <Clubs8Svg />
        case 9:
          return <Clubs9Svg />
        case 10:
          return <Clubs10Svg />
        case 11:
          return <ClubsJackSvg />
        case 12:
          return <ClubsQueenSvg />
        case 13:
          return <ClubsKingSvg />
        default:
          return null
      }
    case 'diamond':
      switch (card.value) {
        case 1:
          return <DiamondsAceSvg />
        case 2:
          return <Diamonds2Svg />
        case 3:
          return <Diamonds3Svg />
        case 4:
          return <Diamonds4Svg />
        case 5:
          return <Diamonds5Svg />
        case 6:
          return <Diamonds6Svg />
        case 7:
          return <Diamonds7Svg />
        case 8:
          return <Diamonds8Svg />
        case 9:
          return <Diamonds9Svg />
        case 10:
          return <Diamonds10Svg />
        case 11:
          return <DiamondsJackSvg />
        case 12:
          return <DiamondsQueenSvg />
        case 13:
          return <DiamondsKingSvg />
        default:
          return null
      }
    case 'heart':
      switch (card.value) {
        case 1:
          return <HeartsAceSvg />
        case 2:
          return <Hearts2Svg />
        case 3:
          return <Hearts3Svg />
        case 4:
          return <Hearts4Svg />
        case 5:
          return <Hearts5Svg />
        case 6:
          return <Hearts6Svg />
        case 7:
          return <Hearts7Svg />
        case 8:
          return <Hearts8Svg />
        case 9:
          return <Hearts9Svg />
        case 10:
          return <Hearts10Svg />
        case 11:
          return <HeartsJackSvg />
        case 12:
          return <HeartsQueenSvg />
        case 13:
          return <HeartsKingSvg />
        default:
          return null
      }
    case 'spade':
      switch (card.value) {
        case 1:
          return <SpadesAceSvg />
        case 2:
          return <Spades2Svg />
        case 3:
          return <Spades3Svg />
        case 4:
          return <Spades4Svg />
        case 5:
          return <Spades5Svg />
        case 6:
          return <Spades6Svg />
        case 7:
          return <Spades7Svg />
        case 8:
          return <Spades8Svg />
        case 9:
          return <Spades9Svg />
        case 10:
          return <Spades10Svg />
        case 11:
          return <SpadesJackSvg />
        case 12:
          return <SpadesQueenSvg />
        case 13:
          return <SpadesKingSvg />
        default:
          return null
      }
    default:
      return null
  }
}

export default CardImage
