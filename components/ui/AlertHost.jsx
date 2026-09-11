"use client";

import { useEffect, useState } from "react";
import { FiAlertTriangle, FiCheck, FiInfo, FiX } from "react-icons/fi";
import { closeBusy, subscribeAlerts } from "./notify";

const ICONS = {
  success: FiCheck,
  error: FiX,
  info: FiInfo,
};

const AlertHost = () => {
  const [toasts, setToasts] = useState([]);
  const [dialog, setDialog] = useState(null);

  useEffect(() => {
    return subscribeAlerts((event) => {
      if (event.type === "toast") {
        setToasts((current) => [...current.slice(-3), event]);
        window.setTimeout(() => {
          setToasts((current) => current.filter((item) => item.id !== event.id));
        }, 3800);
      }
      if (event.type === "dialog") setDialog(event);
      if (event.type === "close-dialog") setDialog(null);
    });
  }, []);

  const closeToast = (id) => setToasts((current) => current.filter((item) => item.id !== id));

  const finishConfirm = (value) => {
    dialog?.resolve?.(value);
    setDialog(null);
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[220] flex flex-col items-center gap-3 px-4 sm:items-end sm:px-6">
        {toasts.map((item) => {
          const Icon = ICONS[item.variant] || FiInfo;
          return (
            <div
              key={item.id}
              className={`alert-toast pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border bg-white p-4 shadow-[0_18px_50px_rgba(28,24,22,0.16)] ${
                item.variant === "error"
                  ? "border-accent-red/40"
                  : item.variant === "success"
                    ? "border-gold/50"
                    : "border-dark-gold/30"
              }`}
            >
              <div
                className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  item.variant === "error"
                    ? "bg-accent-red text-white"
                    : item.variant === "success"
                      ? "bg-linear-to-r from-gold to-dark-gold text-black-custom"
                      : "bg-[#f6f1e8] text-dark-gold"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-black-custom">{item.title}</p>
                {item.description && (
                  <p className="mt-1 text-sm leading-5 text-light-silver">{item.description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => closeToast(item.id)}
                className="rounded-full p-1 text-light-silver hover:bg-[#f6f1e8] hover:text-black-custom"
                aria-label="Dismiss"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>

      {dialog && (
        <div className="fixed inset-0 z-[230] flex items-center justify-center px-4">
          <button
            type="button"
            className="absolute inset-0 bg-[#141313]/45 backdrop-blur-[2px]"
            onClick={() => {
              if (dialog.mode === "confirm") finishConfirm(false);
            }}
            aria-label="Close dialog"
          />
          <div className="alert-dialog relative w-full max-w-md overflow-hidden rounded-[1.6rem] border border-dark-gold/30 bg-white shadow-[0_30px_80px_rgba(28,24,22,0.28)]">
            <div className="h-1.5 bg-linear-to-r from-gold to-dark-gold" />
            <div className="p-6 sm:p-7">
              {dialog.mode === "loading" ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold/25 border-t-gold" />
                  <p className="mt-5 text-lg font-semibold text-black-custom">{dialog.title}</p>
                  <p className="mt-1 text-sm text-light-silver">This will only take a moment.</p>
                </div>
              ) : (
                <>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-red/10 text-accent-red">
                    <FiAlertTriangle className="h-7 w-7" />
                  </div>
                  <h3 className="text-center text-2xl font-bold text-black-custom">{dialog.title}</h3>
                  {dialog.description && (
                    <p className="mt-2 text-center text-sm leading-6 text-light-silver">
                      {dialog.description}
                    </p>
                  )}
                  <div className="mt-7 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => finishConfirm(false)}
                      className="rounded-full border border-dark-gold/40 px-4 py-3 text-sm font-semibold text-light-silver hover:border-dark-gold hover:text-black-custom"
                    >
                      {dialog.cancelText}
                    </button>
                    <button
                      type="button"
                      onClick={() => finishConfirm(true)}
                      className={`rounded-full px-4 py-3 text-sm font-bold text-white ${
                        dialog.tone === "danger"
                          ? "bg-accent-red hover:bg-[#9a3d3d]"
                          : "bg-linear-to-r from-gold to-dark-gold text-black-custom"
                      }`}
                    >
                      {dialog.confirmText}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertHost;
export { closeBusy };
