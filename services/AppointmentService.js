var appointment = require("../model/Appointment");
var mongoose = require('mongoose');
var AppointmentFactory = require("../factories/AppointmentFactory");

const Appo = mongoose.model("Appointment", appointment);

class AppointmentService{

    async Create(name, email, description, cpf, date, time){
      var newAppo = new Appo({
        name,
        email, 
        description,
        cpf,
        date,
        time,
        finished: false,
        notified: false
      });
      try{
        await newAppo.save();
        return true;
      }catch(err){
        console.log(err);
        return false;
      }
    }

    async GetAll(showFinished){
      if(showFinished){
        return await Appo.find();
      }else{
        var appos = await Appo.find({"finished": false});
        var appointments = [];

        appos.forEach(appointment => {
          if(appointment.date != undefined){
            appointments.push( AppointmentFactory.Build(appointment) )
          }

        });

        return appointments;
      }
    }

    async GetById(id){
      try{
        var event = await Appo.findOne({_id: id});
        return event;
      }catch(err){
        console.log(err);
        return null;
      }
    }

    async finishedAppointment(id){
      try{
        await Appo.findByIdAndUpdate(id,{finished: true});
        return true;
      }catch(err){
        console.log(err);
        return false;
      }
    }

    // Query => email
    // Query => CPF
    async search(query){
      try{
        var appos = await Appo.find().or([{email: query}, {cpf: query}]);
        return appos;
      }catch(err){
        console.log(err);
        return [];
      }
    }

    async SendNotification(){
      var appos = await this.GetAll(false);
      appos.forEach(app => {
        var date = app.start.getTime();
        var hour = 1000 * 60 * 60;
        var gap = date-Date.now();

        if(gap <= hour){
          console.log(app.title)
          console.log("Mandando a Notificação!");
        }

      })
    }
}

module.exports = new AppointmentService();