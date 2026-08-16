import { siteConfig } from '../data/site'

export function absoluteUrl(path) {
  return new URL(path, siteConfig.url).toString()
}

export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.legalName,
  alternateName: siteConfig.name,
  url: siteConfig.url,
  logo: absoluteUrl(siteConfig.logo),
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.contact.address,
  },
}

export function blogPostingStructuredData({ title, description, image, canonical }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(canonical),
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.legalName,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl(siteConfig.logo),
      },
    },
  }

  if (image) structuredData.image = absoluteUrl(image)

  return structuredData
}
