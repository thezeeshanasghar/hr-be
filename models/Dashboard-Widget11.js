

const widget11 = (obj)=>
{

	var ColumnsArray=Object.keys(obj[0])
	var columns=[];
	var rows=[];
	
	for(var i=0 ; i<ColumnsArray.length;i++) {
		columns.push({'Id':ColumnsArray[i],"title":ColumnsArray[i]})
	}
	for(var i=0;i<obj.length;i++)
	{
		var rowdata=[];
		Object.keys(obj[i]).forEach(key => rowdata.push({id:obj[i][key],value:obj[i][key]}));
		rows.push({Id:obj[i].Id,cells:rowdata})
	}
	var object={
		title:"Registered Companies",
		table:{
			"columns":columns,
			"rows":rows
		}
	}
	return object;
}
module.exports=widget11;