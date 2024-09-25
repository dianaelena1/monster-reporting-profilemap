export interface Product {
  image: string;
  uname: string;
  gmail: string;
  productName: string;
  status: string;
  weeks: string;
  budget: string;
}

export const TopSelling: Product[] = [
  {
    image: 'assets/images/users/Adrian.jpg',
    uname: 'Adrian Mandra',
    gmail: 'adrian.mandra@msg.group',
    productName: 'Unit Manager',
    status: 'danger',
    weeks: 'Senior',
    budget: 'Manual Testing, Leadership',
  },
  {
    image: 'assets/images/users/Diana.png',
    uname: 'Diana Horincar',
    gmail: 'Diana.Horincar@msg.group',
    productName: 'Consultant',
    status: 'info',
    weeks: 'Senior',
    budget: 'Testing',
  },
  {
    image: 'assets/images/users/Daria.jpg',
    uname: 'Daria Lupsa',
    gmail: 'Daria.Lupsa@msg.group',
    productName: 'Consultant',
    status: 'warning',
    weeks: 'Junior',
    budget: 'Manual Testing',
  },
  {
    image: 'assets/images/users//Daniel.jpg',
    uname: 'Daniel Tuna',
    gmail: 'Daniel.Tuna@msg.group',
    productName: 'Consultant',
    status: 'success',
    weeks: 'Mid',
    budget: 'Manual Testing',
  },
];
