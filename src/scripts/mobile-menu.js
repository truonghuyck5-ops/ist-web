const menuToggles = document.querySelectorAll('[data-mobile-menu-toggle]')

menuToggles.forEach((toggle) => {
  const menuId = toggle.getAttribute('aria-controls')
  const menu = menuId ? document.getElementById(menuId) : null

  if (!menu) return

  const closeMenu = () => {
    menu.classList.add('hidden')
    toggle.setAttribute('aria-expanded', 'false')
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true'

    menu.classList.toggle('hidden', isOpen)
    toggle.setAttribute('aria-expanded', String(!isOpen))
  })

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu)
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu()
  })
})
