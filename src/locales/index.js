import { getI18n } from 'twake-i18n'

import de from './de.json'
import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import it_IT from './it_IT.json'
import nl_NL from './nl_NL.json'

export const locales = {
  de,
  en,
  es,
  fr,
  it_IT,
  nl_NL
}

export const getAppI18n = () => getI18n(undefined, lang => locales[lang])
