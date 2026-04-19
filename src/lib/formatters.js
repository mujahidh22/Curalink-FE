export function formatAuthors(authors = []) {
  if (!authors.length) {
    return "Authors unavailable"
  }

  if (authors.length <= 3) {
    return authors.join(", ")
  }

  return `${authors.slice(0, 3).join(", ")} +${authors.length - 3} more`
}

export function formatMeta(item) {
  return [item.source, item.year, item.status].filter(Boolean).join(" • ")
}

export function formatLocations(locations = []) {
  if (!locations.length) {
    return "Location not listed"
  }

  return locations.slice(0, 2).join(" • ")
}

