export default interface IPlayersInput {
  playerId: number;
  setInputRef: (ref: HTMLInputElement | null, index: number) => void;
}
