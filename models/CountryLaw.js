const CountryLaw=(objects)=>{
	
	var object=  {
        AdultAge: objects[0][0].AdultAge,
        CalculationMode: objects[0][0].CalculationMode,
        CountryCode: objects[0][0].CountryCode,
        Currency: objects[0][0].Currency,
        DeclarationMode: objects[0][0].DeclarationMode,
        Detail: objects[0][0].Detail,
        EndDate: objects[0][0].EndDate,
        Id: objects[0][0].Id,
        NoCarryForward: objects[0][0].NoCarryForward,
        PaidWithin: objects[0][0].PaidWithin,
        StartDate: objects[0][0].StartDate,
        Type: objects[0][0].Type,
        lumpsum: objects[0][0].lumpsum,
        Detail: objects[0][0].Detail,
        Ranges:objects[1]
	}
		return object;
}

module.exports=CountryLaw;