export interface topcard {
  bgcolor: string;
  icon: string;
  title: string;
  subtitle: string;
}

export const createTopCards = (
  totalTestCases: number,
  totalSmoke: number,
  totalRegression: number,
  totalFunctionalFeatureTest: number
): topcard[] => [
  {
    bgcolor: 'success',
    icon: 'bi bi-fonts',
    title: totalTestCases.toString(),
    subtitle: 'Test cases',
  },
  {
    bgcolor: 'danger',
    icon: 'bi bi-stripe',
    title: totalSmoke.toString(),
    subtitle: 'Smoke tests',
  },
  {
    bgcolor: 'warning',
    icon: 'bi bi-r-square-fill',
    title: totalRegression.toString(),
    subtitle: 'Regression tests',
  },
  {
    bgcolor: 'info',
    icon: 'bi bi-fonts',
    title: totalFunctionalFeatureTest.toString(),
    subtitle: 'Functional Feature Tests',
  },
];
