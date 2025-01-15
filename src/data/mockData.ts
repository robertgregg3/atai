type MockData = {
  ActualSavingsForCurrentYear: string;
  ActualSavingsForYear: string;
  ActualSavingsPerMonth: string;
  CostCenterTag: string;
  EnvironmentTag: string;
  ProductNameTag: string;
}[];

export const mockData: MockData = [
    {
      "ActualSavingsForCurrentYear": "$200.15",
      "ActualSavingsForYear": "$2401.80",
      "ActualSavingsPerMonth": "$200.15",
      "CostCenterTag": "eng",
      "EnvironmentTag": "dev-env",
      "ProductNameTag": "webapp"
    },
    {
      "ActualSavingsForCurrentYear": "$89.34",
      "ActualSavingsForYear": "$1072.08",
      "ActualSavingsPerMonth": "$89.34",
      "CostCenterTag": "ops",
      "EnvironmentTag": "infra-prod",
      "ProductNameTag": "load-balancer"
    },
    {
      "ActualSavingsForCurrentYear": "$145.50",
      "ActualSavingsForYear": "$1746.00",
      "ActualSavingsPerMonth": "$145.50",
      "CostCenterTag": "hr",
      "EnvironmentTag": "hr-tools-prod",
      "ProductNameTag": "analytics"
    },
    {
      "ActualSavingsForCurrentYear": "$320.00",
      "ActualSavingsForYear": "$3840.00",
      "ActualSavingsPerMonth": "$320.00",
      "CostCenterTag": "marketing",
      "EnvironmentTag": "campaigns-prod",
      "ProductNameTag": "ad-server"
    },
    {
      "ActualSavingsForCurrentYear": "$75.00",
      "ActualSavingsForYear": "$900.00",
      "ActualSavingsPerMonth": "$75.00",
      "CostCenterTag": "finance",
      "EnvironmentTag": "fin-prod",
      "ProductNameTag": "accounting"
    }
  ]
  