import React from 'react';
import {
  ModalService,
  ModalServiceCreateModalCommand,
  ModalServiceCreateModalData,
  ModalWrapperId
} from '../../services/modal.service';
import Modal from './modal';

type ModalServiceWrapperState = {
  modals: ModalServiceCreateModalData[];
};

export default class ModalServiceWrapper extends React.Component<
  object,
  ModalServiceWrapperState
> {
  state: Readonly<ModalServiceWrapperState> = {
    modals: []
  };

  componentDidMount(): void {
    ModalService.subscribe((notification) => {
      if (notification.id === ModalWrapperId) {
        switch (notification.command.title) {
          case 'create':
            this.createModal(
              (notification.command as ModalServiceCreateModalCommand).data
            );
            break;
        }
      }
    });
  }

  private createModal = (createModalData: ModalServiceCreateModalData) => {
    if (
      this.state.modals.some(
        (modal) => modal.controller.id === createModalData.controller.id
      )
    ) {
      throw new Error('the modal id must be unique');
    }

    this.setState((state) => ({
      modals: [...state.modals, createModalData]
    }));

    const subscription = ModalService.subscribe((notification) => {
      if (notification.id === createModalData.controller.id) {
        switch (notification.command.title) {
          case 'present':
            this.setState(({ modals }) => ({
              modals: modals.map((modal) => {
                if (modal.controller.id === notification.id) {
                  return { ...modal, open: true };
                }
                return modal;
              })
            }));
            break;
          case 'dismiss':
            this.setState(({ modals }) => ({
              modals: modals.map((modal) => {
                if (modal.controller.id === notification.id) {
                  return { ...modal, open: false };
                }
                return modal;
              })
            }));
            break;
          case 'destroy':
            this.destroyModal(notification.id);
            subscription.unsubscribe();
            break;
        }
      }
    });
  };

  private destroyModal = (modalId: string) => {
    const modal =
      modalId && this.state.modals.find((md) => md.controller.id === modalId);
    if (modal) {
      this.setState(({ modals }) => ({
        modals: modals.filter((md) => md.controller.id !== modalId)
      }));
    }
  };

  render(): React.ReactNode {
    const { modals } = this.state;
    return (
      <div className='modal-service-wrapper'>
        {modals.map((modalData, index) => (
          <Modal
            key={modalData.controller.id + index}
            {...modalData}
            onDismiss={(data) => {
              modalData.onDismiss?.(data);
              modalData.controller.dismiss(data);
            }}
          />
        ))}
      </div>
    );
  }
}
