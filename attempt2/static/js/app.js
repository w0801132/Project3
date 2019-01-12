// from data.js
var tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    var row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      var cell = row.append("td");
        cell.text(val);
      }
    );
  });
}

function handleClick() {

  // Prevent the form from refreshing the page
  d3.event.preventDefault();

  // Grab the datetime value from the filter
  // var st = d3.select("#State2").property("value");
  var st = d3.select("#State").property("value");
  let filteredData = tableData;

  // Check to see if a date was entered and filter the
  // data using that date.
  if (st) {
    // Apply `filter` to the table data to only keep the
    // rows where the `datetime` value matches the filter value
    filteredData = filteredData.filter(row => row.State === st);
  }

  // Rebuild the table using the filtered data
  // @NOTE: If no date was entered, then filteredData will

  // just be the original tableData.
  buildTable(filteredData);
}

// Attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", handleClick);

// Build the table when the page loads
buildTable(tableData);


// Plot the default route once the page loads
var defaultURL = "/Museums.json";
d3.json(defaultURL).then(function(data) {
  var data = [data];
  var layout = { margin: { t: 30, b: 100 } };
  Plotly.plot("bar", data, layout);
});

// Update the plot with new data
function updatePlotly(newdata) {
  Plotly.restyle("bar", "x", [newdata.x]);
  Plotly.restyle("bar", "y", [newdata.y]);
}

// Get new data whenever the dropdown selection changes
function getData(route) {
  console.log(route);
  d3.json(`/${route}`).then(function(data) {
    console.log("newdata", data);
    updatePlotly(data);
  });
};

FusionCharts.ready(function() {
  var CSIGauge = new FusionCharts({
      type: 'hlineargauge',
      renderAt: 'chart-container',
      id: 'cpu-linear-gauge-4',
      width: '400',
      height: '170',
      manageresize: "1",
      showValue: "1",
      dataFormat: 'json',
      dataSource: {
        "chart": {
          "theme": "fusion",
          "caption": "Rate your favorite museum",
          "lowerLimit": "0",
          "upperLimit": "10",
          // "numberSuffix": "%",
          "chartBottomMargin": "20",
          "valueFontSize": "11",
          "valueFontBold": "0",
          "gaugeFillMix": "{light-10},{light-70},{dark-10}",
          "gaugeFillRatio": "40,20,40",
          "editMode": "1"
        },
        "colorRange": {
          "color": [{
            "minValue": "0",
            "maxValue": "4",
            "code": "#F2726F"

          }, {
            "minValue": "4",
            "maxValue": "7",
            "code": "#FFC533"

          }, {
            "minValue": "7",
            "maxValue": "10",
            "code": "#62B58F"

          }]
        },
        "pointers": {
          "pointer": [{
            "value": "0"
          }]
        }
      },
      "events": {
        'beforeRender': function(evt, args) {
          // creating div for controllers
          var controllers = document.createElement('div');

          // Create radio buttons inside div
          controllers.innerHTML = '<input type="button" value="Get Data" id="getdata_btn" style="margin-left:5px;margin-top:5px;"/><div id="tableView" style="margin: 3px;padding:5px;float: left;"></div>';
          // set css style for controllers div
          controllers.style.cssText = '';
          args.container.appendChild(controllers);
          controllers.setAttribute('id', 'controllers');
        },
        "renderComplete": function(evtObj, argObj) {
          evtObj.sender.intervalVar = setInterval(function() {
            // var prcnt = 65 + parseInt(Math.floor(Math.random() * 10), 10);
            // var prcnt = parseInt(Math.floor, 10);
            FusionCharts.items["cpu-linear-gauge-4"].feedData("value=");
          }, 5000);

          //Format minutes, seconds by adding 0 prefix accordingly
          function formatTime(time) {
            (time < 10) ? (time = "0" + time) : (time = time);
            return time;
          }

          function showData() {
            //Retrieving the data
            var dataVal = FusionCharts.items["cpu-linear-gauge-4"].getData(1),
              str = "",
              currDate = new Date(),
              label = formatTime(currDate.getHours()) + ":" + formatTime(currDate.getMinutes()) + ":" + formatTime(currDate.getSeconds());
            //Creating the table format
            str += '<table border="1" cellpadding="1" cellspacing="0" bordercolor="#cccccc" width="320px">';
            str += '    <tr>';
            str += '        <td width="50%" style="font-weight: bold;font-size: 14px;padding: 3px;">Current Time</td>';
            str += '        <td width="50%" style="font-weight: bold;font-size: 14px;padding: 3px;">Current Rating</td>';
            str += '    </tr>';
            str += '    <tr>';
            str += '        <td width="50%" style="padding: 3px;" align="center">' + label + '</td>';
            str += '        <td width="50%" style="padding: 3px;" align="center">' + dataVal + '</td>';
            str += '    </tr>';
            //Preparing html string to create the table with data

            str += '</table>';
            //Showing the table
            document.getElementById("tableView").style.cssText = 'overflow-y:auto;display:block;margin-top:5px';
            document.getElementById("tableView").innerHTML = str;
          }

          document.getElementById("getdata_btn").addEventListener("click", showData);

        },
        "disposed": function(evtObj, argObj) {
          clearInterval(evtObj.sender.intervalVar);
        }
      }
    })
    .render();
});
