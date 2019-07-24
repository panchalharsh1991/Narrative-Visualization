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
				offenseGroups[dataobj.offense] = { year: dataobj.year, offenseCount: 0};

		offenseGroups[dataobj.year].offenseCount++;

        return dataobj;

    }).then(function(data) {
        dataSet = data;
        dataloaded();
    });
}
