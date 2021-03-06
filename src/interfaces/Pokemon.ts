interface BasicObject {
  name: string;
  url: string;
}

export default interface Pokemon {
  id?: number;
  name: string;
  speciesURL: string;
  dataURL: string;
  evolutionChainURL: string;
  data: {
    types: {
      name: string,
      url: string,
      data: {
        double_damage_from: BasicObject[];
        double_damage_to: BasicObject[];
        half_damage_from: BasicObject[];
        half_damage_to: BasicObject[];
        no_damage_from: BasicObject[];
        no_damage_to: BasicObject[];
      };
    }[];
    stats: {
      base_stat: number;
      effort: number;
      stat: BasicObject;
    }[];
    evolutionChain?: {
      chain: {
        evolves_to: {
          species: BasicObject;
          evolves_to: object[];
        }[];
        species: BasicObject;
      }
    };
  };
  color?: string | 'white';
  imageURL: string;
  dataFetched: boolean;
  typeDataFetched: boolean;
  evolutionChainFetched: boolean;
}
