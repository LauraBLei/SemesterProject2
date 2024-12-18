export enum API {
  BASE = 'https://v2.api.noroff.dev',
  KEY = '6e4017bd-0f87-4e15-b29a-30f93e42bf6a',
  AUTH = `${API.BASE}/auth`,
  AUTH_LOGIN = `${API.AUTH}/login`,
  AUTH_REGISTER = `${API.AUTH}/register`,
  AUTH_KEY = `${API.AUTH}/create-api-key`,
  AUCTION = `${API.BASE}/auction`,
  AUCTION_PROFILES = `${API.AUCTION}/profiles`,
  AUCTION_LISTINGS = `${API.AUCTION}/listings`,
  SEARCH = `${API.AUCTION_LISTINGS}/search`,
}
