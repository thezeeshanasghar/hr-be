

const widget1 = (obj)=>
{

	var object={
		title:"Users",
		data:{
			"label":"Registered users",
			"count":obj[0].users
		}
	}
	return object;
}
module.exports=widget1;