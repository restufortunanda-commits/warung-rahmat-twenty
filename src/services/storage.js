// Muat data dari localStorage. Jika kosong, salin dari file JSON seed.
export function loadOrSeed(key, seed) {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
  } catch (err) {
    console.warn(`Data "${key}" rusak, memakai seed`, err)
  }
  const copy = JSON.parse(JSON.stringify(seed))
  localStorage.setItem(key, JSON.stringify(copy))
  return copy
}

export function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function resetData(keys) {
  keys.forEach((k) => localStorage.removeItem(k))
}
