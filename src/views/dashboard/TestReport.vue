<template>
  <div>
    <v-btn class="export__btn" color="warning" outlined @click="patientDataPdf"
      >Download Report</v-btn
    >
  </div>
</template>

<script>
import jspdf from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";
import { mapActions } from "vuex";
// import { imageLogo } from "../../assets/logo";

export default {
  name: "TestReport",
  props: ["patientData", "deviceDetails"],
  data() {
    return {
      patientProfileData: [],
    };
  },
  methods: {
    ...mapActions("doctors", ["getSinglePatient"]),
    checkAndCalculateVals(val, unit) {
      return val
        ? val != 0
          ? Math.round(val * 100) / 100 + " " + unit
          : "--"
        : "--";
    },
    getDoctorName(s1, s2) {
      return (
        s1.charAt(0).toUpperCase() +
        s1.slice(1) +
        " " +
        s2.charAt(0).toUpperCase() +
        s2.slice(1)
      );
    },
    async patientDataPdf() {
      this.patientProfileData = await this.getSinglePatient(
        this.deviceDetails.customerId
      );
      const {
        hr,
        spo2,
        temp,
        hrv,
        map,
        prv,
        bp,
        dbp,
        // steps,
        rr,
        pp,
        // arrhythmia,
        // sv,
        // co,
        // ptt,
      } = this.patientData;
      const doctorName = this.getDoctorName(
        this.deviceDetails.doctorFirstName,
        this.deviceDetails.doctorLastName
      );

      let pdfName = `${this.deviceDetails.customerFullName}`;
      let doc = new jspdf();
      let patientDOB = this.patientProfileData.DOB;

      //Patient Box details
      doc.setFillColor(123, 181, 255);
      doc.rect(10, 15, 181, 90, "F");
      doc.setFontSize(14).text(`Patient Name: ${pdfName}`, 15.0, 20.0);
      doc
        .setFontSize(14)
        .text(`DOB: ${moment(patientDOB).format("YYYY-MM-DD")}`, 15.0, 30.0);
      doc
        .setFontSize(14)
        .text(`Gender: ${this.patientProfileData.gender}`, 15.0, 40.0);
      doc
        .setFontSize(14)
        .text(
          `Patient Phone: ${this.patientProfileData.mobile_no}`,
          15.0,
          50.0
        );
      doc.setFontSize(14).text(`Medical Record(If Any): `, 15.0, 60.0);
      doc.setFontSize(14).text(`Diagnosis: `, 15.0, 70.0);
      doc.setLineWidth(0.01).line(10.0, 80.0, 191.0, 80.0);

      doc
        .setFontSize(14)
        .text(
          `Notfication Physician: ${doctorName} - Acculive Heart Centre`,
          15.0,
          90.0
        );
      doc
        .setFontSize(14)
        .text(`Ordering Physician: ${doctorName}`, 15.0, 100.0);

      //Summary Box
      doc.rect(10, 113, 181, 47);
      doc
        .setFontSize(16)
        .setFont("helvetica", "bold")
        .text(`Monitoring Summary`, 15.0, 120.0);
      doc.setLineWidth(0.01).line(10.0, 123.0, 191.0, 123.0);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12).text(`Time Monitored: `, 15.0, 129.0);
      doc.setFontSize(12).text(`-`, 62.0, 129.0);
      doc.setFontSize(12).text(`Prescription Days: `, 15.0, 136.0);
      doc.setFontSize(12).text(`-`, 62.0, 136.0);
      doc.setFontSize(12).text(`Days Monitored: `, 15.0, 143.0);
      doc.setFontSize(12).text(`-`, 62.0, 143.0);
      doc.setFontSize(12).text(`Start Date: `, 15.0, 150.0);
      doc.setFontSize(12).text(`-`, 62.0, 150.0);
      doc.setFontSize(12).text(`End Date: `, 15.0, 157.0);
      doc.setFontSize(12).text(`-`, 62.0, 157.0);

      doc.setLineWidth(0.01).line(75.0, 113.0, 75.0, 160.0);
      doc
        .setFontSize(16)
        .setFont("helvetica", "bold")
        .text(`Event Summary`, 78.0, 120.0);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12).text(`Symptomatic: `, 78.0, 129.0);
      doc.setFontSize(12).text(`-`, 122.0, 129.0);
      doc.setFontSize(12).text(`Asymptomatic: `, 78.0, 136.0);
      doc.setFontSize(12).text(`-`, 122.0, 136.0);

      doc.setLineWidth(0.01).line(132.0, 113.0, 132.0, 160.0);
      doc
        .setFontSize(16)
        .setFont("helvetica", "bold")
        .text(`HR Summary`, 135.0, 120.0);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12).text(`High HR: `, 135.0, 129.0);
      doc.setFontSize(12).text(`-`, 182.0, 129.0);
      doc.setFontSize(12).text(`Low HR: `, 135.0, 136.0);
      doc.setFontSize(12).text(`-`, 182.0, 136.0);
      doc.setFontSize(12).text(`Avg. HR: `, 135.0, 143.0);
      doc.setFontSize(12).text(`-`, 182.0, 143.0);

      const patientDetails = [
        { title: "Heart Rate", body: this.checkAndCalculateVals(hr, "BPM") },
        {
          title: "Heart Rate Variability",
          body: this.checkAndCalculateVals(hrv, "ms"),
        },
        {
          title: "Blood Pressure",
          body:
            this.checkAndCalculateVals(bp, "") +
            " / " +
            this.checkAndCalculateVals(dbp, "mmHg"),
        },
        { title: "Blood Oxygen", body: this.checkAndCalculateVals(spo2, "%") },
        {
          title: "Pulse Rate Variability",
          body: this.checkAndCalculateVals(prv, "ms"),
        },
        {
          title: "RR Interval",
          body: this.checkAndCalculateVals(rr, "seconds"),
        },
        {
          title: "Mean Arterial Pressure",
          body: this.checkAndCalculateVals(map, "mmHg"),
        },
        {
          title: "Pulse Pressure",
          body: this.checkAndCalculateVals(pp, "mmHg"),
        },
        {
          title: "Body Temperature",
          body: this.checkAndCalculateVals(temp, "°C"),
        },
        // {
        //   title: "Movement",
        //   body: this.checkAndCalculateVals(steps, "steps"),
        // },
        // { title: "Arrhythmia", body: arrhythmia ? arrhythmia : "--" },
        // {
        //   title: "Stroke Volume",
        //   body: this.checkAndCalculateVals(sv, "ml"),
        // },
        // {
        //   title: "Cardiac Output",
        //   body: this.checkAndCalculateVals(co, "L/min"),
        // },
        // {
        //   title: "Pulse Transit Time",
        //   body: this.checkAndCalculateVals(ptt, "ms"),
        // },
      ];

      doc
        .setFontSize(16)
        .setFont("helvetica", "bold")
        .text(`Body Vitals Summary: `, 15.0, 180.0);

      // const tableColumns = [
      //   { title: "Keys", dataKey: "title" },
      //   { title: "Values", dataKey: "body" },
      // ];
      autoTable(doc, {
        // columns: tableColumns,
        tableWidth: 180,
        body: patientDetails,
        margin: {
          left: 10.5,
          top: 185.25,
          right: 10.5,
        },
        columnStyles: {
          0: {
            cellWidth: 70,
            lineColor: "black",
            textColor: "black",
          },
          1: {
            lineColor: "black",
            textColor: "black",
          },
        },
        theme: "grid",
      });

      doc.addPage();

      //Arrhythmia Summary
      doc
        .setFontSize(16)
        .setFont("helvetica", "bold")
        .text(`Representative Arrhythmia Summary: `, 15.0, 50.0);

      const arrhythmiaSummary = [
        { title: "AF(Fastest)", body: "-" },
        { title: "SVT(Fastest)", body: "-" },
        { title: "Pause(Longest)", body: "-" },
        { title: "Heart Block(Slowest)", body: "-" },
        { title: "VT(Fastest)\n(Longest)", body: "-" },
      ];

      autoTable(doc, {
        tableWidth: 180,
        body: arrhythmiaSummary,
        margin: {
          left: 10.5,
          top: 55.25,
          right: 10.5,
        },
        columnStyles: {
          0: {
            cellWidth: 50,
            lineColor: "black",
            textColor: "black",
          },
          1: {
            lineColor: "black",
            textColor: "black",
          },
        },
        theme: "grid",
      });

      //Doctor Comments
      doc.setFont("helvetica", "normal");
      doc.rect(10, 115, 180, 40);
      doc.setFontSize(16).text(`Physician Comments: `, 15.0, 125.0);
      doc.setLineWidth(0.01).line(90, 115, 90, 155);
      doc.setFontSize(16).text(`Preliminary Findings: `, 95.0, 125.0);

      let totalPage = doc.internal.getNumberOfPages();

      for (let i = 0; i < totalPage; i++) {
        doc.setPage(i);
        let currentPage = doc.internal.getCurrentPageInfo().pageNumber;
        // doc.addImage(imageLogo, "PNG", 160.0, 1, 30, 15);
        doc
          .setFontSize(16)
          .setFont("helvetica", "bold")
          .text(`AccuLive ECG Report`, 200.0, 10.0, {
            align: "right",
          });
        doc.setFontSize(10).text(`Page: ${currentPage}`, 200.0, 280.0, {
          align: "right",
        });
      }

      doc.save(pdfName + " - Report.pdf");
      // this.$toast.success(
      //   `Report generate successfully for ${this.deviceDetails.customerFullName}.`,
      //   {
      //     timeout: 3000,
      //   }
      // );
    },
  },
};
</script>

<style lang="scss" scoped>
.export__btn:hover {
  background-color: orange;
  color: white !important;
}
</style>
