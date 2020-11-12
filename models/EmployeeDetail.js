const EmployeeDetail=(obj)=>{
	
	var object=  {
		InsuranceId:obj[0][0].InsuranceId,
		TaxationId:obj[0][0].TaxationId,
		Cnic:obj[0][0].Cnic,
		FirstName:obj[0][0].FirstName,
		LastName:obj[0][0].LastName,
		DOB:obj[0][0].DOB,
		HireDate:obj[0][0].HireDate,
		HiringReason:obj[0][0].HiringReason,
		ServiceStartDate:obj[0][0].ServiceStartDate,
		ProbationEndDate:obj[0][0].ProbationEndDate,
		PartTimePercentage:obj[0][0].PartTimePercentage,
		Positions:obj[0][0].Positions,
		Grade:obj[0][0].Grade,
		Address:obj[0][0].Address,
		Contact:obj[0][0].Contact,
		ContractEndDate:obj[0][0].ContractEndDate,
		CompanyName:obj[0][0].CompanyName,
		PeriodicPayElements:obj[1],
		OnetimeElement:obj[2],
		EmployeeBankAccount:obj[3],
		Payments:obj[4]
	}
		return object;
}

module.exports=EmployeeDetail;