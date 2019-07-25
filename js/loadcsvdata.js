function loadcsvdata( dataloaded ) {
    d3.dsv(",", "../crime.csv", function(d) {

        const dataobj = {
			year: +d.YEAR,
            month: d.MONTH_NAME,
			day: d.DAY_OF_WEEK,
			hour: +d.HOUR,
			date: d.OCCURRED_ON_DATE,
            offense: d.OFFENSE_CODE_GROUP,
			desc: d.OFFENSE_DESCRIPTION,
			street: d.STREET
        };
		
		if (!offenseGroups[dataobj.offense])
				offenseGroups[dataobj.offense] = { offense: dataobj.offense, offenseCount: 0};

		offenseGroups[dataobj.offense].offenseCount++;
		
		if (!offensesByDay[dataobj.day])
				offensesByDay[dataobj.day] = { day: dataobj.day, offenseCount: 0};

		offensesByDay[dataobj.day].offenseCount++;
		
		if (!offensesByHour[dataobj.hour])
				offensesByHour[dataobj.hour] = { hour: dataobj.hour, offenseCount: 0};

		offensesByHour[dataobj.hour].offenseCount++;

		//console.log(offenseGroups);
        return dataobj;

    }).then(function(data) {
        dataSet = data;
        dataloaded();
    });
}
