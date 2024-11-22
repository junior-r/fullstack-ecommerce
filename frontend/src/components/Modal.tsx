import { ReactNode } from "react";
import Button from "./Button";

type Props = {
  id: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  extraClassName?: string;
};

function Modal({
  id,
  title,
  description,
  children,
  extraClassName = "",
}: Props) {
  return (
    <dialog id={id} className={`modal ${extraClassName}`}>
      <div className="modal-box w-11/12 max-w-5xl relative">
        {title && <h3 className="font-bold text-lg">{title}</h3>}
        {description && <p className="py-4">{description}</p>}
        {children}
        <div className="modal-action">
          <form method="dialog" className="absolute top-2">
            {/* if there is a button, it will close the modal */}
            <Button
              tag={"button"}
              extraClassName="p-0 bg-transparent border-none hover:bg-transparent hover:text-white btn-xs"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-x w-5 h-5"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </Button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default Modal;
