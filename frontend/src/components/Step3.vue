<template>
  <v-container>
    <h2 class="pb-8">Please review your answers</h2>
    <hr class="orange" />

    <v-row>
      <v-col cols="12" lg="12">
        <v-card outlined class="review-form">
          <h2 class="review-heading">
            1. Before You Begin
            <v-btn
              v-if="!submissionComplete"
              color="primary"
              class="mx-5"
              data-test="btn-form-to-step-one"
              fab
              x-small
              @click="setStep(1)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </h2>
          <Step1 />
        </v-card>
        <br />
        <v-card outlined class="review-form">
          <h2 class="review-heading">
            2. Contact Information
            <v-btn
              v-if="!submissionComplete"
              color="primary"
              class="mx-5"
              data-test="btn-form-to-step-two"
              fab
              x-small
              @click="setStep(2)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </h2>
          <Step2 :reviewMode="true" />
        </v-card>
      </v-col>
    </v-row>

    <div v-if="!submissionComplete">
      <v-form v-model="step3Valid">
        <v-checkbox
          :rules="[(v) => !!v || 'You must certify to continue']"
          v-model="certifyAccurateInformation"
          data-test="cb-form-certifyAccurateInformation"
          label="I certify this information to be accurate"
        ></v-checkbox>
      </v-form>
    </div>

    <div v-if="!submissionComplete">
      <v-btn
        color="primary"
        data-test="btn-form-submit"
        :disabled="!step3Valid"
        @click="
          renderToEmail();
          setStep(4);
        "
      >
        <span>Send to Email</span>
      </v-btn>
      <v-btn text @click="setStep(2)" data-test="btn-form-to-previous-step">
        <span>Back</span>
      </v-btn>
    </div>

    <v-dialog v-model="submitting" hide-overlay persistent width="300">
      <v-card color="#38598a" dark>
        <v-card-text class="pt-4">
          Submitting Form
          <v-progress-linear indeterminate color="white"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

import Step1 from '@/components/Step1.vue';
import Step2 from '@/components/Step2.vue';
import axios from 'axios';

export default {
  name: 'CloudEconomicModelStep3',
  components: {
    Step1,
    Step2,
  },
  data() {
    return {
      step3Valid: false,
    };
  },
  computed: {
    ...mapGetters('form', [
      'attestation',
      'submissionComplete',
      'submissionDetails',
      'submitting',
      'contact',
      'cost',
      'value',
    ]),
    // Certify checkboxes
    certifyAccurateInformation: {
      get() {
        return this.attestation.certifyAccurateInformation;
      },
      set(value) {
        this.updateAttestation({ ['certifyAccurateInformation']: value });
      },
    },
  },
  methods: {
    ...mapMutations('form', [
      'setStep',
      'updateAttestation',
      'updateContact',
      'updateCost',
      'updateValue',
    ]),
    ...mapActions('form', ['submitForm']),
    renderToEmail: function () {
      const body = {
        recipient: this.contact.sendEmail,
        contexts: {
          numberOfTeams: this.cost.numberOfTeams,
          employeesVsContractors: this.cost.employeesVsContractors,
          teamMigrationExperience: this.cost.teamMigrationExperience,
          shadowAppDepsChance: this.cost.shadowAppDepsChance,
          avgCostGovDataBreach: this.value.avgCostGovDataBreach,
          avgOnlineUsersPerApp: this.value.avgOnlineUsersPerApp,
          avgLegacyOutageLength: this.value.avgLegacyOutageLength,
          avgDistruptionHourlyValue: this.value.avgDistruptionHourlyValue,
          avgYearlyNewFeatureHours: this.value.avgYearlyNewFeatureHours,
        },
      };
      return axios.post('http://localhost:3000/render', body).catch((err) => {
        alert(err);
      });
    },
  },
  mounted() {
    document
      .querySelectorAll('.review-form input, .review-form .v-select')
      .forEach((q) => {
        q.setAttribute('readonly', 'true');
      });
  },
};
</script>

<style scoped lang="scss">
.review-form {
  font-size: smaller;
  margin-bottom: 0em;
  padding: 1em;
  .review-heading {
    margin-left: 0.5em;
  }
  background-color: #efefef;
  &::v-deep {
    h3,
    .v-input--checkbox {
      margin-top: 0.2em !important;
    }
    .hide-on-review {
      display: none;
    }
  }
}
</style>
