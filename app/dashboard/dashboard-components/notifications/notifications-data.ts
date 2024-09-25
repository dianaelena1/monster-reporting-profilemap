export interface Feed {
  class: string;
  icon: string;
  task: string;
  time: string;
}

export const Feeds: Feed[] = [
  {
    class: 'bg-info',
    icon: 'bi bi-bell',
    task: 'Pending tasks',
    time: 'Just Now',
  },
  {
    class: 'bg-success',
    icon: 'bi bi-check-circle-fill',
    task: 'Test cycle was successfully created',
    time: '2 Hours ago',
  },
  {
    class: 'bg-warning',
    icon: 'bi bi-exclamation-circle-fill',
    task: 'New deployment',
    time: '31 May',
  },
  {
    class: 'bg-danger',
    icon: 'bi bi-x-circle-fill',
    task: 'Some testcases failed',
    time: '30 May',
  },
  {
    class: 'bg-primary',
    icon: 'bi bi-person',
    task: 'You have changed your password',
    time: '21 May',
  },
];
