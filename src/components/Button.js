export function Button({
  text,
  variant = 'primary'
}) {

  const baseClass =
    'px-8 py-4 rounded-xl font-semibold transition duration-300'

  const variants = {
    primary:
      'bg-orange-500 hover:bg-orange-600 text-white',

    outline:
      'border border-gray-700 hover:border-orange-500 hover:text-orange-500'
  }

  return `
    <button class="${baseClass} ${variants[variant]}">
      ${text}
    </button>
  `
}