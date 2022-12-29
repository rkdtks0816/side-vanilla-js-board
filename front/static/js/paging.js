// 페이징 표시
function paging(totalData, dataPerPage, pageCount, currentPage, globalCurrentPage) {
    console.log("currentPage : " + currentPage);
  
    totalPage = Math.ceil(totalData[0] / dataPerPage); //총 페이지 수
    
    if(totalPage<pageCount){
      pageCount=totalPage;
    }
    
    let pageGroup = Math.ceil(currentPage / pageCount); // 페이지 그룹
    let last = pageGroup * pageCount; //화면에 보여질 마지막 페이지 번호
    
    if (last > totalPage) {
      last = totalPage;
    }
  
    let first = last - (pageCount - 1); //화면에 보여질 첫번째 페이지 번호
    let next = last + 1;
    let prev = first - 1;
  
    let pageHtml = "";
  
    if (prev > 0) {
      pageHtml += '<a href="#" class="bt prev"><</a>';
    }
  
   //페이징 번호 표시 
    for (var i = first; i <= last; i++) {
      if (currentPage == i) {
        pageHtml +=
          `<a href="#" class="num on">${i}</a>`;
      } else {
        pageHtml += `<a href="#" class="num">${i}</a>`;
      }
    }
  
    if (last < totalPage) {
      pageHtml += '<a href="#" class="bt next">></a>';
    }
  
    $(".board_page").html(pageHtml);
  
    //페이징 번호 클릭 이벤트 
    $(".board_page a").click(function () {
      let $class = $(this).attr("class");
      selectedPage = $(this).text();
  
      if ($class == "next") selectedPage = next;
      if ($class == "prev") selectedPage = prev;
      
      globalCurrentPage = selectedPage;
      //페이징 표시 재호출
      paging(totalData, dataPerPage, pageCount, selectedPage, globalCurrentPage);
      //글 목록 표시 재호출
      displayData(selectedPage, dataPerPage, totalData);
    });
  }

//현재 페이지(currentPage)와 페이지당 글 개수(dataPerPage) 반영
function displayData(currentPage, dataPerPage, totalData) {

    let ContHtml = "";
    let TopHtml = "";
    let TotalHtml = "";

    currentPage = Number(currentPage);
    dataPerPage = Number(dataPerPage);
    for (
      var i = (currentPage - 1) * dataPerPage;
      i < (currentPage - 1) * dataPerPage + dataPerPage;
      i++
    ) {
      if (i < Number(totalData[0])) {
          ContHtml += 
              `<div>` +
                  `<div class="num">${i + 1}</div>` +
                  `<div class="title"><a onclick="PostCookie(${i})">${totalData[1][i]}</a></div>` +
                  `<div class="writer">${totalData[2][i]}</div>` +
                  `<div class="date">${totalData[3][i]}</div>` +
              `</div>`;
      }
    }
    TopHtml =
        '<div class="top">' +
            '<div class="num">번호</div>' +
            '<div class="title">제목</div>' +
            '<div class="writer">글쓴이</div>' +
            '<div class="date">작성일</div>' +
        '</div>';

    TotalHtml = TopHtml + ContHtml;
    $(".board_list").html(TotalHtml);
  }