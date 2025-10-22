import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  Signal,
  computed,
  input,
} from '@angular/core';
import { AvatarInterface } from '../../models/avatar.interface';
import { AvatarModel } from '../../models/avatar.model';

/**
 * @description A reusable component for rendering an avatar.
 * The avatar display initials based on the provided configuration.
 *
 */
@Component({
  selector: 'ngx-sg-avatar',
  templateUrl: './ngx-sg-avatar.component.html',
  styleUrls: ['./ngx-sg-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxSgAvatarComponent {
  /**
   * @description The input property that defines the configuration of the avatar.
   *
   * @type {AvatarInterface}
   *
   * @required
   */
  readonly avatar: InputSignal<AvatarInterface> =
    input.required<AvatarInterface>();
  protected readonly _avatarModel: Signal<AvatarModel> = computed(() =>
    AvatarModel.createAvatarModelFactory(this.avatar())
  );
}
