import { ModalProps } from '../components/modal/modal';

export const ModalWrapperId = '@Wrapper-Modal-Service';

export type DidDismissCallbackFn = (params: { data: unknown }) => unknown;

export class ModalController {
  private static modalId = 1;

  private static nextModalId() {
    return `modal-id-${ModalController.modalId++}`;
  }

  id: Readonly<string>;

  private subscription?: Subscription;

  private notify: (notification: ModalServiceNotification) => void;

  constructor(notify: (notification: ModalServiceNotification) => void) {
    this.id = ModalController.nextModalId();
    this.notify = notify;
  }

  present = () => {
    setTimeout(() => {
      this.notify({ id: this.id, command: { title: 'present' } });
    });
  };
  dismiss = (data: unknown = null) => {
    this.notify({ id: this.id, command: { title: 'dismiss', data } });
  };
  destroy = () => {
    this.notify({
      id: this.id,
      command: { title: 'destroy', data: this.id }
    });
    this.subscription?.unsubscribe();
  };
  onDidDismiss = (callback: DidDismissCallbackFn): Subscription => {
    const subscription = ModalService.subscribe((notification) => {
      if (
        notification.id === this.id &&
        notification.command.title === 'dismiss'
      ) {
        callback({ data: notification.command.data });
      }
    });
    this.subscription = subscription;
    return subscription;
  };
}

export type ModalServiceCommand = {
  title: 'create' | 'present' | 'dismiss' | 'destroy';
  data?: unknown;
};

export type ModalServiceCreateModalData = ModalProps & {
  controller: ModalController;
};

export type ModalServiceCreateModalCommand = {
  title: 'create';
  data: ModalServiceCreateModalData;
};

export type ModalServiceNotification = {
  id: string;
  command: ModalServiceCommand;
};

export type ModalServiceNotificationFunction = (
  notification: Readonly<ModalServiceNotification>
) => unknown;

export type Subscription = { unsubscribe: () => unknown };

export class ModalService {
  private static subscriberId = 1;

  private static subscribers: {
    [key: string]: ModalServiceNotificationFunction;
  } = {};

  public static subscribe(
    callbackFn: ModalServiceNotificationFunction
  ): Subscription {
    const subscriberId = `subscriber-${ModalService.subscriberId++}`;
    ModalService.subscribers[subscriberId] = callbackFn;
    return { unsubscribe: () => ModalService.unsubscribe(subscriberId) };
  }

  private static unsubscribe(subscriberId: string): void {
    delete ModalService.subscribers[subscriberId];
  }

  private static notify(notification: ModalServiceNotification): void {
    for (const key in ModalService.subscribers) {
      ModalService.subscribers[key](notification);
    }
  }

  static create(modalProps: ModalProps): ModalController {
    const modalController = new ModalController(ModalService.notify);

    const createModalCommand: ModalServiceCreateModalCommand = {
      title: 'create',
      data: {
        controller: modalController,
        ...modalProps
      }
    };

    ModalService.notify({
      id: ModalWrapperId,
      command: createModalCommand
    });

    return modalController;
  }
}
