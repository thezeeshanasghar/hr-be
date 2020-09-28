

const widget1 = (obj)=>
{

	var object={
		title:"Companies",
		data:{
			"label":"Registered Companies",
			"count":obj[0].Companies
		}
	}
	return object;
}
module.exports=widget1;