<template>
  <v-app>
    <SideBar v-if="$route.path !== '/login'" />
    <UserLogin v-if="$route.path === '/login'" />
  </v-app>
</template>

<script>
import SideBar from "./layouts/SideBar.vue";
import UserLogin from "./views/user/UserLogin.vue";
export default {
  name: "App",
  components: {
    SideBar,
    UserLogin,
  },
};
</script>

<style>
@font-face {
  font-family: "Gilroy";
  src: url("assets/fonts/Gilroy-Light.ttf") format("truetype");
  font-weight: 100;
}

@font-face {
  font-family: "Gilroy";
  src: url("assets/fonts/Gilroy-Regular.ttf") format("truetype");
  font-weight: 300;
}

@font-face {
  font-family: "Gilroy";
  src: url("assets/fonts/Gilroy-Medium.ttf") format("truetype");
  font-weight: 400;
}

@font-face {
  font-family: "Gilroy";
  src: url("assets/fonts/Gilroy-Bold.ttf") format("truetype");
  font-weight: 500;
}

@font-face {
  font-family: "Gilroy";
  src: url("assets/fonts/Gilroy-ExtraBold.ttf") format("truetype");
  font-weight: 600;
}

#app {
  font-family: "Gilroy";
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* background-color: cyan; */
}
.card__radio {
  font-family: "Gilroy";
}
div .v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: 0px 12px 20px #00000014;
  border: 1px solid #e9e9e9;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
img {
  max-width: 100%;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.v-input input {
  font-size: 18px;
}

.theme--light.v-text-field--filled > .v-input__control > .v-input__slot {
  background-color: #fff;
  border: 1px solid #e9e9e9;
  border-radius: 10px;
}

.v-text-field > .v-input__control > .v-input__slot:before,
.v-text-field > .v-input__control > .v-input__slot:after {
  display: none;
}
.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot,
.v-text-field.v-text-field--enclosed .v-text-field__details {
  padding: 0 20px;
}
.v-messages__message {
  font-size: 14px;
}
.v-btn:not(.v-btn--round).v-size--large {
  height: 50px;
}
.row {
  margin: 0px -15px;
}
.row > * {
  padding: 0;
  padding-left: 15px;
  padding-right: 15px;
}
.w-100 {
  width: 100%;
}
.text-success {
  color: #29dca1;
}
.text-warning {
  color: #f8d716;
}
.text-pink {
  color: #29dca1;
}
.text-purple {
  color: #7649f2;
}
.text-info {
  color: #53eaff;
}
.text-danger {
  color: #fd5d5d;
}
.text-pink {
  color: #f719c2;
}
.text-brown {
  color: #cba9a9;
}
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th {
  color: #666;
  font-weight: 500;
  font-size: 12px;
}
.table-changes
  .theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th,
.table-changes
  .theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td:not(.v-data-table__mobile-row) {
  border: none;
}
.table-changes .theme--light.v-data-table {
  box-shadow: none !important;
}
.table-changes
  .theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: none;
}
.table-changes
  .v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td {
  border-bottom: 1px solid #e9e9e9 !important;
  font-weight: 500;
  padding: 15px 20px;
}
.table-changes .v-data-table > .v-data-table__wrapper > table {
  border: 1px solid #e9e9e9;
  border-bottom: none;
}
.table-changes
  .v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td:last-child {
  width: 1%;
  white-space: nowrap;
}
@media (max-width: 600px) {
  .table-changes .v-data-table > .v-data-table__wrapper > table {
    border: none;
  }
  .table-changes
    .v-data-table
    > .v-data-table__wrapper
    .v-data-table__mobile-table-row {
    display: flex;
    flex-wrap: wrap;
    padding: 8px 20px 20px;
    border: 1px solid #e9e9e9;
    margin-bottom: 20px;
    margin-top: 0 !important;
    border-radius: 12px;
  }

  .table-changes
    .v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr
    > td:first-child {
    width: auto;
    padding: 0;
  }

  .table-changes
    .v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr
    > td:first-child
    .v-data-table__mobile-row__header {
    display: none;
  }

  thead.v-data-table-header.v-data-table-header-mobile {
    display: none;
  }

  .table-changes
    .v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr
    > td {
    border: none !important;
    display: flex;
    flex-direction: column;
    padding: 0;
    font-size: 16px;
  }

  .table-changes
    .v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr
    > td
    .v-data-table__mobile-row__header {
    color: #7f7f7f;
    font-weight: 500;
    margin-bottom: 8px;
    font-size: 13px;
  }

  .table-changes
    .v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr
    > td:nth-child(2) {
    width: calc(100% - 45px);
    line-height: 1;
    padding-left: 20px;
  }

  .table-changes
    .v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr
    > td:first-child
    .v-image {
    max-width: 45px;
    max-height: 45px;
  }

  .table-changes
    .v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr
    > td {
    width: 50%;
    align-items: flex-start;
    justify-content: center;
    line-height: 1;
    margin-top: 12px;
  }
}
.h-auto {
  height: auto !important;
}
.v-text-field.v-text-field--enclosed:not(.error--text) .v-text-field__details {
  display: none;
}
.form-group {
  margin-bottom: 28px;
}
</style>
