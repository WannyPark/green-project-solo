import $ from "jquery";
import { SelectBox } from "../Select/SelectBox";
import "./RecBoardCp.css";
import { useEffect } from "react";

const RecBoardCp = () => {

    const addItem = () => {
        const height = $(".rboard_list").height();
        $(".rboard_list").css("height", height + 300);
        $(".rboard_item_plus_bnt").before(
            `<div class="rboard_list_item">
                <div class="rboard_item">
                    <img src="/images/default.jpg" />
                    <h2>맛집 7</h2>
                </div>
                <div class="rboard_item">
                    <img src="/images/default.jpg" />
                    <h2>맛집 8</h2>
                </div>
                <div class="rboard_item">
                    <img src="/images/default.jpg" />
                    <h2>맛집 9</h2>
                </div>
            </div>`
        );
        $(".rboard_item").click(() => {showBoard()});
    };

    const showBoard = () => { // 글 눌렀을 때 실행되는 함수
        $(".rboard_container").css("opacity", "0.4"); // 배경 흐릿하게
        $(".rboard_container").css("pointer-events", "none"); // 다시 auto 로 바꾸면 동작
        $(".rboard_show_page").css("top", `${(($(window).height()-$(".rboard_show_page").outerHeight())/2+$(window).scrollTop())}px`); // 중앙 정렬
        $(".rboard_show_page").css("left", `${(($(window).width()-$(".rboard_show_page").outerWidth())/2+$(window).scrollLeft())}px`); // 중앙 정렬
        $(".rboard_show_page").css("display", "flex").hide().fadeIn(200); // 글 화면 띄우기
        $(".rboard_show_page").css("opacity", "1"); // 글 화면 흐릿한 효과 제거
        $(".rboard_show_page").css("pointer-events", "auto"); // 글 화면 포인터 on
        $("body").css("overflow", "hidden"); // 스크롤 방지
    }
    const closeShow = () => {
        $(".rboard_container").css("opacity", "1"); // 배경 흐릿한 효과 제거
        $(".rboard_container").css("pointer-events", "auto"); // 화면 포인터 on
        $(".rboard_show_page").css("display", "none"); // 글 작성 화면 삭제
        $("body").css("overflow", ""); // 스크롤 방지 해제
    }

    const showWrite = () => { // 글 작성 눌렀을 때 실행되는 함수
        $(".rboard_container").css("opacity", "0.4"); // 배경 흐릿하게
        $(".rboard_container").css("pointer-events", "none"); // 다시 auto 로 바꾸면 동작
        $(".rboard_write_page").css("top", `${(($(window).height()-$(".rboard_write_page").outerHeight())/2+$(window).scrollTop())}px`); // 중앙 정렬
        $(".rboard_write_page").css("left", `${(($(window).width()-$(".rboard_write_page").outerWidth())/2+$(window).scrollLeft())}px`); // 중앙 정렬
        $(".rboard_write_page").css("display", "flex").hide().fadeIn(200); // 글 작성 화면 띄우기
        $(".rboard_write_page").css("opacity", "1"); // 글 작성 화면은 흐릿한 효과 제거
        $(".rboard_write_page").css("pointer-events", "auto"); // 글 작성 화면 포인터 on
        $("body").css("overflow", "hidden"); // 스크롤 방지
    }
    const closeWrite = () => {
        $(".rboard_container").css("opacity", "1"); // 배경 흐릿한 효과 제거
        $(".rboard_container").css("pointer-events", "auto"); // 화면 포인터 on
        $(".rboard_write_page").css("display", "none"); // 글 작성 화면 삭제
        $("body").css("overflow", ""); // 스크롤 방지 해제
    }

    useEffect(() => {
        SelectBox();
    }, []);

    return (
        <>
            <div className="rboard_show_page">
                <div className="rboard_show_top">
                    <img src="/images/default.jpg" />
                    <button className="rboard_show_close" onClick={() => {closeShow()}}>X</button>
                </div>
            </div>
            <div className="rboard_write_page">
                <div className="rboard_write_top">
                    <button className="rboard_write_close" onClick={() => {closeWrite()}}>X</button>
                </div>
            </div>
            <div className="rboard_container">
                <div className="rboard_list">
                    <div className="rboard_list_item">
                        <div className="rboard_item" id="1" onClick={() => {showBoard()}}>
                            <img src="/images/default.jpg" />
                            <h2>맛집 1</h2>
                        </div>
                        <div className="rboard_item" onClick={() => {showBoard()}}>
                            <img src="/images/default.jpg" />
                            <h2>맛집 2</h2>
                        </div>
                        <div className="rboard_item" onClick={() => {showBoard()}}>
                            <img src="/images/default.jpg" />
                            <h2>맛집 3</h2>
                        </div>
                    </div>
                    <div className="rboard_list_item">
                        <div className="rboard_item" onClick={() => {showBoard()}}>
                            <img src="/images/default.jpg" />
                            <h2>맛집 4</h2>
                        </div>
                        <div className="rboard_item" onClick={() => {showBoard()}}>
                            <img src="/images/default.jpg" />
                            <h2>맛집 5</h2>
                        </div>
                        <div className="rboard_item" onClick={() => {showBoard()}}>
                            <img src="/images/default.jpg" />
                            <h2>맛집 6</h2>
                        </div>
                    </div>
                    <div className="rboard_item_plus_bnt">
                        <button onClick={() => {addItem()}}>더보기</button>
                    </div>
                </div>
                <div className="rboard_menu">
                    <div className="rboard_menu_title">
                        <input type="text" className="rboard_menu_input" placeholder="검색어를 입력해주세요." />
                    </div>
                    <div className="rboard_menu_writer">
                        <input type="text" className="rboard_menu_input" placeholder="작성자를 입력해주세요." />
                    </div>
                    <div className="rboard_menu_loc">
                        <select name="sido1" id="sido1"></select>
                        <select name="gugun1" id="gugun1"></select>
                        <input type="button" className="rboard_menu_search" value="검색" />
                    </div>
                    <div className="rboard_list_add_button">
                        <button onClick={() => {showWrite()}}>글 작성</button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default RecBoardCp;