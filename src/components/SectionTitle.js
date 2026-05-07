export function SectionTitle({
  label,
  title,
  center = false
}) {

  return `
    <div class="${center ? 'text-center' : ''} mb-14">

      <p class="text-orange-500 font-semibold mb-3 tracking-wide">
        ${label}
      </p>

      <h3 class="text-4xl md:text-5xl font-bold leading-tight">
        ${title}
      </h3>

    </div>
  `
}