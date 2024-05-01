import i18next, { init } from 'i18next'

import enNs from '~/locales/en.json'

export const defaultNS = 'ns1'

init({
  debug: true,
  fallbackLng: 'en',
  defaultNS,
  resources: {
    en: {
      ns1: enNs,
    },
  },
})

export default i18next
