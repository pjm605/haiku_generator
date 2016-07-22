var fs = require ('fs');

var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}



var syllData = {}

function formatData(data){    
   var lines = data.toString().split("\n"),
   		lineSplit
   lines.forEach(function(line){    
    lineSplit = line.split("  "); 

    if(lineSplit.length > 1)
    {
    	var syllabeCount = getSyllableCount(lineSplit[1]);
    
    	//console.log("The word " + lineSplit[0] + " has this phoneme    layout: " + lineSplit[1]);
    	//console.log("syllables:"+syllabeCount); 
	    if(syllData.hasOwnProperty(syllabeCount) === false)
		{
			syllData[syllabeCount] = [lineSplit[0]];
		}
		else
		{
			syllData[syllabeCount].push(lineSplit[0])
		}
	}

  });   
}
formatData(cmudictFile)


function getSyllableCount(word)
{
	var syllabeCount = 0;
    for (var i = 0; i < word.length; i++)
    {
    	if(word[i].match(/\d/))
    	{
    		syllabeCount++
    	} 
    }
    return syllabeCount;
}




//console.log(syllData)


function createHaiku (structure, syllData)
{
	var result = structure.map (function(line)
	{
		var lineResult =  line.map(function(syll)
		{	var tempV = syllData[syll]
			return tempV[Math.floor(Math.random() * tempV.length)]

		})

		return lineResult.join(" ")
	})

	return result.join("\n")
}

console.log(createHaiku([[5],[7],[5]], syllData))



module.exports = {
createHaiku: createHaiku,
syllData: syllData

};


