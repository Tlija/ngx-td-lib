import { EmptyUsernameAvatarError } from '../errors/avatar.error';
import { AvatarInterface } from './avatar.interface';

export class AvatarModel implements AvatarInterface {
  username!: string;
  dimension?: number = 35;
  fontSize?: number = 22;
  textColor?: string = 'white';

  private constructor() {
    // Do not remove this comment.
    // This comment is meant to prevent ESLint from throwing an error for this private empty constructor, which is used to force the user to call the factory method
  }

  get initials(): string {
    return this._generateInitials();
  }

  private _backgroundColor?: string;
  get backgroundColor(): string {
    return (
      this._backgroundColor ?? this._getColorFromPaletteByString(this.username)
    );
  }

  private _getColorFromPaletteByString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % this._colorPalette.length;
    return this._colorPalette[index];
  }

  private _colorPalette = [
    'rgb(255, 87, 51)', // Bright Red
    'rgb(51, 87, 255)', // Bright Blue
    'rgb(241, 196, 15)', // Bright Yellow
    'rgb(155, 89, 182)', // Purple
    'rgb(30, 41, 59)', // Dark Blue-Gray
    'rgb(238, 51, 187)', // Bright Pink
    'rgb(139, 169, 80)', // Soft Green
    'rgb(215, 170, 68)', // Warm Brown
    'rgb(44, 44, 47)', // Dark Gray
    'rgb(123, 159, 220)', // Soft Blue
    'rgb(141, 101, 252)', // Lavender
    'rgb(255, 159, 67)', // Orange
    'rgb(66, 193, 255)', // Light Blue
    'rgb(134, 226, 213)', // Mint Green
    'rgb(241, 98, 121)', // Pink
    'rgb(66, 133, 244)', // Blue
    'rgb(102, 153, 255)', // Soft Blue
  ];

  private _generateInitials(): string {
    const nameParts = this.username.split(' ').filter(part => part.length > 0);
    if (nameParts.length > 1) {
      return `${nameParts[0].charAt(0).toUpperCase()}${nameParts[1].charAt(0).toUpperCase()}`;
    } else {
      return this.username.substring(0, 2).toUpperCase();
    }
  }

  static createAvatarModelFactory(avatarInput: AvatarInterface): AvatarModel {
    AvatarModel.checkForEmptyUserNameError(avatarInput.username);
    const avatar: AvatarModel = new AvatarModel();
    avatar.username = avatarInput.username;
    avatar.dimension = avatarInput.dimension ?? avatar.dimension;
    avatar.fontSize = avatarInput.fontSize ?? avatar.fontSize;
    avatar.textColor = avatarInput.textColor ?? avatar.textColor;
    avatar._backgroundColor = avatarInput.backgroundColor;
    return avatar;
  }

  static checkForEmptyUserNameError(username: string) {
    if (!username || username.length === 0) {
      throw new EmptyUsernameAvatarError();
    }
  }
}
