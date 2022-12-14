const backToTop = document.getElementById('backtotop');

const checkScroll = () => {
    /*웹페이지가 수직으로 얼마나 스크롤 되어있는가를 확인하는 값 (픽셀단위)
    */
    let pageYoffset = window.pageYoffset;
    if (pageYoffset !== 0) {
        backToTop.classList.add('show'); //해당 html에 show라는 클래스가 들어가서 css에서 show 클래스 셀렉터로 적용가능
    } else {
        backToTop.classList.remove('show');

    }
};

const moveBackToTop = () => {
    if (window.pageYoffset > 0) {
        /*smooth 하게 이동하기*/
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

window.addEventListener('scroll', checkScroll);//직접 window에 걸었기 떄문에 window창 어디에서든 접근이 가능
backToTop.addEventListener('click', moveBackToTop);
/*-----------------------------------------------------*/
function transformNext(event) {
    const slideNext = event.target;
    const slidePrev = slideNext.previousElementSibling;

    const classList = slideNext.parentElement.parentElement.nextElementSibling;
    let activeLi = classList.getAttribute('data-position');
    const lilist = classList.getElementsByTagName('li');

    if (Number(activeLi) < 0) {
        activeLi = Number(activeLi) + 260;
        //왼쪽에 있던 카드가 오른쪽으로 갔다면 다시 왼쪽으로 갈 수 있으므로 PREV버튼 활성화
        slidePrev.style.color = '#2f3059';
        slidePrev.classList.add('slide-prev-hover');
        slidePrev.addEventListener('click', transformPrev);

        //맨 왼쪽에 현재 보이는 카드가, 맨 첫번째 카드라면, 오른쪽으로 갈 수 없으므로 NEXT 비활성화
        if (Number(activeLi) === 0) {
            slideNext.style.color = '#cfd8dc';
            slideNext.classList.remove('slide-next-hover');
            slideNext.removeEventListener('click', transformNext);
        }
    }
    classList.style.transition = 'transform 1s';
    classList.style.transform = 'translateX(' + String(activeLi) + 'px)';
    classList.setAttribute('data-position', activeLi);

}
const transformPrev = (event) => { //어떤 이벤트가 발생했는지 알기 위해서 event 파라미터 설정
    const slidePrev = event.target; //이벤트가 적용받는 요소를 가져옴
    const slideNext = slidePrev.nextElementSibling;

    //ul 태그 선택
    const classList = slidePrev.parentElement.parentElement.nextElementSibling;
    let activeLi = classList.getAttribute('data-position');
    const liList = classList.getElementsByTagName('li');
    /*classList.clientWidth 는 ul태그의 실질적 너비
      liList.length * 260 에서 260 은 각 li 요소의 설정 너비(margin 포함)
      activeLi 는 data-position에 있는 현재 위치
      즉, liList.length * 260 + Number(activeLi)는 현재 위치부터 오른쪽으로 나열되어야 하는 나머지 카드들의 너비이다.
      */
    /*classList.clientWidth < (liList.length * 260 + Number(activeLi))의 의미는
    오른쪽으로 나열된 카드들이 넘친 상태이므로, 왼쪽으로 이동이 가능함*/
    if (classList.clientWidth < (liList.length * 260 + Number(activeLi))) {
        activeLi = Number(activeLi) - 260;
        if (classList.clientWidth > (liList.length * 260 + Number(activeLi))) {
            slidePrev.style.color = '#cfd8dc';
            slidePrev.classList.remove('slide-prev-hover');
            slidePrev.removeEventListener('click', transformPrev);

        }

        slideNext.style.color = '#2f3059';
        slideNext.classList.add('slide-next-hover');
        slideNext.addEventListener('click', transformNext);
    }

    classList.style.transition = 'transform 1s';
    classList.style.transform = 'translateX(' + String(activeLi) + 'px)';
    classList.setAttribute('data-position', activeLi);
};
const slidePrevList = document.getElementsByClassName('slide-prev');
for (let i = 0; i < slidePrevList.length; i++) {
    //ul 태그 선택
    let classList = slidePrevList[i].parentElement.parentElement.nextElementSibling;
    let liList = classList.getElementsByTagName('li');
    //카드가 ul태그 너비보다 넘치면 왼쪽(prev)버튼 활성화하고, 오른쪽(NEXT)는 현재 맨 첫카드 위치이므로 비활성화
    if (classList.clientWidth < (liList.length * 260)) {
        slidePrevList[i].classList.add('slide-prev-hover');
        slidePrevList[i].addEventListener('click', transformPrev);
    } else {
        /*태그 삭제시, 부모요소에서 removeChild를 통해 삭제해야 함
        따라서, 1. 먼저 부모 요소를 찾아서,
                2. 부모 요소의 자식요소로 있는 PREV와 NEXT요소를 삭제해야함
        */
        const arrowContainer = slidePrevList[i].parentElement;
        arrowContainer.removeChild(slidePrevList[i].nextElementSibling);//이게 오른쪽 버튼
        arrowContainer.removeChild(slidePrevList[i]); //왼쪽버튼 삭제
    }
}