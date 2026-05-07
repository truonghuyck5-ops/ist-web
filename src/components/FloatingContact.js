import { trackEvent } from '../utils/tracking'
export function FloatingContact() {
  return `
    <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-4">

      <!-- Zalo -->
      <a
        href="https://zalo.me/0345928484"
        target="_blank"
        onclick="
          trackEvent('click_zalo', {
            location: 'floating_contact'
          })
        "
        class="floating-pulse w-16 h-16 rounded-full bg-blue-500 hover:scale-110 transition duration-300 shadow-2xl flex items-center justify-center text-white text-2xl font-bold"
      >
        Z
      </a>

      <!-- Phone -->
      <a
        href="tel:0345928484"
        onclick="
          trackEvent('click_phone', {
            location: 'floating_contact'
          })
        "
        class="floating-pulse w-16 h-16 rounded-full bg-orange-500 hover:scale-110 transition duration-300 shadow-2xl flex items-center justify-center text-white text-2xl"
      >
        ☎
      </a>

    </div>
  `
}