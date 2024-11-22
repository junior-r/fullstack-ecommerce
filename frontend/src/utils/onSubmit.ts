import { FormEvent } from "react";

export const closeModal = (form: HTMLFormElement) => {
  const modal = form.parentElement?.parentElement as HTMLDialogElement;
  modal?.close();
};

export const resetForm = (form: HTMLFormElement) => {
  form.reset();
};

export const onSubmit = (
  e: FormEvent<HTMLFormElement>,
  callback?: () => void
) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  if (callback) {
    callback();
  }
  resetForm(form);
  closeModal(form);
};
