const fileJSON = function(arr){
	let result = {}
	count = 0
	arr.forEach((loc) => {
		result[count] = {title:loc}
		count++
	})
	return result
}

module.exports = fileJSON