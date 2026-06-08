export const salesAuthConfig = {
  password: '123123',
  storageKey: 'ist_sales_portal_login',
}

export function isLoggedIn() {
  return localStorage.getItem(salesAuthConfig.storageKey) === 'true'
}

export function loginSalesPortal(password) {
  if (password === salesAuthConfig.password) {
    localStorage.setItem(salesAuthConfig.storageKey, 'true')
    return true
  }

  return false
}

export function logoutSalesPortal() {
  localStorage.removeItem(salesAuthConfig.storageKey)
}