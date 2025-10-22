import {
  AsyncFactoryFn,
  BaseHarnessFilters,
  ComponentHarness,
  HarnessPredicate,
  TestElement,
} from '@angular/cdk/testing';
import { UnitTestElement } from '@angular/cdk/testing/testbed';

/**
 * @description Harness for the `NgxSgAvatarComponent`.
 *
 */
export class NgxSgAvatarHarness extends ComponentHarness {
  static readonly hostSelector = 'ngx-sg-avatar';
  private _getInitialElement: AsyncFactoryFn<TestElement> =
    this.locatorFor('span');

  static with(
    options: BaseHarnessFilters
  ): HarnessPredicate<NgxSgAvatarHarness> {
    return new HarnessPredicate<NgxSgAvatarHarness>(
      NgxSgAvatarHarness,
      options
    );
  }

  async getInitial(): Promise<string> {
    const initialHarness: UnitTestElement =
      (await this._getInitialElement()) as UnitTestElement;
    const spanElement = initialHarness.element as HTMLSpanElement;
    return spanElement.innerText.trim();
  }
}
