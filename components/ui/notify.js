const listeners = new Set();

export function subscribeAlerts(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emit(event) {
  listeners.forEach((listener) => listener(event));
}

function pushToast(variant, message, extra = {}) {
  const title = typeof message === "string" ? message : message?.title;
  const description =
    extra.description || (typeof message === "object" ? message.description : undefined);
  emit({
    type: "toast",
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    variant,
    title,
    description,
  });
}

export const toast = {
  success: (message, extra) => pushToast("success", message, extra),
  error: (message, extra) => pushToast("error", message, extra),
  info: (message, extra) => pushToast("info", message, extra),
};

export function confirmAction({
  title = "Are you sure?",
  description = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
  tone = "danger",
} = {}) {
  return new Promise((resolve) => {
    emit({
      type: "dialog",
      mode: "confirm",
      title,
      description,
      confirmText,
      cancelText,
      tone,
      resolve,
    });
  });
}

export function showBusy(title = "Please wait...") {
  emit({ type: "dialog", mode: "loading", title });
}

export function closeBusy() {
  emit({ type: "close-dialog" });
}
