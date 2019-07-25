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
		
		if (!offensesByMonth[dataobj.month])
				offensesByMonth[dataobj.month] = { month: dataobj.month, index: dataobj.month_index, offenseCount: 0};

		offensesByMonth[dataobj.month].offenseCount++;
		
		offenseGroups.sort((a,b) => (a.offenseCount > b.offenseCount) ? 1 : ((b.offenseCount > a.offenseCount) ? -1 : 0));
		offensesByDay.sort((a,b) => (a.day_index > b.day_index) ? 1 : ((b.day_index > a.day_index) ? -1 : 0));
		offensesByHour.sort((a,b) => (a.hour > b.hour) ? 1 : ((b.hour > a.hour) ? -1 : 0));
		offensesByMonth.sort((a,b) => (a.month_index > b.month_index) ? 1 : ((b.month_index > a.month_index
		
        return dataobj;

    }).then(function(data) {
        dataSet = data;
        dataloaded();
    });
}
