class Company {
  constructor(ceo, employee) {
    this.ceo = ceo;
    this.employee = employee;
  }

  runSequensing() {
    console.log(this.employee + 's running Miseq equiment to fastaq data');
  }
}

class BioCompany extends Company {
  constructor(ceo, employee, developer) {
    super(ceo, employee); 
    // Company.apply(this, arguments) 와 같음 company의 this를 그대로 받아와라!
    this.developer = developer;
  }
  
  swDevelopement() {
    console.log(this.developer + ' Reserch fastaq Data for ' + this.ceo);
  }
}

const ngenebio = new BioCompany('daechul', 55, 'youngmin');

ngenebio.runSequensing();
ngenebio.swDevelopement();