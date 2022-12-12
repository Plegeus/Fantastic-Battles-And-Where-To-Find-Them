$(document).ready(function(){
    $.getJSON("scripts/battle-info.json", function(data){
        var table = document.getElementById("battle-table");
        for (let i = 0; i < data.length; i++) {
        //---------------------------------------------------
        // Table Filling Logic
        var row = table.insertRow(i + 1);
        var name = row.insertCell(0);
        var vict = row.insertCell(1);
        var vanq = row.insertCell(2);
        var vict_comm = row.insertCell(3);
        var vanq_comm = row.insertCell(4);
        var vict_death =  row.insertCell(5);
        var vanq_death = row.insertCell(6);

        name.innerHTML = data[i].name;
        vict.innerHTML = data[i].victor;
        vanq.innerHTML = data[i].vanquished;
        vict_comm.innerHTML = data[i].victorious_commander;
        vanq_comm.innerHTML = data[i].vanquished_commander;
        vict_death.innerHTML = data[i].victorious_deaths;
        vanq_death.innerHTML = data[i].vanquished_deaths;
        //---------------------------------------------------
        // Tile Filling logic
        var grid = document.getElementById("tile-view");
        var gridItem = document.createElement('div');
        gridItem.innerText = "Name: " + data[i].name + "\n \n Victor: " + data[i].victor + "\n Led by: " + data[i].victorious_commander + "\n Losses: " + data[i].victorious_deaths + "\n \n Vanquished: " + data[i].Vanquished + "\n Led by: " + data[i].vanquished_commander + "\n Losses: " + data[i].vanquished_deaths;
        gridItem.className = "grid-item";
        grid.appendChild(gridItem);
        //---------------------------------------------------
        }
    }).fail(function(){
        console.log("An error has occurred.");
    });
});