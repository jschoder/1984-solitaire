import { DateTime } from 'luxon'
import React from 'react'
import i18n from '~/i18n'
import { getAllHighscores, HighscoreRecord } from '~/model/Highscore'

type HighscoreOverlayProps = {
  onClose: () => void
}

const HighscoreOverlay = ({ onClose }: HighscoreOverlayProps) => {
  const tableRef = React.useRef<HTMLTableElement>(null)
  const highlightRef = React.useRef<HTMLTableRowElement>(null)
  const [highscores, setHighscores] = React.useState<
    HighscoreRecord[] | undefined
  >()
  const [lastHighscore, setLastHighscore] = React.useState<number | undefined>()
  const [scrollPosition, setScrollPosition] = React.useState<
    'noscroll' | 'top' | undefined | 'bottom'
  >('top')

  const updateScrollPosition = React.useCallback(() => {
    if (!tableRef.current) return

    if (tableRef.current.scrollHeight === tableRef.current.clientHeight) {
      setScrollPosition('noscroll')
    } else if (tableRef.current.scrollTop === 0) {
      setScrollPosition('top')
    } else if (
      tableRef.current.scrollTop ===
      tableRef.current.scrollHeight - tableRef.current.clientHeight
    ) {
      setScrollPosition('bottom')
    } else {
      setScrollPosition(undefined)
    }
  }, [])

  React.useEffect(() => {
    getAllHighscores().then((highscores) => {
      setHighscores(highscores)
      if (highscores.length > 0) {
        let highestTimestampIndex = 0
        for (let i = 1; i < highscores.length; i++) {
          if (
            highscores[i].timestamp >
            highscores[highestTimestampIndex].timestamp
          ) {
            highestTimestampIndex = i
          }
        }
        setLastHighscore(highestTimestampIndex)
      }
    })
  }, [])

  React.useEffect(() => {
    updateScrollPosition()
  }, [highscores])

  React.useEffect(() => {
    if (tableRef.current && highlightRef.current) {
      tableRef.current.scrollTop =
        highlightRef.current.offsetTop -
        (tableRef.current.clientHeight - highlightRef.current.clientHeight) / 2
    }
  }, [tableRef.current, highlightRef.current])

  return (
    <div
      className='fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-60 px-2 cursor-pointer'
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div className='z-[99] min-w-[60%] max-w[600px] max-h-[90vh] flex overflow-x-auto p-3 md:p-5 bg-successScreen-bg rounded-md cursor-auto'>
        <div className='flex flex-col flex-grow relative'>
          <div className='flex justify-between mb-3 lg:mb-5 font-extrabold'>
            <div>{i18n.t('Highscores.overlay.title')}</div>
            <div>
              <a
                className='cursor-pointer underline hover:no-underline'
                onClick={onClose}
              >
                {i18n.t('Highscores.overlay.close')}
              </a>
            </div>
          </div>
          <div
            className='overflow-y-scroll'
            onScroll={updateScrollPosition}
            ref={tableRef}
          >
            <table className='highscore-table w-full'>
              <thead className='sticky top-0'>
                <tr>
                  <th>
                    <div>{i18n.t('Highscores.columns.rank')}</div>
                  </th>
                  <th>
                    <div>{i18n.t('Highscores.columns.date')}</div>
                  </th>
                  <th>
                    <div>{i18n.t('Highscores.columns.time')}</div>
                  </th>
                  <th>
                    <div>{i18n.t('Highscores.columns.turns')}</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {highscores?.map((highscore, index) => (
                  <tr
                    key={'highscore-' + highscore.timestamp}
                    className={
                      index === lastHighscore
                        ? 'bg-white bg-opacity-40 font-extrabold'
                        : ''
                    }
                    ref={index === lastHighscore ? highlightRef : undefined}
                  >
                    <td>
                      <div>{index + 1}</div>
                    </td>
                    <td>
                      <div>
                        {DateTime.fromMillis(highscore.timestamp).toFormat(
                          i18n.t('Highscores.format.date'),
                        )}
                      </div>
                    </td>
                    <td>
                      <div>
                        {DateTime.fromMillis(highscore.timestamp).toFormat(
                          i18n.t('Highscores.format.time'),
                        )}
                      </div>
                    </td>
                    <td>
                      <div>{highscore.turns}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className={
              'absolute left-0 bottom-0 right-0 h-10 bottom-gradient' +
              (scrollPosition !== 'noscroll' && scrollPosition !== 'bottom'
                ? ' active'
                : '')
            }
          />
        </div>
      </div>
    </div>
  )
}

export default HighscoreOverlay
