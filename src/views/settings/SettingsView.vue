<template>
  <div>
    <PageHeader
      title="Settings"
      pageIcon="mdi-arrow-left"
      @goBack="$router.go(-1)"
    />
    <br />
    <div>
      <v-layout row wrap class="pa-2">
        <v-flex d-flex xs12 sm12 md6 class="mt-2">
          <v-card
            color="rgb(31, 32, 38)"
            class="ml-2 mr-2 mb-2 pa-2 white--text"
            style="width: 100%; border-radius: 20px"
            height="332"
          >
            <div class="d-flex ml-4">
              <h6 class="mb-4">Notification</h6>
            </div>
            <v-divider dark></v-divider>

            <div class="d-flex justify-center">
              <v-card-title class="font-weight-bold card__title"
                >Push Notification</v-card-title
              >
              <v-spacer></v-spacer>
              <v-switch
                v-model="pushNotification"
                color="warning"
                value="warning"
              ></v-switch>
            </div>

            <v-flex d-flex xs12 sm12 md8 class="text-start ml-4">
              <p class="card__text">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna.
              </p>
            </v-flex>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm12 md6 class="mt-2">
          <v-card
            color="rgb(31, 32, 38)"
            class="ml-2 mr-2 mb-2 pa-2 white--text"
            style="width: 100%; border-radius: 20px"
            height="332"
          >
            <div class="d-flex ml-4">
              <h6 class="mb-4">Data Setting</h6>
            </div>
            <v-divider dark></v-divider>

            <v-card-title class="font-weight-bold card__title"
              >Start of the week</v-card-title
            >

            <v-flex d-flex xs12 sm12 md8 class="text-start ml-4">
              <p class="card__text">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna.
              </p>
            </v-flex>

            <v-radio-group v-model="radioDays" row class="ml-3">
              <v-radio value="monday" color="warning">
                <template v-slot:label>
                  <div class="white--text card__radio">Monday</div>
                </template>
              </v-radio>
              <v-radio value="saturday" color="warning">
                <template v-slot:label>
                  <div class="white--text card__radio">Saturday</div>
                </template>
              </v-radio>
              <v-radio value="sunday" color="warning">
                <template v-slot:label>
                  <div class="white--text card__radio">Sunday</div>
                </template>
              </v-radio>
            </v-radio-group>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm12 md6 class="mt-2 mb-4">
          <v-card
            color="rgb(31, 32, 38)"
            class="ml-2 mr-2 mb-2 pa-2 white--text"
            style="width: 100%; border-radius: 20px"
            height="332"
          >
            <div class="d-flex ml-4">
              <h6 class="mb-4">Units</h6>
            </div>
            <v-divider dark></v-divider>

            <v-card-title class="font-weight-bold card__title"
              >Measurements</v-card-title
            >

            <v-flex d-flex xs12 sm12 md8 class="text-start ml-4">
              <p class="card__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
                numquam!
              </p>
            </v-flex>

            <div class="d-flex align-center">
              <v-card-title class="font-weight-bold card__title"
                >Weight</v-card-title
              >
              <v-spacer></v-spacer>
              <v-radio-group v-model="radioWeight" row class="mr-7">
                <v-radio value="kg" color="warning">
                  <template v-slot:label>
                    <div class="white--text card__radio">KG</div>
                  </template>
                </v-radio>
                <v-radio value="lbs" color="warning">
                  <template v-slot:label>
                    <div class="white--text card__radio">LBS</div>
                  </template>
                </v-radio>
              </v-radio-group>
            </div>

            <div class="d-flex align-center">
              <v-card-title class="font-weight-bold card__title"
                >Height</v-card-title
              >
              <v-spacer></v-spacer>
              <v-radio-group v-model="radioHeight" row class="mr-3">
                <v-radio value="cm" color="warning">
                  <template v-slot:label>
                    <div class="white--text card__radio">CM</div>
                  </template>
                </v-radio>
                <v-radio value="feet" color="warning">
                  <template v-slot:label>
                    <div class="white--text card__radio">FEET</div>
                  </template>
                </v-radio>
              </v-radio-group>
            </div>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm12 md6 class="mt-2 mb-4">
          <v-card
            color="rgb(31, 32, 38)"
            class="ml-2 mr-2 mb-5 mb-md-0 pa-2 white--text"
            style="width: 100%; border-radius: 20px"
            height="332"
          >
            <div class="d-flex ml-4">
              <h6 class="mb-4">Notification</h6>
            </div>
            <v-divider dark></v-divider>

            <div class="d-flex justify-center">
              <v-card-title class="font-weight-bold card__title"
                >Daily Reminders</v-card-title
              >
              <v-spacer></v-spacer>
              <v-switch
                v-model="dailyReminders"
                color="warning"
                value="warning"
              ></v-switch>
            </div>

            <v-flex d-flex xs12 sm12 md8 class="text-start ml-4">
              <p class="card__text">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy.
              </p>
            </v-flex>

            <div class="d-flex justify-center">
              <v-card-title class="font-weight-bold card__title"
                >Upcoming Reminders</v-card-title
              >
              <v-spacer></v-spacer>
              <v-switch
                v-model="upcomingReminders"
                color="warning"
                value="warning"
              ></v-switch>
            </div>

            <v-flex d-flex xs12 sm12 md8 class="text-start ml-4">
              <p class="card__text">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy.
              </p>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/layouts/PageHeader.vue";

export default {
  name: "SettingsView",
  data() {
    return {
      pushNotification: true,
      dailyReminders: true,
      upcomingReminders: true,
      radioDays: "monday",
      radioWeight: "kg",
      radioHeight: "cm",
    };
  },
  components: { PageHeader },
};
</script>

<style scoped>
h6 {
  font-size: 16px;
  margin-top: 5px;
}
.card__title {
  font-size: 24px;
  margin-top: 5px;
}
.card__text {
  font-size: 18px;
  font: normal normal 300 18px/30px Gilroy;
}
.card__radio {
  font: normal normal 600 20px/24px Lato;
}
@media only screen and (max-width: 600px) {
  .card__title {
    font-size: 20px;
  }
}
</style>
