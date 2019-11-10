const argv = require('yargs').argv;
const fs = require('fs');

if(argv.model)
{
	var data = fs.readFileSync(argv.model);
	var model = JSON.parse(data.toString());
	console.log(model);

	var tableNames = Object.keys(model);

	//test every table against every other table
	for(let i = 0; i < tableNames.length; i++)
	{
		for(let j = 0; j < tableNames.length; j++)
		{
			console.log(tableNames[i] + " vs " + tableNames[j]);
			let tables = [model[tableNames[i]], model[tableNames[j]]];
			let ti = 0;
			let c = tables[ti].opener;
			console.log(c + " | ");
			let isEnded = false;
			let count = 0;
			while (!isEnded)
			{
				ti = (ti + 1)%2; //swap tables index
				c = tables[ti].map[c]; // get the next value

				if(c == undefined || c == "")
				{
					c = "exit";
				}

				if(ti == 0)
				{
					console.log(c + " | ");
				}
				else
				{
					console.log( " | " + c);
				}

				if(c == "exit" || c.match("table") != null || count > 6)
				{
					isEnded = true;
				}

				count++;
			}


		}
	}
}
else
{
	console.log("usage: runModel --model modelName.json");
}
