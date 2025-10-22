import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { faker } from '@faker-js/faker';
import { EmptyUsernameAvatarError } from '../../errors/avatar.error';
import { AvatarModel } from '../../models/avatar.model';
import { NgxSgAvatarComponent } from './ngx-sg-avatar.component';

describe('NgxSgAvatarComponent', () => {
  let component: NgxSgAvatarComponent;
  let fixture: ComponentFixture<NgxSgAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSgAvatarComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSgAvatarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // act
    fixture.componentRef.setInput('avatar', {
      username: faker.person.fullName(),
    });

    // assert
    expect(component).toBeTruthy();
  });

  describe('username', () => {
    it('should display the initials of the username', async () => {
      // arrange
      const avatarInterface = { username: faker.person.fullName() };
      const expectedInitials =
        AvatarModel.createAvatarModelFactory(avatarInterface).initials;

      // act
      fixture.componentRef.setInput('avatar', avatarInterface);
      await fixture.whenStable();

      const initialElement = fixture.debugElement.query(By.css('span'));

      // assert
      expect(initialElement.nativeElement.textContent).toEqual(
        expectedInitials
      );
    });

    it('should throw EMPTY_AVATAR_USERNAME_ERROR when username is not provided', () => {
      // arrange
      spyOn(console, 'error');

      // act
      fixture.componentRef.setInput('avatar', {
        username: '',
      });

      // assert
      expect(console.error).toHaveBeenCalledWith(
        new EmptyUsernameAvatarError()
      );
    });
  });

  describe('Avatar Style', () => {
    let username: string;
    beforeEach(() => {
      username = faker.person.fullName();
    });
    describe('Dimension', () => {
      it('should set the dimension to the width and height of the avatar', async () => {
        // arrange
        const dimension = faker.number.int({ max: 100 });

        // act
        fixture.componentRef.setInput('avatar', {
          username,
          dimension,
        });
        await fixture.whenStable();
        const avatarElement = fixture.debugElement.query(
          By.css('.avatar')
        ).nativeElement;

        // assert
        expect(avatarElement.style.height).toBe(`${dimension}px`);
        expect(avatarElement.style.width).toBe(`${dimension}px`);
      });
    });
    describe('BackgroundColor', () => {
      it('should set the provided backgroundColor', async () => {
        // arrange
        const backgroundColor = 'red';

        // act
        fixture.componentRef.setInput('avatar', {
          username,
          backgroundColor,
        });
        await fixture.whenStable();
        const avatarElement = fixture.debugElement.query(
          By.css('.avatar')
        ).nativeElement;

        // assert
        expect(avatarElement.style.backgroundColor).toBe(backgroundColor);
      });
      it('should set a random backgroundColor when username is provided and backgroundColor is undefined', async () => {
        // act
        fixture.componentRef.setInput('avatar', {
          username,
        });
        await fixture.whenStable();
        const avatarElement = fixture.debugElement.query(
          By.css('.avatar')
        ).nativeElement;

        // assert
        expect(avatarElement.style.backgroundColor).not.toEqual('');
      });
    });
    describe('Text Color', () => {
      it('should set the provided textColor', async () => {
        // arrange
        const color = 'red';

        // act
        fixture.componentRef.setInput('avatar', {
          username,
          textColor: color,
        });
        await fixture.whenStable();
        const initialElement = fixture.debugElement.query(
          By.css('span')
        ).nativeElement;

        // assert
        expect(initialElement.style.color).toBe(color);
      });
    });
    describe('Font Size', () => {
      it('should set the provided font size', async () => {
        // arrange
        const fontSize = faker.number.int({ max: 100 });

        // act
        fixture.componentRef.setInput('avatar', {
          username,
          fontSize,
        });
        await fixture.whenStable();
        const initialElement = fixture.debugElement.query(
          By.css('span')
        ).nativeElement;

        // assert
        expect(initialElement.style.fontSize).toBe(`${fontSize}px`);
      });
    });
  });
});
