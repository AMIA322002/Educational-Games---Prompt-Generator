/** Returns a list of human-readable errors for a collected config (empty = valid). */
export function validate(c) {
  const errors = [];
  if (!c.topic) errors.push("Topik / materi wajib diisi.");
  if (!c.subject) errors.push("Mata pelajaran wajib diisi.");
  if (!c.gameType) errors.push("Pilih jenis gim.");
  return errors;
}
