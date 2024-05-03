/*
 * This file calculates the layout of the card front and back based on constants defined in this file
 * Each value can be changed independently since it only affects the size of the viewBox.
 */

// Standard poker cards have a ratio of 3.5 inches x 2.5 inches
const CARD_RATIO = 35 / 25

type SCREEN_SIZE = 'mobile' | 'tablet' | 'desktop'

const getCardCorners = (
  screenSize: SCREEN_SIZE,
  viewBoxWidth: number,
  viewBoxHeight: number,
  outerPadding: number,
  cornerIcon: number,
  cornerIconGap: number,
) => {
  return {
    characters: [
      {
        x: outerPadding,
        y: outerPadding,
        size: cornerIcon,
        rotate: false,
      },
      {
        x: viewBoxWidth - outerPadding - cornerIcon,
        y: viewBoxHeight - outerPadding - cornerIcon,
        size: cornerIcon,
        rotate: true,
      },
    ],
    suits: [
      {
        x:
          screenSize === 'mobile'
            ? viewBoxWidth - outerPadding - cornerIcon
            : outerPadding,
        y:
          screenSize === 'mobile'
            ? outerPadding
            : outerPadding + cornerIcon + cornerIconGap,
        size: cornerIcon,
        rotate: false,
      },
      {
        x:
          screenSize === 'mobile'
            ? outerPadding
            : viewBoxWidth - outerPadding - cornerIcon,
        y:
          screenSize === 'mobile'
            ? viewBoxHeight - outerPadding - cornerIcon
            : viewBoxHeight - cornerIcon - cornerIconGap - cornerIcon,
        size: cornerIcon,
        rotate: true,
      },
    ],
  } as const
}

const getAce = (mainX: number, mainWidth: number, viewBoxHeight: number) => {
  return {
    x: mainX,
    y: (viewBoxHeight - mainWidth) / 2,
    size: mainWidth,
  } as const
}

// Suit Icons and spacing for 2-10
const ICON = 90
const ICON_GAP_X = 5
const ICON_GAP_Y = 40
const getNumbered = (mainX: number, mainY: number) => {
  // Grid for suit icons 2-10
  const GRID_X_1 = mainX
  const GRID_X_2 = GRID_X_1 + ICON + ICON_GAP_X
  const GRID_X_3 = GRID_X_2 + ICON + ICON_GAP_X

  const GRID_Y_INCREMENT = 0.5 * (ICON + ICON_GAP_Y)
  const GRID_Y_1 = mainY
  const GRID_Y_2 = GRID_Y_1 + GRID_Y_INCREMENT
  const GRID_Y_3 = GRID_Y_2 + GRID_Y_INCREMENT
  const GRID_Y_4 = GRID_Y_3 + GRID_Y_INCREMENT
  const GRID_Y_5 = GRID_Y_4 + GRID_Y_INCREMENT
  const GRID_Y_6 = GRID_Y_5 + GRID_Y_INCREMENT
  const GRID_Y_7 = GRID_Y_6 + GRID_Y_INCREMENT

  return {
    grid: {
      2: [
        [GRID_X_2, GRID_Y_2, false],
        [GRID_X_2, GRID_Y_6, true],
      ],
      3: [
        [GRID_X_2, GRID_Y_1, false],
        [GRID_X_2, GRID_Y_4, false],
        [GRID_X_2, GRID_Y_7, true],
      ],
      4: [
        [GRID_X_1, GRID_Y_2, false],
        [GRID_X_3, GRID_Y_2, false],
        [GRID_X_1, GRID_Y_6, true],
        [GRID_X_3, GRID_Y_6, true],
      ],
      5: [
        [GRID_X_1, GRID_Y_1, false],
        [GRID_X_3, GRID_Y_1, false],
        [GRID_X_2, GRID_Y_4, false],
        [GRID_X_1, GRID_Y_7, true],
        [GRID_X_3, GRID_Y_7, true],
      ],
      6: [
        [GRID_X_1, GRID_Y_1, false],
        [GRID_X_3, GRID_Y_1, false],
        [GRID_X_1, GRID_Y_4, false],
        [GRID_X_3, GRID_Y_4, false],
        [GRID_X_1, GRID_Y_7, true],
        [GRID_X_3, GRID_Y_7, true],
      ],
      7: [
        [GRID_X_1, GRID_Y_1, false],
        [GRID_X_3, GRID_Y_1, false],
        [GRID_X_2, GRID_Y_2 + 0.5 * GRID_Y_INCREMENT, false],
        [GRID_X_1, GRID_Y_4, false],
        [GRID_X_3, GRID_Y_4, false],
        [GRID_X_1, GRID_Y_7, true],
        [GRID_X_3, GRID_Y_7, true],
      ],
      8: [
        [GRID_X_1, GRID_Y_1, false],
        [GRID_X_3, GRID_Y_1, false],
        [GRID_X_1, GRID_Y_3, false],
        [GRID_X_3, GRID_Y_3, false],
        [GRID_X_1, GRID_Y_5, true],
        [GRID_X_3, GRID_Y_5, true],
        [GRID_X_1, GRID_Y_7, true],
        [GRID_X_3, GRID_Y_7, true],
      ],
      9: [
        [GRID_X_1, GRID_Y_1, false],
        [GRID_X_3, GRID_Y_1, false],
        [GRID_X_1, GRID_Y_3, false],
        [GRID_X_3, GRID_Y_3, false],
        [GRID_X_2, GRID_Y_4, false],
        [GRID_X_1, GRID_Y_5, true],
        [GRID_X_3, GRID_Y_5, true],
        [GRID_X_1, GRID_Y_7, true],
        [GRID_X_3, GRID_Y_7, true],
      ],
      10: [
        [GRID_X_1, GRID_Y_1, false],
        [GRID_X_3, GRID_Y_1, false],
        [GRID_X_2, GRID_Y_2, false],
        [GRID_X_1, GRID_Y_3, false],
        [GRID_X_3, GRID_Y_3, false],
        [GRID_X_1, GRID_Y_5, true],
        [GRID_X_3, GRID_Y_5, true],
        [GRID_X_2, GRID_Y_6, true],
        [GRID_X_1, GRID_Y_7, true],
        [GRID_X_3, GRID_Y_7, true],
      ],
    } as const,
    size: ICON,
  } as const
}

const COURT_LETTER = 110
const COURT_LETTER_GAP = 20
const COURT_LINE_STROKE = 10
const getCourt = (viewBoxWidth: number, viewBoxHeight: number) => {
  return {
    dimensions: {
      top: viewBoxHeight / 2 - COURT_LETTER - COURT_LETTER_GAP,
      bottom: viewBoxHeight / 2 + COURT_LETTER + COURT_LETTER_GAP,
      left: viewBoxWidth / 2 - COURT_LETTER - COURT_LETTER_GAP,
      right: viewBoxWidth / 2 + COURT_LETTER + COURT_LETTER_GAP,
    },
    size: COURT_LETTER,
    stroke: COURT_LINE_STROKE,
  } as const
}

// Padding beween the corner of the card and the party logo
const LOGO_PADDING = 50
const getCardBack = (viewBoxWidth: number, viewBoxHeight: number) => {
  return {
    x: LOGO_PADDING,
    y: viewBoxHeight / 2 - viewBoxWidth / 2 + LOGO_PADDING,
    size: viewBoxWidth - 2 * LOGO_PADDING,
  } as const
}

const DEFAULT_OUTER_PADDING = 30
const DESKTOP_OUTER_PADDING = 20

const MOBILE_MAIN_PADDING_X = 25
const DEFAULT_MAIN_PADDING_X = 55
const DESKTOP_MAIN_PADDING_X = 20

// Small suit icon & character top left and and bottom right
const DEFAULT_CORNER_ICON = 110
const DESKTOP_CORNER_ICON = 40

const DEFAULT_CORNER_ICON_GAP = 35
const DESKTOP_CORNER_ICON_GAP = 10

export default (screenSize: SCREEN_SIZE) => {
  const outerPadding =
    screenSize === 'desktop' ? DESKTOP_OUTER_PADDING : DEFAULT_OUTER_PADDING
  const mainPaddingX =
    screenSize === 'mobile'
      ? MOBILE_MAIN_PADDING_X
      : screenSize === 'desktop'
        ? DESKTOP_MAIN_PADDING_X
        : DEFAULT_MAIN_PADDING_X

  // Small suit icon & character top left and and bottom right
  const cornerIcon =
    screenSize === 'desktop' ? DESKTOP_CORNER_ICON : DEFAULT_CORNER_ICON
  const cornerIconGap =
    screenSize === 'desktop' ? DESKTOP_CORNER_ICON_GAP : DEFAULT_CORNER_ICON_GAP

  // Total width and height of the viewbox
  const mainWidth =
    screenSize === 'mobile' ? 0 : ICON + ICON_GAP_X + ICON + ICON_GAP_X + ICON
  const viewBoxWidth =
    2 * outerPadding + 2 * cornerIcon + 2 * mainPaddingX + mainWidth
  const viewBoxHeight = Math.round(viewBoxWidth * CARD_RATIO)

  // Area to show the main part of the card (excluding the corners)
  const mainX = outerPadding + cornerIcon + mainPaddingX
  const mainY = (viewBoxHeight - 4 * ICON - 3 * ICON_GAP_Y) / 2

  return {
    cardCorners: getCardCorners(
      screenSize,
      viewBoxWidth,
      viewBoxHeight,
      outerPadding,
      cornerIcon,
      cornerIconGap,
    ),
    ace:
      screenSize === 'mobile'
        ? undefined
        : getAce(mainX, mainWidth, viewBoxHeight),
    numbered: screenSize === 'mobile' ? undefined : getNumbered(mainX, mainY),
    court:
      screenSize === 'mobile'
        ? undefined
        : getCourt(viewBoxWidth, viewBoxHeight),
    cardBack: getCardBack(viewBoxWidth, viewBoxHeight),
    viewBox: {
      width: viewBoxWidth,
      height: viewBoxHeight,
    },
  }
}
