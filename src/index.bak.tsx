import React, { useState, useEffect } from 'react'
import countries from 'i18n-iso-countries'
import dynamicTargets from 'flags'

const flagSvg = (locale: string) => `${locale}.svg`

export default function () {
  const locale = 'us'

  const [svgPath, setSvgPath] = useState('')

  useEffect(() => {
    dynamicTargets[flagSvg(locale)]().then((result: string) => setSvgPath(result))
  }, [locale])

  if (svgPath == null) return null

  return <img src={svgPath} />

  // return <img src={require(`./flags/${locale}.svg`)} />
  // return <img src={require('./flags/us.svg')} />
}

export const registerLocale = (locale: string) => {
  countries.registerLocale(require(`langs/${locale}.json`))
}
