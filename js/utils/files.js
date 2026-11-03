import { toast } from "../ui/toast.js";

/** Trigger a browser download of `text` as `filename`. */
export function downloadText(text, filename, mime = "text/plain;charset=utf-8") {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Copy text to the clipboard, falling back to execCommand on older browsers. */
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast("Berhasil disalin ke clipboard.");
  } catch (e) {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      toast("Berhasil disalin.");
    } catch (err) {
      toast("Salin manual: pilih teks lalu tekan Ctrl+C.");
    }
    ta.remove();
  }
}
