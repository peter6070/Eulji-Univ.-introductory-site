function Alert() {
  alert("I am alert!");
}

const $topBtn = document.querySelector(".moveTopBtn");
// 버튼 클릭 시 맨 위로 이동
$topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  page = 1;
};

const $bottomBtn = document.querySelector(".moveBottomBtn");
// 버튼 클릭 시 페이지 하단으로 이동
$bottomBtn.onclick = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  page = lastPage;
};

const $li = document.querySelectorAll("#side-menu li");

$li.forEach((element, index) => {
  element.addEventListener("click", () => {
    page = index + 1;
    console.log(page);
  });
});

// 스크롤 시 한 영역씩 이동하는 코드
window.addEventListener(
  "wheel",
  function (e) {
    e.preventDefault();
  },
  { passive: false }
);
// passive가
//> false인 경우 : preventDefault()를 이용해서 이벤트 자체를 막을 수 있기 때문에, 브라우저는 scroll를 계속할지 안할지를 매번 검사하게 된다. passive옵션의 기본값이다.
//> true인 경우 : 스크롤이벤트를 막지 않겠다! preventDefault()를 사용할 수 없다.

var $html = $("html");
var page = 0; //뷰포트에 표시되는 페이지 번호
var lastPage = $(".content").length; //마지막 페이지 번호(전체 content 클래스의 길이 = 개수)
$html.animate({ scrollTop: 0 }, 10); //문서 로드되면 첫 페이지로

$(window).on("wheel", function (e) {
  //이벤트 핸들러로 마우스 휠 굴리면 발생하는 이벤트
  if ($html.is(":animated")) return;
  //아래에서 호출된 .animate 메소드로 생성된 스크롤 효과가 쌓이지 않도록
  //스크롤 진행되는 동안 발생하는 wheel이벤트 무시
  if (e.originalEvent.deltaY > 0) {
    //마우스 휠을 아래쪽으로 굴렸을때
    //e(jQuery 반환)
    //.originalEvent(js에서의 원래 이벤트)
    //.deltaY(마우스 휠을 어느 방향으로 얼만큼 굴렸는지)
    if (page == lastPage + 1) {
      //첫 번째 페이지면 이벤트 핸들러 종료(스크롤 될것이 없어서)
      return;
    }
    page++; //아니면 페이지 1 증가
  } else if (e.originalEvent.deltaY < 0) {
    //마우스 휠을 위쪽으로 굴렸을때
    if (page == 0) {
      //첫 번째 페이지면 이벤트 핸들러 종료
      return;
    } else page--; //아니면 페이지 1 감소
  }
  var posTop =
    (page - 1) * $(window).height() + $("header").height() + 75 + page * page; //이동할 페이지 번호 스크롤 위치 계산
  if (page == 0) $html.animate({ scrollTop: 0 }); //계산한 위치로 이동
  else $html.animate({ scrollTop: posTop }); //계산한 위치로 이동
});
