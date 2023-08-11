import Spinner from '../components/spinner';
import { ModalService } from './modal.service';

export type LoadingController = {
  dismiss(): void;
};

export class LoadingService {
  static present() {
    const modal = ModalService.create({
      component: Spinner,
      canDismiss: false
    });

    modal.present();

    return {
      dismiss: () => {
        modal.dismiss();
        setTimeout(() => {
          modal.destroy();
        }, 500);
      }
    };
  }
}
