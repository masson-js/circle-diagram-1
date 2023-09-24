// Данные для круговой диаграммы (пять чисел)
const dataset = [30, 20, 15, 10, 25];

// Создаем элемент SVG в контейнере
const svg = d3.select("#chart");

// Определяем радиус круговой диаграммы (половина минимальной стороны SVG)
const radius = Math.min(svg.attr("width"), svg.attr("height")) / 2;

// Создаем группу (группировку) в центре SVG для круговой диаграммы
const g = svg.append("g")
    .attr("transform", `translate(${radius}, ${radius})`);

// Создаем генератор дуг для круговой диаграммы
const arc = d3.arc()
    .innerRadius(0) // Внутренний радиус (0 для полной круговой диаграммы)
    .outerRadius(radius); // Внешний радиус (до края контейнера)

// Создаем генератор данных для круговой диаграммы
const pie = d3.pie();

// Создаем элементы path для каждой дуги и задаем им данные
const arcs = g.selectAll("arc")
    .data(pie(dataset))
    .enter()
    .append("g")
    .attr("class", "arc");

// Задаем цвета для дуг (можно настроить собственные цвета)
const colorScale = d3.scaleOrdinal()
    .domain(dataset)
    .range(["#ff5733", "#ffdb58", "#c2f732", "#76eec6", "#7f7fff"]);

// Создаем и стилизуем дуги
arcs.append("path")
    .attr("d", arc)
    .attr("fill", d => colorScale(d.data));

// Добавляем названия (значения) для каждой дуги
arcs.append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .text(d => d.data);