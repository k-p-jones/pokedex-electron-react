export default interface Pokemon {
  id?: number;
  name: string;
  speciesURL: string;
  dataURL: string;
  data: {
    types: Array<{ name: string, url: string }> | [];
    stats: Array<{
      base_stat: number;
      effort: number;
      stat: {
        name: string;
        url: string;
      }
    }> | [];
  };
  color?: string | 'white';
  imageURL: string;
  dataFetched: boolean;
}
