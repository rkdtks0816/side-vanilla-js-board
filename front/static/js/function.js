
// Sign Up #############################################################################################################################################

// 회원가입

function CreatIDCall(UserName, NickName, UserID, UserPassword, UserEmail){
  let today = new Date();
  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${CreatIDAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { 
      "UserName":  UserName,
      "NickName":  NickName,
      "UserID":  UserID,
      "UserPassword":  UserPassword,
      "UserEmail":  UserEmail,
      "IdCreatDatetime":  today
    }
  }).done((data) => {
      alert("회원가입이 완료되었습니다.");
  }).fail((err) => {
    console.log(err)
  })
}

// Login #############################################################################################################################################

// 아이디 중복확인
function ReadIDCall(UserID){
  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${ReadIDAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { "UserID":  UserID }
  }).done((data) => {

    if ( data.hasOwnProperty('UserID')) {
      alert("사용할 수 없는 아이디입니다.")
    } else {
      alert("사용할 수 있는 아이디입니다.")
    }
    
  })
}

// 페이지에 처음 진입 했을 때, 업데이트가 될 수 있도록 실행
function firstUpdateCall(){
  let today = new Date();
  let hour = today.getHours();
  hour = hour < 10 ? `0${hour}` : hour;
  let minutes = today.getMinutes();

  if(minutes % 5 == 0) updateBool = true;
  
  // 대시보드를 호출할 때 현재시간과 제일 가까운 5분데이터 값 호출
  let timeList = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  let target = minutes;
  let near = 0;
  let abs = 0;
  var min = 59;
  
  for(var i = 0 ; i < timeList.length ; i++){
    abs = ((timeList[i] - target) < 0) ? -(timeList[i] - target) : (timeList[i] - target);
    
    if(abs < min)
    {
      min = abs;
      near = timeList[i]

      if(minutes < timeList[i]) near = timeList[i-1]
    }
  }

  near = near < 10 ? `0${near}` : near;

  // startBtn();

  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${dashboardAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { "runDate": `2021-04-01 ${hour}:${near}:29` }
  }).done((data) => {

    // 데이터 정리
    const convertData = {}
    data.map(function(key){
      switch (key.szUnitID) {
        case 'CHR016' : 
          convertData.CHR016_Delta_T = key.ChilledWater_Delta_T;
          convertData.CHR016_Out_T = key.ChilledWater_Out_T;
          break;
        case 'CHR017' : 
          convertData.CHR017_Delta_T = key.ChilledWater_Delta_T;
          convertData.CHR017_Out_T = key.ChilledWater_Out_T;
          break;
        case 'CHR018' : 
          convertData.CHR018_Delta_T = key.ChilledWater_Delta_T;
          convertData.CHR018_Out_T = key.ChilledWater_Out_T;
          break;
        case 'CHR019' : 
          convertData.CHR019_Delta_T = key.ChilledWater_Delta_T;
          convertData.CHR019_Out_T = key.ChilledWater_Out_T;
          break;
        case 'CHR020' : 
          convertData.CHR020_Delta_T = key.ChilledWater_Delta_T;
          convertData.CHR020_Out_T = key.ChilledWater_Out_T;
          break;
        case 'CHR021' : 
          convertData.CHR021_Delta_T = key.ChilledWater_Delta_T;
          convertData.CHR021_Out_T = key.ChilledWater_Out_T;
          break;
        case 'CHR022' : 
          convertData.CHR022_Delta_T = key.ChilledWater_Delta_T;
          convertData.CHR022_Out_T = key.ChilledWater_Out_T;
          break;
        default :
          break;
      }
    })

    dashboardChart(convertData);

    // 업데이트 시간 출력
    var updateYear = today.getFullYear();
    var updateMonth = today.getMonth()+1;
    updateMonth = updateMonth < 10 ? `0${updateMonth}` : updateMonth
    var updateDay = today.getDate();
    updateDay = updateDay < 10 ? `0${updateDay}` : updateDay
    $('.update_time').text(jsonDateParse(`${updateYear}${updateMonth}${updateDay}${hour}${near}`, 'dashboard'))
  }).fail((err) => {
    console.log(err)
  })
}

function ChilledWater_In_Out_T(){
  let today = new Date();
  let hour = today.getHours();
  hour = hour < 10 ? `0${hour}` : hour;
  let minutes = today.getMinutes();

  if(minutes % 5 == 0) updateBool = true;
  
  // 대시보드를 호출할 때 현재시간과 제일 가까운 5분데이터 값 호출
  let timeList = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  let target = minutes;
  let near = 0;
  let abs = 0;
  var min = 59;
  
  for(var i = 0 ; i < timeList.length ; i++){
    abs = ((timeList[i] - target) < 0) ? -(timeList[i] - target) : (timeList[i] - target);
    
    if(abs < min)
    {
      min = abs;
      near = timeList[i]

      if(minutes < timeList[i]) near = timeList[i-1]
    }
  }

  near = near < 10 ? `0${near}` : near;

  // startBtn();/

  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${dashboardAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { "runDate": `2021-04-01 ${hour}:${near}:29` }
  }).done((data) => {

    // 데이터 정리
    const convertData = {}
    data.map(function(key){
      switch (key.szUnitID) {
        case 'CHR016' : 
          convertData.CHR016_Delta_T = key.ChilledWater_Delta_T;
          convertData.CHR016_Out_T = key.ChilledWater_Out_T;
          break;
        case 'CHR017' : 
          convertData.CHR017_Delta_T = key.ChilledWater_Delta_T;
          convertData.CHR017_Out_T = key.ChilledWater_Out_T;
          break;
        case 'CHR018' : 
          convertData.CHR018_Delta_T = key.ChilledWater_Delta_T;
          convertData.CHR018_Out_T = key.ChilledWater_Out_T;
          break;
        case 'CHR019' : 
          convertData.CHR019_Delta_T = key.ChilledWater_Delta_T;
          convertData.CHR019_Out_T = key.ChilledWater_Out_T;
          break;
        case 'CHR020' : 
          convertData.CHR020_Delta_T = key.ChilledWater_Delta_T;
          convertData.CHR020_Out_T = key.ChilledWater_Out_T;
          break;
        case 'CHR021' : 
          convertData.CHR021_Delta_T = key.ChilledWater_Delta_T;
          convertData.CHR021_Out_T = key.ChilledWater_Out_T;
          break;
        case 'CHR022' : 
          convertData.CHR022_Delta_T = key.ChilledWater_Delta_T;
          convertData.CHR022_Out_T = key.ChilledWater_Out_T;
          break;
        default :
          break;
      }
    })

    dashboardChart(convertData);

    // 업데이트 시간 출력
    var updateYear = today.getFullYear();
    var updateMonth = today.getMonth()+1;
    updateMonth = updateMonth < 10 ? `0${updateMonth}` : updateMonth
    var updateDay = today.getDate();
    updateDay = updateDay < 10 ? `0${updateDay}` : updateDay
    $('.update_time').text(jsonDateParse(`${updateYear}${updateMonth}${updateDay}${hour}${near}`, 'dashboard'))
  }).fail((err) => {
    console.log(err)
  })
}

function UpiCall(){
  
  let today = new Date();
  let hour = today.getHours();
  hour = hour < 10 ? `0${hour}` : hour;
  let minutes = today.getMinutes();

  if(minutes % 5 == 0) updateBool = true;
  
  // 대시보드를 호출할 때 현재시간과 제일 가까운 5분데이터 값 호출
  let timeList = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  let target = minutes;
  let near = 0;
  let abs = 0;
  var min = 59;
  
  for(var i = 0 ; i < timeList.length ; i++){
    abs = ((timeList[i] - target) < 0) ? -(timeList[i] - target) : (timeList[i] - target);
    
    if(abs < min)
    {
      min = abs;
      near = timeList[i]

      if(minutes < timeList[i]) near = timeList[i-1]
    }
  }

  near = near < 10 ? `0${near}` : near;

  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${UpiDataAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { "runDate": `2021-04-01 ${hour}:${near}:29` }
  }).done((data) => {

    // 데이터 정리
    const convertData = {}
    data.map(function(key){
      convertData.system_upi = key.SystemUpi
      switch (key.szUnitID) {
        case 'CHR016' : 
          convertData.CHR016_Upi = key.UnitUpi;
          break;
        case 'CHR017' : 
          convertData.CHR017_Upi = key.UnitUpi;
          break;
        case 'CHR018' : 
          convertData.CHR018_Upi = key.UnitUpi;
          break;
        case 'CHR019' : 
          convertData.CHR019_Upi = key.UnitUpi;
          break;
        case 'CHR020' : 
          convertData.CHR020_Upi = key.UnitUpi;
          break;
        case 'CHR021' : 
          convertData.CHR021_Upi = key.UnitUpi;
          break;
        case 'CHR022' : 
          convertData.CHR022_Upi = key.UnitUpi;
          break;
        default :
          break;
      }
    })

    chiller_state(convertData);

    // // 업데이트 시간 출력
    // var updateYear = today.getFullYear();
    // var updateMonth = today.getMonth()+1;
    // updateMonth = updateMonth < 10 ? `0${updateMonth}` : updateMonth
    // var updateDay = today.getDate();
    // updateDay = updateDay < 10 ? `0${updateDay}` : updateDay
    // $('.update_time').text(jsonDateParse(`${updateYear}${updateMonth}${updateDay}${hour}${near}`, 'dashboard'))
  }).fail((err) => {
    console.log(err)
  })
}

function InfodataCall(){
  
  let today = new Date();
  let hour = today.getHours();
  hour = hour < 10 ? `0${hour}` : hour;
  let minutes = today.getMinutes();

  if(minutes % 5 == 0) updateBool = true;
  
  // 대시보드를 호출할 때 현재시간과 제일 가까운 5분데이터 값 호출
  let timeList = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  let target = minutes;
  let near = 0;
  let abs = 0;
  var min = 59;
  
  for(var i = 0 ; i < timeList.length ; i++){
    abs = ((timeList[i] - target) < 0) ? -(timeList[i] - target) : (timeList[i] - target);
    
    if(abs < min)
    {
      min = abs;
      near = timeList[i]

      if(minutes < timeList[i]) near = timeList[i-1]
    }
  }

  near = near < 10 ? `0${near}` : near;

  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${GetInfoData}`,
    method: 'GET',
    dataType: 'json',
    data: { 
      "szUnitID" : $('#fac_name option:selected').val(),
      "runDate": `2021-04-01 ${hour}:${near}:29` 
    }
  }).done((data) => {

    // 데이터 정리
    const convertData = {}
    data.map(function(key){
      convertData.Vane_Pct = key.Vane_Pct
      convertData._ChilledWater_In_T = key._ChilledWater_In_T
      convertData._ChilledWater_Out_T = key._ChilledWater_Out_T
      convertData.CoolingWater_In_T = key.CoolingWater_In_T
      convertData.CoolingWater_Out_T = key.CoolingWater_Out_T
      convertData.Motor_A = key.Motor_A
      convertData.OilTank_T = key.OilTank_T
      convertData.OilPress_Delta_T = key.OilPress_Delta_T
      convertData.Evaporator_T = key.Evaporator_T
      convertData.Evaporator_P = key.Evaporator_P
      convertData.Condenser_T = key.Condenser_T
      convertData.Condenser_P = key.Condenser_P
    })

    $('.Guide_Venc_value').text(`${Number(convertData.Vane_Pct).toFixed(1)} %`)
    $('.Chiller_W_Enter_value').text(`${Number(convertData._ChilledWater_In_T).toFixed(1)} ℃`)
    $('.Chiller_W_Leave_value').text(`${Number(convertData._ChilledWater_Out_T).toFixed(1)} ℃`)
    $('.Cond_W_Enter_value').text(`${Number(convertData.CoolingWater_In_T).toFixed(1)} ℃`)
    $('.Cond_W_Leave_value').text(`${Number(convertData.CoolingWater_Out_T).toFixed(1)} ℃`)
    $('.Motor_Amps_value').text(`${Number(convertData.Motor_A).toFixed(1)} A`)
    $('.Oil_Temp_value').text(`${Number(convertData.OilTank_T).toFixed(1)} ℃`)
    $('.DP_value').text(`${Number(convertData.OilPress_Delta_T).toFixed(1)} ℃`)
    $('.Eva_Temp_value').text(`${Number(convertData.Evaporator_T).toFixed(1)} ℃`)
    $('.Eva_Pres_value').text(`${Number(convertData.Evaporator_P).toFixed(1)} psi`)
    $('.Cond_Temp_value').text(`${Number(convertData.Condenser_T).toFixed(1)} ℃`)
    $('.Cond_Pres_value').text(`${Number(convertData.Condenser_P).toFixed(1)} psi`)

    // 업데이트 시간 출력
    var updateYear = today.getFullYear();
    var updateMonth = today.getMonth()+1;
    updateMonth = updateMonth < 10 ? `0${updateMonth}` : updateMonth
    var updateDay = today.getDate();
    updateDay = updateDay < 10 ? `0${updateDay}` : updateDay
    $('.update_time').text(jsonDateParse(`${updateYear}${updateMonth}${updateDay}${hour}${near}`, 'dashboard'))
  }).fail((err) => {
    console.log(err)
  })
}

function RunNumDataCall(){
  let today = new Date();
  let hour = today.getHours();
  hour = hour < 10 ? `0${hour}` : hour;
  let minutes = today.getMinutes();

  if(minutes % 5 == 0) updateBool = true;
  
  // 대시보드를 호출할 때 현재시간과 제일 가까운 5분데이터 값 호출
  let timeList = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  let target = minutes;
  let near = 0;
  let abs = 0;
  var min = 59;
  
  for(var i = 0 ; i < timeList.length ; i++){
    abs = ((timeList[i] - target) < 0) ? -(timeList[i] - target) : (timeList[i] - target);
    
    if(abs < min)
    {
      min = abs;
      near = timeList[i]

      if(minutes < timeList[i]) near = timeList[i-1]
    }
  }

  near = near < 10 ? `0${near}` : near;

  // startBtn();

  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${RunNumDataAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { "runDate": `2021-04-01 ${hour}:${near}:29` }
  }).done((data) => {

    // 데이터 정리
    const convertData = {}
    data.map(function(key){
      convertData.run_num = key.run_num;
      convertData.run_num_cal = key.run_num_cal;
    })

    run_num_img(convertData);

    // // 업데이트 시간 출력
    // var updateYear = today.getFullYear();
    // var updateMonth = today.getMonth()+1;
    // updateMonth = updateMonth < 10 ? `0${updateMonth}` : updateMonth
    // var updateDay = today.getDate();
    // updateDay = updateDay < 10 ? `0${updateDay}` : updateDay
    // $('.update_time').text(jsonDateParse(`${updateYear}${updateMonth}${updateDay}${hour}${near}`, 'dashboard'))
  }).fail((err) => {
    console.log(err)
  })
}

function RunNumAiDataCall(){
  let today = new Date();
  let hour = today.getHours();
  hour = hour < 10 ? `0${hour}` : hour;
  let minutes = today.getMinutes();

  if(minutes % 5 == 0) updateBool = true;
  
  // 대시보드를 호출할 때 현재시간과 제일 가까운 5분데이터 값 호출
  let timeList = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  let target = minutes;
  let near = 0;
  let abs = 0;
  var min = 59;
  
  for(var i = 0 ; i < timeList.length ; i++){
    abs = ((timeList[i] - target) < 0) ? -(timeList[i] - target) : (timeList[i] - target);
    
    if(abs < min)
    {
      min = abs;
      near = timeList[i]

      if(minutes < timeList[i]) near = timeList[i-1]
    }
  }

  near = near < 10 ? `0${near}` : near;

  // startBtn();

  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${MLDataAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { "runDate": `2021-04-01 ${hour}:${near}:29` }
  }).done((data) => {

    // 데이터 정리
    const convertData = {}
    data.map(function(key){
      convertData.Power = key.Power;
      convertData.ChilledWater_Delta_T = key.ChilledWater_Delta_T;
      convertData.Part_Load_Ratio = key.Part_Load_Ratio;
      convertData.ChilledWater_eUSRT = key.ChilledWater_eUSRT;
      convertData.ChilledWater_tUSRT = key.ChilledWater_tUSRT;
      convertData.Temperature_Control_Eff = key.Temperature_Control_Eff;
      convertData.Energy_ePUB = key.Energy_ePUB;
      convertData.Energy_tPUB = key.Energy_tPUB;
    })
    $.ajax({
      url: `http://${ip}:8003/predapi`,
      method: 'GET',
      dataType: 'json',
      data: convertData
    }).done((data) => {
  
      // 데이터 정리
      const convertData = {}
      data.map(function(key){
        convertData.pred = key.pred;
      })
      
      run_num_ai_img(convertData);
    })


    // // 업데이트 시간 출력
    // var updateYear = today.getFullYear();
    // var updateMonth = today.getMonth()+1;
    // updateMonth = updateMonth < 10 ? `0${updateMonth}` : updateMonth
    // var updateDay = today.getDate();
    // updateDay = updateDay < 10 ? `0${updateDay}` : updateDay
    // $('.update_time').text(jsonDateParse(`${updateYear}${updateMonth}${updateDay}${hour}${near}`, 'dashboard'))
  }).fail((err) => {
    console.log(err)
  })
}

// ahu 온도 호출
function ahuTempCall(){
  // 날짜 선택하지 않았을 시, 선택하라는 메시지 띄우기
  if($('#temp_date').val() == '') {
    toastr.warning('조회일자를 선택해주세요',"error");
    return; 
  }
  
  var dateConvert = jsonFormDateParse($('#temp_date').val());

  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${efficiencyDataAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { "runDate": dateConvert}
  }).done((data) => {
    // 호출 동안 검색 버튼이 비활성화 되도록 막기
    $('.temp_form button').attr('disabled', 'true');
    
    var json = data
    json.forEach((e) => {
      e.run_datetime = jsonDateParse(String(e.run_datetime), 'temp')
    })

    ahuChart(json);
    ahuTable(json);
    
    $('.temp_form button').removeAttr('disabled');
  }).fail((err) => {
    console.log(err);
  })
}

function NowEfficiency(){
  
  let today = new Date();
  let hour = today.getHours();
  hour = hour < 10 ? `0${hour}` : hour;
  let minutes = today.getMinutes();

  if(minutes % 5 == 0) updateBool = true;
  
  // 대시보드를 호출할 때 현재시간과 제일 가까운 5분데이터 값 호출
  let timeList = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  let target = minutes;
  let near = 0;
  let abs = 0;
  var min = 59;
  
  for(var i = 0 ; i < timeList.length ; i++){
    abs = ((timeList[i] - target) < 0) ? -(timeList[i] - target) : (timeList[i] - target);
    
    if(abs < min)
    {
      min = abs;
      near = timeList[i]

      if(minutes < timeList[i]) near = timeList[i-1]
    }
  }

  near = near < 10 ? `0${near}` : near;

  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${nowefficiencyDataAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { "runDate": `2021-04-12 ${hour}:${near}:29` }
  }).done((data) => {

    // 데이터 정리
    const convertData = {}
    data.map(function(key){
      convertData.Equipment_Running_eEff = key.Equipment_Running_eEff
      convertData.Equipment_Running_tEff = key.Equipment_Running_tEff
    })

    ahuInfo(convertData);
    NowEff_icon(convertData);

    // 업데이트 시간 출력
    var updateYear = today.getFullYear();
    var updateMonth = today.getMonth()+1;
    updateMonth = updateMonth < 10 ? `0${updateMonth}` : updateMonth
    var updateDay = today.getDate();
    updateDay = updateDay < 10 ? `0${updateDay}` : updateDay
    $('.update_time').text(jsonDateParse(`${updateYear}${updateMonth}${updateDay}${hour}${near}`, 'dashboard'))
  }).fail((err) => {
    console.log(err)
  })
}

// 시간별 전력 데이터 호출
function hourPowerCall(){
  // 날짜 선택하지 않았을 시, 선택하라는 메시지 띄우기
  if($('#lpDate').val() == '') {
    toastr.warning('조회일자를 선택해주세요',"error");
    return;
  }

  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${hourPowerAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { "runDate": jsonFormDateParse($('#lpDate').val()) }
  }).done((data) => {
    // 호출 동안 검색 버튼이 비활성화 되도록 막기
    $('.power_search').attr('disabled','true');

    var json = data
    json.forEach((e) => {
      e.runDate = jsonDateParse(String(e.runDate), 'hour')
    })

    hourChart(json);
    hourTable(json);

    $('.power_search').removeAttr('disabled');
  }).fail((err) => {
    console.log(err);
  })
}

function dayPowerCall(){
  // 날짜 선택하지 않았을 시, 선택하라는 메시지 띄우기
  if($('#lpDate').val() == '') {
    toastr.warning('조회 월을 선택해주세요',"error");
    return;
  }

  var nextMonth = new Date($('#lpDate').val()+'-01');
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  var nextMonthValue = nextMonth.getMonth() + 1;
  nextMonthValue = nextMonthValue < 10 ? '0' + nextMonthValue : nextMonthValue;

  var endDateValue = nextMonth.getFullYear() + String(nextMonthValue);
  var dateConvert = jsonFormDateParse($('#lpDate').val());

  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${dayPowerAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { "startDate": dateConvert, "endDate": endDateValue }
  }).done((data) => {
    // 호출 동안 검색 버튼이 비활성화 되도록 막기
    $('.power_search').attr('disabled','true');

    var json = data
    json.forEach((e) => {
      e.runDate = jsonDateParse(e.runDate, 'day')
    })

    dayChart(json);
    dayTable(json);

    $('.power_search').removeAttr('disabled');
  }).fail((err) => {
    console.log(err);
  })
}