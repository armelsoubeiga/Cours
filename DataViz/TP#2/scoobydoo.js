

// configuration des constantes utilisées tout au long du script
const margin = {top: 0.1 * width, 
                right: 0.125 * width, 
                bottom: 0.05 * width, 
                left: 0.075 * width}
const plotWidth = width - margin.left - margin.right
const plotHeight = height - margin.top - margin.bottom

const lineWidth = 0.004 * plotWidth
const mediumText = 0.03 * plotWidth
const bigText = 0.04 * plotWidth

// définition la largeur et la hauteur de l'élément svg (tracé + marge)
svg.attr("width", plotWidth + margin.left + margin.right)
   .attr("height", plotHeight + margin.top + margin.bottom)
   
//création d'un groupe de tracés
let plotGroup = svg.append("g")
                   .attr("transform",
                         "translate(" + margin.left + "," + margin.top + ")")

// Ajout des axes                        
// x-axis values 
// x-axis goes from 0 to width of plot
let xAxis = d3.scaleLinear()
    .domain(d3.extent(data, d => { return d.year; }))
    .range([ 0, plotWidth ]);
    
// y-axis values 
// y-axis goes from height of plot to 0
let yAxis = d3.scaleLinear()
    .domain(d3.extent(data, d => { return d.cumulative_caught; }))
    .range([ plotHeight, 0]);
    
// ajout x-axis to plot
// déplace l'axe des x vers le bas
// formater les valeurs de graduation en date 
// définir la largeur du trait et la taille de la police
plotGroup.append("g")
   .attr("transform", "translate(0," + plotHeight + ")")
   .call(d3.axisBottom(xAxis).tickFormat(d3.format("d")))
   .attr("stroke-width", lineWidth)
   .attr("font-size", mediumText);

// ajoute l'axe des y au tracé
// définir la largeur du trait et la taille de la police
plotGroup.append("g")
    .call(d3.axisLeft(yAxis))
    .attr("stroke-width", lineWidth)
    .attr("font-size", mediumText);

// transforme les données en structure imbriquée pour un graphique à lignes multiples
// Attention : d3.nest() n'est plus disponible dans D3 v6 et versions ultérieures
let nestedData = d3.nest()
    .key(d => { return d.character;})
    .entries(data);
    
// création  du titre
svg.append("text")
   .attr("text-anchor", "start")
   .attr("x", margin.left)
   .attr("y", margin.top/3)
   .text("Monstres capturés par les membres de Mystery Inc.")
   .attr("fill", "black")
   .attr("font-size", bigText)
   .attr("font-weight", "bold")
  
function drawLabels() {
 // création des étiquettes de légende, c'est-à-dire les noms des personnages
plotGroup.append("g")
  .selectAll("text")
  .data(nestedData)
  .enter()
  .append("text")
  
  .attr("class", "name_labels")
  .style("font-weight", "bold")
  .style("font-size", mediumText)

  .attr("x", xAxis(2021) + mediumText/2)
  .attr("y", (d, i) => yAxis(d.values[d.values.length-1].cumulative_caught) + mediumText/3)
  .attr("fill", d => {return d.values[0].color})
  .text(d => {return d.values[0].character})
  .attr("opacity", 0)
  .transition()
  .duration(500)
  .attr("opacity", 1)
}

function tweenDash() {
  let l = this.getTotalLength(),
      i = d3.interpolateString("0," + l, l + "," + l);
  return function(t) { return i(t) };
}

function lineTransition(path) {
  path.transition()
      .duration(2500)
      .attrTween("stroke-dasharray", tweenDash)
      .on("end", () => { 
        drawLabels();
      });
}

function drawLines() {

  plotGroup.selectAll(".drawn_lines").remove()
  plotGroup.selectAll(".name_labels").remove()
  
let path = plotGroup.selectAll(".drawn_lines")
    .data(nestedData)
    .enter()
    .append("path")
    .attr("class", "drawn_lines")
    .attr("fill", "none")
    .attr("stroke", d => {return d.values[0].color}) 
    .attr("stroke-width", lineWidth)
    .attr("d", d => {
      return d3.line()
        .x(d => { return xAxis(d.year);})
        .y(d => { return yAxis(d.cumulative_caught);})
        (d.values)
    })
    .call(lineTransition)
}

drawLines()


