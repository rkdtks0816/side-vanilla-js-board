
// Sign Up #############################################################################################################################################

// 유효성 검사

function CheckSignUp(){
  var UserName = $('#UserName').val();
  var NickName = $('#NickName').val();
  var UserID = $('#UserID').val();
  var UserPassword = $('#UserPassword').val();
  var UserEmail = $('#UserEmail').val();

  if (NickName.length < 2 || NickName.length >= 20) {
    alert("닉네임은 2글자 이상 20글자 이하입니다.");
  } else if (UserID.length < 2 || UserID.length >= 20) {
    alert("아이디는 2글자 이상 20글자 이하입니다.");
  } else if (UserPassword.length < 2 || UserPassword.length >= 20) {
    alert("비밀번호는 2글자 이상 20글자 이하입니다.");
  } else if (UserEmail.includes("@") || UserEmail.includes(".")) {
    alert("올바른 이메일 형식이 아닙니다.");
  } else {
    CreatIDCall(UserName, NickName, UserID, UserPassword, UserEmail);
  }
}


// 차트 공통
var chartArray = [];
var chartType = '';

function dashboardChart(a){
  var context = document
    .getElementById('upi_chart')
    .getContext('2d');

  const labels = ['1', '2', '3', '4', '5', '6', '7'];
  const data = {
    labels: labels,
    datasets: [
      {
        label: '출구온도',
        data: [a.CHR016_Out_T, a.CHR017_Out_T, a.CHR018_Out_T, a.CHR019_Out_T, a.CHR020_Out_T, a.CHR021_Out_T, a.CHR022_Out_T],
        backgroundColor: '#3574F2',
        maxBarThickness: 33,
        borderRadius: 5,
        datalabels: {
          display: false,
        }
      },
      {
        label: '입구온도',
        data: [a.CHR016_Delta_T, a.CHR017_Delta_T, a.CHR018_Delta_T, a.CHR019_Delta_T, a.CHR020_Delta_T, a.CHR021_Delta_T, a.CHR022_Delta_T],
        backgroundColor: '#77ACF2',
        maxBarThickness: 33,
        borderRadius: 15,
        datalabels: {
          anchor: 'center',
          align: 'center',
          color: '#FFFFFF',
          font : {
            size: 15
          }
        }
      },
    ]
  };

  const config = {
    plugins: [ChartDataLabels],
    type: 'bar',
    data: data,
    options: {
      plugins: {
        datalabels: { // datalables 플러그인 세팅
          formatter: function (value, context) {
              return value;
          },
        },
      },
      // indexAxis: 'y',
      responsive: true,
      scales: {
        x: {
          stacked: true,  
          grid: {
              display:false,
              lineWidth:0
          }
        },
        y: {
          stacked: true,
        }
      },
      maintainAspectRatio :false,
    }
  };

  var myChart = new Chart(context, config);
};

function chiller_state(a) {
  if (a.CHR016_Upi != null) {
    if (Number(a.CHR016_Upi) > (Number(a.system_upi) + 0.0001)) {
      $('.chiller_1 img').attr({ src: "/static/images/warning.png"});
    } else if (Number(a.CHR016_Upi) >= Number(a.system_upi)) {
      $('.chiller_1 img').attr({ src: "/static/images/normal.png"});
    } else if (Number(a.CHR016_Upi) < Number(a.system_upi)) {
      $('.chiller_1 img').attr({ src: "/static/images/warning.png"});
    } else if (Number(a.CHR016_Upi) < (Number(a.system_upi) - 0.0001)) {
      $('.chiller_1 img').attr({ src: "/static/images/danger.png"});
    }
  } else {
    $('.chiller_1 img').attr({ src: "/static/images/off.png"});
  }

  if (a.CHR017_Upi != null) {
    if (Number(a.CHR017_Upi) > (Number(a.system_upi) + 0.0001)) {
      $('.chiller_2 img').attr({ src: "/static/images/warning.png"});
    } else if (Number(a.CHR017_Upi) >= Number(a.system_upi)) {
      $('.chiller_2 img').attr({ src: "/static/images/normal.png"});
    } else if (Number(a.CHR017_Upi) < Number(a.system_upi)) {
      $('.chiller_2 img').attr({ src: "/static/images/warning.png"});
    } else if (Number(a.CHR017_Upi) < (Number(a.system_upi) - 0.0001)) {
      $('.chiller_2 img').attr({ src: "/static/images/danger.png"});
    }
  } else {
    $('.chiller_2 img').attr({ src: "/static/images/off.png"});
  }

  if (a.CHR018_Upi != null) {
    if (Number(a.CHR018_Upi) > (Number(a.system_upi) + 0.0001)) {
      $('.chiller_3 img').attr({ src: "/static/images/warning.png"});
    } else if (Number(a.CHR018_Upi) >= Number(a.system_upi)) {
      $('.chiller_3 img').attr({ src: "/static/images/normal.png"});
    } else if (Number(a.CHR018_Upi) < Number(a.system_upi)) {
      $('.chiller_3 img').attr({ src: "/static/images/warning.png"});
    } else if (Number(a.CHR018_Upi) < (Number(a.system_upi) - 0.0001)) {
      $('.chiller_3 img').attr({ src: "/static/images/danger.png"});
    }
  } else {
    $('.chiller_3 img').attr({ src: "/static/images/off.png"});
  }

  if (a.CHR019_Upi != null) {
    if (Number(a.CHR019_Upi) > (Number(a.system_upi) + 0.0001)) {
      $('.chiller_4 img').attr({ src: "/static/images/warning.png"});
    } else if (Number(a.CHR019_Upi) >= Number(a.system_upi)) {
      $('.chiller_4 img').attr({ src: "/static/images/normal.png"});
    } else if (Number(a.CHR019_Upi) < Number(a.system_upi)) {
      $('.chiller_4 img').attr({ src: "/static/images/warning.png"});
    } else if (Number(a.CHR019_Upi) < (Number(a.system_upi) - 0.0001)) {
      $('.chiller_4 img').attr({ src: "/static/images/danger.png"});
    }
  } else {
    $('.chiller_4 img').attr({ src: "/static/images/off.png"});
  }

  if (a.CHR020_Upi != null) {
    if (Number(a.CHR020_Upi) > (Number(a.system_upi) + 0.0001)) {
      $('.chiller_5 img').attr({ src: "/static/images/warning.png"});
    } else if (Number(a.CHR020_Upi) >= Number(a.system_upi)) {
      $('.chiller_5 img').attr({ src: "/static/images/normal.png"});
    } else if (Number(a.CHR020_Upi) < Number(a.system_upi)) {
      $('.chiller_5 img').attr({ src: "/static/images/warning.png"});
    } else if (Number(a.CHR020_Upi) < (Number(a.system_upi) - 0.0001)) {
      $('.chiller_5 img').attr({ src: "/static/images/danger.png"});
    }
  } else {
    $('.chiller_5 img').attr({ src: "/static/images/off.png"});
  }

  if (a.CHR021_Upi != null) {
    if (Number(a.CHR021_Upi) > (Number(a.system_upi) + 0.0001)) {
      $('.chiller_6 img').attr({ src: "/static/images/warning.png"});
    } else if (Number(a.CHR021_Upi) >= Number(a.system_upi)) {
      $('.chiller_6 img').attr({ src: "/static/images/normal.png"});
    } else if (Number(a.CHR021_Upi) < Number(a.system_upi)) {
      $('.chiller_6 img').attr({ src: "/static/images/warning.png"});
    } else if (Number(a.CHR021_Upi) < (Number(a.system_upi) - 0.0001)) {
      $('.chiller_6 img').attr({ src: "/static/images/danger.png"});
    }
  } else {
    $('.chiller_6 img').attr({ src: "/static/images/off.png"});
  }

  if (a.CHR022_Upi != null) {
    if (Number(a.CHR022_Upi) > (Number(a.system_upi) + 0.0001)) {
      $('.chiller_7 img').attr({ src: "/static/images/warning.png"});
    } else if (Number(a.CHR022_Upi) >= Number(a.system_upi)) {
      $('.chiller_7 img').attr({ src: "/static/images/normal.png"});
    } else if (Number(a.CHR022_Upi) < Number(a.system_upi)) {
      $('.chiller_7 img').attr({ src: "/static/images/warning.png"});
    } else if (Number(a.CHR022_Upi) < (Number(a.system_upi) - 0.0001)) {
      $('.chiller_7 img').attr({ src: "/static/images/danger.png"});
    }
  } else {
    $('.chiller_7 img').attr({ src: "/static/images/off.png"});
  }
};

function run_num_img(a) {
  if (Number(a.run_num) == 1) {
    $('.num_icon').attr({ src: "/static/images/001.png"});
  } else if (Number(a.run_num) == 2) {
    $('.num_icon').attr({ src: "/static/images/002.png"});
  } else if (Number(a.run_num) == 3) {
    $('.num_icon').attr({ src: "/static/images/003.png"});
  } else if (Number(a.run_num) == 4) {
    $('.num_icon').attr({ src: "/static/images/004.png"});
  } else if (Number(a.run_num) == 5) {
    $('.num_icon').attr({ src: "/static/images/005.png"});
  } else if (Number(a.run_num) == 6) {
    $('.num_icon').attr({ src: "/static/images/006.png"});
  } else if (Number(a.run_num) == 7) {
    $('.num_icon').attr({ src: "/static/images/007.png"});
  }

  
  if (Number(a.run_num_cal) == 1) {
    $('.num_cal_icon').attr({ src: "/static/images/001.png"});
  } else if (Number(a.run_num_cal) == 2) {
    $('.num_cal_icon').attr({ src: "/static/images/002.png"});
  } else if (Number(a.run_num_cal) == 3) {
    $('.num_cal_icon').attr({ src: "/static/images/003.png"});
  } else if (Number(a.run_num_cal) == 4) {
    $('.num_cal_icon').attr({ src: "/static/images/004.png"});
  } else if (Number(a.run_num_cal) == 5) {
    $('.num_cal_icon').attr({ src: "/static/images/005.png"});
  } else if (Number(a.run_num_cal) == 6) {
    $('.num_cal_icon').attr({ src: "/static/images/006.png"});
  } else if (Number(a.run_num_cal) == 7) {
    $('.num_cal_icon').attr({ src: "/static/images/007.png"});
  }
};

function run_num_ai_img(a) {
  if (a.pred == "1.0") {
    $('.num_ai_icon').attr({ src: "/static/images/001.png"});
  } else if (a.pred == "2.0") {
    $('.num_ai_icon').attr({ src: "/static/images/002.png"});
  } else if (a.pred == "3.0") {
    $('.num_ai_icon').attr({ src: "/static/images/003.png"});
  } else if (a.pred == "4.0") {
    $('.num_ai_icon').attr({ src: "/static/images/004.png"});
  } else if (a.pred == "5.0") {
    $('.num_ai_icon').attr({ src: "/static/images/005.png"});
  } else if (a.pred == "6.0") {
    $('.num_ai_icon').attr({ src: "/static/images/006.png"});
  } else if (a.pred == "7.0") {
    $('.num_ai_icon').attr({ src: "/static/images/007.png"});
  }
};

// 효율 차트
let ahuMargin = {top: 80, right: 40, bottom: 40, left: 60};
let ahuWidth = '';
if($('#temp_chart').length != 0) ahuWidth = d3.select('#temp_chart').node().getBoundingClientRect().width - ahuMargin.left - ahuMargin.right;
let ahuHeight = 356;

function ahuChart(a){
  $('#temp_chart').html('');
  chartArray = a;
  chartType = 'temp';

  // x축 범위 설정 (금일 00시 ~ 익일 00시)
  let today = new Date(a[0].run_datetime);
  today.setHours(0);
  today.setMinutes(0);
  let tomorrow = new Date(a[0].run_datetime);
  tomorrow.setDate(tomorrow.getDate()+1);
  tomorrow.setHours(0);
  tomorrow.setMinutes(0);

  // autoScale을 위한 최소값 최대값 설정
  let maxVal = a.map((key) => { 
    var array = [Number(key.Equipment_Running_eEff).toFixed(0), Number(key.Equipment_Running_tEff).toFixed(0)];
    return Math.max(...array);
  });
  let minVal = a.map((key) => {
    var array = [Number(key.Equipment_Running_eEff).toFixed(0), Number(key.Equipment_Running_tEff).toFixed(0)];
    return Math.min(...array);
  });

  maxVal = Math.max(...maxVal)
  minVal = Math.min(...minVal)

  // x축 설정
  const x = d3.scaleTime().domain([today, tomorrow]).range([0, ahuWidth]);

  // y축 설정
  const y = d3.scaleLinear().domain([minVal, maxVal]).range([(ahuHeight - ahuMargin.top), 0]).nice();

  // line 설정
  const valueline = d3.line().x((d) => {return x(new Date(d.run_datetime))}).y((d) => {return y(Number(d.Equipment_Running_eEff).toFixed(0))});
  const valueline2 = d3.line().x((d) => {return x(new Date(d.run_datetime))}).y((d) => {return y(Number(d.Equipment_Running_tEff).toFixed(0))});

  // 차트 틀(svg) 생성
  const svg = d3.select('#temp_chart').append('svg').style('width', ahuWidth + ahuMargin.left + ahuMargin.right).style('height', ahuHeight).style('background', "#fff");

  // 차트에 x축 axis 생성
  svg
  .append('g')
  .attr('class', 'x axis xAxis')
  .attr('transform', `translate(${ahuMargin.left}, ${(ahuHeight - ahuMargin.bottom)})`)
  .call(d3.axisBottom(x).ticks(ahuWidth/64.33333333333333).tickSizeOuter(0).tickFormat(d3.timeFormat("%H시")))
  .call(g => g.select('.domain').remove());

  // 차트에 y축 axis 생성
  svg
  .append('g')
  .attr('class', 'y axis yAxis')
  .call(d3.axisLeft(y).ticks(5))
  .attr('transform', `translate(${ahuMargin.left},${ahuMargin.right})`)
  .call(g => g.select('.domain').remove())
  .call(g => g.selectAll('line').attr('stroke','#999').attr('opacity','0.2').attr('stroke-dasharray','3.3').attr('x2',`${ahuWidth}`))
  .attr('x2', `${ahuWidth}`)
  .style('stroke', 'none')
  .attr('opacity', '1')
  .append('g')
  .append('text')
  .attr('class', 'titleText')
  .attr('transform', 'rotate(-90)')
  .attr('x', `${-ahuHeight + 230}`)
  .attr('y', -36)
  .attr('font-size', '13px')
  .attr('font-family', 'Spoqa Han Sans Neo')
  .attr('font-anchor', 'middle')
  .attr('fill', '#282828')
  .text('효율 (%)')

  // 차트에 라인 생성 (설정온도)
  const linePath = svg
  .append('path')
  .data([a])
  .attr('class', 'line1')
  .attr('transform', `translate(${ahuMargin.left}, ${ahuMargin.right})`)
  .attr('d', valueline)
  .style('fill', 'none')
  .style('stroke-width', 2)
  .style('stroke', '#F2AC29')

  // 차트에 라인 생성 (공급온도)
  const linePath2 = svg
  .append('path')
  .data([a])
  .attr('class', 'line2')
  .attr('transform', `translate(${ahuMargin.left}, ${ahuMargin.right})`)
  .attr('d', valueline2)
  .style('fill', 'none')
  .style('stroke-width', 2)
  .style('stroke', '#2AA4BF')

  // 차트에 마우스 올렸을 때 vertical line과 위치 circle 생성
  // 차트 전체를 이동할 수 있도록 width: 100%, height: 100%의 그룹 생성
  const focus = svg
  .append('g')
  .attr('class','focus')
  .attr('width', ahuWidth)
  .attr('height', ahuHeight);

  // vertical line 생성
  focus
  .append('line')
  .attr('class', 'vertical_line')
  .attr('opacity', 0)
  .style('stroke-dasharray', '3.3')
  .attr('stroke-width', '2px')
  .attr('stroke', '#999')
  .attr('y1', 0)
  .attr('y2', `${ahuHeight - ahuMargin.top}`)

  // 전력효율 circle 생성
  focus
  .append('circle')
  .attr('class', 'circle_y1')
  .attr('opacity', 0)
  .attr('stroke','#F2AC29')
  .attr('fill','white')
  .attr('stroke-width', 2)
  .attr('r', 4); // 반지름값

  // 온도효율 circle 생성
  focus
  .append('circle')
  .attr('class', 'circle_y2')
  .attr('opacity', 0)
  .attr('stroke','#2AA4BF')
  .attr('fill','white')
  .attr('stroke-width', 2)
  .attr('r', 4); // 반지름값

  // 툴팁 이벤트 생성
  // 차트 전체를 감싸는 투명한 박스를 생성하여 박스에 올리는 마우스 좌표를 계산하여 해당 좌표에 있는 값을 출력
  const observerbox = svg
  .append('rect')
  .attr('width', ahuWidth)
  .attr('height', ahuHeight - ahuMargin.top)
  .attr('transform', `translate(${ahuMargin.left}, ${ahuMargin.top/2})`)
  .attr('opacity', 0)
  .on('mousemove', function(){
    // 마우스 위치 구하여 위치에 맞는 배열 값 구하기
    const bisect = d3.bisector((d) => new Date(d.run_datetime)).left,
    x99 = x.invert(d3.mouse(this)[0]),
    i = bisect(a, x99, 1),
    d0 = a[i - 1],
    d1 = a[i],
    dType = typeof a.run_datetime,
    d = dType != "undefined" ? (x - new Date(d0.run_datetime) > new Date(d1.run_datetime) - x99 ? d1 : d0) : d0;

    // 날짜 값
    const dDate = new Date(d.run_datetime);
hourChart
    // vertical line 위치 변경
    focus
    .select('line')
    .attr('opacity', '0.5')
    .attr('transform', `translate(${(x(dDate) + ahuMargin.left)}, ${ahuMargin.bottom})`);

    // 설정 온도 circle 위치 변경
    focus
    .select('.circle_y1')
    .attr('opacity', 1)
    .attr('transform', `translate(${(x(dDate) + ahuMargin.left)}, ${(y(Number(d.Equipment_Running_eEff).toFixed(0)) + ahuMargin.bottom)})`)

    // 공급 온도 circle 위치 변경
    focus
    .select('.circle_y2')
    .attr('opacity', 1)
    .attr('transform', `translate(${(x(dDate) + ahuMargin.left)}, ${(y(Number(d.Equipment_Running_tEff).toFixed(0)) + ahuMargin.bottom)})`)

    // 툴팁 활성화
    const tooltip = document.querySelector('#tooltip');
    tooltip.style.opacity = 1;

    // 툴팁 위치 설정
    if(x(new Date(d.run_datetime)) + tooltip.offsetWidth < ahuWidth){
      tooltip.style.left = `${x(dDate) + 72}px`;
    }else {
      tooltip.style.left = `${x(dDate) - 128}px`;
    }

    // 툴팁 텍스트 작성
    var dYears = dDate.getFullYear();
    var dMonth = dDate.getMonth()+1;
    dMonth = dateParse(dMonth);
    var dDay = dDate.getDate();
    dDay = dateParse(dDay);
    var dHour = dDate.getHours();
    dHour = dateParse(dHour);
    var dMin = dDate.getMinutes();
    dMin = dateParse(dMin);

    $('.tooltipDate').text(`${dYears}년 ${dMonth}월 ${dDay}일 ${dHour}시 ${dMin}분`)
    $('.tooltipValue.set').text(`${Number(d.Equipment_Running_eEff).toFixed(0)} %`)
    $('.tooltipValue.sup').text(`${Number(d.Equipment_Running_tEff).toFixed(0)} %`)
  })
  .on('mouseleave', () => {
    // 마우스가 차트 밖으로 벗어 났을 때 focus 숨기기
    focus
    .select('line')
    .attr('opacity', 0)

    focus
    .select('.circle_y1')
    .attr('opacity', 0)

    focus
    .select('.circle_y2')
    .attr('opacity', 0)

    // 툴팁 숨기기
    const tooltip = document.querySelector('#tooltip');
    tooltip.style.opacity = 0;
  })

  $('#temp_chart').append(
    `<div class="labels">
      <div>
        <input type="checkbox" id="set_btn" class="ahu_label_btn" data-label="set" checked />
        <label for="set_btn" class="label_box set"></label>
        <label for="set_btn" class="label set">전력효율</label>
      </div>
      <div>
        <input type="checkbox" id="sup_btn" class="ahu_label_btn" data-label="sup" checked />
        <label for="sup_btn" class="label_box sup"></label>
        <label for="sup_btn" class="label sup">온도효율</label>
      </div>
    </div>`
  )
}

// 효율 테이블
function ahuTable(a){
  const table = document.querySelector('.temp-table tbody');
  table.innerHTML = '';
  a.forEach((e, i)=>{
    table.innerHTML += `<tr>
      <td>${e.run_datetime}</td>
      <td>${Number(e.Equipment_Running_eEff).toFixed(0)} %</td>
      <td>${Number(e.Equipment_Running_tEff).toFixed(0)} %</td>
      </tr>`
  })
}

function ahuInfo(a){
  $('.fac_use').html(`현재 전력효율 : ${Number(a.Equipment_Running_eEff).toFixed(0)}%`);
  $('.fac_loc').html(`현재 온도효율 : ${Number(a.Equipment_Running_tEff).toFixed(0)}%`);
}

function NowEff_icon(a){
  if (Number(a.Equipment_Running_eEff) > Number(a.Equipment_Running_tEff)) {
    $('.warning_img_icon').attr({ src: "/static/images/good_eff.png"});
  } else {
    $('.warning_img_icon').attr({ src: "/static/images/warning_eff.png"});
  }
}

// 시간별 전력소비량 차트 (area)
let hourMargin = {top: 80, right: 40, bottom: 40, left: 60};
let hourWidth = '';
if($('#chart_container.hour').length != 0) hourWidth = d3.select('#chart_container').node().getBoundingClientRect().width;
let hourHeight = 396;
function hourChart(a){
  $('#chart_container').html('');
  chartArray = a;
  chartType = 'hour';

  // x축 범위 설정 (금일 00시 ~ 익일 00시)
  let today = new Date(a[0].runDate);
  today.setHours(0);
  today.setMinutes(0);
  let tomorrow = new Date(a[0].runDate);
  tomorrow.setDate(tomorrow.getDate());
  tomorrow.setHours(23);
  tomorrow.setMinutes(10);

  // x축 설정
  const x = d3.scaleTime().domain([today, tomorrow]).range([0, hourWidth - hourMargin.left - hourMargin.right/2]);

  // y축 설정
  const y = d3.scaleLinear().domain([0, (d3.max(a, d => Math.abs(d.sumData)))]).range([(hourHeight - hourMargin.top), 0]).nice();

  // line 설정
  const valueline = d3.area()
  .x((d) => {return x(new Date(d.runDate))})
  .y0(y(0))
  .y1((d) => {return y(Number(d.sumData))});

  const valueline2 = d3.line().x((d) => {return x(new Date(d.runDate))}).y((d) => {return y(Number(d.sumData))});

  const svg = d3.select('#chart_container').append('svg').style('width', hourWidth).style('height', hourHeight).style('background', "#fff").attr('preserveAspectRatio', "none");

  // 차트에 x축 axis 생성
  svg
  .append('g')
  .attr('class', 'x axis xAxis')
  .attr('transform', `translate(${hourMargin.left}, ${(hourHeight - hourMargin.bottom)})`)
  .call(d3.axisBottom(x).ticks(hourWidth/62.33333333333333).tickSizeOuter(0).tickFormat(d3.timeFormat("%H시")))
  .call(g => g.select('.domain').remove());

  // 차트에 y축 axis 생성
  svg
  .append('g')
  .attr('class', 'y axis yAxis')
  .call(d3.axisLeft(y).ticks(8))
  .attr('transform', `translate(${hourMargin.left},${hourMargin.right})`)
  .call(g => g.select('.domain').remove())
  .call(g => g.selectAll('line').attr('stroke','#999').attr('opacity','0.2').attr('stroke-dasharray','3.3').attr('x2',`${hourWidth}`))
  .attr('x2', `${hourWidth}`)
  .style('stroke', 'none')
  .attr('opacity', '1')
  .append('g')
  .append('text')
  .attr('class', 'titleText')
  .attr('transform', 'rotate(-90)')
  .attr('x', `${-hourHeight + 280}`)
  .attr('y', -50)
  .attr('font-size', '13px')
  .attr('font-family', 'Spoqa Han Sans Neo')
  .attr('font-anchor', 'middle')
  .attr('fill', 'currentColor')
  
  // 차트에 area 생성 (전력소비량)
  const linePath = svg
  .append('path')
  .data([a])
  .attr('class', 'line1')
  .attr('transform', `translate(${hourMargin.left}, ${hourMargin.right})`)
  .attr('d', valueline)
  .style('fill', '#77ACF2')
  .style('stroke-width', 2)
  .style('z-index', '99')

  const linePath2 = svg
  .append('path')
  .data([a])
  .attr('class', 'line1')
  .attr('transform', `translate(${hourMargin.left}, ${hourMargin.right})`)
  .attr('d', valueline2)
  .style('fill', 'none')
  .style('stroke-width', 2)
  .style('stroke', '#3574F2')
  .style('z-index', '99')

  // 차트에 마우스 올렸을 때 vertical line과 위치 circle 생성
  // 차트 전체를 이동할 수 있도록 width: 100%, height: 100%의 그룹 생성
  const focus = svg
  .append('g')
  .attr('class','focus')
  .attr('width', hourWidth)
  .attr('height', hourHeight);

  // vertical line 생성
  focus
  .append('line')
  .attr('class', 'vertical_line')
  .attr('opacity', 0)
  .style('stroke-dasharray', '3.3')
  .attr('stroke-width', '2px')
  .attr('stroke', '#999')
  .attr('y1', 0)
  .attr('y2', `${hourHeight - (hourMargin.top + hourMargin.bottom)}`)

  // 전력소비량 circle 생성
  focus
  .append('circle')
  .attr('class', 'circle_y1')
  .attr('opacity', 0)
  .attr('stroke','#3574F2')
  .attr('fill','white')
  .attr('stroke-width', 2)
  .attr('r', 4); // 반지름값

  // 툴팁 이벤트 생성
  // 차트 전체를 감싸는 투명한 박스를 생성하여 박스에 올리는 마우스 좌표를 계산하여 해당 좌표에 있는 값을 출력
  const observerbox = svg
  .append('rect')
  .attr('width', hourWidth - hourMargin.left)
  .attr('height', hourHeight - hourMargin.top)
  .attr('transform', `translate(${hourMargin.left}, ${hourMargin.top/2})`)
  .attr('opacity', 0)
  .on('mousemove', function() {
    // 마우스 위치 구하여 위치에 맞는 배열 값 구하기
    const bisect = d3.bisector((d) => new Date(d.runDate)).left,
    x99 = x.invert(d3.mouse(this)[0]),
    i = bisect(a, x99, 1),
    d0 = a[i - 1],
    d1 = a[i],
    dType = typeof a.runDate,
    d = dType != "undefined" ? (x - new Date(d0.runDate) > new Date(d1.runDate) - x99 ? d1 : d0) : d0;

    // 날짜 값
    const dDate = new Date(d.runDate);

    // vertical line 위치 변경
    focus
    .select('line')
    .attr('opacity', '0.5')
    .attr('transform', `translate(${(x(dDate) + hourMargin.left)}, ${hourMargin.top})`);

    // 전력소비량 circle 위치 변경
    focus
    .select('.circle_y1')
    .attr('opacity', 1)
    .attr('transform', `translate(${(x(dDate) + hourMargin.left)}, ${(y(d.sumData) + hourMargin.bottom)})`)

    // 툴팁 활성화
    const tooltip = document.querySelector('#tooltip');
    tooltip.style.opacity = 1;

    // 툴팁 위치 설정
    if(x(new Date(d.runDate)) + tooltip.offsetWidth < hourWidth){
      tooltip.style.left = `${x(dDate) + 72}px`;
    }else {
      tooltip.style.left = `${x(dDate) - 132}px`;
    }

    // 툴팁 텍스트 작성
    var dYears = dDate.getFullYear();
    var dMonth = dDate.getMonth()+1;
    dMonth = dateParse(dMonth);
    var dDay = dDate.getDate();
    dDay = dateParse(dDay);
    var dHour = dDate.getHours();
    dHour = dateParse(dHour);
    var dMin = dDate.getMinutes();
    dMin = dateParse(dMin);

    $('.tooltipDate').text(`${dYears}년 ${dMonth}월 ${dDay}일 ${dHour}시 ${dMin}분`)
    $('.tooltipValue.kW').text(`${Number(d.sumData).toFixed(0)} kW`)
  })
  .on('mouseleave', () => {
    // 마우스가 차트 밖으로 벗어 났을 때 focus 숨기기
    focus
    .select('line')
    .attr('opacity', 0)

    focus
    .select('.circle_y1')
    .attr('opacity', 0)

    // 툴팁 숨기기
    const tooltip = document.querySelector('#tooltip');
    tooltip.style.opacity = 0;
  })

  $('#chart_container').append(
    `<div class="labels">
      <span class="label_box kW"></span>
      <span class="label kW">전력소비량</span>
    </div>`
  )
}

// 시간별 전력소비량 테이블
function hourTable(a){
  const table = document.querySelector('.hour-table tbody');
  table.innerHTML = '';
  a.forEach((e, i)=>{
    table.innerHTML += `<tr><td>${e.runDate}</td><td>${Number(e.sumData).toFixed(0)} kW</td></tr>`
  })

  return;
}

// 일별 전력소비량 차트 (bar)
function dayChart(a){
  $('#chart_container').html('');
  chartArray = a;
  chartType = 'day';

  let today = new Date(a[0].runDate);
  let todayYear = today.getFullYear();
  let todayMonth = today.getMonth();
  let thisMonth = new Date(todayYear, todayMonth, 0);
  let nextMonth = new Date(todayYear, (todayMonth + 1), 1);
  // let lastDay = nextMonth.getDate();

  const dayMapBar = a.map(function(key) {
    return [new Date(key.runDate).setHours(9), Number(key.sumData)]
  })

  const dayChart = document.querySelector('#chart_container');
  let dayChartDrawing = new Dygraph(dayChart, dayMapBar, {
    labels: ["date", "전력소비량"],
	  legend: 'follow',
	  title: '',
	  showRoller: false,
	  customBars: false,
	  ylabel: '전력소비량(kWh)',
	  gridLineColor: '#CCC',
	  axisLineColor: 'white',
    plotter: barChartPlotter,
	  strokeWidth: 2,
    stroke: '#3574F2',
	  highlightCircleSize: 4,
    dateWindow: [thisMonth, nextMonth],
	  zoomCallback: function(minX, maxX, yRanges) {
		  dayChartDrawing.updateOptions({
        dateWindow: null,
        valueRange: null
      });
	  },
    series : {
      "전력소비량" : {
        drawHighlightPointCallback : function(g, name, ctx, cx, cy, color, radius){
          ctx.beginPath();
          ctx.strokeStyle = "#3574F2";
          ctx.fillStyle = "#FFF";
          ctx.arc(cx, cy, radius, 0, 2 * Math.PI, false);
          ctx.fill();
          ctx.stroke();
        },
      },
     },
      plugins: [
      new Dygraph.Plugins.Crosshair({
        direction: "vertical",
      })
    ],
      axes: {
        x: {
          gridLineWidth: 0,
          gridLineColor: 'rgba(0,0,0,0)',
          valueFormatter: function(ms) {
            var date = new Date(ms)
            var valueYear = date.getFullYear();
            var valueMon = date.getMonth() + 1;
            valueMon = valueMon > 9 ? valueMon : '0' + valueMon; 
            var valueDay = date.getDate();
            valueDay = valueDay > 9 ? valueDay : '0' + valueDay; 
            
            const resultText = valueYear + '년 ' + valueMon + '월 ' + valueDay + '일 '
          
            return resultText
          },
            axisLabelFormatter: function(d) {
            var date = new Date(d)
            var valueDay = date.getDate();
            valueDay = valueDay > 9 ? valueDay : '0' + valueDay; 
            
            let resultText;
            
            resultText = `${valueDay}일`;
        
            return resultText;
           },
        },
        y: {
            valueFormatter: function(ms) {
              return ms.toFixed(0) + ' kW';
            },
         }
      }
  })

  $('#chart_container').append(
    `<div class="labels">
      <span class="label_box_day kW"></span>
      <span class="label kW">전력소비량</span>
    </div>`
  )
}

// 일별 전력소비량 테이블
function dayTable(a){
  const table = document.querySelector('.day-table tbody');
  table.innerHTML = '';
  a.forEach((e, i)=>{
    table.innerHTML += `<tr><td>${e.runDate}</td><td>${Number(e.sumData).toFixed(0)} kWh</td></tr>`
  })

  return;
}

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
      var context = this, args = arguments;
      var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
  };
};

let observerElement = '';
if($('.upi_chart-container').length != 0) observerElement = document.querySelector('.upi_chart-container');
if($('.chart_container').length != 0) observerElement = document.querySelector('.chart_container');

setTimeout(() => {
const resizeObserver = new ResizeObserver((entries) => {
  if (chartType != ''){
    switch (chartType) {
      case 'temp':
        ahuWidth = d3.select('#upi_chart').node().getBoundingClientRect().width - ahuMargin.left - ahuMargin.right;
        ahuChart(chartArray);
        break;
      case 'hour':
        hourWidth = d3.select('#chart_container').node().getBoundingClientRect().width;
        hourChart(chartArray);
        break;
      case 'day':
        // dayChart(chartArray);
        break;
      default :
        break;
    }
  }
})

if(observerElement != '') resizeObserver.observe(observerElement);

}, 100)