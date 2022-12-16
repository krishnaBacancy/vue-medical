<template>
  <div style="background-color: #282934">
    <PageHeader
      title="Patient Details"
      pageIcon="mdi-arrow-left"
      @goBack="$router.go(-1)"
    />
    <br />
    <div
      class="white--text mb-5"
      style="background-color: rgba(0, 0, 0, 0.5); border-radius: 20px"
    >
      <v-progress-circular
        indeterminate
        color="amber"
        v-if="loadingStatus"
      ></v-progress-circular>
      <div v-else>
        <div class="d-flex align-center justify-md-space-around">
          <v-img
            class="rounded-circle ml-4 mt-2"
            src="https://picsum.photos/id/11/50/50"
            max-width="80"
            max-height="80"
          />
          <h3
            class="mr-2 ml-4"
            :style="{
              fontSize: $vuetify.breakpoint.smAndDown ? '20px' : '28px',
            }"
          >
            {{
              getFullName(
                getSingleDeviceData[0]?.customerFirstName,
                getSingleDeviceData[0]?.customerLastName
              )
            }}
          </h3>
          <v-spacer></v-spacer>
          <div class="d-flex align-center justify-md-space-between">
            <v-img
              src="@/assets/floor1.svg"
              height="40"
              width="40"
              contain
            ></v-img>
            <h3
              class="ml-3"
              :style="{
                fontSize: $vuetify.breakpoint.smAndDown ? '16px' : '20px',
              }"
            >
              Floor - 1
            </h3>
            <v-img
              src="@/assets/room.svg"
              class="ml-5"
              height="40"
              width="40"
              contain
            ></v-img>
            <h3
              class="ml-3"
              :style="{
                fontSize: $vuetify.breakpoint.smAndDown ? '16px' : '20px',
              }"
            >
              Room - 1
            </h3>
            <v-img
              src="@/assets/Mac Address.png"
              class="ml-5"
              height="40"
              width="40"
              contain
            ></v-img>
            <h3
              class="ml-3"
              :style="{
                fontSize: $vuetify.breakpoint.smAndDown ? '16px' : '20px',
              }"
            >
              {{ getSingleDeviceData[0]?.macAddressFramed.toUpperCase() }}
            </h3>
            <v-icon color="warning" size="30" class="ml-5">mdi-battery</v-icon>
            <h3
              class="ml-3"
              :style="{
                fontSize: $vuetify.breakpoint.smAndDown ? '16px' : '20px',
              }"
            >
              114Hrs 45Min
            </h3>
          </div>
          <v-spacer></v-spacer>
          <div class="d-flex align-center justify-center mr-7">
            <h3 class="mr-5" style="font-size: 20px">Device Status</h3>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-img
                  v-on="on"
                  v-bind="attrs"
                  class="mt-2"
                  src="@/assets/Live1.png"
                  height="50"
                  width="50"
                  contain
                  v-if="liveMessage === 'Online'"
                ></v-img>
              </template>
              <span>Live Mode</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-img
                  v-bind="attrs"
                  v-on="on"
                  class="mt-2"
                  src="@/assets/Scheduler.png"
                  height="50"
                  width="50"
                  contain
                  v-if="liveMessage === 'Offline'"
                ></v-img>
              </template>
              <span>Scheduler Mode</span>
            </v-tooltip>
          </div>
        </div>

        <div class="d-flex mt-6 justify-md-space-around">
          <div class="ml-6">
            <v-select
              :items="aggregateValues"
              filled
              dark
              dense
              label="Aggregate"
              v-model="selectedAggregate"
            ></v-select>
          </div>
          <div class="ml-6">
            <v-select
              :items="timePeriodValues"
              v-model="selectedTimePeriod"
              filled
              label="Time Period"
              dark
              dense
            ></v-select>
          </div>
          <div class="ml-6">
            <v-menu
              v-model="startDateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
              max-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="Start Date"
                  readonly
                  hide-details
                  :value="startDateValue"
                  @focus="focusStartDate"
                  filled
                  dark
                  dense
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="en-in"
                v-model="startDateValue"
                no-title
                @input="startDateMenu = false"
                :max="new Date().toISOString().slice(0, 10)"
              ></v-date-picker>
            </v-menu>
          </div>
          <div class="ml-6">
            <v-menu
              v-model="endDateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
              max-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="End Date"
                  readonly
                  hide-details
                  :value="endDateValue"
                  @focus="focusEndDate"
                  filled
                  dark
                  dense
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="en-in"
                v-model="endDateValue"
                no-title
                :min="startDateValue"
                :max="new Date().toISOString().slice(0, 10)"
                @input="endDateMenu = false"
              ></v-date-picker>
            </v-menu>
          </div>
        </div>

        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex d-flex xs12 sm12 md6>
              <v-card
                color="#282934"
                dark
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex align-center">
                  <h3>ECG</h3>
                  <!-- <v-spacer></v-spacer> -->
                  <v-spacer></v-spacer>
                  <v-btn class="mr-3 export__btn" color="warning" outlined
                    >Export</v-btn
                  >
                </div>
                <div class="d-flex align-start mt-2">
                  <div class="grid-container">
                    <!-- <LineChart :key="showEcgChart" :width="834.24" :height="199.53" /> -->
                    <ApexLineChart
                      :ecgChartData="ecgChartData"
                      :width="834.24"
                      :height="299.53"
                    />
                  </div>
                </div>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm12 md6>
              <v-card
                dark
                color="#282934"
                class="ml-2 mr-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex">
                  <h3>PPG</h3>
                  <v-spacer></v-spacer>
                  <v-btn class="mr-3 export__btn" color="warning" outlined
                    >Export</v-btn
                  >
                </div>
                <div class="d-flex align-start mt-2">
                  <div class="grid-container">
                    <RealTimeChart
                      :width="834.24"
                      :height="299.53"
                      :key="showPpgChart"
                    />
                  </div>
                </div>
              </v-card>
            </v-flex>
          </v-layout>

          <br />

          <v-layout row wrap>
            <v-flex d-flex xs12 sm6 md3>
              <v-card
                color="#282934"
                dark
                class="ml-2 mr-2 mr-sm-0 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>Heart Rate</h3>
                    <small class="warning--text">No Device Paired</small>
                  </div>
                  <v-spacer></v-spacer>
                  <div v-if="!$vuetify.breakpoint.smOnly">
                    <h3>Last Reading</h3>
                    <small class="grey--text">2 hour ago</small>
                  </div>
                </div>
                <div class="d-flex justify-center align-center mt-5">
                  <v-flex>
                    <v-img
                      class="ml-2 mt-2"
                      src="@/assets/heartbeat.svg"
                      height="70"
                      width="70"
                      contain
                    ></v-img>
                  </v-flex>
                  <v-flex xs12>
                    <div class="ml-4 text-start">
                      <h1 class="success--text">
                        {{ getAlgoData?.hr ? getAlgoData.hr : "Loading..." }}
                      </h1>
                      <div class="d-flex flex-column">
                        <small>C1</small>
                      </div>
                    </div>
                  </v-flex>
                </div>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm6 md3>
              <v-card
                color="#282934"
                dark
                class="ml-2 mr-2 mr-md-0 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>Heart Rate Variability</h3>
                    <small class="warning--text">No Device Paired</small>
                  </div>
                  <v-spacer></v-spacer>
                  <div v-if="!$vuetify.breakpoint.smOnly">
                    <h3>Last Reading</h3>
                    <small class="grey--text">2 hour ago</small>
                  </div>
                </div>
                <div class="d-flex justify-center align-center mt-5">
                  <v-flex>
                    <v-img
                      class="ml-2 mt-2"
                      src="@/assets/heartbeat.svg"
                      height="70"
                      width="70"
                      contain
                    ></v-img>
                  </v-flex>
                  <v-flex xs12>
                    <div class="ml-4 text-start">
                      <h1 class="success--text">
                        {{
                          getAlgoData?.hrv
                            ? Math.round(getAlgoData.hrv)
                            : "Loading..."
                        }}
                      </h1>
                      <div class="d-flex flex-column">
                        <small>C1</small>
                      </div>
                    </div>
                  </v-flex>
                </div>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm6 md3>
              <v-card
                color="#282934"
                dark
                class="ml-2 mr-2 mr-sm-0 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>Oxygen Saturation</h3>
                    <small class="warning--text">00:0B:57:AC:66:DA</small>
                  </div>
                  <v-spacer></v-spacer>
                  <div v-if="!$vuetify.breakpoint.smOnly">
                    <h3>Last Reading</h3>
                    <small class="grey--text">2 hour ago</small>
                  </div>
                </div>
                <div class="d-flex justify-center align-center mt-5">
                  <v-flex>
                    <v-img
                      class="ml-2 mt-2"
                      src="@/assets/oxygen.svg"
                      height="70"
                      width="70"
                      contain
                    ></v-img>
                  </v-flex>
                  <v-flex xs12>
                    <div class="ml-4 text-start">
                      <h1 class="warning--text">98</h1>
                      <div class="d-flex flex-column">
                        <small>Streaming Mode</small>
                      </div>
                    </div>
                  </v-flex>
                </div>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm6 md3>
              <v-card
                color="#282934"
                dark
                class="ml-2 mr-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>Pulse Rate Variability</h3>
                    <small class="warning--text">No Device Paired</small>
                  </div>
                  <v-spacer></v-spacer>
                  <div v-if="!$vuetify.breakpoint.smOnly">
                    <h3>Last Reading</h3>
                    <small class="grey--text">2 hour ago</small>
                  </div>
                </div>
                <div class="d-flex justify-center align-center mt-5">
                  <v-flex>
                    <v-img
                      class="ml-2 mt-2"
                      src="@/assets/Group 507.svg"
                      height="70"
                      width="70"
                      contain
                    ></v-img>
                  </v-flex>
                  <v-flex xs12>
                    <div class="ml-4 text-start">
                      <h1 class="success--text">
                        {{
                          getAlgoData?.prv
                            ? Math.round(getAlgoData.prv)
                            : "Loading..."
                        }}
                      </h1>
                      <div class="d-flex flex-column">
                        <small>Streaming Mode</small>
                      </div>
                    </div>
                  </v-flex>
                </div>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex d-flex xs12 sm12 md4>
              <v-card
                color="#282934"
                dark
                class="ml-2 mr-2 mr-md-0 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>Movement</h3>
                    <small class="warning--text">No Device Paired</small>
                  </div>
                  <v-spacer></v-spacer>
                  <div>
                    <h3>Last Reading</h3>
                    <small class="grey--text">2 hour ago</small>
                  </div>
                </div>
                <div class="d-flex justify-center align-center mt-5">
                  <v-flex>
                    <v-img
                      src="@/assets/steps.svg"
                      height="70"
                      width="70"
                      contain
                      class="mt-2 ml-2"
                    ></v-img>
                  </v-flex>
                  <v-flex xs12>
                    <div class="text-start ml-4">
                      <h1 class="pink--text">
                        {{ getAlgoData?.steps ? getAlgoData?.steps : "0" }}
                      </h1>
                      <small>Steps</small>
                    </div>
                  </v-flex>
                </div>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm12 md4>
              <v-card
                color="#282934"
                dark
                class="ml-2 mr-2 mr-md-0 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>Blood Pressure</h3>
                    <small class="warning--text">No Device Paired</small>
                  </div>
                  <v-spacer></v-spacer>
                  <div>
                    <h3>Last Reading</h3>
                    <small class="grey--text">2 hour ago</small>
                  </div>
                </div>
                <div class="d-flex justify-center align-center mt-5">
                  <v-flex>
                    <v-img
                      class="mt-2 ml-2"
                      src="@/assets/bloodPressure.svg"
                      height="70"
                      contain
                      width="70"
                    ></v-img>
                  </v-flex>
                  <v-flex xs12>
                    <div class="text-start ml-4">
                      <h1 class="cyan--text">
                        {{
                          getAlgoData?.bp
                            ? Math.round(getAlgoData?.bp)
                            : "Loading..."
                        }}
                        /
                        {{
                          getAlgoData?.dbp
                            ? Math.round(getAlgoData?.dbp)
                            : "..."
                        }}
                      </h1>
                      <div class="d-flex flex-column">
                        <small>mmHg</small>
                      </div>
                    </div>
                  </v-flex>
                </div>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm12 md4>
              <v-card
                color="#282934"
                dark
                class="ml-2 mr-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>MAP</h3>
                    <small class="red--text">Mean arterial pressure</small>
                  </div>
                  <v-spacer></v-spacer>
                  <div>
                    <h3>Last Reading</h3>
                    <small class="grey--text">2 hour ago</small>
                  </div>
                </div>
                <div class="d-flex justify-center mt-5">
                  <v-flex>
                    <v-img
                      src="../../assets/Group 509.svg"
                      width="70"
                      height="70"
                      contain
                      class="mt-2 ml-2"
                    ></v-img>
                  </v-flex>
                  <v-flex xs12>
                    <div class="text-start ml-4">
                      <h1 class="red--text">
                        {{
                          getAlgoData?.map
                            ? Math.round(getAlgoData?.map * 100) / 100
                            : "Loading..."
                        }}
                      </h1>
                      <div class="d-flex flex-column">
                        <small>mmHg</small>
                      </div>
                    </div>
                  </v-flex>
                </div>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <!--rr interval-->
            <v-flex d-flex xs12 sm6 md4>
              <v-card
                color="#282934"
                dark
                class="ml-2 mr-2 mr-sm-0 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>RR Interval</h3>
                    <small class="warning--text">00:0B:57:AC:66:DA</small>
                  </div>
                  <v-spacer></v-spacer>
                  <div v-if="!$vuetify.breakpoint.smOnly">
                    <h3>Last Reading</h3>
                    <small class="grey--text">2 hour ago</small>
                  </div>
                </div>
                <div class="d-flex justify-center align-center mt-5">
                  <v-flex>
                    <v-img
                      class="mt-2 ml-2"
                      src="../../assets/Group 508.svg"
                      height="70"
                      width="70"
                      contain
                    ></v-img>
                  </v-flex>
                  <v-flex xs12>
                    <div class="text-start ml-4">
                      <h1 class="warning--text">
                        {{
                          getAlgoData?.rr
                            ? Math.round(getAlgoData?.rr * 100) / 100
                            : "Loading..."
                        }}
                      </h1>
                      <div class="d-flex flex-column">
                        <small>Streaming Mode</small>
                      </div>
                    </div>
                  </v-flex>
                </div>
              </v-card>
            </v-flex>

            <!--pulse pressure-->
            <v-flex d-flex xs12 sm6 md4>
              <v-card
                color="#282934"
                dark
                class="ml-2 mr-2 mr-md-0 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>Pulse Pressure</h3>
                    <small class="warning--text">00:0B:57:AC:66:DA</small>
                  </div>
                  <v-spacer></v-spacer>
                  <div v-if="!$vuetify.breakpoint.smOnly">
                    <h3>Last Reading</h3>
                    <small class="grey--text">2 hour ago</small>
                  </div>
                </div>
                <div class="d-flex justify-center align-center mt-5">
                  <v-flex>
                    <v-img
                      class="ml-2 mt-2"
                      src="../../assets/Group 507.svg"
                      height="70"
                      width="70"
                      contain
                    ></v-img>
                  </v-flex>
                  <v-flex xs12>
                    <div class="ml-4 text-start">
                      <h1 class="warning--text">
                        {{
                          getAlgoData?.pp
                            ? Math.round(getAlgoData?.pp * 100) / 100
                            : "Loading..."
                        }}
                      </h1>
                      <div class="d-flex flex-column">
                        <small>Streaming Mode</small>
                      </div>
                    </div>
                  </v-flex>
                </div>
              </v-card>
            </v-flex>

            <!--arrthymia-->
            <v-flex d-flex xs12 sm12 md4>
              <v-card
                color="#282934"
                dark
                class="ml-2 mr-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>Arrthymia</h3>
                    <small class="warning--text">00:0B:57:AC:66:DA</small>
                  </div>
                  <v-spacer></v-spacer>
                  <div>
                    <h3>Last Reading</h3>
                    <small class="grey--text">2 hour ago</small>
                  </div>
                </div>
                <div class="d-flex justify-center align-center mt-5">
                  <v-flex>
                    <v-img
                      class="ml-2 mt-2"
                      src="../../assets/Group 506.svg"
                      height="70"
                      width="70"
                      contain
                    ></v-img>
                  </v-flex>
                  <v-flex xs12>
                    <div class="ml-4 text-start">
                      <h1 class="warning--text">
                        {{
                          getAlgoData?.arrhythmia
                            ? getAlgoData.arrhythmia
                            : "Loading..."
                        }}
                      </h1>
                      <div class="d-flex flex-column">
                        <small>Streaming Mode</small>
                      </div>
                    </div>
                  </v-flex>
                </div>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <!--Stroke Volume-->
            <v-flex d-flex xs12 sm6 md4>
              <v-card
                color="#282934"
                dark
                class="ml-2 mr-2 mr-sm-0 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>Stroke Volume</h3>
                    <small class="warning--text">00:0B:57:AC:66:DA</small>
                  </div>
                  <v-spacer></v-spacer>
                  <div v-if="!$vuetify.breakpoint.smOnly">
                    <h3>Last Reading</h3>
                    <small class="grey--text">2 hour ago</small>
                  </div>
                </div>
                <div class="d-flex justify-center align-center mt-5">
                  <v-flex>
                    <v-img
                      class="ml-2 mt-2"
                      src="../../assets/Group 505.svg"
                      height="70"
                      width="70"
                      contain
                    ></v-img>
                  </v-flex>
                  <v-flex xs12>
                    <div class="ml-4 text-start">
                      <h1 class="warning--text">
                        {{
                          getAlgoData?.sv
                            ? Math.round(getAlgoData?.sv * 100) / 100
                            : "Loading..."
                        }}
                      </h1>
                      <div class="d-flex flex-column">
                        <small>Streaming Mode</small>
                      </div>
                    </div>
                  </v-flex>
                </div>
              </v-card>
            </v-flex>
            <!--Cardiac Output-->
            <v-flex d-flex xs12 sm6 md4>
              <v-card
                color="#282934"
                dark
                class="ml-2 mr-2 mr-md-0 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>Cardiac Output</h3>
                    <small class="warning--text">00:0B:57:AC:66:DA</small>
                  </div>
                  <v-spacer></v-spacer>
                  <div v-if="!$vuetify.breakpoint.smOnly">
                    <h3>Last Reading</h3>
                    <small class="grey--text">2 hour ago</small>
                  </div>
                </div>
                <div class="d-flex justify-center align-center mt-5">
                  <v-flex>
                    <v-img
                      class="ml-2 mt-2"
                      src="../../assets/Group 504.svg"
                      height="70"
                      width="70"
                      contain
                    ></v-img>
                  </v-flex>
                  <v-flex xs12>
                    <div class="ml-4 text-start">
                      <h1 class="warning--text">
                        {{
                          getAlgoData?.co
                            ? Math.round(getAlgoData?.co * 100) / 100
                            : "Loading..."
                        }}
                      </h1>
                      <div class="d-flex flex-column">
                        <small>Streaming Mode</small>
                      </div>
                    </div>
                  </v-flex>
                </div>
              </v-card>
            </v-flex>

            <!--Pulse transit time-->
            <v-flex d-flex xs12 sm12 md4>
              <v-card
                color="#282934"
                dark
                class="ml-2 mr-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>Pulse Transit Time</h3>
                    <small class="warning--text">00:0B:57:AC:66:DA</small>
                  </div>
                  <v-spacer></v-spacer>
                  <div>
                    <h3>Last Reading</h3>
                    <small class="grey--text">2 hour ago</small>
                  </div>
                </div>
                <div class="d-flex justify-center align-center mt-5">
                  <v-flex>
                    <v-img
                      class="ml-2 mt-2"
                      src="../../assets/Group 503.svg"
                      height="70"
                      width="70"
                      contain
                    ></v-img>
                  </v-flex>
                  <v-flex xs12>
                    <div class="ml-4 text-start">
                      <h1 class="warning--text">
                        {{
                          getAlgoData?.ptt
                            ? Math.round(getAlgoData?.ptt * 100) / 100
                            : "Loading..."
                        }}
                      </h1>
                      <div class="d-flex flex-column">
                        <small>Streaming Mode</small>
                      </div>
                    </div>
                  </v-flex>
                </div>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex d-flex xs12 sm12 md6>
              <v-card
                color="#282934"
                dark
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div>
                  <div class="d-flex justify-center align-center">
                    <h3 class="d-flex align-center mt-2 mb-2">
                      <span>
                        <v-img
                          class="ml-2"
                          src="@/assets/temprature.svg"
                          height="50"
                          width="50"
                          contain
                        ></v-img>
                      </span>
                      <div class="d-flex ml-5 text-start flex-column">
                        <span>Body Temperature</span>
                        <span class="warning--text" style="font-size: 16px"
                          >00:0B:57:AC:66:DA</span
                        >
                      </div>
                    </h3>
                    <v-spacer></v-spacer>
                    <v-btn class="mr-3 export__btn" color="warning" outlined
                      >Export</v-btn
                    >
                  </div>
                </div>
                <div class="grid-container">
                  <TestChart
                    :height="286"
                    :width="623"
                    :data-of-chart="[72, 115, 95, 130, 60, 116, 88]"
                    :label="['12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm']"
                    :chart-bg-color="'#fd5d5d'"
                  />
                </div>
              </v-card>
            </v-flex>

            <v-flex d-flex xs12 sm12 md6>
              <v-card
                color="#282934"
                dark
                class="ml-2 mr-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div>
                  <div class="d-flex justify-center align-center">
                    <h3 class="d-flex align-center mt-2 mb-2">
                      <v-img
                        class="ml-2"
                        src="@/assets/lungs.svg"
                        height="50"
                        width="50"
                        contain
                      ></v-img>
                      <div class="d-flex ml-5 text-start flex-column">
                        <span>Blood Oxygen</span>
                        <span class="warning--text" style="font-size: 16px"
                          >mmHg</span
                        >
                      </div>
                    </h3>
                    <v-spacer></v-spacer>
                    <v-btn class="mr-3 export__btn" color="warning" outlined
                      >Export</v-btn
                    >
                  </div>
                </div>
                <div class="grid-container">
                  <ApexAreaChart
                    :height="366"
                    :width="600"
                    :data-of-chart="[72, 115, 95, 130, 60, 116, 88]"
                    :chart-label="[
                      '12pm',
                      '1pm',
                      '2pm',
                      '3pm',
                      '4pm',
                      '5pm',
                      '6pm',
                    ]"
                    :chart-border-color="'#774af1'"
                    :chart-bg-color="['#7741f1']"
                  />
                </div>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex d-flex xs12 sm12 md6>
              <v-card
                color="#282934"
                dark
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div>
                  <div class="d-flex justify-center align-center">
                    <h3 class="d-flex align-center mt-2 mb-2">
                      <v-img
                        class="ml-2"
                        src="@/assets/heartbeat.svg"
                        height="50"
                        width="50"
                        contain
                      ></v-img>
                      <div class="d-flex ml-5 text-start flex-column">
                        <span>Heart Rate</span>
                        <span class="warning--text" style="font-size: 16px"
                          >mmHg</span
                        >
                      </div>
                    </h3>
                    <v-spacer></v-spacer>
                    <v-btn class="mr-3 export__btn" color="warning" outlined
                      >Export</v-btn
                    >
                  </div>
                </div>
                <div class="grid-container">
                  <TestChart
                    :height="286"
                    :width="623"
                    :data-of-chart="[72, 115, 95, 130, 60, 116, 88]"
                    :label="['12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm']"
                    :chart-bg-color="'cyan'"
                  />
                </div>
              </v-card>
            </v-flex>

            <v-flex d-flex xs12 sm12 md6>
              <v-card
                color="#282934"
                dark
                class="ml-2 mr-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div>
                  <div class="d-flex justify-center align-center">
                    <h3 class="d-flex align-center mt-2 mb-2">
                      <span>
                        <div style="" class="mr-3 ml-2">
                          <!-- <v-icon dark size="40"> mdi-power-sleep </v-icon> -->
                          <v-img
                            class="ml-2"
                            src="@/assets/steps.svg"
                            height="50"
                            width="50"
                            contain
                          ></v-img>
                        </div>
                      </span>
                      <div class="d-flex ml-5 text-start flex-column">
                        <span>Steps</span>
                        <span class="warning--text" style="font-size: 16px"
                          >Hrs/Day</span
                        >
                      </div>
                    </h3>
                    <v-spacer></v-spacer>
                    <div
                      class="rounded-circle sleep__div"
                      style="background-color: grey"
                    >
                      <span class="mr-3">W</span>
                      <span class="mr-3">M</span>
                      <span class="mr-3">6M</span>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn class="mr-3 export__btn" color="warning" outlined
                      >Export</v-btn
                    >
                  </div>
                </div>
                <div class="grid-container">
                  <ApexAreaChart
                    :height="366"
                    :width="770"
                    :data-of-chart="[72, 115, 95, 130, 60, 116, 88]"
                    :chart-label="[
                      '12pm',
                      '1pm',
                      '2pm',
                      '3pm',
                      '4pm',
                      '5pm',
                      '6pm',
                    ]"
                    :chart-border-color="'cyan'"
                    :chart-bg-color="['cyan']"
                  />
                </div>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import mqtt from "mqtt/dist/mqtt";
// import LineChart from "../../components/LineChart.vue";
import RealTimeChart from "@/components/RealTimeChart.vue";
import PageHeader from "@/layouts/PageHeader.vue";
import TestChart from "@/components/TestChart.vue";
import ApexAreaChart from "@/components/ApexAreaChart.vue";
import ApexLineChart from "@/components/ApexLineChart.vue";
export default {
  name: "PatientDetails",
  components: {
    // LineChart,
    RealTimeChart,
    PageHeader,
    TestChart,
    ApexAreaChart,
    ApexLineChart,
  },
  data() {
    return {
      getDoctorId: localStorage.getItem("user_id"),
      aggregateValues: ["average", "minimum", "maximum"],
      selectedAggregate: null,
      timePeriodValues: ["1hour", "1day", "7days", "30days"],
      selectedTimePeriod: null,
      ecgChartData: [],
      ppgChartData: [],
      startDateMenu: false,
      endDateMenu: false,
      startDateValue: null,
      endDateValue: null,
      tempStartTime: null,
      startTime: null,
      showEcgChart: true,
      showPpgChart: true,
      connection: {
        protocol: "mqtt",
        host: "194.233.69.96",
        port: 15675,
        endpoint: "ws",
        clean: true,
        connectTimeout: 30 * 1000,
        reconnectTimeout: 4000,
        keepAlive: 120,
        clientId: "lens_3DtlcZfxvR0idKzXQ90Vzm69vAM",
        username: "MYsmO5Oc7O6DKkS8",
        password: "ufUPnVWbLoMwwFaL",
        // options: {
        //   // clean: true,
        //   connectTimeout: 4000,
        //   // reconnectPeriod: 2000,
        //   // keepAlive: 120,
        //   clientId: "lens_3DtlcZfxvR0idKzXQ90Vzm69vAM",
        //   username: "MYsmO5Oc7O6DKkS8",
        //   password: "ufUPnVWbLoMwwFaL",
        // },
        // clean: true, // Reserved session
        // connectTimeout: 4000, // Time out
        // reconnectPeriod: 4000, // Reconnection interval
      },
      subscription: {
        topic: "BMSFSEV/C9F7BF309DC9/sTOf",
        qos: 0,
      },
      publish: {
        topic: "BMSFSEV//sTOf",
        qos: 0,
        payload: '{ "msg": "Hello, I am browser." }',
      },
      qosList: [0, 1, 2],
      client: {
        connected: false,
      },
      subscribeSuccess: false,
      connecting: false,
      retryTimes: 0,
      liveMessage: "Offline",
    };
  },
  computed: {
    ...mapGetters("doctors", [
      "loadingStatus",
      "getSingleDeviceData",
      "getMacAddress",
    ]),
    ...mapGetters("patientData", ["getAlgoData"]),
  },
  destroyed() {
    if (this.client.connected) {
      try {
        this.client.end(false, () => {
          this.initData();
          console.log("Successfully disconnected!");
        });
      } catch (error) {
        console.log("Disconnect failed", error.toString());
      }
    }
  },
  created() {
    this.getSingleDevice(this.$route?.params?.id);
    this.createConnection();
  },
  mounted() {
    setTimeout(() => {
      this.displayAlgoData();
    }, 1000);
  },
  updated() {
    if (
      this.selectedAggregate &&
      this.selectedTimePeriod &&
      this.startDateValue &&
      this.endDateValue
    ) {
      this.getBodyTempGraph();
      this.getBloodO2Grpah();
      this.getStepsGraph();
    }
  },
  methods: {
    ...mapActions("doctors", ["getSingleDevice"]),
    ...mapActions("chartData", [
      "setEcgData",
      "setPpgData",
      "setSchedulerData",
    ]),
    ...mapActions("patientData", [
      "getPatientAlgoData",
      "getPatientBodyTempData",
      "getPatientBloodOxygenData",
      "getPatientStepsData",
    ]),
    focusStartDate() {
      setTimeout(() => {
        if (!this.startDateMenu) {
          this.startDateMenu = true;
        }
      }, 200);
    },
    focusEndDate() {
      setTimeout(() => {
        if (!this.endDateMenu) {
          this.endDateMenu = true;
        }
      }, 200);
    },
    initData() {
      this.client = {
        connected: false,
      };
      this.retryTimes = 0;
      this.connecting = false;
      this.subscribeSuccess = false;
    },
    getFullName(s1, s2) {
      return (
        s1?.charAt(0).toUpperCase() +
        s1?.slice(1) +
        " " +
        s2?.charAt(0).toUpperCase() +
        s2?.slice(1)
      );
    },
    displayAlgoData() {
      const payload = {
        mac_address_framed: this.getMacAddress.toString().toUpperCase(),
        startDate: Date.parse(this.startDateValue),
        endDate: Date.parse(this.endDateValue),
      };
      this.getPatientAlgoData(payload);
    },
    getBodyTempGraph() {
      const payload = {
        speedometerId: this.getMacAddress.toString().toUpperCase(),
        agrFunction: this.selectedAggregate,
        timePeriod: this.selectedTimePeriod,
        startDate: Date.parse(this.startDateValue),
        endDate: Date.parse(this.endDateValue),
      };
      this.getPatientBodyTempData(payload);
    },
    getBloodO2Grpah() {
      const payload = {
        speedometerId: this.getMacAddress.toString().toUpperCase(),
        agrFunction: this.selectedAggregate,
        timePeriod: this.selectedTimePeriod,
        startDate: Date.parse(this.startDateValue),
        endDate: Date.parse(this.endDateValue),
      };
      this.getPatientBloodOxygenData(payload);
    },
    getStepsGraph() {
      const payload = {
        speedometerId: this.getMacAddress.toString().toUpperCase(),
        agrFunction: this.selectedAggregate,
        timePeriod: this.selectedTimePeriod,
        startDate: Date.parse(this.startDateValue),
        endDate: Date.parse(this.endDateValue),
      };
      this.getPatientStepsData(payload);
    },
    handleOnReConnect() {
      this.retryTimes += 1;
      if (this.retryTimes > 5) {
        try {
          this.client.end();
          this.initData();
          console.log("Connection maxReconnectTimes limit, stop retry");
        } catch (error) {
          console.log("error---", error.toString());
        }
      }
    },
    createConnection() {
      try {
        this.connecting = true;
        const { protocol, host, port, endpoint, ...options } = this.connection;
        const connectUrl = `${protocol}://${host}:${port}/${endpoint}`;
        this.client = mqtt.connect(connectUrl, options);
        if (this.client.on) {
          this.client.on("connect", () => {
            this.connecting = false;
            console.log("Connection succeeded!");
            this.subscribeSuccess = true;
            this.client.subscribe(
              `BMSFSEV/${this.getSingleDeviceData[0]?.macAddressFramed.toUpperCase()}/sTOf`
            );
          });
          this.client.on("reconnect", this.handleOnReConnect);
          this.client.on("error", (error) => {
            console.log("Connection failed", error);
          });
          this.client.on("message", (_, message) => {
            let data = JSON.parse(message);
            console.log("data--", JSON.parse(message));
            this.liveMessage = data?.message;
            // if (this.liveMessage == "Online") {
            this.tempStartTime = data?.start_time;
            this.startTime = new Date(this.tempStartTime).toLocaleString(
              undefined,
              { timeZone: "Asia/Kolkata" }
            );
            console.log("time---", this.startTime);
            this.ecgChartData = data?.ecg_vals;
            this.ppgChartData = data?.ppg_vals;
            this.setEcgData(this.ecgChartData);
            this.setPpgData(this.ppgChartData);
            this.showEcgChart = false;
            this.showPpgChart = false;
            this.$nextTick(() => {
              this.showEcgChart = true;
              this.showPpgChart = true;
            });
            // }
          });
        }
      } catch (error) {
        this.connecting = false;
        console.log("mqtt.connect error", error);
      }
    },
    createConnection2() {
      const { host, port, options } = this.connection;
      const connectUrl = `mqtt://${host}:${port}/ws`;
      try {
        this.client = mqtt.connect(connectUrl, options);
        console.log("client---", this.client);
      } catch (error) {
        console.log("mqtt.connect error", error);
      }
      this.client.on("connect", () => {
        console.log("Connection succeeded!");
        this.client.subscribe(
          `BMSFSEV/${this.getSingleDeviceData[0]?.macAddressFramed.toUpperCase()}/sTOf`
        );
      });
      this.client.on("error", (error) => {
        console.log("Connection failed", error);
      });
      this.client.on("message", (_, message) => {
        let data = JSON.parse(message);
        console.log("data--", JSON.parse(message));
        this.liveMessage = data?.message;
        // if (this.liveMessage == "Online") {
        this.tempStartTime = data?.start_time;
        this.startTime = new Date(this.tempStartTime).toLocaleString(
          undefined,
          { timeZone: "Asia/Kolkata" }
        );
        console.log("time---", this.startTime);
        this.ecgChartData = data?.ecg_vals;
        this.ppgChartData = data?.ppg_vals;
        this.setEcgData(this.ecgChartData);
        this.setPpgData(this.ppgChartData);
        this.showEcgChart = false;
        this.showPpgChart = false;
        this.$nextTick(() => {
          this.showEcgChart = true;
          this.showPpgChart = true;
        });
        // }
      });
    },
  },
};
</script>

<style scoped>
.sleep__div {
  display: flex;
  height: 40px;
  align-items: center;
  padding: 10px;
}
.grid-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: start;
  max-width: 100%;
}
.export__btn:hover {
  background-color: orange;
  color: white !important;
}

h1 {
  font-size: 40px;
}

.v-card {
  border-radius: 10px;
}
small {
  font-size: 16px;
}
h3 {
  font-size: 22px;
}
@media only screen and (max-width: 780px) {
  small {
    font-size: 14px;
  }
  h3 {
    font-size: 20px;
  }
}
</style>
