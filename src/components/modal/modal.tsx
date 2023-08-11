import classNames from 'classnames';
import React, { ComponentType, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export type ModalProps = {
  open?: boolean;
  canDismiss?: boolean;
  iconDismiss?: boolean;
  backdropDismiss?: boolean;
  keyboardClose?: boolean;
  showBackdrop?: boolean;
  className?: string | string[] | { [key: string]: string };
  onDismiss?: (data: unknown) => unknown;
  children?: ReactNode;
  component?: ComponentType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentProps?: { [k: string | number]: any };
};

export default class Modal extends React.Component<ModalProps> {
  static defaultProps = {
    canDismiss: true,
    iconDismiss: true,
    keyboardClose: true,
    showBackdrop: true,
    backdropDismiss: true,
    componentProps: {}
  } as ModalProps;

  componentDidMount(): void {
    this.addKeyPressListener();
  }

  componentWillUnmount(): void {
    this.removeKeyPressListener();
  }

  addKeyPressListener = () => {
    document.addEventListener('keyup', this.handleKeyUp);
  };

  removeKeyPressListener = () => {
    document.removeEventListener('keyup', this.handleKeyUp);
  };

  handleKeyUp = (event: KeyboardEvent) => {
    if (this.props.open && event.key === 'Escape') {
      this.handleKeyboardClose();
    }
  };

  handleKeyboardClose = () => {
    if (this.props.keyboardClose) {
      this.handleDismiss();
    }
  };

  handleDismiss = (data: unknown = null) => {
    if (this.props.canDismiss) {
      this.onDismiss(data);
    }
  };

  onDismiss = (data: unknown = null) => {
    if (this.props.open) {
      this.props.onDismiss?.(data);
    }
  };

  render(): ReactNode {
    const {
      open,
      className,
      component: Component,
      componentProps,
      children
    } = this.props;
    return (
      <div
        role='dialog'
        onClick={() => this.handleDismiss()}
        className={twMerge(
          classNames(
            'modal-wrapper fixed left-0 top-0 w-screen h-screen overflow-y-scroll webkit-scroll-touch flex items-center justify-center p-2 z-10 bg-neutral-1 invisible opacity-0 transition-[visibility,opacity]',
            { 'visible opacity-100': open }
          )
        )}
        // onClick={ this.handleBackdropDismiss }
        // onKeyDownCapture={this.handleKeyUp}
      >
        <section
          className={twMerge(
            classNames(
              'modal relative flex flex-col',
              { 'bg-dark rounded p-6': !className },
              className
            )
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {Component ? <Component {...componentProps} /> : children}
        </section>
      </div>
    );
  }
}
