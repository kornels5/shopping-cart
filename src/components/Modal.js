import * as React from "react";
import VisuallyHidden from "@reach/visually-hidden";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach((fn) => fn && fn(...args));

const ModalContext = React.createContext();

function Modal(props) {
  const [isOpen, setIsOpen] = React.useState(false);

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />;
}

function ModalDismissButton({ children: child }) {
  const [, setIsOpen] = React.useContext(ModalContext);
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  });
}

function ModalOpenButton({ children: child }) {
  const [, setIsOpen] = React.useContext(ModalContext);
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  });
}

function ModalContentsBase(props) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext);
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  );
}

function ModalContents({ title, children, ...props }) {
  return (
    <ModalContentsBase {...props}>
      <div className="flex justify-end">
        <ModalDismissButton>
          <button>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </button>
        </ModalDismissButton>
      </div>
      <h3 className="text-lg text-gray-600">{title}</h3>
      {children}
    </ModalContentsBase>
  );
}

export { Modal, ModalDismissButton, ModalOpenButton, ModalContents };
