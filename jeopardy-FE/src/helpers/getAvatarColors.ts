import { IPlayer } from '../sharedInterfaces';
import colors from './avatarColors';

export default function getAvatarColors(players: IPlayer[]) {
  const arrayToFill: string[] = [];
  Object.values(players).forEach((value, i) => {
    arrayToFill.push(colors[i]);
  });
  return arrayToFill;
}
