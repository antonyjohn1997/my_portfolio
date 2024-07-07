const axios = window.axios;
console.log("the github data you are now seeing is loaded at instant you visit my website . ");
var reponames = [];
var languages = [];
var divId = 1;


const url = "https://api.github.com/users/antonyjohn1997/repos";
axios.get(url, {}).then(function (datas)
{
            console.log("datas.data",datas.data);
     for(var i = 0; i < datas.data.length; i++)
     {
            console.log("datas.data.length",datas.data.length);
        
        if (JSON.stringify(datas.data[i].fork) == "false")
        {
            reponames.push([
                datas.data[i].updated_at,
                datas.data[i].name,
                datas.data[i].language,
                datas.data[i].description,
                datas.data[i].languages_url,
            ]);
                  console.log("reponames[i]:", i,reponames[i]);
        }           

     }  
     setTimeout(dateFormatter,100);
     setTimeout(add_elements,2000);
});

function dateFormatter()
{
    for ( i = 0; i < reponames.length; i++)
    {
                  console.log("reponames.length",reponames.length); //
                  console.log("in dateFormatter fn , reponames[i]",reponames[i]);
                  console.log("in dateFormatter fn before, reponames[i][0]",i,reponames[i][0]);

        reponames[i][0] = new Date(reponames[i][0]);

                   console.log("in dateFormatter fn after, reponames[i][0]",i,reponames[i][0]);
    }
        reponames.sort(function (a, b)
        {
                   console.log("in dateFormatter b[0]", b[0]);
                   console.log("in dateFormatter a[0]", a[0]);
                   
         return b[0] - a[0];
    
         
        });
        console.log("after sorting in dateformatter reponames", reponames);
        getLanguages();
    
}

 function getLanguages()
{
    for (i = 0; i < 4; i++)
    {
                   console.log("before pushing in getlanguages function, reponames[i][4]", reponames[i][4]); 

        axios.get(reponames[i][4], {}).then(function (datas)
        {
                   console.log("datas.data in getlanguages fn for language array:", datas.data);
                  
            languages.push(Object.entries(datas.data));
                   
            
                    
        });
                   // console.log("datas.data in getlanguages fn for language array:",datas.data);
                    console.log("in getLanguages fn , after pushing languages array",languages);
    }
}

function add_elements()
{
   for(var i = 0; i < 4; i++)
   {
          console.log("before executing add_element reponames[i][0]",reponames[i][0]);  
          console.log("before executing add_element reponames[i][0]",reponames[i][1]);  
   
          console.log("in add_element fn before slice, reponames[i][0]",i,reponames[i][0]);  

    reponames[i][0] = reponames[i][0].toString().slice(0, 16);//taking only date and avoiding time 
         console.log("in add_element fn after slice, reponames[i][0]",i,reponames[i][0]); 
         console.log("in add_element fn before - replacement,reponames[i][1]",i,reponames[i][1]);  
    reponames[i][1] = reponames[i][1].replace(/-/g, " ");
         console.log("in add_element fn after - replace,reponames[i][1]",i,reponames[i][1]);  
         console.log("in add_element fn before _ replace,reponames[i][1]",i,reponames[i][1]);  

    reponames[i][0] = reponames[i][0].replace(/_/g, " ");
         console.log("in add_element fn after _ replace,reponames[i][1]",i,reponames[i][1]);  
         console.log("in add_element fn before space replace,reponames[i][1]",i,reponames[i][1]);  

reponames[i][0] = reponames[i][0].replace(" ", ", ");
         console.log("in add_element fn after space replace,reponames[i][1]",i,reponames[i][1]);  

         newElem = document.createElement("div");
         newElem.setAttribute("id",divId);
         newElem.setAttribute("class", "card col-8 card-style");
        
         innerElem = document.createElement("div");
         innerElem.setAttribute("id",divId + "in");
         innerElem.setAttribute("class","card-body");
         innerElem.innerHTML = "<div>" + 
         '<h5 class="card-title text-center"> Repo Name : ' +
         reponames[i][1] +
         "</h5>" +
                // console.log("in fn add_element & and dispalying git repo ,reponames[i][1]",reponames[i][1]); +
         '<hr class="red"/>' +
         "<p><b> Description : </b>" +
         reponames[i][3] +
         "</p>" +
                 //console.log("in fn add_element & and dispalying git description ,reponames[i][1]",reponames[i][1]); +
         "<p><b> Languages : </b>" +
         reponames[i][2] +
         "</p>" +
                 //console.log("in fn add_element & and dispalying git repo languges ,reponames[i][1]",reponames[i][1]); +
          "<p><b> Last Updated : </b>" +
          reponames[i][0] +
                //console.log("in fn add_element & and dispalying git repo updated ,reponames[i][1]",reponames[i][1]); +

          "</p>" +  
         "</div>" +   
         '<div style="height:inherit;width:auto">' +
      '<div id="chart' +
      divId +
      '" >' + 
      "</div>" +
         "</div>";  
newElem.appendChild(innerElem);
document.getElementById("repos").appendChild(newElem);
divId +=1;

//console.log("after executing add_element fn the reponames array",reponames)
   }
   console.log("after executing add_element fn the reponames array",reponames)//arranged the first 4 repository .
for(i = 0; i < 4; i++)
{
    drawPieChart(languages[i],i + 1, i);

}

}

function drawPieChart(langarray, id , i)
{
    id = "chart" + id;
    console.log("in drawPieChart fn id :",langarray);
    google.charts.load("current", { packages: ["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    langarray.unshift(["Language", "lines"]);

    function drawChart()
    {
            //console.log("in drawchart fn langarray :",langarray);
        let data = google.visualization.arrayToDataTable(langarray);
             //console.log("in drawchart fn langarray :",langarray);
             //console.log("in drawchart fn value of data :",data);

             let options = {
                title: "Language Split",
                pieHole: 0.4,
                height: 50 + "%",
                width: 75 + "%",
              };
              var chart = new google.visualization.PieChart(document.getElementById(id));
              console.log("in drawchart fn value of chart :",chart);
              chart.draw(data, options);      
    }
}


