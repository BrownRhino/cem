/**
 * Cloud Economic Model Routes
 */
import { FormNames } from '@/utils/constants';

const baseName = 'CloudEconomicModel';
const baseTitle = 'Cloud Economic Model';

export default [
  {
    path: `/${FormNames.CLOUDECONOMICMODEL}`,
    component: () => import(/* webpackChunkName: "cloudeconomicmodel" */ '@/views/CloudEconomicModel.vue'),
    children: [
      {
        path: '',
        name: `${baseName}Form`,
        component: () => import(/* webpackChunkName: "cloudeconomicmodel-form" */ '@/views/cloudeconomicmodel/Root.vue'),
        meta: {
          title: baseTitle
        }
      },
      {
        path: 'review/:submissionId',
        name: `${baseName}Review`,
        component: () => import(/* webpackChunkName: "cloudeconomicmodel-review" */ '@/views/cloudeconomicmodel/Review.vue'),
        props: true,
        meta: {
          title: `${baseTitle} Submission Review`
        }
      },
    ]
  }
];
