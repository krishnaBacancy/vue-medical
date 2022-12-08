<template>
  <div style="background-color: #282934">
    <PageHeader
      title="Patient Details"
      pageIcon="mdi-account-box"
      btnName="Back"
      color-name="warning"
      btnIconName="mdi-arrow-left"
      @addNewPatient="$router.go(-1)"
    />
    <br />
    <div class="white--text" style="background-color: rgba(0, 0, 0, 0.5)">
      <v-progress-circular
        indeterminate
        color="amber"
        v-if="loadingStatus"
      ></v-progress-circular>
      <div v-else>
        <div class="d-flex align-center justify-md-space-around">
          <v-img
            class="rounded-circle ml-4"
            src="https://picsum.photos/id/11/50/50"
            max-width="50"
            max-height="50"
          />
          <h3 class="mr-2 ml-4">
            {{
              getFullName(
                getSingleDeviceData[0]?.customerFirstName,
                getSingleDeviceData[0]?.customerLastName
              )
            }}
          </h3>
          <v-spacer></v-spacer>
          <div class="d-flex align-center justify-md-space-between">
            <v-img src="@/assets/floor1.svg" height="30" contain></v-img>
            <h3 class="ml-3">Floor - 1</h3>
            <v-img
              src="@/assets/room.svg"
              class="ml-5"
              height="30"
              contain
            ></v-img>
            <h3 class="ml-3">Room - 1</h3>
            <v-img
              src="@/assets/mac.svg"
              class="ml-5"
              height="30"
              contain
            ></v-img>
            <h3 class="ml-3">
              {{ getSingleDeviceData[0]?.macAddressFramed.toUpperCase() }}
            </h3>
            <v-icon color="warning" class="ml-5">mdi-battery</v-icon>
            <h3 class="ml-3">114Hrs 45Min</h3>
          </div>
          <v-spacer></v-spacer>
          <div class="d-flex align-center justify-center mr-7">
            <h3 class="mr-5">Device Status</h3>
            <v-img
              class="mt-1"
              src="@/assets/live.png"
              height="50"
              width="50"
              contain
              v-if="liveMessage === 'Online'"
            ></v-img>
            <v-img
              class="mt-1"
              src="@/assets/Oracle-Scheduler.jpg"
              height="50"
              width="50"
              contain
              v-if="liveMessage === 'Offline'"
            ></v-img>
          </div>
        </div>

        <div class="d-flex mt-6">
          <div class="ml-6">
            <v-select
              :items="aggregateValues"
              filled
              dark
              dense
              label="Aggregate"
              style="height: 60px"
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
          <div></div>
        </div>

        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex d-flex xs12 sm6 md6>
              <v-card dark class="ml-2 mb-2 pa-2" style="width: 100%">
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
                    <LineChart :key="showEcgChart" :width="600" :height="250" />
                  </div>
                </div>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm6 md6>
              <v-card dark class="ml-2 mb-2 pa-2" style="width: 100%">
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
                      :width="600"
                      :height="250"
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
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>Heart Rate</h3>
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
                          getSchedulerData?.hr
                            ? getSchedulerData.hr
                            : "Loading..."
                        }}
                      </h1>
                      <div class="d-flex flex-column">
                        <small>Manual Entry</small>
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
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>Heart Rate Variability</h3>
                    <small class="warning--text">No Device Paired</small>
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
                          getSchedulerData?.hrv
                            ? Math.round(getSchedulerData.hrv)
                            : "Loading..."
                        }}
                      </h1>
                      <div class="d-flex flex-column">
                        <small>Manual Entry</small>
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
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>Oxygen Saturation</h3>
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
                        <small>%SPO2</small>
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
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>Pulse Pressure Variability</h3>
                    <small class="warning--text">No Device Paired</small>
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
                          getSchedulerData?.prv
                            ? Math.round(getSchedulerData.prv)
                            : "Loading..."
                        }}
                      </h1>
                      <div class="d-flex flex-column">
                        <small>Manual Entry</small>
                        <small>%SPO2</small>
                      </div>
                    </div>
                  </v-flex>
                </div>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex d-flex xs12 sm6 md4>
              <v-card
                color="#282934"
                dark
                class="ml-2 mb-2 pa-2"
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
                        {{
                          getSchedulerData?.steps
                            ? getSchedulerData?.steps
                            : "0"
                        }}
                      </h1>
                      <small>Steps</small>
                    </div>
                  </v-flex>
                </div>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm6 md4>
              <v-card
                color="#282934"
                dark
                class="ml-2 mb-2 pa-2"
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
                          getSchedulerData?.bp
                            ? Math.round(getSchedulerData?.bp)
                            : "Loading..."
                        }}
                      </h1>
                      <div class="d-flex flex-column">
                        <small>Manual Entry</small>
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
                class="ml-2 mb-2 pa-2"
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
                          getSchedulerData?.map
                            ? Math.round(
                                (getSchedulerData?.map + Number.EPSILON) * 100
                              ) / 100
                            : "Loading..."
                        }}
                      </h1>
                      <div class="d-flex flex-column">
                        <small>Manual Entry</small>
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
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>RR Interval</h3>
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
                          getSchedulerData?.rr
                            ? Math.round(
                                (getSchedulerData?.rr + Number.EPSILON) * 100
                              ) / 100
                            : "Loading..."
                        }}
                      </h1>
                      <div class="d-flex flex-column">
                        <small>Streaming Mode</small>
                        <small>%SPO2</small>
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
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>Pulse Pressure</h3>
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
                          getSchedulerData?.pp
                            ? Math.round(
                                (getSchedulerData?.pp + Number.EPSILON) * 100
                              ) / 100
                            : "Loading..."
                        }}
                      </h1>
                      <div class="d-flex flex-column">
                        <small>{{
                          getSchedulerData?.prv
                            ? Math.round(
                                (getSchedulerData?.prv + Number.EPSILON) * 100
                              ) / 100
                            : "Loading..."
                        }}</small>
                        <small>%SPO2</small>
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
                class="ml-2 mb-2 pa-2"
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
                          getSchedulerData?.arrhythmia
                            ? getSchedulerData.arrhythmia
                            : "Loading..."
                        }}
                      </h1>
                      <div class="d-flex flex-column">
                        <small>Streaming Mode</small>
                        <small>%SPO2</small>
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
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>Stroke Volume</h3>
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
                          getSchedulerData?.sv
                            ? Math.round(
                                (getSchedulerData?.sv + Number.EPSILON) * 100
                              ) / 100
                            : "Loading..."
                        }}
                      </h1>
                      <div class="d-flex flex-column">
                        <small>Streaming Mode</small>
                        <small>%SPO2</small>
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
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>Cardiac Output</h3>
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
                          getSchedulerData?.co
                            ? Math.round(
                                (getSchedulerData?.co + Number.EPSILON) * 100
                              ) / 100
                            : "Loading..."
                        }}
                      </h1>
                      <div class="d-flex flex-column">
                        <small>Streaming Mode</small>
                        <small>%SPO2</small>
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
                class="ml-2 mb-2 pa-2"
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
                          getSchedulerData?.ptt
                            ? Math.round(
                                (getSchedulerData?.ptt + Number.EPSILON) * 100
                              ) / 100
                            : "Loading..."
                        }}
                      </h1>
                      <div class="d-flex flex-column">
                        <small>Streaming Mode</small>
                        <small>%SPO2</small>
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
                        <span class="warning--text">00:0B:57:AC:66:DA</span>
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
                    :height="200"
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
                class="ml-2 mb-2 pa-2"
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
                        <span class="warning--text">mmHg</span>
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
                    :height="350"
                    :style="{
                      width: $vuetify.breakpoint.smAndDown ? '300px' : '600px',
                    }"
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
                        <span class="warning--text">mmHg</span>
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
                    :height="200"
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
                class="ml-2 mb-2 pa-2"
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
                        <span class="warning--text">Hrs/Day</span>
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
                    :height="350"
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
import LineChart from "../../components/LineChart.vue";
import RealTimeChart from "@/components/RealTimeChart.vue";
import PageHeader from "@/layouts/PageHeader.vue";
import TestChart from "@/components/TestChart.vue";
import ApexAreaChart from "@/components/ApexAreaChart.vue";
export default {
  name: "PatientDetails",
  components: {
    LineChart,
    RealTimeChart,
    PageHeader,
    TestChart,
    ApexAreaChart,
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
    ...mapGetters("chartData", ["getSchedulerData"]),
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
  },
  mounted() {
    this.createConnection();
    setTimeout(() => {
      this.getAlgoData();
    }, 1000);
  },
  updated() {
    if (this.selectedAggregate && this.selectedTimePeriod) {
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
    getAlgoData() {
      const payload = {
        speedometerId: this.getMacAddress.toString().toUpperCase(),
        startDate: 1667301683000,
        endDate: 1669288883000,
      };
      this.getPatientAlgoData(payload);
    },
    getBodyTempGraph() {
      const payload = {
        speedometerId: this.getMacAddress.toString().toUpperCase(),
        agrFunction: this.selectedAggregate,
        timePeriod: this.selectedTimePeriod,
        startDate: 1667301683000,
        endDate: 1669288883000,
      };
      this.getPatientBodyTempData(payload);
    },
    getBloodO2Grpah() {
      const payload = {
        speedometerId: this.getMacAddress.toString().toUpperCase(),
        agrFunction: this.selectedAggregate,
        timePeriod: this.selectedTimePeriod,
        startDate: 1667301683000,
        endDate: 1669288883000,
      };
      this.getPatientBloodOxygenData(payload);
    },
    getStepsGraph() {
      const payload = {
        speedometerId: this.getMacAddress.toString().toUpperCase(),
        agrFunction: this.selectedAggregate,
        timePeriod: this.selectedTimePeriod,
        startDate: 1667301683000,
        endDate: 1669288883000,
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
            this.setSchedulerData(data);
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
  font-size: 2rem;
}
</style>
