function loadcsvdata( dataloaded ) {
    d3.dsv(",", "../crime.csv", function(d) {

        const dataobj = {
			year: +d.YEAR,
            month: d.MONTH_NAME,
			month_index: +d.MONTH,
			day: d.DAY_OF_WEEK,
			day_index: +d.DAY,
			hour: +d.HOUR,
			date: d.OCCURRED_ON_DATE,
            offense: d.OFFENSE_CODE_GROUP,
			desc: d.OFFENSE_DESCRIPTION,
			street: d.STREET
			//,
			//type: categoryMap[d.OFFENSE_CODE_GROUP],
			//count: +d["1"]
        };
		
		if (!offenseGroups[dataobj.offense])
				offenseGroups[dataobj.offense] = { offense: dataobj.offense, offenseCount: 0};

		offenseGroups[dataobj.offense].offenseCount++;
		
		if (!offensesByDay[dataobj.day])
				offensesByDay[dataobj.day] = { day: dataobj.day, index: dataobj.day_index, offenseCount: 0};

		offensesByDay[dataobj.day].offenseCount++;
		
		if (!offensesByHour[dataobj.hour])
				offensesByHour[dataobj.hour] = { hour: dataobj.hour, offenseCount: 0};

		offensesByHour[dataobj.hour].offenseCount++;
		
		if (!offensesByHourwithType[dataobj.hour])
				offensesByHourwithType[dataobj.hour] = { offense: {offense: dataobj.offense, offenseCount: 0});

		offensesByHourwithType[dataobj.hour].offense.offenseCount++;
		
		if (!offensesByMonth[dataobj.month])
				offensesByMonth[dataobj.month] = { month: dataobj.month, index: dataobj.month_index, offenseCount: 0};

		offensesByMonth[dataobj.month].offenseCount++;
		
		/*d3.values(offenseGroups)
		.sort(function(x, y){
				return d3.ascending(x.offenseCount, y.offenseCount);
		});*/		
        return dataobj;

    }).then(function(data) {
        dataSet = data;
        dataloaded();
    });
}
