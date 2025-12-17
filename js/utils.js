function average(arrs) {
  const av = (arrs[0][0].value + arrs[1][0].value) / 2;
  return [
    {
      label: arrs[0][0].label,
      value: av
    },
    {
      label: '',
      value: 100 - av
    }
  ];
}

function norm(arrs) {
  const av = arrs[0][0].value;
  return [
    {
      label: arrs[0][0].label,
      value: av
    },
    {
      label: '',
      value: 100 - av
    }
  ];
}

function registerInfoToggler() {
  let infoShowing = false;
  $('#btn-info').on('click', e => {
    if (infoShowing) {
      $('#bars').show();
      $('#info').hide();
      $(e.target).text('Ver info');
    } else {
      $('#info').show();
      $('#bars').hide();
      $(e.target).text('Ver gráfico');
    }
    infoShowing = !infoShowing;
  });
}
function smallBar(selector, data, colors, textColor, width, barWidth) {
  width = width || 120;
  var height = 200;
  barWidth = barWidth || 25;
  var textColor = textColor || '#4d4d4d';
  var x = d3
    .scaleBand()
    .range([0, width])
    .padding(0.1);
  var y = d3.scaleLinear().range([height, 0]);
  var svg = d3
    .select(selector)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g');

  x.domain(
    data.map(function(d) {
      return d.label;
    })
  );
  y.domain([
    0,
    d3.max(data, function(d) {
      return d.value;
    })
  ]);

  svg
    .selectAll('.bar')
    .append('rect')
    .attr('class', 'bar')
    .attr('x', function(d) {
      return x(0);
    });

  var bars = svg
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar bar-border')
    .attr('x', function(d) {
      return x(d.label);
    })
    .attr('fill', function(d, i) {
      return colors[i];
    })
    .attr('width', barWidth)
    .attr('y', function(d) {
      return y(d.value);
    })
    .attr('height', function(d) {
      return height - y(d.value);
    });

  svg
    .selectAll('.text')
    .data(data)
    .enter()
    .append('text')
    .attr('dy', '1.3em')
    .attr('x', function(d) {
      return x(d.label) + barWidth / 2;
    })
    .attr('y', function(d) {
      return y(d.value) + 10;
    })
    .attr('text-anchor', 'middle')
    .attr('font-size', '13px')
    .attr('fill', textColor)
    .text(function(d) {
      return d.value;
    });
}

function smallBarV2(selector, data, suffix) {
  var width = 140;
  var height = 200;
  var barWidth = 40;
  var x = d3
    .scaleBand()
    .range([0, width])
    .padding(0.1);
  var y = d3.scaleLinear().range([height, 0]);
  var svg = d3
    .select(selector)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g');

  x.domain(
    data.map(function(d) {
      return d.label;
    })
  );
  y.domain([
    0,
    d3.max(data, function(d) {
      return 100;
    })
  ]);

  var bars = svg
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', function(d) {
      return x(d.label);
    })
    .attr('fill', function(d, i) {
      return colors[i];
    })
    .attr('width', barWidth)
    .attr('y', function(d) {
      return y(d.value);
    })
    .attr('height', function(d) {
      return height - y(d.value);
    });

  svg
    .selectAll('.text')
    .data(data)
    .enter()
    .append('text')
    .attr('dy', '1.3em')
    .attr('x', function(d) {
      return x(d.label) + barWidth/2;
    })
    .attr('y', function(d) {
      return y(d.value) + 10;
    })
    .attr('text-anchor', 'middle')
    .attr('font-size', '15px')
    .attr('fill', 'white')
    .text(function(d) {
      return d.value + '%';
    });
}
