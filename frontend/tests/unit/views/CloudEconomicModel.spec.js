import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

import getRouter from '@/router';
import CloudEconomicModel from '@/views/CloudEconomicModel.vue';

const localVue = createLocalVue();
localVue.use(getRouter());
localVue.use(Vuetify);
localVue.use(Vuex);

describe('CloudEconomicModel.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store();
  });

  it('renders', () => {
    store.registerModule('cloudEconomicModelForm', { namespaced: true });

    const wrapper = shallowMount(CloudEconomicModel, { localVue, store });

    expect(wrapper.html()).toMatch('router-view');
  });
});
