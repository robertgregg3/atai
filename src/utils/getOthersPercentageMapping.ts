    export type OthersPercentageTypes = 'Top 5%' | 'Top 4%' | 'Top 3%' | 'Top 2%' | 'Top 1%' | 'Undefined %';
    
    export const getOthersPercentageMapping = (topProductsPercentage: number | undefined): OthersPercentageTypes => {
      switch(topProductsPercentage) {
        case 1:
          return 'Top 5%';
        case 2:
          return 'Top 4%';
        case 3:
          return 'Top 3%';
        case 4:
          return 'Top 2%';
        case 5:
          return 'Top 1%';   
        default:
            return 'Undefined %';
      }
    }