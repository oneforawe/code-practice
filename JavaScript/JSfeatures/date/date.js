import moment from 'moment'
/**
 * Note: When using moment-timezone in the browser, you will need to load the
 * data as well as the library.
 */
import {localTimeStamp,
  localTimeStampShort, localTimeStampLong,
  localTimeStampA, localTimeStampB} from './date-utilities.js'


let log = console.log

log('Useful references:' + '\n' +
  'https://www.w3.org/TR/timezone/' + '\n' +
  'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date' + '\n' +
  'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat' + '\n' +
  'https://css-tricks.com/everything-you-need-to-know-about-date-in-javascript/' +
  '\n\n'
)


/* The Unix Epoch ************************************************************/

// Correct since Unix millisecond timestamp is in UTC/GMT time:
const dateZeroA = new Date(0) // specified by timestamp of milliseconds since

// Correct since 'Z' specifies UTC/GMT/Zero-Zone time:
const dateZeroB = new Date('1970-01-01T00:00:00.000Z')// specified by date-string
//const dateZeroB = new Date('1970-01-01t00:00:00.000z')// also works

// Incorrect since, without a 'Z', this specifies a local time:
const dateZeroC = new Date('1970-01-01T00:00:00.000')// specified by date-string
//const dateZeroC = new Date('1970-01-01t00:00:00.000')// also works

// Incorrect since this specifies a local time:
const dateZeroD = new Date(1970, 0, 1, 0, 0, 0) // specified by date arguments

// Incorrect since this specifies a local time:
const dateZeroE = new Date('1/1/1970')// specified by less-detailed date-string
// time defaults to 00:00:00.000


/*****************************************************************************/
printCategory('Unix Epoch / Date Zero')
log('')
log(`Correct:     const dateZeroA = new Date(0)`)
log(`             dateZeroA.toISOString()    = ${dateZeroA.toISOString()}`)
log(`             dateZeroA.toLocaleString() = ${dateZeroA.toLocaleString()}`)
log(`             dateZeroA                  = ${dateZeroA}`)
log('')
log(`Correct:     const dateZeroB = new Date('1970-01-01T00:00:00.000Z')`)
log(`             dateZeroB.toISOString()    = ${dateZeroB.toISOString()}`)
log(`             dateZeroB.toLocaleString() = ${dateZeroB.toLocaleString()}`)
log(`             dateZeroB                  = ${dateZeroB}`)
log('')
log(`Incorrect:   const dateZeroC = new Date('1970-01-01T00:00:00.000')`)
log(`             dateZeroC.toISOString()    = ${dateZeroC.toISOString()}`)
log(`             dateZeroC.toLocaleString() = ${dateZeroC.toLocaleString()}`)
log(`             dateZeroC                  = ${dateZeroC}`)
log('')
log(`Incorrect:   const dateZeroD = new Date(1970, 0, 1, 0, 0, 0)`)
log(`             dateZeroD.toISOString()    = ${dateZeroD.toISOString()}`)
log(`             dateZeroD.toLocaleString() = ${dateZeroD.toLocaleString()}`)
log(`             dateZeroD                  = ${dateZeroD}`)
log('')
log(`Incorrect:   const dateZeroE = new Date('1/1/1970')`)
log(`             dateZeroE.toISOString()    = ${dateZeroE.toISOString()}`)
log(`             dateZeroE.toLocaleString() = ${dateZeroE.toLocaleString()}`)
log(`             dateZeroE                  = ${dateZeroE}`)


/*****************************************************************************/
printCategory('Common Date Methods')

// Feel free to switch between these three and check out any differences
const timeString = localTimeStampShort(new Date())
//const timeString = '1999-12-31 23:59:59.999' // Pacific Standard Time
//const timeString = '1999-06-30 23:59:59.999' //  Pacific Daylight Time

log(`timeString: ${timeString}`)
log(`const date = new Date(timeString)`)
const date = new Date(timeString)
log('')

const date02 = date.toString()
const date03 = date.toLocaleDateString()
const date04 = date.toLocaleString()
const date05 = date.toUTCString()
const date06 = new Intl.DateTimeFormat('en-US').format(date)
const date07 = date.getTime()

log(`new Date()                             (date) => ${date}`)
log(`new Date().toString()                         => ${date02}`)
log(`new Date().toLocaleDateString()               => ${date03}`)
log(`new Date().toLocaleString()                   => ${date04}`)
log(`new Date().toUTCString()                      => ${date05}`)
log(`new Intl.DateTimeFormat('en-US').format(date) => ${date06}`)
log(`new Date().getTime()                          => ${date07}`)


/*****************************************************************************/
printCategory('Time Zone')

const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
const timeZoneOffset = date.getTimezoneOffset()
//const abbrTimeZoneOffset = moment.tz.zone(localTimeZon).abbr(timeZoneOffset)
log(`localTimeZone  = ` +
  `Intl.DateTimeFormat().resolvedOptions().timeZone = ${localTimeZone}`)
log(`timeZoneOffset = date.getTimezoneOffset() = ${timeZoneOffset}`)
log(`moment.parseZone(date).utcOffset() = ${moment.parseZone(date).utcOffset()}`)
//log(`abbrTimeZoneOffset = ${abbrTimeZoneOffset}`)

const localTimeZoneMode = moment.tz(date, localTimeZone).format('zz')
const localTimeZoneModeAbbr = moment.tz(date, localTimeZone).format('z')

log(`moment.tz(date, localTimeZone).format('zz') = ${moment.tz(date, localTimeZone).format('zz')}`)
log(`moment.tz(date, localTimeZone).format('z') = ${moment.tz(date, localTimeZone).format('z')}`)

log('')
log(`Note: Time Zone 'America/Los_Angeles' aka 'Pacific Time Zone' aka 'PT'`)
log(`Note: I'll call this "Time Zone Mode": ` +
  `'Pacific Standard Time' aka 'PST' vs '` +
  `'Pacific Daylight Time' aka 'PDT'`
)

/*****************************************************************************/
printCategory('Local Time')

log(date.toString())
log(date.toLocaleString())
log(date.toLocaleString("default", { timeZoneName: 'short' }))
log(date.toLocaleString("default", { timeZoneName: 'long' }))
log('')
log(localTimeStampA(date))
log(localTimeStampB(date))
log('')
log(moment(date).format('YYYY MMMM DD dddd'))
log(moment(date).format('YYYY [Wk] WW MMM DD ddd'))
log('')
log(moment(date).format(`YYYY-MM-DD (YYYY MMM DD ddd) HH:mm:ss.SSS (UTCZ | [${localTimeZoneModeAbbr}]) x`))
log(moment(date).format(`YYYY-MM-DD (YYYY MMMM DD dddd) HH:mm:ss.SSS (UTCZ | [${localTimeZone}] | [${localTimeZoneMode}]) x`))
log(moment(date).format(`YYYY-MM-DD (YYYY [Week] WW MMMM DD dddd) HH:mm:ss.SSS (UTCZ | [${localTimeZone}] | [${localTimeZoneMode}]) x`))
log(localTimeStampLong(date))
log('')
log(moment(date).format(`YYYY-MM-DD[T]HH:mm:ss.SSS (UTCZ|[${localTimeZoneModeAbbr}]) x`))
log(localTimeStamp(date))
// https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/


/*****************************************************************************/
printCategory('UTC / ISO Time')

log(date.toUTCString())
log(date.toGMTString())
log(date.toISOString())


/*****************************************************************************/
printCategory('Unix Time (in milliseconds) - "ECMAScript Time"')

log(date.getTime())
log(moment(date).format('x'))


/*****************************************************************************/
printCategory('Unix Time (in seconds, standard)')

log(date.getTime()/1000)
log(moment(date).format('X'))






/* Helper functions **********************************************************/

function printCategory(name) {
  log('')
  log('----------------------------------------------------------------------')
  log(name)
  log('----------------------------------------------------------------------')
}