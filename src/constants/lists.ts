// used to mark unsupported tokens, these are hosted lists of unsupported tokens

const CCS_LIST = 'https://gateway.pinata.cloud/ipfs/QmYr9NpNRiSAAj57zD63aeXrY1Fs8SWhwYKEMgDY1xTDYq'
const CCS_ETC_LIST = 'https://gateway.pinata.cloud/ipfs/QmYjvp7ybSyHN3Mt2fzPE97GsrB3iT9k9mLojXTwSYo2YM'
const CCS_BSC_LIST = 'https://gateway.pinata.cloud/ipfs/QmRruHAJrHyCWSh9Xqh6pviGjjbgLRnVTuu8hRKUJZkKHw'
const BIRB_LIST = 'https://gateway.pinata.cloud/ipfs/QmUzqasKre5PMe2gAvnzy7dPSkbckF9wFf4dU9z1GfMWJb'
const GEMINI_LIST = 'https://www.gemini.com/uniswap/manifest.json'
const COINGECKO_LIST = 'https://tokens.coingecko.com/uniswap/all.json'
const COMPOUND_LIST = 'https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json'
export const OPTIMISM_LIST = 'https://static.optimism.io/optimism.tokenlist.json'

export const UNSUPPORTED_LIST_URLS: string[] = [COMPOUND_LIST, OPTIMISM_LIST, COINGECKO_LIST]

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  GEMINI_LIST,
  BIRB_LIST,
  CCS_BSC_LIST,
  CCS_ETC_LIST,
  CCS_LIST,
  ...UNSUPPORTED_LIST_URLS,
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [GEMINI_LIST, BIRB_LIST, CCS_BSC_LIST, CCS_ETC_LIST, CCS_LIST]
