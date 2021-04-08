const PaymentDetail=(arrays)=>{
var resp=[];
var TaxSum=0;
var PaymentTotal=0;
    var groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
      var groupByEmployee=groupBy(arrays[0], 'EmployeeId')
     var EmpIds= Object.keys(groupByEmployee)
     for(var i=0;i<EmpIds.length;i++){
         console.log(EmpIds[i]);
         console.log( groupByEmployee[EmpIds[i]]);
         var taxs=arrays[1].filter(x=>x.EmployeeId==Number(EmpIds[i]));
        //  console.log(taxs)
         for(var x=0;x<groupByEmployee[EmpIds[i]].length;x++){
          PaymentTotal+=Number(groupByEmployee[EmpIds[i]][x].amount);
         }
         for(var z=0;z<taxs.length;z++){
          TaxSum+=Number(taxs[z].Amount);
         }
         resp.push({Payment:groupByEmployee[EmpIds[i]],Tax:taxs,TotalTax:TaxSum,TotalPayment:PaymentTotal});
       
    
     }
     return resp;

}

module.exports=PaymentDetail;