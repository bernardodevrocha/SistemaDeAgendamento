class AppointmentFactory{
  Build(simpleAppointment){

    var month = simpleAppointment.date.getMonth();
    var year = simpleAppointment.date.getFullYear();
    var day = simpleAppointment.getDate();

    var appo = {
      id: simpleAppointment._id,
      title: simpleAppointment.name + " - " + simpleAppointment.description,
      start: undefined,
      end: undefined
    }
  }
}

module.exports = new AppointmentFactory();