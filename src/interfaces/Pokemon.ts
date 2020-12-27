export default interface Pokemon {
  id?: number;
  name: string;
  speciesURL: string;
  dataURL: string;
  data?: object;
  color?: string | 'white';
  imageURL: string;
}
