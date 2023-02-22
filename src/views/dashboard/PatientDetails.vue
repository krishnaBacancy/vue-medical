<template>
  <div>
    <PageHeader
      title="Patient Details"
      pageIcon="mdi-arrow-left"
      @goBack="$router.go(-1)"
    />
    <br />
    <div class="patient-details-wrapper">
      <v-progress-circular
        indeterminate
        color="amber"
        v-if="loadingStatus"
      ></v-progress-circular>
      <div v-else class="patient-header">
        <div class="d-flex align-center text-nowrap flex-wrap">
          <div class="user-pic-header mr-auto">
            <img
              class="rounded-circle user-image"
              src="https://picsum.photos/id/11/50/50"
              max-width="80"
              max-height="80"
            />
            <h3
              class="ml-5 text-capitalize"
              :style="{
                fontSize: $vuetify.breakpoint.smAndDown ? '20px' : '26px',
              }"
            >
              {{ getSingleDeviceData[0]?.customerFullName }}
            </h3>
            <button class="btn-orange mr-4" @click="$router.push('/settings')">
              <v-icon>mdi-cog</v-icon>
            </button>
          </div>
          <div class="d-flex flex-wrap mr-auto">
            <div class="item">
              <img src="@/assets/floor.svg" height="20" width="20" contain />
              <h3
                class="ml-3 font-weight-regular"
                :style="{
                  fontSize: $vuetify.breakpoint.smAndDown ? '16px' : '20px',
                }"
              >
                Floor - 1
              </h3>
            </div>
            <div class="item">
              <img src="@/assets/rooms.svg" height="20" width="20" contain />
              <h3
                class="ml-3 font-weight-regular"
                :style="{
                  fontSize: $vuetify.breakpoint.smAndDown ? '16px' : '20px',
                }"
              >
                Room - 1
              </h3>
            </div>
            <div class="item">
              <img
                src="@/assets/macAddress.svg"
                height="20"
                width="20"
                contain
              />
              <h3
                class="ml-3 font-weight-regular"
                :style="{
                  fontSize: $vuetify.breakpoint.smAndDown ? '16px' : '20px',
                }"
              >
                {{ getSingleDeviceData[0]?.macAddressFramed.toUpperCase() }}
              </h3>
            </div>
            <div class="item">
              <img src="@/assets/battery.svg" height="20" width="20" contain />
              <h3
                class="ml-3 font-weight-regular"
                :style="{
                  fontSize: $vuetify.breakpoint.smAndDown ? '16px' : '20px',
                }"
              >
                {{
                  getSingleDeviceData[0]?.batdata
                    ? getSingleDeviceData[0]?.batdata.bat_vals
                    : "100"
                }}
                %
              </h3>
            </div>
          </div>
          <div class="d-flex align-center device-status-row">
            <h3
              class="mr-5 font-weight-medium green--text"
              style="font-size: 20px"
            >
              Device Status
            </h3>
            <!-- <v-switch
              v-model="pushNotification"
              color="success"
              value="true"
              inset
            ></v-switch> -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-img
                  v-on="on"
                  v-bind="attrs"
                  class="mt-2"
                  src="@/assets/Live1.png"
                  height="40"
                  width="40"
                  contain
                  v-show="liveMessage == 'Online'"
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
                  height="40"
                  width="40"
                  contain
                  v-show="liveMessage == 'Offline'"
                ></v-img>
              </template>
              <span>Scheduler Mode</span>
            </v-tooltip>
          </div>
        </div>

        <v-layout row wrap>
          <v-flex xs12 sm12 md12 class="mt-5">
            <div class="d-flex align-center w-100">
              <h3>ECG</h3>
              <v-spacer></v-spacer>
              <v-btn
                class="export__btn"
                color="warning"
                outlined
                @click="showExportECGDateModel = true"
                >Export</v-btn
              >
            </div>
            <div class="d-flex align-start chart-css">
              <div
                :id="getSingleDeviceData[0]?.macAddressFramed.toUpperCase()"
                class="grid-container w-100"
              >
                <ecg-chart
                  :ecgDataFromProps="ecgChartData"
                  :macAddress="
                    getSingleDeviceData[0]?.macAddressFramed.toUpperCase()
                  "
                  :key="showEcgChart"
                  v-if="showEcgChart"
                  :width="834.24"
                  :height="299.53"
                />
              </div>
            </div>
          </v-flex>
          <!-- <v-flex xs12 sm12 md12 class="mt-5">
            <div class="d-flex w-100">
              <h3>PPG</h3>
              <v-spacer></v-spacer>
              <v-btn class="export__btn" color="warning" outlined>Export</v-btn>
            </div>
            <div class="d-flex align-start chart-css">
              <div class="grid-container w-100">
                <ppg-chart
                  :width="834.24"
                  :height="299.53"
                  :key="showPpgChart"
                  v-if="showPpgChart"
                  :ppgDataFromProps="ppgChartData"
                />
                <apex-line-chart />
              </div>
            </div>
          </v-flex> -->
        </v-layout>
      </div>
      <v-layout row wrap>
        <v-flex d-flex sm12 lg4>
          <div class="mini-light-box">
            <div class="min-light-header">
              <div class="left">
                <h3>Heart Rate</h3>
              </div>
              <div class="right">
                <div>
                  <h3 class="font-weight-medium">Last Reading</h3>
                  <small class="grey--text">{{ lastSaved }}</small>
                </div>
              </div>
            </div>
            <div class="d-flex justify-center align-center mt-5">
              <v-flex>
                <v-img
                  src="@/assets/heartbeat.svg"
                  height="70"
                  width="70"
                  contain
                ></v-img>
              </v-flex>
              <v-flex xs12>
                <div class="text-medium">
                  <h1 class="text-success">
                    {{ algoData?.hr ? algoData.hr : "--" }}
                  </h1>
                  <small>BPM</small>
                </div>
              </v-flex>
            </div>
          </div>
        </v-flex>

        <v-flex d-flex sm12 lg4>
          <div class="mini-light-box">
            <div class="min-light-header">
              <div class="left">
                <h3>Oxygen</h3>
              </div>
              <div class="right">
                <div>
                  <h3 class="font-weight-medium">Last Reading</h3>
                  <small class="grey--text">{{ lastSaved }}</small>
                </div>
              </div>
            </div>
            <div class="d-flex justify-center align-center mt-5">
              <v-flex>
                <v-img
                  src="@/assets/oxygen.svg"
                  height="70"
                  width="70"
                  contain
                ></v-img>
              </v-flex>
              <v-flex xs12>
                <div class="text-medium">
                  <h1 class="warning--text">
                    {{ algoData?.spo2 ? Math.round(algoData.spo2) : "--" }}
                  </h1>
                  <small>%</small>
                </div>
              </v-flex>
            </div>
          </div>
        </v-flex>

        <v-flex d-flex sm12 lg4>
          <div class="mini-light-box">
            <div class="min-light-header">
              <div class="left">
                <h3>Temperature</h3>
              </div>
              <div class="right">
                <div>
                  <h3 class="font-weight-medium">Last Reading</h3>
                  <small class="grey--text">{{ lastSaved }}</small>
                </div>
              </div>
            </div>
            <div class="d-flex justify-center align-center mt-5">
              <v-flex>
                <v-img
                  src="@/assets/temprature.svg"
                  height="70"
                  width="70"
                  contain
                ></v-img>
              </v-flex>
              <v-flex xs12>
                <div class="text-medium">
                  <h1 class="text-danger">
                    {{ algoData?.temp ? algoData.temp : "--" }}
                  </h1>
                  <small>°C</small>
                </div>
              </v-flex>
            </div>
          </div>
        </v-flex>

        <div class="w-100"></div>
        <v-flex d-flex sm12 lg4>
          <div class="mini-light-box">
            <div class="min-light-header">
              <div class="left">
                <h3>Heart Rate Variability</h3>
              </div>
              <div class="right">
                <div>
                  <h3 class="font-weight-medium">Last Reading</h3>
                  <small class="grey--text">{{ lastSaved }}</small>
                </div>
              </div>
            </div>
            <div class="d-flex justify-center align-center mt-5">
              <v-flex>
                <v-img
                  src="@/assets/heartbeat.svg"
                  height="70"
                  width="70"
                  contain
                ></v-img>
              </v-flex>
              <v-flex xs12>
                <div class="text-medium">
                  <h1 class="text-danger text-success">
                    {{ algoData?.hrv ? Math.round(algoData.hrv) : "--" }}
                  </h1>
                  <small>ms</small>
                </div>
              </v-flex>
            </div>
          </div>
        </v-flex>

        <v-flex d-flex sm12 lg4>
          <div class="mini-light-box">
            <div class="min-light-header">
              <div class="left">
                <h3>Mean Arterial Pressure</h3>
              </div>
              <div class="right">
                <div>
                  <h3 class="font-weight-medium">Last Reading</h3>
                  <small class="grey--text">{{ lastSaved }}</small>
                </div>
              </div>
            </div>
            <div class="d-flex justify-center align-center mt-5">
              <v-flex>
                <v-img
                  src="@/assets/Group 509.svg"
                  height="70"
                  width="70"
                  contain
                ></v-img>
              </v-flex>
              <v-flex xs12>
                <div class="text-medium">
                  <h1 class="text-danger text-danger">
                    {{ algoData?.map ? Math.round(algoData?.map) : "--" }}
                  </h1>
                  <small>mmHg</small>
                </div>
              </v-flex>
            </div>
          </div>
        </v-flex>

        <v-flex d-flex sm12 lg4>
          <div class="mini-light-box">
            <div class="min-light-header">
              <div class="left">
                <h3>Pulse Rate Variability</h3>
              </div>
              <div class="right">
                <div>
                  <h3 class="font-weight-medium">Last Reading</h3>
                  <small class="grey--text">{{ lastSaved }}</small>
                </div>
              </div>
            </div>
            <div class="d-flex justify-center align-center mt-5">
              <v-flex>
                <v-img
                  src="@/assets/Group 507.svg"
                  height="70"
                  width="70"
                  contain
                ></v-img>
              </v-flex>
              <v-flex xs12>
                <div class="text-medium">
                  <h1 class="text-danger text-success">
                    {{ algoData?.prv ? Math.round(algoData.prv) : "--" }}
                  </h1>
                  <small>ms</small>
                </div>
              </v-flex>
            </div>
          </div>
        </v-flex>
        <div class="w-100"></div>

        <v-flex d-flex sm12 lg3>
          <div class="mini-light-box">
            <div class="min-light-header">
              <div class="left">
                <h3>Blood Pressure</h3>
              </div>
              <div class="right">
                <div>
                  <h3 class="font-weight-medium">Last Reading</h3>
                  <small class="grey--text">{{ lastSaved }}</small>
                </div>
              </div>
            </div>
            <div class="d-flex justify-center align-center mt-5">
              <v-flex>
                <v-img
                  src="@/assets/bloodPressure.svg"
                  height="70"
                  width="70"
                  contain
                ></v-img>
              </v-flex>
              <v-flex xs12>
                <div class="text-medium">
                  <h1 class="text-danger cyan--text">
                    {{ algoData?.bp ? Math.round(algoData?.bp) : "--" }}
                    /
                    {{ algoData?.dbp ? Math.round(algoData?.dbp) : "--" }}
                  </h1>
                  <small>mmHg</small>
                </div>
              </v-flex>
            </div>
          </div>
        </v-flex>

        <v-flex d-flex sm12 lg3>
          <div class="mini-light-box">
            <div class="min-light-header">
              <div class="left">
                <h3>Movement</h3>
              </div>
              <div class="right">
                <div>
                  <h3 class="font-weight-medium">Last Reading</h3>
                  <small class="grey--text">{{ lastSaved }}</small>
                </div>
              </div>
            </div>
            <div class="d-flex justify-center align-center mt-5">
              <v-flex>
                <v-img
                  src="@/assets/steps.svg"
                  height="70"
                  width="70"
                  contain
                ></v-img>
              </v-flex>
              <v-flex xs12>
                <div class="text-medium">
                  <h1 class="text-pink">
                    {{ algoData?.steps ? algoData?.steps : "--" }}
                  </h1>
                  <small>steps</small>
                </div>
              </v-flex>
            </div>
          </div>
        </v-flex>

        <v-flex d-flex sm12 lg3>
          <div class="mini-light-box">
            <div class="min-light-header">
              <div class="left">
                <h3>RR Interval</h3>
              </div>
              <div class="right">
                <div>
                  <h3 class="font-weight-medium">Last Reading</h3>
                  <small class="grey--text">{{ lastSaved }}</small>
                </div>
              </div>
            </div>
            <div class="d-flex justify-center align-center mt-5">
              <v-flex>
                <v-img
                  src="@/assets/Group 508.svg"
                  height="70"
                  width="70"
                  contain
                ></v-img>
              </v-flex>
              <v-flex xs12>
                <div class="text-medium">
                  <h1 class="warning--text">
                    {{
                      algoData?.rr ? Math.round(algoData?.rr * 100) / 100 : "--"
                    }}
                  </h1>
                  <small>seconds</small>
                </div>
              </v-flex>
            </div>
          </div>
        </v-flex>

        <v-flex d-flex sm12 lg3>
          <div class="mini-light-box">
            <div class="min-light-header">
              <div class="left">
                <h3>Pulse Pressure</h3>
              </div>
              <div class="right">
                <div>
                  <h3 class="font-weight-medium">Last Reading</h3>
                  <small class="grey--text">{{ lastSaved }}</small>
                </div>
              </div>
            </div>
            <div class="d-flex justify-center align-center mt-5">
              <v-flex>
                <v-img
                  src="@/assets/Group 507.svg"
                  height="70"
                  width="70"
                  contain
                ></v-img>
              </v-flex>
              <v-flex xs12>
                <div class="text-medium">
                  <h1 class="text-success">
                    {{
                      algoData?.pp ? Math.round(algoData?.pp * 100) / 100 : "--"
                    }}
                  </h1>
                  <small>mmHg</small>
                </div>
              </v-flex>
            </div>
          </div>
        </v-flex>

        <div class="w-100"></div>
        <v-flex d-flex sm12 lg3>
          <div class="mini-light-box">
            <div class="min-light-header">
              <div class="left">
                <h3>Arrthymia</h3>
              </div>
              <div class="right">
                <div>
                  <h3 class="font-weight-medium">Last Reading</h3>
                  <small class="grey--text">{{ lastSaved }}</small>
                </div>
              </div>
            </div>
            <div class="d-flex justify-center align-center mt-5">
              <v-flex>
                <v-img
                  src="@/assets/Group 506.svg"
                  height="70"
                  width="70"
                  contain
                ></v-img>
              </v-flex>
              <v-flex xs12>
                <div class="text-medium">
                  <h1 class="text-warning">
                    {{ algoData?.arrhythmia ? algoData.arrhythmia : "--" }}
                  </h1>
                </div>
              </v-flex>
            </div>
          </div>
        </v-flex>
        <v-flex d-flex sm12 lg3>
          <div class="mini-light-box">
            <div class="min-light-header">
              <div class="left">
                <h3>Stroke Volume</h3>
              </div>
              <div class="right">
                <div>
                  <h3 class="font-weight-medium">Last Reading</h3>
                  <small class="grey--text">{{ lastSaved }}</small>
                </div>
              </div>
            </div>
            <div class="d-flex justify-center align-center mt-5">
              <v-flex>
                <v-img
                  src="@/assets/Group 505.svg"
                  height="70"
                  width="70"
                  contain
                ></v-img>
              </v-flex>
              <v-flex xs12>
                <div class="text-medium">
                  <h1 class="text-info">
                    {{
                      algoData?.sv ? Math.round(algoData?.sv * 100) / 100 : "--"
                    }}
                  </h1>
                  <small>ml</small>
                </div>
              </v-flex>
            </div>
          </div>
        </v-flex>
        <v-flex d-flex sm12 lg3>
          <div class="mini-light-box">
            <div class="min-light-header">
              <div class="left">
                <h3 cl>Cardiac Output</h3>
              </div>
              <div class="right">
                <div>
                  <h3 class="font-weight-medium">Last Reading</h3>
                  <small class="grey--text">{{ lastSaved }}</small>
                </div>
              </div>
            </div>
            <div class="d-flex justify-center align-center mt-5">
              <v-flex>
                <v-img
                  src="@/assets/Group 504.svg"
                  height="70"
                  width="70"
                  contain
                ></v-img>
              </v-flex>
              <v-flex xs12>
                <div class="text-medium">
                  <h1 class="text-danger">
                    {{
                      algoData?.co ? Math.round(algoData?.co * 100) / 100 : "--"
                    }}
                  </h1>
                  <small>L/min</small>
                </div>
              </v-flex>
            </div>
          </div>
        </v-flex>
        <v-flex d-flex sm12 lg3>
          <div class="mini-light-box">
            <div class="min-light-header">
              <div class="left">
                <h3 cl>Pulse Transit Time</h3>
              </div>
              <div class="right">
                <div>
                  <h3 class="font-weight-medium">Last Reading</h3>
                  <small class="grey--text">{{ lastSaved }}</small>
                </div>
              </div>
            </div>
            <div class="d-flex justify-center align-center mt-5">
              <v-flex>
                <v-img
                  src="@/assets/Group 503.svg"
                  height="70"
                  width="70"
                  contain
                ></v-img>
              </v-flex>
              <v-flex xs12>
                <div class="text-medium">
                  <h1 class="text-danger">
                    {{
                      algoData?.ptt
                        ? Math.round(algoData?.ptt * 100) / 100
                        : "--"
                    }}
                  </h1>
                  <small>ms</small>
                </div>
              </v-flex>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <div class="patient-header">
        <v-row class="d-flex flex-wrap align-center justify-center">
          <v-flex xs12 sm5 lg3 md4>
            <v-select
              :items="timePeriodValues"
              v-model="selectedTimePeriod"
              filled
              label="Time Period"
              dense
            ></v-select>
          </v-flex>
          <v-flex xs12 sm5 lg3 md4>
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
                  label="Select Date"
                  readonly
                  hide-details
                  :value="startDateValue"
                  @focus="focusStartDate"
                  filled
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
          </v-flex>
        </v-row>
      </div>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm12 md6>
          <div class="mini-light-box align-start">
            <div class="w-100 d-flex justify-center align-center">
              <h3 class="d-flex align-center">
                <span>
                  <v-img
                    src="@/assets/temprature.svg"
                    height="50"
                    width="50"
                    contain
                  ></v-img>
                </span>
                <div class="d-flex ml-5 text-start flex-column">
                  <span>Body Temperature</span>
                  <span class="warning--text" style="font-size: 16px">°C</span>
                </div>
              </h3>
              <v-spacer></v-spacer>
              <v-btn
                class="export__btn"
                color="warning"
                outlined
                @click="exportBodyTempData"
                >Export</v-btn
              >
            </div>
            <div class="grid-container w-100">
              <div
                id="barCanvas"
                class="mt-5"
                style="width: 100%; overflow-x: auto"
              >
                <div
                  :id="`temp-${getSingleDeviceData[0]?.macAddressFramed.toUpperCase()}`"
                  class="grid-container"
                >
                  <temprature-graph
                    v-if="getBodyTempGraphData.length"
                    :key="getBodyTempGraphData.length"
                    :temprature-data="getBodyTempGraphData"
                    :macAddress="
                      getSingleDeviceData[0]?.macAddressFramed.toUpperCase()
                    "
                    :height="286"
                    :width="623"
                    :chart-bg-color="'#fd5d5d'"
                  />
                </div>
              </div>
            </div>
          </div>
        </v-flex>

        <v-flex d-flex xs12 sm12 md6>
          <div class="mini-light-box align-start">
            <div class="w-100 d-flex justify-center">
              <h3 class="d-flex align-center">
                <v-img
                  src="@/assets/blood-oxygen.svg"
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
              <v-btn
                class="export__btn"
                color="warning"
                outlined
                @click="exportBloodOxygenData"
                >Export</v-btn
              >
            </div>
            <div id="Oxygenchart" class="grid-container w-100">
              <oxygen-graph
                class="mt-5"
                :height="366"
                :width="770"
                :data-of-chart="getBloodOxygenGraphData"
                :chart-id="'OxygenGraph'"
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
          </div>
        </v-flex>
        <v-flex d-flex xs12 sm12 md6>
          <div class="mini-light-box align-start">
            <div class="w-100 d-flex justify-center align-center">
              <h3 class="d-flex align-center">
                <v-img
                  src="@/assets/heartbeat.svg"
                  height="50"
                  width="50"
                  contain
                ></v-img>
                <div class="d-flex ml-5 text-start flex-column">
                  <span>Heart Rate</span>
                  <span class="warning--text" style="font-size: 16px">BPM</span>
                </div>
              </h3>
              <v-spacer></v-spacer>
              <v-btn
                class="export__btn"
                color="warning"
                outlined
                @click="exportHeartRateData"
                >Export</v-btn
              >
            </div>
            <div class="grid-container w-100">
              <div
                :id="`heartRate-${getSingleDeviceData[0]?.macAddressFramed.toUpperCase()}`"
                style="width: 100%; overflow-x: auto"
                class="mt-5"
              >
                <heart-rate-graph
                  v-if="getHeartRateGraphData.length"
                  :key="getHeartRateGraphData.length"
                  :heartrate-data="getHeartRateGraphData"
                  :macAddress="
                    getSingleDeviceData[0]?.macAddressFramed.toUpperCase()
                  "
                  :height="286"
                  :width="623"
                  :chart-bg-color="'cyan'"
                />
              </div>
            </div>
          </div>
        </v-flex>

        <v-flex d-flex xs12 sm12 md6>
          <div class="mini-light-box align-start">
            <div class="w-100 d-flex justify-center align-center">
              <h3 class="d-flex align-center">
                <span>
                  <v-img
                    src="@/assets/steps.svg"
                    height="50"
                    width="50"
                    contain
                  ></v-img>
                </span>
                <div class="d-flex ml-5 text-start flex-column">
                  <span>Steps</span>
                  <!-- <span class="warning--text" style="font-size: 16px"
                    >Steps/Day</span
                  > -->
                </div>
              </h3>
              <v-spacer></v-spacer>
              <v-btn
                class="export__btn"
                color="warning"
                outlined
                @click="exportStepsData"
                >Export</v-btn
              >
            </div>
            <div id="chart" class="grid-container w-100">
              <steps-chart
                class="mt-5"
                :height="366"
                :width="770"
                :data-of-chart="getPatientSteps"
                :chart-id="'stepsGraph'"
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
          </div>
        </v-flex>
      </v-layout>
    </div>
    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      overlay-color="white"
      persistent
      v-model="showExportECGDateModel"
    >
      <v-card class="pa-sm-10 pa-5">
        <h4 class="text-h6 font-weight-bold mb-5">
          Select date to export ECG data
        </h4>
        <v-row>
          <v-col cols="12" sm="12" md="12" class="mb-3">
            <v-menu
              v-model="showExportECGDatepicker"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
              max-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="Select Date"
                  readonly
                  hide-details
                  :value="exportECGDate"
                  @input="showExportECGDatepicker = true"
                  filled
                  dense
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="en-in"
                v-model="exportECGDate"
                no-title
                @input="showExportECGDatepicker = false"
                :max="new Date().toISOString().slice(0, 10)"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row class="d-flex flex-wrap align-center justify-center">
          <v-btn
            color="warning"
            large
            class="px-10 mr-10"
            outlined
            @click="showExportECGDateModel = false"
            :disabled="isLoading"
          >
            Cancel
          </v-btn>
          <v-btn color="warning" large class="px-10" outlined v-if="isLoading">
            <v-progress-circular
              class="mr-5 ml-5"
              :size="25"
              :width="3"
              indeterminate
              color="orange"
            ></v-progress-circular>
          </v-btn>
          <v-btn
            color="warning"
            large
            class="px-10"
            outlined
            @click="downloadEcgData"
            v-else
          >
            Export
          </v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import mqtt from "mqtt/dist/mqtt";
import PageHeader from "@/layouts/PageHeader.vue";
import EcgChart from "@/components/EcgChart.vue";
// import PpgChart from "@/components/PpgChart.vue";
import HeartRateGraph from "@/components/HeartRateGraph.vue";
import OxygenGraph from "@/components/OxygenGraph.vue";
import TempratureGraph from "@/components/TempratureGraph.vue";
import moment from "moment";
// import ApexLineChart from "@/components/ApexLineChart.vue";
import StepsChart from "@/components/StepsChart.vue";
import _ from "lodash";

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
export default {
  name: "PatientDetails",
  components: {
    PageHeader,
    EcgChart,
    // PpgChart,
    HeartRateGraph,
    OxygenGraph,
    TempratureGraph,
    // ApexLineChart,
    StepsChart,
  },
  data() {
    return {
      pushNotification: true,
      getDoctorId: localStorage.getItem("user_id"),
      selectedAggregate: "average",
      timePeriodValues: ["1hour", "1day", "7days", "30days"],
      timePeriodAddValue: {
        "1hour": 0,
        "1day": 1,
        "7days": 7,
        "30days": 30,
      },
      selectedTimePeriod: "7days",
      ecgChartData: [],
      ppgChartData: [],
      startDateMenu: false,
      startDateValue: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10),
      endDateValue: null,
      tempStartTime: null,
      startTime: null,
      showEcgChart: false,
      showPpgChart: false,
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
        useSSL: true,
        reconnect: true,
      },
      client: {
        connected: false,
      },
      subscribeSuccess: false,
      connecting: false,
      retryTimes: 0,
      liveMessage: "Offline",
      algoData: {},
      showExportECGDateModel: false,
      exportECGDate: new Date(Date.now()).toISOString().slice(0, 10),
      showExportECGDatepicker: false,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("doctors", [
      "loadingStatus",
      "getSingleDeviceData",
      "getMacAddress",
    ]),
    ...mapGetters("patientData", [
      "getBloodOxygenGraphData",
      "getBodyTempGraphData",
      "getPatientSteps",
      "getHeartRateGraphData",
    ]),
    selectAllFilters() {
      return (
        this.selectedAggregate ||
        this.selectedTimePeriod ||
        this.startDateValue ||
        this.endDateValue
      );
    },
    lastSaved() {
      return moment(this.algoData.updatedAt).startOf("minutes").fromNow();
    },
  },
  destroyed() {
    console.log("this.client.connected", this.client);
    this.client.end(false, () => {
      this.initData();
      console.log("Successfully disconnected!");
    });
    // if (this.client) {
    //   try {
    //     this.client.end(false, () => {
    //       this.initData();
    //       console.log("Successfully disconnected!");
    //     });
    //   } catch (error) {
    //     console.log("Disconnect failed", error.toString());
    //   }
    // }
  },
  created() {
    this.getSingleDevice(this.$route?.params?.id);
    this.createConnection();
  },
  watch: {
    // selectAllFilters(newVal, oldVal) {
    //   if (newVal || oldVal) {
    //     this.getBodyTempGraph();
    //     this.getBloodO2Grpah();
    //     this.getStepsGraph();
    //     this.getHeartRateGraph();
    //   }
    // },
    getMacAddress(val) {
      if (
        val &&
        this.startDateValue &&
        this.endDateValue &&
        this.selectedTimePeriod
      ) {
        this.displayAlgoData();
        this.getBodyTempGraph();
        this.getBloodO2Grpah();
        this.getStepsGraph();
        this.getHeartRateGraph();
      }
    },
    startDateValue: {
      immediate: true,
      handler() {
        this.endDateValue = new Date(this.startDateValue)
          .addDays(this.timePeriodAddValue[this.selectedTimePeriod])
          .toISOString()
          .slice(0, 10);
        if (
          this.getMacAddress.length &&
          this.startDateValue &&
          this.endDateValue &&
          this.selectedTimePeriod
        ) {
          this.getBodyTempGraph();
          this.getBloodO2Grpah();
          this.getStepsGraph();
          this.getHeartRateGraph();
        }
      },
    },
    selectedTimePeriod: {
      handler() {
        this.endDateValue = new Date(this.startDateValue)
          .addDays(this.timePeriodAddValue[this.selectedTimePeriod])
          .toISOString()
          .slice(0, 10);
        if (
          this.getMacAddress &&
          this.startDateValue &&
          this.endDateValue &&
          this.selectedTimePeriod
        ) {
          this.getBodyTempGraph();
          this.getBloodO2Grpah();
          this.getStepsGraph();
          this.getHeartRateGraph();
        }
      },
    },
    getSingleDeviceData: {
      immediate: true,
      handler(val) {
        this.liveMessage = val[0]?.isOnline ? "Online" : "Offline";
      },
    },
  },
  methods: {
    ...mapActions("doctors", ["getSingleDevice"]),
    ...mapActions("patientData", [
      "getPatientAlgoData",
      "getPatientBodyTempData",
      "getPatientBloodOxygenData",
      "getPatientStepsData",
      "getPatientHeartRateData",
      "getPatientEcgData",
    ]),
    focusStartDate() {
      setTimeout(() => {
        if (!this.startDateMenu) {
          this.startDateMenu = true;
        }
      }, 200);
    },
    async downloadEcgData() {
      try {
        let endDate = new Date(this.exportECGDate)
          .addDays(1)
          .toISOString()
          .slice(0, 10);
        const payload = {
          mac_address_framed: this.getMacAddress.toString().toUpperCase(),
          startDate: Date.parse(this.exportECGDate),
          endDate: Date.parse(endDate),
        };
        this.isLoading = true;
        const ecgData = await this.getPatientEcgData(payload);
        if (!ecgData.length) {
          this.$toast.error(
            `ECG data for ${this.exportECGDate} not available. Please select another date.`,
            { timeout: 3000 }
          );
          this.isLoading = false;
          return;
        }

        let csv = "\n";
        let ecgDataRow = [];
        ecgData.forEach((data) => {
          let updatedDate = new Date(data.start_time).toLocaleTimeString();
          let row = [updatedDate, ...data.ecg_vals];
          ecgDataRow.push(row);
        });
        let rotatedEcgDataRow = _.zip(...ecgDataRow);
        rotatedEcgDataRow.forEach((row) => {
          csv += `${row}\n`;
        });
        let updatedDate = new Date(ecgData[0].start_time).toLocaleDateString();

        const anchor = document.createElement("a");
        anchor.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
        anchor.target = "_blank";
        anchor.download = `${this.getSingleDeviceData[0]?.customerFullName}-${updatedDate}-Ecg Data.csv`;
        anchor.click();
        this.$toast.success(
          `ECG data for ${this.exportECGDate} exported successfully.`,
          { timeout: 3000 }
        );
        this.showExportECGDateModel = false;
        this.isLoading = false;
      } catch (e) {
        console.log("errooorr", e);
        this.showExportECGDateModel = false;
        this.isLoading = false;
      }
    },
    calculateVals(val, unit) {
      return Math.round(val * 1000) / 1000 + " " + unit;
    },
    downloadPatientData() {
      let newData = [this.algoData];

      let csv =
        "Date,Heart Rate,Hrv,Prv,RR,Blood Pressure,MAP,Pulse Pressure,Arrthymia,SV,CO,Steps,PTT,DBP,Spo2,Temp\n";
      newData.forEach((data) => {
        let updatedDate = new Date(data.updatedAt).toLocaleDateString();
        let row =
          updatedDate +
          "," +
          data.hr +
          " BPM" +
          "," +
          this.calculateVals(data.hrv, "ms") +
          "," +
          this.calculateVals(data.prv, "ms") +
          "," +
          this.calculateVals(data.rr, "sec") +
          "," +
          this.calculateVals(data.bp, "mmHg") +
          "," +
          this.calculateVals(data.map, "mmHg") +
          "," +
          this.calculateVals(data.pp, "mmHg") +
          "," +
          data.arrhythmia +
          "," +
          this.calculateVals(data.sv, "ml") +
          "," +
          this.calculateVals(data.co, "L/min") +
          "," +
          data.steps +
          "," +
          this.calculateVals(data.ptt, "ms") +
          "," +
          this.calculateVals(data.dbp, "mmHg") +
          "," +
          this.calculateVals(data.spo2, "%") +
          "," +
          data.temp +
          " °C" +
          "\n";

        csv += row;
      });

      const anchor = document.createElement("a");
      anchor.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
      anchor.target = "_blank";
      anchor.download = `${this.getSingleDeviceData[0]?.customerFullName}.csv`;
      anchor.click();
    },
    exportBodyTempData() {
      let tempData = this.getBodyTempGraphData;
      if (tempData.length) {
        let csv = "Date,Time,Temperature\n";
        tempData.forEach((data) => {
          let updatedDate = new Date(data.date).toLocaleDateString();
          let updatedTime = new Date(data.date).toLocaleTimeString();
          let row =
            updatedDate +
            "," +
            updatedTime +
            "," +
            Math.round(data.temp * 10) / 10 +
            " °C" +
            "\n";
          csv += row;
        });

        const anchor = document.createElement("a");
        anchor.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
        anchor.target = "_blank";
        anchor.download = `${this.getSingleDeviceData[0]?.customerFullName}-Temperature Data.csv`;
        anchor.click();
        this.$toast.success(`Temperature data exported successfully.`, {
          timeout: 3000,
        });
      } else {
        this.$toast.error(`No data found, select different date.`, {
          timeout: 3000,
        });
      }
    },
    exportBloodOxygenData() {
      let bloodOxygenData = this.getBloodOxygenGraphData;
      if (bloodOxygenData.length) {
        let csv = "Date,Time,SPO2\n";
        bloodOxygenData.forEach((data) => {
          let updatedDate = new Date(data.date).toLocaleDateString();
          let updatedTime = new Date(data.date).toLocaleTimeString();
          let row =
            updatedDate +
            "," +
            updatedTime +
            "," +
            Math.round(data.spo2) +
            " %" +
            "\n";
          csv += row;
        });

        const anchor = document.createElement("a");
        anchor.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
        anchor.target = "_blank";
        anchor.download = `${this.getSingleDeviceData[0]?.customerFullName}-Spo2 Data.csv`;
        anchor.click();
        this.$toast.success(`Spo2 data exported successfully.`, {
          timeout: 3000,
        });
      } else {
        this.$toast.error(`No data found, select different date.`, {
          timeout: 3000,
        });
      }
    },
    exportHeartRateData() {
      let heartRateData = this.getHeartRateGraphData;
      if (heartRateData.length) {
        let csv = "Date,Time,Heart Rate\n";
        heartRateData.forEach((data) => {
          let updatedDate = new Date(data.date).toLocaleDateString();
          let updatedTime = new Date(data.date).toLocaleTimeString();
          let row =
            updatedDate + "," + updatedTime + "," + data.hr + " BPM" + "\n";
          csv += row;
        });

        const anchor = document.createElement("a");
        anchor.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
        anchor.target = "_blank";
        anchor.download = `${this.getSingleDeviceData[0]?.customerFullName}-Heart Rate Data.csv`;
        anchor.click();
        this.$toast.success(`Heart Rate data exported successfully.`, {
          timeout: 3000,
        });
      } else {
        this.$toast.error(`No data found, select different date.`, {
          timeout: 3000,
        });
      }
    },
    exportStepsData() {
      let stepsData = this.getPatientSteps;
      if (stepsData.length) {
        let csv = "Date,Time,Steps\n";
        stepsData.forEach((data) => {
          let updatedDate = new Date(data.date).toLocaleDateString();
          let updatedTime = new Date(data.date).toLocaleTimeString();
          let row =
            updatedDate +
            "," +
            updatedTime +
            "," +
            Math.round(data.step) +
            "\n";
          csv += row;
        });

        const anchor = document.createElement("a");
        anchor.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
        anchor.target = "_blank";
        anchor.download = `${this.getSingleDeviceData[0]?.customerFullName}-Steps Data.csv`;
        anchor.click();
        this.$toast.success(`Steps data exported successfully.`, {
          timeout: 3000,
        });
      } else {
        this.$toast.error(`No data found, select different date.`, {
          timeout: 3000,
        });
      }
    },
    initData() {
      this.client = {
        connected: false,
      };
      this.retryTimes = 0;
      this.connecting = false;
      this.subscribeSuccess = false;
    },
    async displayAlgoData() {
      const payload = {
        mac_address_framed: this.getMacAddress.toString().toUpperCase(),
      };
      let algoData = await this.getPatientAlgoData(payload);
      algoData.updatedAt = algoData?.updatedAt?.replace(/.\d+Z$/g, "");
      this.algoData = algoData;
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
    getHeartRateGraph() {
      const payload = {
        speedometerId: this.getMacAddress.toString().toUpperCase(),
        agrFunction: this.selectedAggregate,
        timePeriod: this.selectedTimePeriod,
        startDate: Date.parse(this.startDateValue),
        endDate: Date.parse(this.endDateValue),
      };
      this.getPatientHeartRateData(payload);
    },
    handleOnReConnect() {
      // return new Promise((resolve) => {
      //   this.client.end(true, {}, () => {
      //     this.client.reconnect();
      //     resolve();
      //   });
      // });
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
        // const connectUrl = `${protocol}://${host}:${port}/${endpoint}`;
        const connectUrl = `wss://accu.live/ws/`;
        this.client = mqtt.connect(connectUrl, options);
        console.log(
          "url--",
          connectUrl,
          options,
          protocol,
          host,
          port,
          endpoint
        );
        if (this.client.on) {
          this.client.on("connect", () => {
            this.connecting = false;
            console.log("Connection succeeded!");
            this.subscribeSuccess = true;
            // this.client.subscribe(
            //   `BMSFSEV/${this.getSingleDeviceData[0]?.macAddressFramed.toUpperCase()}/sTOf`
            // );
            this.client.subscribe(
              `BacAccuLive/${this.getSingleDeviceData[0]?.macAddressFramed.toUpperCase()}/atoc`
            );
          });
          // this.client.on("reconnect", this.handleOnReConnect);
          this.client.on("error", (error) => {
            console.log("Connection failed", error);
          });
          this.client.on("message", async (_, message) => {
            this.showEcgChart = true;
            this.showPpgChart = true;
            this.ecgChartData = [];
            this.ppgChartData = [];
            if (
              message.toString() === "Online" ||
              message.toString() === "Offline"
            ) {
              this.liveMessage = message.toString();
            } else {
              let data = await JSON.parse(message);
              if (data?.msg_id === 17) {
                this.algoData = data;
              }
              console.log("data--", JSON.parse(message));
              this.tempStartTime = data?.start_time;
              this.startTime = new Date(this.tempStartTime).toLocaleString(
                undefined,
                { timeZone: "Asia/Kolkata" }
              );
              // console.log("set data from parent", data?.ecg_vals);
              if (data?.ecg_vals || data?.ppg_vals) {
                this.$nextTick(() => {
                  this.showEcgChart = true;
                  this.showPpgChart = true;
                });
                this.ecgChartData = data?.ecg_vals;
                this.ppgChartData = data?.ppg_vals;
              }
            }
          });
        }
      } catch (error) {
        this.connecting = false;
        console.log("mqtt.connect error", error);
      }
    },
  },
};
</script>

<style scoped>
.sleep__block {
  display: flex;
  height: 40px;
  align-items: center;
  padding: 10px;
}
.grid-container w-100 {
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

.div {
  border-radius: 10px;
}
small {
  font-size: 16px;
}
h3 {
  font-size: 22px;
}
.user-image {
  width: 80px;
  height: 80px;
}
.user-pic-header {
  display: flex;
  align-items: center;
}
@media only screen and (max-width: 780px) {
  small {
    font-size: 14px;
  }
  h3 {
    font-size: 20px;
  }
}
.patient-header {
  background-color: #f6f2f2;
  padding: 30px;
  border-radius: 26px;
  margin-bottom: 30px;
}
.btn-orange {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 50%;
  margin-left: 20px;
  background-color: #f58220;
}
.btn-orange .v-icon {
  color: #fff;
}
.mini-title {
  font-size: 36px;
}
.text-success {
  color: #29dca1;
}
.mini-light-box {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  text-align: left;
  box-shadow: 0px 8px 16px #00000014;
  border: 1px solid #e9e9e9;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 30px;
}
.mini-content {
  margin-left: 20px;
}
.mini-icon {
  height: 90px;
  width: auto;
}
@media (min-width: 1800px) {
  .column5 {
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    max-width: 100%;
  }
}
.mini-content small {
  font-size: 20px;
  font-weight: 400;
}
.min-light-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.text-small {
  margin-left: 20px;
  font-weight: 500;
}
.min-light-header .right {
  text-align: right;
}
.text-medium {
  margin-left: 20px;
}
.text-medium small {
  font-size: 20px;
  font-weight: 500;
}
.text-medium .unit {
  color: #7f7f7f;
  font-size: 16px;
  font-weight: 400;
}
.text-medium h1 {
  line-height: 1.3;
  display: flex;
  flex-wrap: wrap;
}
.btn-sm {
  color: #7f7f7f;
  font-weight: 500;
  padding: 8px;
  cursor: pointer;
}
.btn-sm.active {
  color: #f58220;
}
.text-nowrap {
  white-space: nowrap;
}
.item {
  display: flex;
  padding-right: 30px;
  padding-top: 15px;
  align-items: center;
  padding-bottom: 5px;
  flex-grow: 1;
}
@media (max-width: 991px) {
  .user-image {
    width: 58px;
    height: 58px;
  }
}
@media (max-width: 767px) {
  .patient-header {
    padding: 15px;
  }
  .mini-icon {
    height: 50px;
  }
  .mini-light-box {
    padding: 16px;
  }
  .mini-title {
    font-size: 28px;
  }
  .mini-content {
    line-height: 1.3;
    margin-left: 10px;
  }
  .mini-content small {
    font-size: 12px;
  }
  .user-image {
    width: 45px;
    height: 45px;
  }
  .user-pic-header {
    width: 100%;
  }
  .user-pic-header h3 {
    margin-right: auto;
  }
}
@media (max-width: 575px) {
  .item {
    width: 50%;
  }
  .device-status-row {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
