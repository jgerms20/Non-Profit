// Maps a mediaGallery "tone" to a branded gradient used as a photo placeholder
// until real photography is dropped into /public/media and wired via `src`.
// Brand palette — navy #1B365D, gold #D4A843, teal #2EC4B6.

const toneGradients = {
  'navy-teal': 'from-[#1B365D] via-[#1B365D] to-[#2EC4B6]',
  'gold-navy': 'from-[#D4A843] via-[#1B365D] to-[#0F172A]',
  'teal-gold': 'from-[#2EC4B6] via-[#1B365D] to-[#D4A843]',
  'navy-gold': 'from-[#0F172A] via-[#1B365D] to-[#D4A843]',
  'teal-navy': 'from-[#2EC4B6] via-[#1B365D] to-[#0F172A]',
  'gold-teal': 'from-[#D4A843] via-[#2EC4B6] to-[#1B365D]',
}

export function toneGradient(tone) {
  return toneGradients[tone] || toneGradients['navy-teal']
}

// Given a mediaGallery.json object, returns images in featured-rotation order.
export function orderedImages(gallery) {
  if (!gallery?.images) return []
  const order = gallery?.meta?.featuredRotation
  if (!order) return gallery.images
  const byId = Object.fromEntries(gallery.images.map((img) => [img.id, img]))
  const ordered = order.map((id) => byId[id]).filter(Boolean)
  // append any images not in the rotation list
  const extra = gallery.images.filter((img) => !order.includes(img.id))
  return [...ordered, ...extra]
}
