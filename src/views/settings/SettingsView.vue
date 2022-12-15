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
        <v-flex d-flex xs12 sm12 md6 class="mt-sm-2 mt-2">
          <v-card
            color="rgba(0, 0, 0, 0.3)"
            class="ml-2 mb-2 pa-2 white--text"
            style="width: 100%; border-radius: 20px"
          >
            <div class="d-flex ml-4">
              <h6 class="lighten-5">Notification</h6>
            </div>

            <div class="d-flex justify-center">
              <v-card-title class="text-h5">Push Notification</v-card-title>
              <v-spacer></v-spacer>
              <v-switch
                v-model="pushNotification"
                color="warning"
                value="warning"
              ></v-switch>
            </div>

            <v-flex d-flex xs12 sm12 md8 class="text-start ml-4">
              <p class="text-body-2">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna.
              </p>
            </v-flex>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm12 md6 class="mt-sm-2">
          <v-card
            color="rgba(0, 0, 0, 0.3)"
            class="ml-2 mb-2 pa-2 white--text"
            style="width: 100%; border-radius: 20px"
          >
            <div class="d-flex ml-4">
              <h6 class="lighten-5">Data Setting</h6>
            </div>

            <v-card-title class="text-h5">Start of the week</v-card-title>

            <v-flex d-flex xs12 sm12 md8 class="text-start ml-4">
              <p class="text-body-2">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna.
              </p>
            </v-flex>

            <v-radio-group v-model="radioDays" row class="ml-3">
              <v-radio value="monday" color="warning">
                <template v-slot:label>
                  <div class="white--text">Monday</div>
                </template>
              </v-radio>
              <v-radio value="saturday" color="warning">
                <template v-slot:label>
                  <div class="white--text">Saturday</div>
                </template>
              </v-radio>
              <v-radio value="sunday" color="warning">
                <template v-slot:label>
                  <div class="white--text">Sunday</div>
                </template>
              </v-radio>
            </v-radio-group>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm12 md6 class="mt-sm-2">
          <v-card
            color="rgba(0, 0, 0, 0.3)"
            class="ml-2 mb-2 pa-2 white--text"
            style="width: 100%; border-radius: 20px"
          >
            <div class="d-flex ml-4">
              <h6 class="lighten-5">Units</h6>
            </div>

            <v-card-title class="text-h5">Measurements</v-card-title>

            <v-flex d-flex xs12 sm12 md8 class="text-start ml-4">
              <p class="text-body-2">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna.
              </p>
            </v-flex>

            <div class="d-flex align-center">
              <v-card-title class="text-h5">Weight</v-card-title>
              <v-spacer></v-spacer>
              <v-radio-group v-model="radioWeight" row class="mr-6">
                <v-radio value="kg" color="warning">
                  <template v-slot:label>
                    <div class="white--text">KG</div>
                  </template>
                </v-radio>
                <v-radio value="lbs" color="warning">
                  <template v-slot:label>
                    <div class="white--text">LBS</div>
                  </template>
                </v-radio>
              </v-radio-group>
            </div>

            <div class="d-flex align-center">
              <v-card-title class="text-h5">Height</v-card-title>
              <v-spacer></v-spacer>
              <v-radio-group v-model="radioHeight" row class="mr-3">
                <v-radio value="cm" color="warning">
                  <template v-slot:label>
                    <div class="white--text">CM</div>
                  </template>
                </v-radio>
                <v-radio value="feet" color="warning">
                  <template v-slot:label>
                    <div class="white--text">FEET</div>
                  </template>
                </v-radio>
              </v-radio-group>
            </div>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm12 md6 class="mt-sm-2">
          <v-card
            color="rgba(0, 0, 0, 0.3)"
            class="ml-2 mb-2 pa-2 white--text"
            style="width: 100%; border-radius: 20px"
          >
            <div class="d-flex ml-4">
              <h6 class="lighten-5">Notification</h6>
            </div>

            <div class="d-flex justify-center">
              <v-card-title class="text-h5">Daily Reminders</v-card-title>
              <v-spacer></v-spacer>
              <v-switch
                v-model="dailyReminders"
                color="warning"
                value="warning"
              ></v-switch>
            </div>

            <v-flex d-flex xs12 sm12 md8 class="text-start ml-4">
              <p class="text-body-2">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy.
              </p>
            </v-flex>

            <div class="d-flex justify-center">
              <v-card-title class="text-h5">Upcoming Reminders</v-card-title>
              <v-spacer></v-spacer>
              <v-switch
                v-model="upcomingReminders"
                color="warning"
                value="warning"
              ></v-switch>
            </div>

            <v-flex d-flex xs12 sm12 md8 class="text-start ml-4">
              <p class="text-body-2">
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

<style scoped></style>
