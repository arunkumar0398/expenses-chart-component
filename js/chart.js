let static_data = [  
  {
    "day": "mon",
    "amount": 17.45
  },
  {
    "day": "tue",
    "amount": 34.91
  },
  {
    "day": "wed",
    "amount": 52.36
  },
  {
    "day": "thu",
    "amount": 31.07
  },
  {
    "day": "fri",
    "amount": 23.39
  },
  {
    "day": "sat",
    "amount": 43.28
  },
  {
    "day": "sun",
    "amount": 25.48
  }];

  const now = new Date();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = now.getDay();

  let tip = d3.select(".chart-container")
      .append("div")
      .attr("class", "tip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden");
  
  let svg = d3.select("svg").attr("class", "background-style"),
      margin = {top: 20, right: 20, bottom: 42, left: 40},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;
  
  let x = d3.scaleBand().rangeRound([0, width]).padding(0.19),
      y = d3.scaleLinear().rangeRound([height, 0]);
  
  let g = svg.append("g")
      .attr("class","whole-chart")
      .attr("transform", "translate(" + (margin.left-10) + "," + (margin.top+10) + ")");
  
  d3.json("apiPlaceholderURL", function(error, data) {  
    data = static_data;
    
    x.domain(data.map(function(d) { return d.day; }));
    y.domain([0, d3.max(data, function(d) { return d.amount; })]);
  
    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
     .append("text")
        .attr("y", 6)
        .attr("dy", "2.5em")
        .attr("dx", width/2 - margin.left)
        .attr("text-anchor", "start")
  
    // g.append("g")
    //     .attr("class", "axis axis--y")
    //     .call(d3.axisLeft(y).ticks(10))
    //   .append("text")
    //     .attr("transform", "rotate(-90)")
    //     .attr("y", 6)
    //     .attr("dy", "0.71em")
    //     .attr("text-anchor", "end")
   
  
    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("rx", "4")
        .attr("x", function(d) { return x(d.day); })
        .attr("y", function(d) { return y(d.amount); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.amount)})
        .on("mouseover", function(d) {return tip.text('$'+d.amount).style("visibility", "visible").style("top", y(d.amount) - 18+ 'px' ).style("left", x(d.day) + x.bandwidth() - 21 + 'px')})
	    //.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
	    .on("mouseout", function(){return tip.style("visibility", "hidden");});
       });

     
    setTimeout(() => {
      let barElements = document.querySelectorAll('.bar');
      
      switch(daysOfWeek[dayOfWeek]) {
        case 'Monday': 
          barElements[0].style.fill = 'hsl(186, 34%, 60%)';
          break;
        case 'Tuesday':
          barElements[1].style.fill = 'hsl(186, 34%, 60%)';
          break;
        case 'Wednesday':
          barElements[2].style.fill = 'hsl(186, 34%, 60%)';
          break;
        case  'Thursday':
          barElements[3].style.fill = 'hsl(186, 34%, 60%)';
          break;
        case  'Friday':
          barElements[4].style.fill = 'hsl(186, 34%, 60%)';
          break;
        case  'Saturday':
          barElements[5].style.fill = 'hsl(186, 34%, 60%)';
          break;
        case 'Sunday':
          barElements[6].style.fill = 'hsl(186, 34%, 60%)';
          break;
      } 
    }, 10);